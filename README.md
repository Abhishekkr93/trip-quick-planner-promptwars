# TripMind AI - Advanced Travel Planning & Experience Engine

TripMind AI is a modern, context-aware travel assistant that leverages Gemini AI and Google Maps Places API to generate highly personalized travel itineraries.

## 🚀 Features

- **Smart Context-Aware Reasoning**: Itineraries dynamically adjust based on budget, traveler type (solo, family, elderly), weather patterns, and dietary preferences.
- **AI-Powered Itineraries**: Generates detailed day-by-day schedules including activities, timings, and cost estimates.
- **Google Maps Integration**: Fetches real-time top attractions, ratings, and locations using the Google Places API.
- **Budget Breakdown**: Visualizes how your money is spent across accommodation, food, activities, and transport.
- **Modern Responsive UI**: Premium dashboard design with glassmorphism, smooth animations, and mobile-first layout.
- **Deployment Ready**: Fully containerized with Docker for seamless deployment on Google Cloud Run.

## 🛠️ Architecture

- **Frontend**: React + Vite + Lucide Icons + CSS Variables (Design System)
- **Backend**: Node.js + Express
- **AI Engine**: Google Gemini 1.5 Flash
- **Data Engine**: Google Maps Places API

## 🔑 Environment Variables

To run this project, you will need the following environment variables:

- `VITE_GEMINI_API_KEY`: Your Google Gemini API Key.
- `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps Places API Key.

## 📦 Setup & Installation

### Local Development

1. **Clone the repository**
2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
3. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   ```
4. **Environment Config**:
   Create a `.env` file in the `backend` directory and add your API keys.
5. **Run the App**:
   - Backend: `npm run dev` (runs on port 5000)
   - Frontend: `npm run dev` (runs on port 5173, proxied to 5000)

### Production Build

```bash
cd frontend
npm run build
cd ../backend
npm start
```

## 🚢 Deployment (Google Cloud Run)

The project includes a multi-stage `Dockerfile` that builds the frontend and serves it via the Express backend.

1. **Build and Tag Image**:
   ```bash
   docker build -t gcr.io/[PROJECT-ID]/tripmind-ai .
   ```
2. **Push to GCR**:
   ```bash
   docker push gcr.io/[PROJECT-ID]/tripmind-ai
   ```
3. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy tripmind-ai --image gcr.io/[PROJECT-ID]/tripmind-ai --platform managed --set-env-vars VITE_GEMINI_API_KEY=[YOUR_KEY],VITE_GOOGLE_MAPS_API_KEY=[YOUR_KEY]
   ```

## 📝 Assumptions & Notes

- The AI assumes standard travel costs if specific budget data isn't available for a destination.
- Weather advice is based on general seasonal patterns rather than a real-time weather API (for repo size efficiency).
- The repository is kept under 10MB by avoiding large binary assets and using lightweight icons/CSS.

---
Built for the PromptWars Challenge.
