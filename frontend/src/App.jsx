import { useState } from 'react';
import './App.css';
import PlannerForm from './components/PlannerForm';
import ItineraryResults from './components/ItineraryResults';
import { Sparkles, Compass, AlertCircle } from 'lucide-react';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePlan = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan. Please check your API keys and try again.');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <Sparkles className="logo-icon" />
          <h1>TripMind AI</h1>
        </div>
        <p className="tagline">Smart Context-Aware Travel Planning</p>
      </header>

      <main className="content">
        <section className="hero-section">
          <div className="hero-content">
            <h2>Your Next Adventure Starts Here</h2>
            <p>Our AI analyzes budget, weather, and preferences to craft the perfect journey just for you.</p>
          </div>
        </section>

        <PlannerForm onGenerate={generatePlan} isLoading={isLoading} />

        {error && (
          <div className="error-card slide-up">
            <AlertCircle className="error-icon" />
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="loading-state">
            <div className="pulse-loader"></div>
            <p>Consulting our travel AI...</p>
          </div>
        )}

        <ItineraryResults results={results} />
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 TripMind AI. Powered by Gemini & Google Maps.</p>
      </footer>
    </div>
  );
}

export default App;
