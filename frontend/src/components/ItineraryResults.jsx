import React from 'react';
import { 
  Map, 
  DollarSign, 
  ShieldCheck, 
  Info, 
  Clock, 
  Bed, 
  Utensils, 
  Activity, 
  Car,
  CloudRain,
  Brain,
  Star,
  ExternalLink
} from 'lucide-react';

const ItineraryResults = ({ results }) => {
  if (!results) return null;

  const { summary, itinerary, budgetSplit, safetyTips, weatherAdvice, smartReasoning, nearbyPlaces } = results;

  return (
    <div className="results-container slide-up">
      
      {/* Header Overview */}
      <section className="summary-card glass-panel">
        <div className="summary-header">
          <h2>Exploration Plan: {summary.destination}</h2>
          <div className="badges">
            <span className="badge">{summary.style}</span>
            <span className="badge">{summary.travelerType}</span>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <Clock className="stat-icon" />
            <div>
              <span className="stat-label">Duration</span>
              <span className="stat-value">{summary.days} Days</span>
            </div>
          </div>
          <div className="stat-card">
            <DollarSign className="stat-icon" />
            <div>
              <span className="stat-label">Budget</span>
              <span className="stat-value">${summary.totalBudget}</span>
            </div>
          </div>
          <div className="stat-card">
            <Utensils className="stat-icon" />
            <div>
              <span className="stat-label">Diet</span>
              <span className="stat-value">{summary.foodPreference}</span>
            </div>
          </div>
        </div>

        <div className="ai-insight">
          <Brain size={20} className="ai-icon" />
          <div>
            <h4>AI Intelligence Insight</h4>
            <p>{smartReasoning}</p>
          </div>
        </div>
      </section>

      <div className="main-grid">
        {/* Itinerary Column */}
        <section className="itinerary-column">
          <h3>Daily Schedule</h3>
          <div className="timeline">
            {itinerary.map((day) => (
              <div key={day.day} className="day-card glass-panel">
                <div className="day-label">Day {day.day}</div>
                <h4>{day.title}</h4>
                <ul className="activity-list">
                  {day.activities.map((act, idx) => (
                    <li key={idx} className="activity-item">
                      <span className="time">{act.time}</span>
                      <div className="activity-details">
                        <span className="desc">{act.description}</span>
                        {act.cost > 0 && <span className="cost">Est. ${act.cost}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="day-total">
                  <span>Day Estimate:</span>
                  <span>${day.estimatedCost}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar Column */}
        <aside className="sidebar-column">
          
          {/* Weather Advice */}
          <div className="side-card glass-panel">
            <h3><CloudRain size={20} /> Weather Advisory</h3>
            <p>{weatherAdvice}</p>
          </div>

          {/* Budget Breakdown */}
          <div className="side-card glass-panel">
            <h3>Budget Breakdown</h3>
            <div className="budget-bar-list">
              {Object.entries(budgetSplit).map(([key, val]) => (
                <div key={key} className="budget-bar-item">
                  <div className="bar-label">
                    <span className="capitalize">{key}</span>
                    <span>${val}</span>
                  </div>
                  <div className="bar-bg">
                    <div 
                      className={`bar-fill ${key}`} 
                      style={{ width: `${(val / summary.totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Attractions (Google Places) */}
          {nearbyPlaces && nearbyPlaces.length > 0 && (
            <div className="side-card glass-panel">
              <h3>Top Attractions</h3>
              <div className="places-list">
                {nearbyPlaces.map((place, idx) => (
                  <div key={idx} className="place-item">
                    <div className="place-info">
                      <strong>{place.name}</strong>
                      <div className="rating">
                        <Star size={12} fill="currentColor" /> {place.rating}
                      </div>
                    </div>
                    <a href={place.mapLink} target="_blank" rel="noopener noreferrer" className="icon-link">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety & Tips */}
          <div className="side-card safety glass-panel">
            <h3><ShieldCheck size={20} /> Pro Tips</h3>
            <ul>
              {safetyTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
          
        </aside>
      </div>
    </div>
  );
};

export default ItineraryResults;
