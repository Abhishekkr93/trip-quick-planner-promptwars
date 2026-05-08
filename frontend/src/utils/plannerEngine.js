// Procedural itinerary generation logic
export const generateItinerary = (formData) => {
  const { destination, days, budget, style, constraint } = formData;
  const numDays = parseInt(days, 10) || 1;

  const itinerary = [];
  let dailyBudget = Math.floor(budget / numDays);

  const activities = getActivitiesForStyle(style, constraint);
  const meals = getMeals(constraint);

  for (let i = 1; i <= numDays; i++) {
    itinerary.push({
      day: i,
      title: `Day ${i}: ${destination} Exploration`,
      activities: [
        { time: "09:00 AM", description: activities.morning[i % activities.morning.length] },
        { time: "01:00 PM", description: meals.lunch[i % meals.lunch.length] },
        { time: "03:00 PM", description: activities.afternoon[i % activities.afternoon.length] },
        { time: "07:30 PM", description: meals.dinner[i % meals.dinner.length] },
      ],
      estimatedCost: Math.floor(dailyBudget * 0.8), // 80% of daily budget spent
    });
  }

  return {
    itinerary,
    summary: {
      destination,
      days: numDays,
      totalBudget: budget,
      style,
      constraint,
    },
    budgetSplit: {
      accommodation: Math.floor(budget * 0.35),
      food: Math.floor(budget * 0.3),
      activities: Math.floor(budget * 0.2),
      transport: Math.floor(budget * 0.15),
    },
    safetyTips: getSafetyTips(constraint),
    adjustmentNote: getAdjustmentNote(constraint),
    mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`,
  };
};

function getActivitiesForStyle(style, constraint) {
  const base = {
    morning: ["City walking tour", "Visit local museum", "Historic monument visit", "Local market exploration"],
    afternoon: ["Park stroll", "Sightseeing", "Shopping district", "Relaxing at a cafe"],
  };

  if (style === "Budget") {
    base.morning = ["Free walking tour", "Public park visit", "Self-guided neighborhood tour"];
    base.afternoon = ["Window shopping", "Street art hunting", "Sunset viewing at a public spot"];
  } else if (style === "Family") {
    base.morning = ["Zoo or Aquarium visit", "Interactive science museum", "Family-friendly park"];
    base.afternoon = ["Amusement park", "Picnic", "Kid-friendly show or movie"];
  } else if (style === "Adventure") {
    base.morning = ["Hiking trail", "Mountain biking", "Surfing lesson", "Ziplining"];
    base.afternoon = ["Rock climbing", "Kayaking", "Bungee jumping", "Off-road tour"];
  } else if (style === "Luxury") {
    base.morning = ["Private guided tour", "Spa treatment", "Helicopter sightseeing"];
    base.afternoon = ["Yacht sailing", "Exclusive boutique shopping", "Wine tasting"];
  }

  if (constraint === "Rain") {
    base.morning = ["Indoor museum", "Art gallery", "Cooking class"];
    base.afternoon = ["Indoor mall", "Theatre show", "Spa day"];
  } else if (constraint === "Elderly Friendly") {
    base.morning = ["Scenic bus tour", "Accessible museum", "Easy park walk"];
    base.afternoon = ["Afternoon tea", "Cultural show", "Relaxed boat cruise"];
  } else if (constraint === "Limited Time") {
    base.morning = ["Express city highlights tour", "Main attraction fast-track"];
    base.afternoon = ["Quick souvenir shopping", "Hop-on hop-off bus"];
  }

  return base;
}

function getMeals(constraint) {
  const meals = {
    lunch: ["Local bistro", "Street food market", "Cafe sandwich", "Traditional restaurant"],
    dinner: ["Fine dining", "Authentic local cuisine", "Seafood restaurant", "Casual pub"],
  };

  if (constraint === "Vegetarian") {
    meals.lunch = ["Vegan cafe", "Plant-based bowl", "Vegetarian street food", "Salad bar"];
    meals.dinner = ["Upscale vegetarian dining", "Indian cuisine", "Vegan pizza", "Plant-based tasting menu"];
  }

  return meals;
}

function getSafetyTips(constraint) {
  const tips = [
    "Keep your belongings secure in crowded areas.",
    "Stay hydrated and carry a water bottle.",
    "Share your itinerary with a friend or family member.",
  ];

  if (constraint === "Elderly Friendly") {
    tips.push("Ensure comfortable footwear and pace yourself.");
    tips.push("Carry a list of emergency contacts and necessary medications.");
  }

  return tips;
}

function getAdjustmentNote(constraint) {
  switch (constraint) {
    case "Rain":
      return "Due to rain, outdoor activities have been replaced with indoor alternatives.";
    case "Elderly Friendly":
      return "Pace has been relaxed and accessibility prioritized for comfort.";
    case "Vegetarian":
      return "All dining recommendations focus on high-quality vegetarian and vegan options.";
    case "Limited Time":
      return "Itinerary condensed to cover main highlights efficiently.";
    default:
      return "Standard itinerary optimized for your selected travel style.";
  }
}
