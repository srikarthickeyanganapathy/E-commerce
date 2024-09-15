// Sample product data
const products = [
    { 
        id: 1, 
        name: "Robotics Kit A", 
        price: 49.99, 
        image: "https://5.imimg.com/data5/SELLER/Default/2023/4/300739967/FE/BS/HT/9425936/robotics-pro-kit-12-years-200-models-mechanical-design-coding-autonomous-robotics-atl-kit.webp", 
        description: "Beginner robotics kit with motors, sensors, and microcontroller. Perfect for those just starting in robotics, this kit provides basic building blocks to learn about mechanical designs and simple coding logic. Ideal for students aged 12 and up, offering a hands-on introduction to robotics." 
    },
    { 
        id: 2, 
        name: "Robotics Kit B", 
        price: 79.99, 
        image: "https://m.media-amazon.com/images/I/81ox8+qICPL._SX522_.jpg", 
        description: "Intermediate robotics kit with additional modules and wireless control. Includes advanced sensors, Bluetooth connectivity, and extra components for building more complex robots. Designed for hobbyists looking to enhance their skills with remote operation and more customizable builds." 
    },
    { 
        id: 3, 
        name: "Robotics Kit C", 
        price: 99.99, 
        image: "https://m.media-amazon.com/images/I/81ox8+qICPL.jpg", 
        description: "Advanced robotics kit with AI integration for autonomous functions. Equipped with machine learning capabilities, this kit allows you to create robots that can make decisions based on their environment. Perfect for seasoned builders interested in exploring artificial intelligence and automation." 
    },
    { 
        id: 4, 
        name: "Servo Motor", 
        price: 15.99, 
        image: "https://8z1xg04k.tinifycdn.com/images/integrated_serv_motor_1_prod.jpg?resize.method=fit&resize.width=675&resize.height=450", 
        description: "High precision servo motor for smooth and accurate movement. Capable of handling precise rotational motions, this motor is ideal for robotic arms, camera gimbals, and other applications requiring high accuracy and control. Offers easy integration with most microcontroller platforms." 
    },
    { 
        id: 5, 
        name: "Arduino Uno", 
        price: 22.99, 
        image: "https://store.arduino.cc/cdn/shop/products/A000066_03.front_934x700.jpg?v=1629815860", 
        description: "Popular microcontroller board for robotics and IoT projects. With a rich ecosystem of libraries and a huge community, the Arduino Uno makes it easy to get started with programming, sensor integration, and DIY robotics projects. Perfect for beginners and professionals alike." 
    },
    { 
        id: 6, 
        name: "Raspberry Pi 4", 
        price: 59.99, 
        image: "https://m.media-amazon.com/images/I/61mRJm8+c4L._AC_UF1000,1000_QL80_.jpg", 
        description: "Raspberry Pi 4 Model B with 4GB RAM for advanced computing needs. This powerful, versatile computer is great for building smart home devices, robotics applications, and AI projects. Features dual 4K display support and Gigabit Ethernet for high-speed connectivity." 
    },
    { 
        id: 7, 
        name: "Ultrasonic Sensor", 
        price: 5.99, 
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20240422175447/Arduino---Ultrasonic-Sensor-2.webp", 
        description: "Ultrasonic distance sensor for obstacle detection in robotics. This sensor sends out ultrasonic waves and measures the time it takes for the waves to bounce back, providing accurate distance measurements. Perfect for creating obstacle-avoidance systems in robots." 
    },
    { 
        id: 8, 
        name: "Robot Arm Kit", 
        price: 149.99, 
        image: "https://5.imimg.com/data5/SC/OI/MY-6698362/robotic-arm-1000x1000.jpg", 
        description: "Programmable robot arm kit for building your own robotic arm. Includes multiple servos, grippers, and a microcontroller, allowing you to create a functional, articulated robotic arm. Ideal for robotics competitions, industrial prototypes, or hobby projects." 
    },
    { 
        id: 9, 
        name: "Stepper Motor", 
        price: 17.99, 
        image: "https://atlas-content-cdn.pixelsquid.com/stock-images/stepping-motor-AENkNXA-600.jpg", 
        description: "High torque stepper motor for precise movements in your robot. Great for CNC machines, 3D printers, and other projects requiring accurate step-based control. Provides smooth, consistent performance with fine movement adjustments and programmable stepping." 
    },
    { 
        id: 10, 
        name: "Lidar Sensor", 
        price: 299.99, 
        image: "https://cdn.moglix.com/p/XXIJPp2mrEQP7-xxlarge.jpg", 
        description: "Lidar sensor for high precision distance measurement and mapping. Using laser light to measure distances, this sensor is perfect for autonomous robots, drones, and other projects that need real-time environmental scanning and object detection. Offers precise and fast 3D mapping capabilities." 
    }
];

// Dynamically load products
function loadProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <div class="hover-description">${product.description}</div>
        `;
        productList.appendChild(productCard);
    });
}

// Display product recommendations
function displayRecommendations() {
    const recommendedSection = document.getElementById('recommended-products');
    recommendedSection.innerHTML = ''; // Clear current recommendations
    const cart = getCart();
    const recommendedProducts = products.filter(p => !cart.some(cartItem => cartItem.id === p.id)).slice(0, 3);
    
    recommendedProducts.forEach(product => {
        const recommendation = document.createElement('div');
        recommendation.classList.add('product-card');
        recommendation.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        recommendedSection.appendChild(recommendation);
    });
}

// Checkout function
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Proceeding to checkout with ${cart.length} items.`);
        localStorage.removeItem('cart');
        updateCart();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCart();
    displayRecommendations();
});

// Cart management
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    if (!cart.some(item => item.id === productId)) {
        cart.push(product);
        saveCart(cart);
        updateCart();  // Update cart on products page
        alert("Product added to cart!");
    } else {
        alert("This item is already in your cart.");
    }
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cart = getCart();
    if (cartCount) {
        cartCount.innerText = cart.length;  // Update cart count in navbar (products.html)
    }
    updateCartItems();  // Update cart items in cart.html
}

function updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';  // Clear the existing cart
        const cart = getCart();
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty!</p>';
        } else {
            cart.forEach((product, index) => {
                const item = document.createElement('div');
                item.classList.add('cart-item');
                item.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;
                cartItems.appendChild(item);
            });
        }
    }
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCart();  // Ensures the cart count is up-to-date on page load
    displayRecommendations();
});
