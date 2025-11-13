// ===== STICKY HEADER =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const headerElement = document.querySelector('.header');
    
    if (headerElement) {
        if (currentScroll > 100) {
            headerElement.classList.add('sticky');
        } else {
            headerElement.classList.remove('sticky');
        }
    }
    
    lastScroll = currentScroll;
});

// ===== FORMAT CURRENCY =====
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// ===== RENDER PRODUCTS (Dùng cho trang chủ) =====
function renderFeaturedProducts() {
    const productGrid = document.querySelector('#featuredProductsGrid');
    if (!productGrid) return;

    // Guard: products may not be loaded yet on some hosts
    if (typeof products === 'undefined' || !Array.isArray(products)) {
        console.warn('Products data not available yet. Retrying...');
        return;
    }

    const featuredProducts = products.filter(p => p.featured).slice(0, 8);
    
    productGrid.innerHTML = featuredProducts.map(product => `
        <article class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <a href="product-detail.html?id=${product.id}" class="block">
                <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         loading="lazy">
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div class="p-4">
                    <h3 class="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">${product.name}</h3>
                    <p class="text-blue-600 font-semibold text-lg">${formatCurrency(product.price)}</p>
                </div>
            </a>
        </article>
    `).join('');
}

// Ensure rendering runs reliably on all hosts (e.g., GitHub Pages)
function initFeaturedProductsSection() {
    const container = document.querySelector('#featuredProductsGrid');
    if (!container) return;

    // Retry until products are available (max ~1.5s)
    let tries = 0;
    const maxTries = 15;
    const timer = setInterval(() => {
        tries += 1;
        if (typeof products !== 'undefined' && Array.isArray(products)) {
            clearInterval(timer);
            renderFeaturedProducts();
        } else if (tries >= maxTries) {
            clearInterval(timer);
            container.innerHTML = '<p class="col-span-full text-center text-gray-500 py-12">Không thể tải dữ liệu sản phẩm. Vui lòng tải lại trang.</p>';
        }
    }, 100);
}

// ===== RENDER ALL PRODUCTS (Dùng cho trang shop) =====
function renderAllProducts(productsToRender = products) {
    const productGrid = document.querySelector('.shop-products .product-grid');
    if (!productGrid) return;

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 py-12">Không tìm thấy sản phẩm nào phù hợp.</p>';
        return;
    }

    productGrid.innerHTML = productsToRender.map(product => `
        <article class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <a href="product-detail.html?id=${product.id}" class="block">
                <div class="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         loading="lazy">
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div class="p-4">
                    <h3 class="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">${product.name}</h3>
                    <p class="text-blue-600 font-semibold text-lg">${formatCurrency(product.price)}</p>
                </div>
            </a>
        </article>
    `).join('');
}

// ===== FILTER & SEARCH (Trang Shop) =====
function setupShopFilters() {
    const searchInput = document.querySelector('#searchInput');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceFilters = document.querySelectorAll('.price-filter');
    const clearFiltersBtn = document.querySelector('#clearFilters');

    if (!searchInput) return;

    let activeCategory = null;
    let activePriceRange = null;
    let searchTerm = '';

    // Hàm lọc sản phẩm
    function filterProducts() {
        let filtered = [...products];

        // Lọc theo danh mục
        if (activeCategory) {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        // Lọc theo giá
        if (activePriceRange) {
            const range = priceRanges.find(r => r.id === activePriceRange);
            if (range) {
                filtered = filtered.filter(p => p.price >= range.min && p.price < range.max);
            }
        }

        // Lọc theo tìm kiếm
        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        renderAllProducts(filtered);
        updateResultCount(filtered.length);
    }

    // Cập nhật số lượng kết quả
    function updateResultCount(count) {
        const resultCount = document.querySelector('.result-count');
        if (resultCount) {
            resultCount.textContent = `Hiển thị ${count} sản phẩm`;
        }
    }

    // Tìm kiếm
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.trim();
        filterProducts();
    });

    // Lọc theo danh mục
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            if (e.target.checked) {
                activeCategory = e.target.value;
                // Bỏ chọn các checkbox khác
                categoryFilters.forEach(f => {
                    if (f !== e.target) f.checked = false;
                });
            } else {
                activeCategory = null;
            }
            filterProducts();
        });
    });

    // Lọc theo giá
    priceFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            if (e.target.checked) {
                activePriceRange = e.target.value;
                // Bỏ chọn các checkbox khác
                priceFilters.forEach(f => {
                    if (f !== e.target) f.checked = false;
                });
            } else {
                activePriceRange = null;
            }
            filterProducts();
        });
    });

    // Xóa bộ lọc
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            activeCategory = null;
            activePriceRange = null;
            searchTerm = '';
            searchInput.value = '';
            categoryFilters.forEach(f => f.checked = false);
            priceFilters.forEach(f => f.checked = false);
            filterProducts();
        });
    }

    // Hiển thị tất cả sản phẩm ban đầu
    filterProducts();
}

