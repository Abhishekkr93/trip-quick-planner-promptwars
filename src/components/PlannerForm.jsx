import React, { useState } from 'react';
import { MapPin, CalendarDays, Wallet, Compass, AlertCircle, Sparkles } from 'lucide-react';

const PlannerForm = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    budget: 1000,
    style: 'Adventure',
    constraint: 'None'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.destination.trim() === '') return;
    onGenerate(formData);
  };

  return (
    <div className="form-card glass-panel">
      <div className="form-header">
        <h2>Plan Your Next Journey</h2>
        <p>Enter your details and let our engine craft the perfect itinerary.</p>
      </div>

      <form onSubmit={handleSubmit} className="planner-form">
        <div className="form-group">
          <label htmlFor="destination">
            <MapPin size={18} /> Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="e.g. Kyoto, Japan"
            value={formData.destination}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="days">
              <CalendarDays size={18} /> Number of Days
            </label>
            <input
              type="number"
              id="days"
              name="days"
              min="1"
              max="30"
              value={formData.days}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="budget">
              <Wallet size={18} /> Total Budget ($)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              min="100"
              step="100"
              value={formData.budget}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="style">
              <Compass size={18} /> Travel Style
            </label>
            <div className="select-wrapper">
              <select
                id="style"
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Budget">Budget</option>
                <option value="Family">Family</option>
                <option value="Adventure">Adventure</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="constraint">
              <AlertCircle size={18} /> Special Constraint
            </label>
            <div className="select-wrapper">
              <select
                id="constraint"
                name="constraint"
                value={formData.constraint}
                onChange={handleChange}
                className="form-input"
              >
                <option value="None">None</option>
                <option value="Rain">Rain Expected</option>
                <option value="Elderly Friendly">Elderly Friendly</option>
                <option value="Vegetarian">Vegetarian Options</option>
                <option value="Limited Time">Limited Time</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading || !formData.destination.trim()}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            <>
              <Sparkles size={20} /> Generate Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PlannerForm;
