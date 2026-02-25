/**
 * 1. بيانات السلايدر
 */
const slidesData = [
    {
        img: "assets/hero-flowers.jpg",
        title: "Flowers That Tell Stories",
        subtitle: "Discover our exquisite collection of hand-arranged bouquets, crafted to bring beauty and joy to every occasion.",
        cta1: "SHOP NOW",
        cta2: "VIEW COLLECTION"
    },
    {
        img: "assets/hero-flowers2.jpg",
        title: "Fresh From The Farm",
        subtitle: "Handpicked flowers delivered with love & care every day.",
        cta1: "SHOP NOW",
        cta2: "VIEW COLLECTION"
    },
    {
        img: "assets/hero-flowers-3.jpg",
        title: "Make Someone Smile",
        subtitle: "Beautiful flowers, beautiful memories for every moment.",
        cta1: "SHOP NOW",
        cta2: "VIEW COLLECTION"
    }
];

/**
 * 
 */
const flowers = [
    { id: 1, name: "Luxury White Roses", price: 120, category: "Wedding", color: "white", img: "assets/cat-wedding.jpg", rating: 4.9, reviews: 120 },
    { id: 2, name: "Bridal Peony Bouquet", price: 150, oldPrice: 180, category: "Wedding", color: "pink", img: "assets/cat-sympathy.jpg", rating: 5.0, reviews: 85 },
    { id: 3, name: "Elegant Orchid Centerpiece", price: 95, category: "Wedding", color: "white", img: "assets/cat-wedding.jpg", rating: 4.8, reviews: 45 },
    { id: 4, name: "Teddy & Red Roses", price: 85, category: "Gifts", color: "red", img: "assets/product-gift-box.jpg", rating: 4.7, reviews: 200 },
    { id: 5, name: "Chocolate & Tulips", price: 70, category: "Gifts", color: "pink", img: "assets/cat-romance.jpg", rating: 4.6, reviews: 150 },
    { id: 6, name: "Luxury Gift Box", price: 110, oldPrice: 130, category: "Gifts", color: "white", img: "assets/product-carnations.jpg", rating: 4.9, reviews: 310 },
    { id: 7, name: "Colorful Birthday Mix", price: 55, category: "Birthday", color: "yellow", img: "assets/cat-birthday.jpg", rating: 4.5, reviews: 90 },
    { id: 8, name: "Pink Lilies & Balloons", price: 65, category: "Birthday", color: "pink", img: "assets/product-hydrangea.jpg", rating: 4.8, reviews: 110 },
    { id: 9, name: "Sunshine Gerbaras", price: 45, category: "Birthday", color: "yellow", img: "assets/product-lilies.jpg", rating: 4.7, reviews: 75 },
    { id: 10, name: "Classic Red Roses", price: 49, oldPrice: 65, category: "Roses", color: "red", img: "assets/product-roses.jpg", rating: 4.8, reviews: 124 },
    { id: 11, name: "White Lily Elegance", price: 55, category: "Lilies", color: "white", img: "assets/product-lilies.jpg", rating: 4.7, reviews: 89 },
    { id: 12, name: "Sunny Sunflower Bunch", price: 39, category: "Sunflowers", color: "yellow", img: "assets/product-sunflowers.jpg", rating: 4.6, reviews: 67 },
    { id: 13, name: "Purple Tulip Delight", price: 42, oldPrice: 55, category: "Tulips", color: "purple", img: "assets/product-tulips.jpg", rating: 4.9, reviews: 156 },
    { id: 14, name: "White Orchid Plant", price: 75, category: "Orchids", color: "white", img: "assets/product-orchids.jpg", rating: 4.8, reviews: 42 },
    { id: 15, name: "Blush Peony Bundle", price: 68, oldPrice: 85, category: "Peonies", color: "pink", img: "assets/product-peonies.jpg", rating: 4.9, reviews: 98 },
    { id: 16, name: "Wildflower Meadow", price: 35, category: "Daisies", color: "yellow", img: "assets/product-wildflowers.jpg", rating: 4.5, reviews: 55 }
];

const showToast = (msg) => {
    let toast = document.getElementById("toast");
    if(!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = "show";
    setTimeout(() => { toast.className = ""; }, 3000);
};

const updateCartBadge = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = totalItems;
};

const addToCartDirectly = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = flowers.find(f => f.id === id);
    
    if (!product) return;

    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`${product.name} added to Cart! 🌷`);
};


const goToDetails = (id) => {
    const selectedProduct = flowers.find(f => f.id === id);
    if (selectedProduct) {
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'product_Details.html';
        }, 500);
    }
};


