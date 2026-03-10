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
    image: "images/tb-dylan.png",
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
    image: "images/tb-audrey-v2.png",
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
    image: "images/mc-dylan-breakfast.png",
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
    image: "images/mc-dylan-lunch.png",
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
    image: "images/mc-audrey-breakfast.png",
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
    image: "images/mc-audrey-lunch.png",
    orderUrl: "https://www.mcdonalds.com/us/en-us/product/chicken-mcnuggets-10-piece.html"
  },
  {
    restaurant: "Dutch Bros",
    person: "Dylan",
    mealName: "Dylan's Dutch Bros Order",
    items: [
      "Tiger's Blood Rebel (Large, Iced)"
    ],
    image: "images/db-dylan.png",
    orderUrl: "https://www.dutchbros.com/menu/rebel-energy-drink/tigers-blood-rebel/"
  },
  {
    restaurant: "Dutch Bros",
    person: "Audrey",
    mealName: "Audrey's Dutch Bros Order",
    items: [
      "Stoplight Rebel (Large, Iced, Extra Sweet)"
    ],
    image: "images/db-audrey.png",
    orderUrl: "https://www.dutchbros.com/menu/rebel-energy-drink/stoplight-rebel/"
  },
  {
    restaurant: "Postino's",
    person: "Dylan",
    mealName: "Dylan's Postino's Order",
    items: [
      "Bruschetta Board Pick 4:",
      "Fig Apple Brie",
      "Prosciutto Fig",
      "Salami Pesto",
      "Pepper Jam"
    ],
    image: "images/postinos-dylan.png",
    orderUrl: "https://www.postino.com/menu?jumpTo=section-56uSwOUhwcvkQgoWIEQiTa"
  },
  {
    restaurant: "Postino's",
    person: "Audrey",
    mealName: "Audrey's Postino's Order",
    items: [
      "Bruschetta Board Pick 4:",
      "2x Salami Pesto",
      "2x Buratta Bacon (no buratta)",
      "9 Iron Sandwich (sub chicken for ham, no dijonase, chips for side)"
    ],
    image: "images/postinos-audrey-1.png",
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
    image: "images/jj-dylan.png",
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
    image: "images/jj-audrey.png",
    orderUrl: "https://www.jimmyjohns.com/menu/favorites-sandwiches/italian-night-club"
  }
];

let activePerson = localStorage.getItem('activePerson') || "Dylan";

// Order history management
function getOrderHistory() {
  const history = localStorage.getItem('orderHistory');
  return history ? JSON.parse(history) : [];
}

function addToOrderHistory(mealName, restaurant, person) {
  const history = getOrderHistory();
  const newOrder = {
    mealName,
    restaurant,
    person,
    timestamp: Date.now()
  };
  
  // Add to beginning of array
  history.unshift(newOrder);
  
  // Keep only last 50 orders
  const trimmed = history.slice(0, 50);
  localStorage.setItem('orderHistory', JSON.stringify(trimmed));
}

function getRecentOrders(person, limit = 3) {
  return getOrderHistory()
    .filter(order => order.person === person)
    .slice(0, limit);
}

function getOrderCount(mealName, person) {
  return getOrderHistory()
    .filter(order => order.mealName === mealName && order.person === person)
    .length;
}

function formatTimeSince(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}

function setActivePerson(person) {
  activePerson = person;
  localStorage.setItem('activePerson', person);
  renderApp();
}

function handleOrder(meal) {
  addToOrderHistory(meal.mealName, meal.restaurant, meal.person);
  
  // Create ripple effect
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  document.body.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 1000);
  
  // Show toast notification
  showToast(`Ordering ${meal.mealName}! 🎉`);
  
  // Open order URL
  window.open(meal.orderUrl, '_blank');
  
  // Re-render to update counts
  renderApp();
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function clearHistory() {
  if (confirm('Clear all order history?')) {
    localStorage.setItem('orderHistory', JSON.stringify([]));
    showToast('Order history cleared! 🗑️');
    renderApp();
  }
}

function renderApp() {
  const app = document.getElementById('app');
  const filteredMeals = meals.filter(m => m.person === activePerson);
  const recentOrders = getRecentOrders(activePerson, 3);
  const grouped = {};
  
  filteredMeals.forEach(meal => {
    if (!grouped[meal.restaurant]) grouped[meal.restaurant] = [];
    grouped[meal.restaurant].push(meal);
  });
  
  // Build quick reorder section
  const quickReorderSection = recentOrders.length > 0 ? `
    <div class="quick-reorder-section">
      <div class="section-header">
        <h2 class="section-title">⚡ Quick Reorder</h2>
        <button class="clear-history-btn" onclick="clearHistory()">Clear History</button>
      </div>
      <div class="quick-reorder-grid">
        ${recentOrders.map(order => {
          const meal = meals.find(m => m.mealName === order.mealName && m.person === order.person);
          if (!meal) return '';
          const count = getOrderCount(meal.mealName, meal.person);
          return `
            <div class="quick-reorder-card" onclick="handleOrder(${JSON.stringify(meal).replace(/"/g, '&quot;')})">
              <div class="quick-meal-image-container">
                <img class="quick-meal-image" src="${meal.image}" alt="${meal.mealName}" loading="lazy">
                ${count > 1 ? `<div class="order-badge">${count}×</div>` : ''}
              </div>
              <div class="quick-card-content">
                <div class="quick-meal-name">${meal.mealName}</div>
                <div class="quick-restaurant">${meal.restaurant}</div>
                <div class="quick-time">${formatTimeSince(order.timestamp)}</div>
              </div>
            </div>
          `;
        }).filter(Boolean).join('')}
      </div>
    </div>
  ` : '';
  
  app.innerHTML = `
    <div class="header">
      <div class="logo-container">
        <img src="logo-full-transparent.png" alt="Menyum" class="logo-full">
      </div>
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
    
    ${quickReorderSection}
    
    ${Object.entries(grouped).map(([restaurant, meals]) => `
      <div class="restaurant-section">
        <div class="restaurant-header">
          <div class="restaurant-name">${restaurant}</div>
        </div>
        <div class="orders-grid">
          ${meals.map(meal => {
            const count = getOrderCount(meal.mealName, meal.person);
            return `
              <div class="order-card" onclick="handleOrder(${JSON.stringify(meal).replace(/"/g, '&quot;')})">
                ${count > 0 ? `<div class="order-count-badge">${count}</div>` : ''}
                <div class="meal-image-container">
                  <img class="meal-image" src="${meal.image}" alt="${meal.mealName}" loading="lazy">
                </div>
                <div class="card-content">
                  <div class="meal-title">${meal.mealName}</div>
                  <ul class="items-list">
                    ${meal.items.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                  <button class="order-btn">
                    Order Now →
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('')}
  `;
  
  // Add 3D tilt effect to food images only
  document.querySelectorAll('.meal-image, .quick-meal-image').forEach(img => {
    const container = img.closest('.meal-image-container, .quick-meal-image-container');
    const isBigImage = img.classList.contains('meal-image');
    
    // Big images (main meal cards): extremely subtle tilt
    // Small images (quick reorder cards): moderately subtle tilt
    const divisor = isBigImage ? 100 : 25;
    
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / divisor;
      const rotateY = (centerX - x) / divisor;
      
      img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
    });
    
    container.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });
}

// Initialize
renderApp();

// Create floating particles
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    particlesContainer.appendChild(particle);
  }
}

createParticles();
