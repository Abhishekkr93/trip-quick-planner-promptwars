import React, { useState } from 'react';
import { 
  MapPin, 
  CalendarDays, 
  Wallet, 
  Compass, 
  AlertCircle, 
  Sparkles, 
  Users, 
  UtensilsCrossed 
} from 'lucide-react';

const PlannerForm = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    budget: 1000,
    style: 'Adventure',
    travelerType: 'Solo',
    foodPreference: 'Any',
    constraints: ''
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
    <div className="form-card glass-panel slide-up">
      <div className="form-header">
        <h2>Trip Parameters</h2>
        <p>Tell us your preferences and we'll handle the rest.</p>
      </div>

      <form onSubmit={handleSubmit} className="planner-form">
        <div className="form-group full-width">
          <label htmlFor="destination">
            <MapPin size={18} /> Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="e.g. Kyoto, Japan or Swiss Alps"
            value={formData.destination}
            onChange={handleChange}
            required
            className="form-input"
            aria-label="Destination"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="days">
              <CalendarDays size={18} /> Days
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
              aria-label="Number of Days"
            />
          </div>

          <div className="form-group">
            <label htmlFor="budget">
              <Wallet size={18} /> Budget ($)
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
              aria-label="Total Budget"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="style">
              <Compass size={18} /> Style
            </label>
            <select
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="form-input"
              aria-label="Travel Style"
            >
              <option value="Budget">Budget</option>
              <option value="Standard">Standard</option>
              <option value="Adventure">Adventure</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="travelerType">
              <Users size={18} /> Travelers
            </label>
            <select
              id="travelerType"
              name="travelerType"
              value={formData.travelerType}
              onChange={handleChange}
              className="form-input"
              aria-label="Traveler Type"
            >
              <option value="Solo">Solo</option>
              <option value="Couple">Couple</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Elderly">Elderly / Seniors</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="foodPreference">
              <UtensilsCrossed size={18} /> Food
            </label>
            <select
              id="foodPreference"
              name="foodPreference"
              value={formData.foodPreference}
              onChange={handleChange}
              className="form-input"
              aria-label="Food Preference"
            >
              <option value="Any">Any Cuisine</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Halal">Halal</option>
              <option value="Local Only">Local Specialty</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="constraints">
              <AlertCircle size={18} /> Constraints
            </label>
            <input
              type="text"
              id="constraints"
              name="constraints"
              placeholder="e.g. avoid rain, wheelchair access"
              value={formData.constraints}
              onChange={handleChange}
              className="form-input"
              aria-label="Additional Constraints"
            />
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
              <Sparkles size={20} /> Generate AI Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PlannerForm;