const initSlider = () => {
    const slidesContainer = document.querySelector(".slides");
    if (!slidesContainer) return;

    slidesContainer.innerHTML = slidesData.map((slide, index) => `
        <div class="slide ${index === 0 ? "active" : ""}" style="background-image: url('${slide.img}');">
            <div class="slide-overlay">
                <div class="slide-content">
                    <span class="tag">HANDCRAFTED WITH LOVE</span>
                    <h1>${slide.title}</h1>
                    <p>${slide.subtitle}</p>
                    <div class="cta-buttons">
                        <button class="btn-primary">${slide.cta1}</button>
                        <button class="btn-outline">${slide.cta2}</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 4000);
    }
};


const displayFlowers = (data) => {
    const container = document.getElementById("flower-container");
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 50px;">No flowers found matching your criteria.</p>`;
        return;
    }

    container.innerHTML = data.map(flower => `
        <div class="card animate-on-scroll" onclick="goToDetails(${flower.id})" style="cursor:pointer">
            <div class="img-container">
                <img src="${flower.img}" alt="${flower.name}">
                ${flower.oldPrice ? `<span class="sale-tag" style="position: absolute; top: 10px; right: 10px; background: #d05673; color: white; padding: 3px 8px; font-size: 12px; border-radius: 2px;">SALE</span>` : ''}
            </div>
            <div class="card-details">
                <span class="category-tag">${flower.category.toUpperCase()}</span>
                <h3>${flower.name}</h3>
                <div class="rating">
                    <span class="stars">★</span> ${flower.rating} <span class="reviews">(${flower.reviews})</span>
                </div>
                <p>
                    <span class="price">$${flower.price}</span>
                    ${flower.oldPrice ? `<span class="old-price">$${flower.oldPrice}</span>` : ""}
                </p>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCartDirectly(${flower.id})">ADD TO CART</button>
            </div>
        </div>
    `).join("");

    handleScrollAnimation();
};

const filterData = () => {
    const activeCat = document.querySelector(".category-item.active")?.dataset.value || "All";
    const searchQuery = document.getElementById("searchInput")?.value.toLowerCase() || "";
    const maxPrice = parseInt(document.getElementById("priceFilter")?.value || 200);
    const selectedColor = document.getElementById("colorFilter")?.value || "all";

    const filtered = flowers.filter(f => {
        const matchesCategory = (activeCat === "All" || f.category === activeCat);
        const matchesSearch = f.name.toLowerCase().includes(searchQuery);
        const matchesPrice = f.price <= maxPrice;
        const matchesColor = (selectedColor === "all" || f.color === selectedColor);
        return matchesCategory && matchesSearch && matchesPrice && matchesColor;
    });

    displayFlowers(filtered);
    const priceLabel = document.getElementById("priceLabel");
    if (priceLabel) priceLabel.textContent = maxPrice;
};


const initCategoryFilters = () => {
    const categoriesList = ["All", "Wedding", "Birthday", "Gifts", "Roses", "Lilies", "Sunflowers", "Tulips"];
    const list = document.getElementById("category-list");
    if (!list) return;

    list.innerHTML = categoriesList.map((cat, index) => `
        <li class="category-item ${index === 0 ? 'active' : ''}" data-value="${cat}">
            ${cat}
            <span class="count">${cat === 'All' ? flowers.length : flowers.filter(f => f.category === cat).length}</span>
        </li>
    `).join("");

    list.addEventListener("click", (e) => {
        const item = e.target.closest(".category-item");
        if (!item) return;
        document.querySelectorAll(".category-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        filterData();
    });
};


const handleScrollAnimation = () => {
    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 50) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
};

const handleUserAuth = () => {
    const userNameElement = document.getElementById("user-name");
    const logoutBtn = document.getElementById("logout-btn");
    
    const storedUser = localStorage.getItem("userAccount");
    
    if (storedUser && userNameElement) {
        const user = JSON.parse(storedUser);
        userNameElement.textContent = user.username;
    }

    if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("userAccount"); 
        sessionStorage.clear(); 
        
        window.location.href = "login.html";
    });
}
};


window.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initCategoryFilters();
    displayFlowers(flowers);
    handleUserAuth();
    updateCartBadge();

    document.getElementById("priceFilter")?.addEventListener("input", filterData);
    document.getElementById("colorFilter")?.addEventListener("change", filterData);
    document.getElementById("searchInput")?.addEventListener("input", filterData);

    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.cursor = "pointer";
        cartIcon.onclick = () => window.location.href = 'cart.html';
    }

    const scrollBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
        if (scrollBtn) scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
        handleScrollAnimation();
    });

    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        });
    }
});