// ===== PRODUCT DETAIL PAGE =====
function renderProductDetail() {
    const productDetailContainer = document.querySelector('.product-detail-container');
    if (!productDetailContainer) return;

    // Lấy ID từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Tìm sản phẩm
    const product = products.find(p => p.id === productId);

    if (!product) {
        productDetailContainer.innerHTML = '<p class="text-center text-red-500 py-12">Sản phẩm không tồn tại.</p>';
        return;
    }

    // Render chi tiết sản phẩm với TailwindCSS
    productDetailContainer.innerHTML = `
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <!-- Product Image -->
            <div class="order-2 lg:order-1">
                <div class="rounded-2xl overflow-hidden shadow-2xl">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="w-full h-auto object-cover"
                         width="600" 
                         height="750">
                </div>
            </div>
            
            <!-- Product Info -->
            <div class="order-1 lg:order-2">
                <div class="space-y-6">
                    <!-- Breadcrumb -->
                    <nav class="text-sm text-gray-500">
                        <a href="index.html" class="hover:text-blue-600">Trang chủ</a>
                        <span class="mx-2">/</span>
                        <a href="shop.html" class="hover:text-blue-600">Cửa hàng</a>
                        <span class="mx-2">/</span>
                        <span class="text-gray-900">${product.name}</span>
                    </nav>
                    
                    <!-- Product Name -->
                    <h1 class="font-display text-3xl lg:text-4xl font-bold text-gray-900">${product.name}</h1>
                    
                    <!-- Price -->
                    <div class="flex items-baseline space-x-3">
                        <p class="text-3xl font-bold text-blue-600">${formatCurrency(product.price)}</p>
                    </div>
                    
                    <!-- Description -->
                    <div class="prose prose-gray">
                        <h3 class="font-semibold text-lg mb-2">Mô tả sản phẩm</h3>
                        <p class="text-gray-600 leading-relaxed">${product.description}</p>
                    </div>
                    
                    <!-- Features -->
                    <div class="bg-gray-50 rounded-xl p-6">
                        <h3 class="font-semibold text-lg mb-4">Đặc điểm nổi bật</h3>
                        <ul class="space-y-2">
                            <li class="flex items-center text-gray-700">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                Chất liệu cao cấp, thoáng mát
                            </li>
                            <li class="flex items-center text-gray-700">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                Thiết kế tối giản, sang trọng
                            </li>
                            <li class="flex items-center text-gray-700">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                Đổi trả miễn phí trong 7 ngày
                            </li>
                            <li class="flex items-center text-gray-700">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                Giao hàng toàn quốc
                            </li>
                        </ul>
                    </div>
                    
                    <!-- Add to Cart Button -->
                    <button class="add-to-cart-btn w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105" 
                            aria-label="Thêm ${product.name} vào giỏ hàng">
                        <i class="fas fa-shopping-cart mr-2"></i>
                        Thêm Vào Giỏ Hàng
                    </button>
                    
                    <!-- Additional Info -->
                    <div class="border-t pt-6 space-y-3 text-sm text-gray-600">
                        <p><i class="fas fa-truck mr-2 text-blue-600"></i> Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
                        <p><i class="fas fa-shield-alt mr-2 text-blue-600"></i> Cam kết hàng chính hãng 100%</p>
                        <p><i class="fas fa-headset mr-2 text-blue-600"></i> Hỗ trợ khách hàng 24/7</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Cập nhật title trang
    document.title = `${product.name} - AuraStyle`;

    // Thêm sự kiện cho nút "Thêm vào giỏ hàng"
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            showNotification('Sản phẩm đã được thêm vào giỏ hàng!', 'success');
        });
    }
}

// Show notification helper (if not exists in layout.js)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-blue-600';
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-down`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas fa-check-circle text-2xl"></i>
            <p class="font-medium">${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== CONTACT FORM VALIDATION =====
function setupContactForm() {
    const contactForm = document.querySelector('#contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Lấy giá trị
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();

        // Validation đơn giản
        if (!name || !email || !message) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Email không hợp lệ!');
            return;
        }

        // Success message
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        contactForm.reset();
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FILTER TOGGLE (Mobile) =====
function setupMobileFilterToggle() {
    const filterToggle = document.querySelector('.filter-toggle');
    const sidebar = document.querySelector('.shop-sidebar');
    const filterClose = document.querySelector('.filter-close');

    if (filterToggle && sidebar) {
        filterToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    }

    if (filterClose && sidebar) {
        filterClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
}

// ===== NEWSLETTER FORM =====
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('#newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput.value.trim()) {
            showNotification('Cảm ơn bạn đã đăng ký nhận tin! Chúng tôi sẽ gửi thông tin mới nhất đến email của bạn.', 'success');
            newsletterForm.reset();
        }
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Run robust init for featured products (handles GitHub Pages timing)
    initFeaturedProductsSection();
    renderAllProducts();
    setupShopFilters();
    renderProductDetail();
    setupContactForm();
    setupMobileFilterToggle();
    setupNewsletterForm();
});

// Also initialize immediately if DOM is already parsed (defensive)
if (document.readyState !== 'loading') {
    try { initFeaturedProductsSection(); } catch (e) { console.warn(e); }
}
