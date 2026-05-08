import React from 'react';
import { 
  Map, 
  DollarSign, 
  ShieldCheck, 
  Info, 
  MapPin, 
  Clock, 
  Bed, 
  Utensils, 
  Activity, 
  Car 
} from 'lucide-react';

const ItineraryResults = ({ results }) => {
  if (!results) return null;

  const { itinerary, summary, budgetSplit, safetyTips, adjustmentNote, mapsLink } = results;

  return (
    <div className="results-container slide-up-anim">
      
      {/* Summary Header */}
      <div className="summary-card glass-panel">
        <div className="summary-header">
          <h2>Your Trip to {summary.destination}</h2>
          <span className="style-badge">{summary.style}</span>
        </div>
        
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Duration</span>
            <span className="stat-value">{summary.days} Days</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Budget</span>
            <span className="stat-value">${summary.totalBudget}</span>
          </div>
          {summary.constraint !== "None" && (
            <div className="stat-item constraint-highlight">
              <span className="stat-label">Constraint</span>
              <span className="stat-value">{summary.constraint}</span>
            </div>
          )}
        </div>

        {summary.constraint !== "None" && (
          <div className="adjustment-note">
            <Info size={18} className="info-icon" />
            <p>{adjustmentNote}</p>
          </div>
        )}

        <a 
          href={mapsLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="maps-button"
        >
          <Map size={18} /> Open in Google Maps
        </a>
      </div>

      <div className="results-grid">
        {/* Itinerary Section */}
        <div className="itinerary-section">
          <h3>Day-by-Day Itinerary</h3>
          <div className="timeline">
            {itinerary.map((day) => (
              <div key={day.day} className="timeline-item">
                <div className="timeline-marker">{day.day}</div>
                <div className="timeline-content glass-panel">
                  <h4>{day.title}</h4>
                  <ul className="activities-list">
                    {day.activities.map((act, idx) => (
                      <li key={idx} className="activity-item">
                        <span className="activity-time"><Clock size={14} /> {act.time}</span>
                        <span className="activity-desc">{act.description}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="day-cost">
                    <DollarSign size={14} /> Est. cost: ${day.estimatedCost}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="sidebar-section">
          
          {/* Budget Split */}
          <div className="budget-split-card glass-panel">
            <h3>Budget Breakdown</h3>
            <div className="budget-items">
              <div className="budget-item">
                <div className="budget-icon accom-icon"><Bed size={20} /></div>
                <div className="budget-details">
                  <span className="budget-cat">Accommodation</span>
                  <span className="budget-val">${budgetSplit.accommodation}</span>
                </div>
              </div>
              <div className="budget-item">
                <div className="budget-icon food-icon"><Utensils size={20} /></div>
                <div className="budget-details">
                  <span className="budget-cat">Food & Dining</span>
                  <span className="budget-val">${budgetSplit.food}</span>
                </div>
              </div>
              <div className="budget-item">
                <div className="budget-icon act-icon"><Activity size={20} /></div>
                <div className="budget-details">
                  <span className="budget-cat">Activities</span>
                  <span className="budget-val">${budgetSplit.activities}</span>
                </div>
              </div>
              <div className="budget-item">
                <div className="budget-icon trans-icon"><Car size={20} /></div>
                <div className="budget-details">
                  <span className="budget-cat">Transport</span>
                  <span className="budget-val">${budgetSplit.transport}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="safety-card glass-panel">
            <h3><ShieldCheck size={20} /> Safety & Tips</h3>
            <ul className="safety-list">
              {safetyTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ItineraryResults;
