import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
const staticPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(staticPath));

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

app.post('/api/plan', async (req, res) => {
  try {
    const { 
      destination, 
      budget, 
      days, 
      style, 
      travelerType, 
      foodPreference, 
      constraints 
    } = req.body;

    // 1. Generate Itinerary using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      Act as an expert AI travel assistant. Create a detailed travel itinerary for a trip to ${destination}.
      Trip Details:
      - Duration: ${days} days
      - Budget: $${budget}
      - Style: ${style}
      - Traveler Type: ${travelerType}
      - Food Preference: ${foodPreference}
      - Constraints/Notes: ${constraints}

      Provide a JSON response with the following structure:
      {
        "summary": {
          "destination": "${destination}",
          "days": ${days},
          "totalBudget": ${budget},
          "style": "${style}",
          "travelerType": "${travelerType}",
          "foodPreference": "${foodPreference}"
        },
        "itinerary": [
          {
            "day": 1,
            "title": "Day 1 Title",
            "activities": [
              { "time": "09:00 AM", "description": "Activity description", "cost": 20 }
            ],
            "estimatedCost": 100
          }
        ],
        "budgetSplit": {
          "accommodation": 400,
          "food": 300,
          "activities": 200,
          "transport": 100
        },
        "safetyTips": ["Tip 1", "Tip 2"],
        "weatherAdvice": "Current weather advice based on typical patterns",
        "smartReasoning": "Explanation of how the itinerary was tailored to the user's constraints"
      }
      Ensure the response is valid JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean JSON if needed (Gemini sometimes adds markdown blocks)
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const planData = JSON.parse(text);

    // 2. Fetch Places from Google Maps API
    const places = await fetchNearbyPlaces(destination);
    
    res.json({
      ...planData,
      nearbyPlaces: places
    });

  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({ error: 'Failed to generate travel plan' });
  }
});

async function fetchNearbyPlaces(destination) {
  if (!GOOGLE_MAPS_API_KEY) return [];
  
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=top+attractions+in+${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    return response.data.results.slice(0, 5).map(place => ({
      name: place.name,
      rating: place.rating,
      address: place.formatted_address,
      placeId: place.place_id,
      mapLink: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
    }));
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
