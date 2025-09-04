// Ürün verileri
const products = [
    {
        id: 1,
        title: "iPhone 14 Pro Max 128GB",
        price: 45999,
        category: "elektronik",
        rating: 4.8,
        reviews: 1250,
        image: "📱",
        description: "Apple iPhone 14 Pro Max, A16 Bionic çip, Pro kamera sistemi ve Dynamic Island özelliği ile."
    },
    {
        id: 2,
        title: "Samsung Galaxy S23 Ultra",
        price: 42999,
        category: "elektronik",
        rating: 4.7,
        reviews: 980,
        image: "📱",
        description: "Samsung Galaxy S23 Ultra, 200MP kamera, S Pen desteği ve güçlü performans."
    },
    {
        id: 3,
        title: "Nike Air Max 270",
        price: 3299,
        category: "spor",
        rating: 4.6,
        reviews: 750,
        image: "👟",
        description: "Nike Air Max 270 spor ayakkabı, maksimum konfor ve stil bir arada."
    },
    {
        id: 4,
        title: "Zara Kadın Blazer Ceket",
        price: 899,
        category: "moda",
        rating: 4.4,
        reviews: 320,
        image: "👔",
        description: "Şık ve modern tasarımlı kadın blazer ceket, ofis ve günlük kullanım için ideal."
    },
    {
        id: 5,
        title: "MacBook Air M2 13\"",
        price: 28999,
        category: "elektronik",
        rating: 4.9,
        reviews: 1100,
        image: "💻",
        description: "Apple MacBook Air M2 çip ile, ultra hafif tasarım ve uzun pil ömrü."
    },
    {
        id: 6,
        title: "Dyson V15 Detect Süpürge",
        price: 8999,
        category: "ev",
        rating: 4.7,
        reviews: 450,
        image: "🧹",
        description: "Dyson V15 Detect kablosuz süpürge, lazer teknolojisi ile görünmez tozu bile temizler."
    },
    {
        id: 7,
        title: "L'Oreal Paris Makyaj Seti",
        price: 299,
        category: "kozmetik",
        rating: 4.3,
        reviews: 890,
        image: "💄",
        description: "Komple makyaj seti, ruj, maskara, fondöten ve daha fazlası bir arada."
    },
    {
        id: 8,
        title: "Sapiens - Yuval Noah Harari",
        price: 45,
        category: "kitap",
        rating: 4.8,
        reviews: 2100,
        image: "📚",
        description: "İnsanlığın kısa tarihi - Dünya çapında milyonlarca okuyucuya ulaşan başyapıt."
    },
    {
        id: 9,
        title: "Adidas Ultraboost 22",
        price: 4199,
        category: "spor",
        rating: 4.5,
        reviews: 680,
        image: "👟",
        description: "Adidas Ultraboost 22 koşu ayakkabısı, enerji geri dönüşümü teknolojisi."
    },
    {
        id: 10,
        title: "H&M Erkek Polo T-Shirt",
        price: 149,
        category: "moda",
        rating: 4.2,
        reviews: 540,
        image: "👕",
        description: "%100 pamuklu erkek polo t-shirt, rahat kesim ve çeşitli renk seçenekleri."
    },
    {
        id: 11,
        title: "Philips Hue Akıllı Ampul Seti",
        price: 1299,
        category: "ev",
        rating: 4.6,
        reviews: 380,
        image: "💡",
        description: "Philips Hue akıllı LED ampul seti, 16 milyon renk ve mobil uygulama kontrolü."
    },
    {
        id: 12,
        title: "Maybelline New York Maskara",
        price: 89,
        category: "kozmetik",
        rating: 4.4,
        reviews: 1200,
        image: "💄",
        description: "Maybelline Lash Sensational maskara, hacim ve uzunluk için mükemmel formül."
    }
];

// Sepet, favoriler ve kullanıcı verileri
let cart = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let sellerApplications = JSON.parse(localStorage.getItem('sellerApplications')) || [];
let currentCategory = 'all';
let currentSort = 'default';
let currentSellerStep = 1;

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartCount();
    updateFavoritesCount();
    updateFavoriteButtons();
    updateUserInterface();
});

