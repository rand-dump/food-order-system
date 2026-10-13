const MENU_URL =
  "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

const menuContainer = document.getElementById("menu");
const orderButton = document.getElementById("orderBtn");
const orderStatus = document.getElementById("orderStatus");
const orderDetails = document.getElementById("orderDetails");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

let menuItems = [];

const foodImageUrls = {
  Cheeseburger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  Pizza: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
  Tacos: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=900&q=85",
  Sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85",
  Pasta: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
  "Fried Chicken": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
  "Grilled Cheese Sandwich": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85",
  Steak: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=900&q=85",
  "Caesar Salad": "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=85",
  "Fish and Chips": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  Ramen: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85",
  Burrito: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  Pho: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=900&q=85",
  "Pad Thai": "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=85",
  Gyro: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=85",
  "Ice Cream": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85",
  Smoothie: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=900&q=85",
  "Apple Pie": "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=900&q=85",
  "Chocolate Cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  Pancakes: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85",
  Cupcake: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85",
  Crepes: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=900&q=85",
  "Club Sandwich": "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=85",
  Falafel: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=85",
  Curry: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
};

function getFoodImage(item) {
  return foodImageUrls[item.name] || item.imgSrc;
}

function closeNavigation() {
  sidebar.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

sidebar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

// 1. Fetch the menu and display it.
async function getMenu() {
  try {
    const response = await fetch(MENU_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch menu");
    }

    const data = await response.json();

    menuContainer.replaceChildren();

    data.forEach((item) => {
      const card = document.createElement("article");
      card.className = "food-card";
      const imageUrl = getFoodImage(item);

      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = item.name;
      image.loading = "lazy";

      image.onerror = () => {
        image.onerror = null;
        image.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 500'%3E%3Crect width='900' height='500' fill='%2320242a'/%3E%3Ctext x='450' y='250' fill='%23aeb3b8' font-family='Arial' font-size='34' text-anchor='middle' dominant-baseline='middle'%3EImage unavailable%3C/text%3E%3C/svg%3E";
      };

      const imageLink = document.createElement("a");
      imageLink.className = "food-image-link";
      imageLink.href = imageUrl;
      imageLink.target = "_blank";
      imageLink.rel = "noopener noreferrer";
      imageLink.setAttribute("aria-label", `View ${item.name} photo`);
      imageLink.appendChild(image);

      const info = document.createElement("div");
      info.className = "food-info";

      const name = document.createElement("h3");
      name.textContent = item.name;

      const price = document.createElement("p");
      price.className = "price";
      price.textContent = `$${Number(item.price).toFixed(2)}`;

      info.append(name, price);
      const addButton = document.createElement("button");
      addButton.className = "add-button";
      addButton.type = "button";
      addButton.setAttribute("aria-label", `Add ${item.name} to order`);
      addButton.textContent = "+";
      addButton.addEventListener("click", () => {
        orderStatus.textContent = `${item.name} added to your order.`;
      });
      card.append(imageLink, info, addButton);
      menuContainer.appendChild(card);
    });

    menuItems = data;
    orderButton.disabled = false;

    return data;
  } catch (error) {
    menuContainer.textContent = "Unable to load menu. Please refresh.";
    orderButton.disabled = true;
    throw error;
  }
}

// 2. Select three random menu items after 2.5 seconds.
function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Shuffle a copy and select three different items.
      const shuffled = [...menuItems].sort(() => Math.random() - 0.5);

      const order = {
        burgers: shuffled.slice(0, 3),
      };

      resolve(order);
    }, 2500);
  });
}

// 3. Simulate order preparation after 1.5 seconds.
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        order_status: true,
        paid: false,
      });
    }, 1500);
  });
}

// 4. Simulate payment after 1 second.
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        order_status: true,
        paid: true,
      });
    }, 1000);
  });
}

// 5. Thank the customer after payment.
function thankyouFnc() {
  orderStatus.textContent =
    "Thank you for eating with us! Your payment was successful.";

  orderDetails.textContent = "";
  alert("Thank you for eating with us!");
}

// Run the complete order workflow sequentially.
async function placeOrder() {
  orderButton.disabled = true;
  orderStatus.textContent = "Taking your order...";
  orderDetails.textContent = "";

  try {
    const order = await TakeOrder();

    orderDetails.innerHTML = "<h3>Your selected items</h3>";

    const list = document.createElement("ul");

    order.burgers.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${Number(item.price).toFixed(2)}`;
      list.appendChild(li);
    });

    orderDetails.appendChild(list);

    orderStatus.textContent = "Preparing your order...";
    const preparation = await orderPrep();

    if (!preparation.order_status) {
      throw new Error("Order preparation failed");
    }

    orderStatus.textContent = "Order prepared. Processing payment...";
    const payment = await payOrder();

    if (payment.order_status && payment.paid) {
      thankyouFnc();
    }
  } catch (error) {
    console.error("Order error:", error);
    orderStatus.textContent = "Something went wrong. Please try again.";
  } finally {
    orderButton.disabled = false;
  }
}

// Load the menu first, then enable ordering.
orderButton.disabled = true;

getMenu().catch((error) => {
  console.error("Menu loading error:", error);
});

orderButton.addEventListener("click", placeOrder);
