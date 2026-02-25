const handleUserAuth = () => {
    const userNameElement = document.getElementById("user-name");
    const logoutBtn = document.getElementById("logout-btn");
    const storedUser = localStorage.getItem("userAccount");

    if (storedUser && userNameElement) {
        const user = JSON.parse(storedUser);
        userNameElement.textContent = user.username; 
    }

    
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem("userAccount");
            sessionStorage.clear();
            window.location.href = "login.html";
        };
    }
};

const renderCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items-list');
    const cartContent = document.getElementById('cart-content');
    const emptyMsg = document.getElementById('empty-msg');
    let total = 0;

    if (cart.length === 0) {
        cartContent.classList.add('hidden');
        emptyMsg.style.display = 'block';
        return;
    } else {
        cartContent.classList.remove('hidden');
        emptyMsg.style.display = 'none';
    }

    cartItemsList.innerHTML = cart.map((item, index) => {
        const itemPrice = parseFloat(item.price) || 0;
        const qty = item.quantity || 1;
        const itemTotal = itemPrice * qty;
        total += itemTotal;

        return `
            <div class="cart-card">
                <img src="${item.img}" alt="${item.name}">
                <div class="card-info">
                    <div class="card-title-row">
                        <h3>${item.name}</h3>
                        <button class="remove-btn" onclick="removeItem(${index})" style="text-decoration:none; font-size:18px;">✕</button>
                    </div>
                    <p class="category">${item.category}</p>
                    <div class="card-footer">
                        <div class="quantity-controls">
                            <button onclick="updateQty(${index}, -1)">−</button>
                            <span>${qty}</span>
                            <button onclick="updateQty(${index}, 1)">+</button>
                        </div>
                        <span class="price">$${itemTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('subtotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('final-total').textContent = `$${total.toFixed(2)}`;
    updateCartBadge(); // لتحديث الرقم في الهيدر
};

// 2. دالة تحديث الكمية (+ و -)
const updateQty = (index, change) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity = (cart[index].quantity || 1) + change;
        
        // إذا وصلت الكمية لـ 0، يتم حذف المنتج
        if (cart[index].quantity < 1) {
            removeItem(index);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }
};


const removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

const updateCartBadge = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = count;
};

const processOrder = () => {
    document.body.style.opacity = '0';
    document.body.style.transition = '0.5s';
    setTimeout(() => {
        localStorage.removeItem('cart');
        window.location.href = 'ordershipped.html';
    }, 500);
};

window.onload = () => {
    handleUserAuth(); 
    renderCart();     
    updateCartBadge(); 
    const scrollBtn = document.getElementById("scrollToTopBtn");
    window.onscroll = () => {
        if (scrollBtn) scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    };
    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
};