// Ürünleri görüntüleme
function displayProducts(productsToShow) {
    const productGrid = document.getElementById('productGrid');
    
    if (productsToShow.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: #666;">Aradığınız kriterlerde ürün bulunamadı.</p>';
        return;
    }
    
    productGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">(${product.reviews})</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Sepete Ekle
                    </button>
                    <button class="add-to-favorites ${favorites.includes(product.id) ? 'favorited' : ''}" onclick="event.stopPropagation(); toggleFavorite(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Fiyat formatlama
function formatPrice(price) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0
    }).format(price);
}

// Yıldız oluşturma
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Kategoriye göre filtreleme
function filterByCategory(category) {
    currentCategory = category;
    let filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    // Mevcut sıralama ayarını uygula
    if (currentSort !== 'default') {
        filteredProducts = sortProductsArray(filteredProducts, currentSort);
    }
    
    displayProducts(filteredProducts);
}

// Navbar'dan kategori filtreleme ve ürünler bölümüne kaydırma
function filterByCategoryAndScroll(category) {
    // Önce kategoriye göre filtrele
    filterByCategory(category);
    
    // Sonra ürünler bölümüne yumuşak kaydırma yap
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Ürün sıralama
function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    currentSort = sortSelect.value;
    
    let productsToSort = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
    
    const sortedProducts = sortProductsArray(productsToSort, currentSort);
    displayProducts(sortedProducts);
}

function sortProductsArray(productsArray, sortType) {
    const sortedArray = [...productsArray];
    
    switch (sortType) {
        case 'price-low':
            return sortedArray.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedArray.sort((a, b) => b.price - a.price);
        case 'rating':
            return sortedArray.sort((a, b) => b.rating - a.rating);
        default:
            return sortedArray;
    }
}

// Ürün arama
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filterByCategory(currentCategory);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// Enter tuşu ile arama
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Sepete ekleme
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    showNotification('Ürün sepete eklendi!', 'success');
}

// Favorilere ekleme/çıkarma
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    
    if (index === -1) {
        favorites.push(productId);
        showNotification('Ürün favorilere eklendi!', 'success');
    } else {
        favorites.splice(index, 1);
        showNotification('Ürün favorilerden çıkarıldı!', 'info');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    updateFavoriteButtons();
    updateFavoritesDisplay();
}

// Favoriler sayısını güncelleme
function updateFavoritesCount() {
    const favoritesCount = document.getElementById('favoritesCount');
    favoritesCount.textContent = favorites.length;
}

// Favori butonlarını güncelleme
function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.add-to-favorites');
    favoriteButtons.forEach(button => {
        const productId = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
        if (favorites.includes(productId)) {
            button.classList.add('favorited');
        } else {
            button.classList.remove('favorited');
        }
    });
}

// Sepet sayısını güncelleme
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Sepet görüntüleme
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Sepetiniz boş</p>';
        cartTotal.textContent = '0 ₺';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

// Sepet miktarını güncelleme
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Sepetten çıkarma
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

// Sepeti açma/kapama
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        updateCartDisplay();
    }
}

// Overlay tıklama ile kapatma
document.getElementById('overlay').addEventListener('click', function() {
    toggleCart();
    hideLoginModal();
    hideRegisterModal();
    hideFavoritesModal();
    hideSellerModal();
    hideProductModal();
});

