const meals = [
  {
    restaurant: "Taco Bell",
    person: "Dylan",
    mealName: "Dylan's Taco Bell Order",
    items: [
      "Nachos/Chips + Nacho Cheese Sauce",
      "Hot Sauce Packets (4)",
      "Luxe Cravings Box"
    ],
    image: "images/tb-luxe.jpg",
    orderUrl: "https://www.tacobell.com/food/deals-and-combos/build-your-own-luxe-cravings-box-1"
  },
  {
    restaurant: "Taco Bell",
    person: "Audrey",
    mealName: "Audrey's Taco Bell Order",
    items: [
      "Large Nacho Fries",
      "Nacho Cheese Sauce",
      "Mtn Dew Baja Blast",
      "Mild Sauce Packets (3)",
      "Nacho Cheese Doritos Locos Tacos Supreme"
    ],
    image: "images/tb-dlt.jpg",
    orderUrl: "https://www.tacobell.com/food/deals-and-combos/large-nacho-fries"
  },
  {
    restaurant: "McDonald's",
    person: "Dylan",
    mealName: "Dylan's McDonald's Breakfast",
    items: [
      "Sausage Egg McMuffin",
      "Extra Toasted Muffins",
      "2 Sausage Patties"
    ],
    image: "images/mc-mcmuffin.jpg",
    orderUrl: "https://www.mcdonalds.com/us/en-us/product/sausage-mcmuffin-with-egg.html"
  },
  {
    restaurant: "McDonald's",
    person: "Dylan",
    mealName: "Dylan's McDonald's Lunch",
    items: [
      "10pc Chicken McNuggets",
      "Large Fry",
      "Large Diet Coke"
    ],
    image: "images/mc-nuggets.jpg",
    orderUrl: "https://www.mcdonalds.com/us/en-us/product/chicken-mcnuggets-10-piece.html"
  },
  {
    restaurant: "McDonald's",
    person: "Audrey",
    mealName: "Audrey's McDonald's Breakfast",
    items: [
      "Sausage McMuffin (No Egg)",
      "Hashbrown",
      "Large Dr Pepper"
    ],
    image: "images/mc-sausage-mcmuffin.jpg",
    orderUrl: "https://www.mcdonalds.com/us/en-us/product/sausage-mcmuffin-with-egg-meal.html"
  },
  {
    restaurant: "McDonald's",
    person: "Audrey",
    mealName: "Audrey's McDonald's Lunch",
    items: [
      "10pc Chicken McNuggets",
      "Large Fry",
      "Large Dr Pepper"
    ],
    image: "images/mc-nuggets.jpg",
    orderUrl: "https://www.mcdonalds.com/us/en-us/product/chicken-mcnuggets-10-piece.html"
  }
];

let activePerson = "Dylan";

function setActivePerson(person) {
  activePerson = person;
  renderApp();
}

function renderApp() {
  const app = document.getElementById('app');
  const filteredMeals = meals.filter(m => m.person === activePerson);
  const grouped = {};
  
  filteredMeals.forEach(meal => {
    if (!grouped[meal.restaurant]) grouped[meal.restaurant] = [];
    grouped[meal.restaurant].push(meal);
  });
  
  app.innerHTML = `
    <div class="header">
      <div class="logo">Menyum</div>
      <div class="tagline">Your Favorite Orders, Always Ready</div>
      <div class="toggle-container">
        <button class="toggle-btn ${activePerson === 'Dylan' ? 'active' : ''}" onclick="setActivePerson('Dylan')">
          👨 Dylan
        </button>
        <button class="toggle-btn ${activePerson === 'Audrey' ? 'active' : ''}" onclick="setActivePerson('Audrey')">
          👩 Audrey
        </button>
      </div>
    </div>
    ${Object.entries(grouped).map(([restaurant, meals]) => `
      <div class="restaurant-section">
        <div class="restaurant-header">
          <div class="restaurant-name">${restaurant}</div>
        </div>
        <div class="orders-grid">
          ${meals.map(meal => `
            <div class="order-card" onclick="document.getElementById('btn-${meal.mealName.replace(/\s/g, '')}').click()">
              <div class="meal-image-container">
                <img class="meal-image" src="${meal.image}" alt="${meal.mealName}" loading="lazy">
              </div>
              <div class="card-content">
                <div class="meal-title">${meal.mealName}</div>
                <ul class="items-list">
                  ${meal.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <button id="btn-${meal.mealName.replace(/\s/g, '')}" class="order-btn" onclick="event.stopPropagation(); window.open('${meal.orderUrl}', '_blank')">
                  Order Now →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  `;
}

renderApp();
