const meals = [
  {
    restaurant: "Taco Bell",
    person: "Dylan",
    mealName: "Dylan's Taco Bell Order",
    items: [
      "Luxe Cravings Box",
      "Chips + Nacho Cheese Sauce",
      "Hot Sauce Packets (4)"
    ],
    image: "images/tb-dylan.jpg",
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
      "Doritos Locos Tacos Supreme (no shredded cheese, no sour cream)"
    ],
    image: "images/tb-audrey.jpg",
    orderUrl: "https://www.tacobell.com/food/deals-and-combos/large-nacho-fries"
  },
  {
    restaurant: "McDonald's",
    person: "Dylan",
    mealName: "Dylan's McDonald's Breakfast",
    items: [
      "2 Sausage Egg Cheese McMuffins",
      "Extra Toasted Muffins"
    ],
    image: "images/mc-dylan-breakfast.jpg",
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
    image: "images/mc-dylan-lunch.jpg",
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
    image: "images/mc-audrey-breakfast.jpg",
    orderUrl: "https://www.mcdonalds.com/us/en-us/meal/sausage-mcmuffin-with-egg-meal.html"
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
    image: "images/mc-audrey-lunch.jpg",
    orderUrl: "https://www.mcdonalds.com/us/en-us/product/chicken-mcnuggets-10-piece.html"
  },
  {
    restaurant: "Dutch Bros",
    person: "Dylan",
    mealName: "Dylan's Dutch Bros Order",
    items: [
      "Tiger's Blood Rebel (Large, Iced)"
    ],
    image: "images/db-dylan.jpg",
    orderUrl: "https://www.dutchbros.com/menu/rebel-energy-drink/tigers-blood-rebel/"
  },
  {
    restaurant: "Dutch Bros",
    person: "Audrey",
    mealName: "Audrey's Dutch Bros Order",
    items: [
      "Stoplight Rebel (Large, Iced, Extra Sweet)"
    ],
    image: "images/db-audrey.jpg",
    orderUrl: "https://www.dutchbros.com/menu/rebel-energy-drink/stoplight-rebel/"
  },
  {
    restaurant: "Postino's",
    person: "Dylan",
    mealName: "Dylan's Postino's Order",
    items: [
      "Bruschetta Board Pick 4:",
      "• Fig Apple Brie",
      "• Prosciutto Fig",
      "• Salami Pesto",
      "• Pepper Jam"
    ],
    image: "images/postinos-dylan.jpg",
    orderUrl: "https://www.postino.com/menu?jumpTo=section-56uSwOUhwcvkQgoWIEQiTa"
  },
  {
    restaurant: "Postino's",
    person: "Audrey",
    mealName: "Audrey's Postino's Order",
    items: [
      "Bruschetta Board Pick 4:",
      "• 2x Salami Pesto",
      "• 2x Buratta Bacon (no buratta)",
      "9 Iron Sandwich (sub chicken for ham, no dijonase, chips for side)"
    ],
    image: "images/postinos-audrey-1.jpg",
    orderUrl: "https://www.postino.com/menu?jumpTo=section-56uSwOUhwcvkQgoWIEQiTa"
  },
  {
    restaurant: "Jimmy John's",
    person: "Dylan",
    mealName: "Dylan's Jimmy John's Order",
    items: [
      "Jimmy Cubano",
      "Add Jimmy Hot Peppers"
    ],
    image: "images/jj-dylan.jpg",
    orderUrl: "https://www.jimmyjohns.com/menu/favorites-sandwiches/jimmy-cubano"
  },
  {
    restaurant: "Jimmy John's",
    person: "Audrey",
    mealName: "Audrey's Jimmy John's Order",
    items: [
      "Italian Night Club",
      "Extra Toasty Please!!"
    ],
    image: "images/jj-audrey.jpg",
    orderUrl: "https://www.jimmyjohns.com/menu/favorites-sandwiches/italian-night-club"
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
            <div class="order-card" onclick="document.getElementById('btn-${meal.mealName.replace(/[\\s']/g, '')}').click()">
              <div class="meal-image-container">
                <img class="meal-image" src="${meal.image}" alt="${meal.mealName}" loading="lazy">
              </div>
              <div class="card-content">
                <div class="meal-title">${meal.mealName}</div>
                <ul class="items-list">
                  ${meal.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
                <button id="btn-${meal.mealName.replace(/[\\s']/g, '')}" class="order-btn" onclick="event.stopPropagation(); window.open('${meal.orderUrl}', '_blank')">
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