// Sepeti onaylama
function checkout() {
    if (cart.length === 0) {
        showNotification('Sepetiniz boş!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Sipariş verildi! Toplam: ${formatPrice(total)}`, 'success');
    
    cart = [];
    updateCartCount();
    updateCartDisplay();
    toggleCart();
}

// Login modal
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Registration modal functions
function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function hideRegisterModal() {
    const modal = document.getElementById('registerModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Favorites modal functions
function showFavoritesModal() {
    const modal = document.getElementById('favoritesModal');
    const overlay = document.getElementById('overlay');
    
    updateFavoritesDisplay();
    modal.classList.add('active');
    overlay.classList.add('active');
}

function hideFavoritesModal() {
    const modal = document.getElementById('favoritesModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Favoriler görüntüleme
function updateFavoritesDisplay() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p class="empty-favorites">Henüz favori ürününüz yok</p>';
        return;
    }
    
    const favoriteProducts = products.filter(product => favorites.includes(product.id));
    
    favoritesGrid.innerHTML = favoriteProducts.map(product => `
        <div class="favorite-item">
            <div class="favorite-image">
                ${product.image}
            </div>
            <div class="favorite-info">
                <h4 class="favorite-title">${product.title}</h4>
                <div class="favorite-price">${formatPrice(product.price)}</div>
                <div class="favorite-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Sepete Ekle
                    </button>
                    <button class="remove-favorite" onclick="toggleFavorite(${product.id})">
                        <i class="fas fa-trash"></i> Kaldır
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Ürün detay modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');
    const overlay = document.getElementById('overlay');
    
    modalTitle.textContent = product.title;
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <div style="font-size: 120px; text-align: center; padding: 40px; background: #f8f9fa; border-radius: 10px;">
                    ${product.image}
                </div>
            </div>
            <div class="product-detail-info">
                <h2 class="product-detail-title">${product.title}</h2>
                <div class="product-detail-price">${formatPrice(product.price)}</div>
                <div class="product-rating" style="margin-bottom: 20px;">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">(${product.reviews} değerlendirme)</span>
                </div>
                <p class="product-detail-description">${product.description}</p>
                <div class="product-detail-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id}); hideProductModal();">
                        <i class="fas fa-shopping-cart"></i> Sepete Ekle
                    </button>
                    <button class="add-to-favorites ${favorites.includes(product.id) ? 'favorited' : ''}" onclick="toggleFavorite(${product.id});">
                        <i class="fas fa-heart"></i> ${favorites.includes(product.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function hideProductModal() {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Bildirim gösterme
function showNotification(message, type = 'success') {
    // Mevcut bildirimleri temizle
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 4000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animasyon ile göster
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Login form submit
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = this.querySelectorAll('input');
    const email = inputs[0].value.trim().toLowerCase();
    const password = inputs[1].value;
    
    // Boş alan kontrolü
    if (!email || !password) {
        showNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    // Kullanıcıyı kayıtlı kullanıcılar arasında ara
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Giriş başarılı
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showNotification(`Hoş geldiniz, ${user.fullName}!`, 'success');
        hideLoginModal();
        updateUserInterface();
        
        // Formu temizle
        this.reset();
    } else {
        // Giriş başarısız
        showNotification('E-posta veya şifre hatalı!', 'error');
    }
});

// Register form submit
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = this.querySelectorAll('input');
    const fullName = inputs[0].value.trim();
    const email = inputs[1].value.trim().toLowerCase();
    const phone = inputs[2].value.trim();
    const password = inputs[3].value;
    const confirmPassword = inputs[4].value;
    
    // Şifre kontrolü
    if (password !== confirmPassword) {
        showNotification('Şifreler eşleşmiyor!', 'error');
        return;
    }
    
    // E-posta zaten kayıtlı mı kontrol et
    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
        showNotification('Bu e-posta adresi zaten kayıtlı!', 'error');
        return;
    }
    
    // Yeni kullanıcı oluştur
    const newUser = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
        registrationDate: new Date().toISOString()
    };
    
    // Kullanıcıyı kaydet
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    showNotification('Kayıt başarılı! Giriş yapabilirsiniz.', 'success');
    hideRegisterModal();
    
    // Formu temizle
    this.reset();
    
    setTimeout(() => {
        showLoginModal();
    }, 500);
});

// Kullanıcı arayüzünü güncelleme
function updateUserInterface() {
    // Giriş linkini bul - ilk header-actions içindeki link
    const loginLink = document.querySelector('.header-actions a');
    
    if (currentUser) {
        // Kullanıcı giriş yapmış - relative positioning için wrapper ekle
        loginLink.style.position = 'relative';
        loginLink.innerHTML = `<i class="fas fa-user"></i> ${currentUser.fullName}`;
        loginLink.onclick = function(e) {
            e.preventDefault();
            showUserMenu();
        };
    } else {
        // Kullanıcı giriş yapmamış
        loginLink.style.position = '';
        loginLink.innerHTML = '<i class="fas fa-user"></i> Giriş Yap';
        loginLink.onclick = function(e) {
            e.preventDefault();
            showLoginModal();
        };
    }
}

// Kullanıcı menüsü gösterme
function showUserMenu() {
    const loginLink = document.querySelector('.header-actions a');
    
    // Mevcut user menu'yu kaldır
    const existingMenu = document.getElementById('userMenu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const userMenuHtml = `
        <div class="user-menu" id="userMenu" style="display: block;">
            <div class="user-menu-header">
                <i class="fas fa-user-circle"></i>
                <span>${currentUser.fullName}</span>
            </div>
            <div class="user-menu-items">
                <a href="#" onclick="showUserProfile()">
                    <i class="fas fa-user"></i> Profil Bilgilerim
                </a>
                <a href="#" onclick="showFavoritesModal(); hideUserMenu();">
                    <i class="fas fa-heart"></i> Favorilerim
                </a>
                <a href="#" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Çıkış Yap
                </a>
            </div>
        </div>
    `;
    
    // Yeni menu ekle - login link'in parent container'ına ekle
    const headerActions = loginLink.parentElement;
    headerActions.style.position = 'relative';
    headerActions.insertAdjacentHTML('beforeend', userMenuHtml);
    
    // Menu'nun dışına tıklanınca kapat
    setTimeout(() => {
        document.addEventListener('click', function closeUserMenu(e) {
            if (!e.target.closest('#userMenu') && !e.target.closest('.header-actions a')) {
                hideUserMenu();
                document.removeEventListener('click', closeUserMenu);
            }
        });
    }, 100);
}

function hideUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.remove();
    }
}

// Çıkış yapma
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    hideUserMenu();
    showNotification('Başarıyla çıkış yaptınız!', 'success');
}

// Kullanıcı profili gösterme (basit bir modal)
function showUserProfile() {
    hideUserMenu();
    showNotification('Profil sayfası yakında eklenecek!', 'info');
}

// Seller modal functions
function showSellerModal() {
    const modal = document.getElementById('sellerModal');
    const overlay = document.getElementById('overlay');
    
    currentSellerStep = 1;
    updateSellerStepDisplay();
    modal.classList.add('active');
    overlay.classList.add('active');
}

function hideSellerModal() {
    const modal = document.getElementById('sellerModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
    
    // Reset form
    document.getElementById('sellerForm').reset();
    currentSellerStep = 1;
    updateSellerStepDisplay();
}

// Step navigation functions
function nextStep() {
    if (validateCurrentStep()) {
        if (currentSellerStep < 3) {
            currentSellerStep++;
            updateSellerStepDisplay();
        }
    }
}

function previousStep() {
    if (currentSellerStep > 1) {
        currentSellerStep--;
        updateSellerStepDisplay();
    }
}

function updateSellerStepDisplay() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber <= currentSellerStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
        
        if (stepNumber === currentSellerStep) {
            step.classList.add('current');
        } else {
            step.classList.remove('current');
        }
    });
    
    // Update form steps
    document.querySelectorAll('.form-step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber === currentSellerStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.style.display = currentSellerStep === 1 ? 'none' : 'inline-block';
    nextBtn.style.display = currentSellerStep === 3 ? 'none' : 'inline-block';
    submitBtn.style.display = currentSellerStep === 3 ? 'inline-block' : 'none';
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentSellerStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            showNotification('Lütfen tüm zorunlu alanları doldurunuz!', 'error');
            field.focus();
            return false;
        }
    }
    
    // Step 2 specific validation - at least one category must be selected
    if (currentSellerStep === 2) {
        const categories = document.querySelectorAll('input[name="categories"]:checked');
        if (categories.length === 0) {
            showNotification('Lütfen en az bir ürün kategorisi seçiniz!', 'error');
            return false;
        }
    }
    
    // Step 1 specific validations
    if (currentSellerStep === 1) {
        const tcNo = document.querySelector('input[name="tcNo"]').value;
        const phone = document.querySelector('input[name="phone"]').value;
        
        if (tcNo.length !== 11 || !/^\d+$/.test(tcNo)) {
            showNotification('T.C. Kimlik numarası 11 haneli olmalıdır!', 'error');
            return false;
        }
        
        if (!/^[0-9\s\-\+\(\)]+$/.test(phone)) {
            showNotification('Geçerli bir telefon numarası giriniz!', 'error');
            return false;
        }
    }
    
    // Step 2 specific validations
    if (currentSellerStep === 2) {
        const taxNumber = document.querySelector('input[name="taxNumber"]').value;
        if (taxNumber.length !== 10 || !/^\d+$/.test(taxNumber)) {
            showNotification('Vergi numarası 10 haneli olmalıdır!', 'error');
            return false;
        }
    }
    
    // Step 3 specific validations
    if (currentSellerStep === 3) {
        const iban = document.querySelector('input[name="iban"]').value.replace(/\s/g, '');
        if (!iban.startsWith('TR') || iban.length !== 26) {
            showNotification('Geçerli bir IBAN numarası giriniz!', 'error');
            return false;
        }
        
        const agreements = document.querySelector('input[name="agreements"]');
        if (!agreements.checked) {
            showNotification('Satıcı sözleşmesini kabul etmelisiniz!', 'error');
            return false;
        }
    }
    
    return true;
}

// Seller form submit
document.getElementById('sellerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    const formData = new FormData(this);
    const sellerData = {
        id: Date.now(),
        applicationDate: new Date().toISOString(),
        status: 'pending', // pending, approved, rejected
        personalInfo: {
            fullName: formData.get('fullName'),
            tcNo: formData.get('tcNo'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        },
        businessInfo: {
            businessType: formData.get('businessType'),
            businessName: formData.get('businessName'),
            taxNumber: formData.get('taxNumber'),
            categories: formData.getAll('categories'),
            businessAddress: formData.get('businessAddress')
        },
        bankInfo: {
            bankName: formData.get('bankName'),
            iban: formData.get('iban'),
            taxOffice: formData.get('taxOffice')
        },
        agreements: {
            contracts: formData.get('agreements') === 'on',
            kvkk: formData.get('kvkk') === 'on'
        }
    };
    
    // Check if email already exists
    const existingApplication = sellerApplications.find(app => app.personalInfo.email === sellerData.personalInfo.email);
    if (existingApplication) {
        showNotification('Bu e-posta adresi ile daha önce başvuru yapılmış!', 'error');
        return;
    }
    
    // Save application
    sellerApplications.push(sellerData);
    localStorage.setItem('sellerApplications', JSON.stringify(sellerApplications));
    
    showNotification('Satıcı başvurunuz başarıyla alındı! En kısa sürede değerlendirilecektir.', 'success');
    hideSellerModal();
});

// ESC tuşu ile modal kapatma
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideLoginModal();
        hideRegisterModal();
        hideFavoritesModal();
        hideSellerModal();
        hideProductModal();
        hideUserMenu();
        if (document.getElementById('cartSidebar').classList.contains('active')) {
            toggleCart();
        }
    }
});

// Kategori kartlarına tıklandığında ürünler bölümüne kaydır
function scrollToProducts() {
    const productsSection = document.querySelector('.products');
    if (productsSection) {
        const targetPosition = productsSection.offsetTop - 100;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Kategori kartlarına event listener ekle
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', scrollToProducts);
    });
});
