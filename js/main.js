// ===== MENU TOGGLE (Hamburger Menu) =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Thêm/xóa class no-scroll cho body để ngăn cuộn khi menu mở
        document.body.classList.toggle('no-scroll');
    });

    // Đóng menu khi click vào link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// ===== STICKY HEADER =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
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
    const productGrid = document.querySelector('.featured-products .product-grid');
    if (!productGrid) return;

    const featuredProducts = products.filter(p => p.featured).slice(0, 6);
    
    productGrid.innerHTML = featuredProducts.map(product => `
        <article class="product-card" data-aos="fade-up">
            <a href="product-detail.html?id=${product.id}" class="product-link">
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         width="400" 
                         height="500"
                         loading="lazy">
                    <div class="product-overlay">
                        <span class="view-details">Xem Chi Tiết</span>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${formatCurrency(product.price)}</p>
                </div>
            </a>
        </article>
    `).join('');
}

// ===== RENDER ALL PRODUCTS (Dùng cho trang shop) =====
function renderAllProducts(productsToRender = products) {
    const productGrid = document.querySelector('.shop-products .product-grid');
    if (!productGrid) return;

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p class="no-products">Không tìm thấy sản phẩm nào phù hợp.</p>';
        return;
    }

    productGrid.innerHTML = productsToRender.map(product => `
        <article class="product-card">
            <a href="product-detail.html?id=${product.id}" class="product-link">
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         width="400" 
                         height="500"
                         loading="lazy">
                    <div class="product-overlay">
                        <span class="view-details">Xem Chi Tiết</span>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${formatCurrency(product.price)}</p>
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
        productDetailContainer.innerHTML = '<p class="error-message">Sản phẩm không tồn tại.</p>';
        return;
    }

    // Render chi tiết sản phẩm
    productDetailContainer.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}" width="600" height="750">
        </div>
        <div class="product-detail-info">
            <h1 class="product-detail-name">${product.name}</h1>
            <p class="product-detail-price">${formatCurrency(product.price)}</p>
            <div class="product-detail-description">
                <h2>Mô tả sản phẩm</h2>
                <p>${product.description}</p>
            </div>
            <div class="product-detail-actions">
                <button class="btn btn-primary add-to-cart-btn" aria-label="Thêm ${product.name} vào giỏ hàng">
                    Thêm Vào Giỏ Hàng
                </button>
            </div>
        </div>
    `;

    // Cập nhật title trang
    document.title = `${product.name} - AuraStyle`;

    // Thêm sự kiện cho nút "Thêm vào giỏ hàng"
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
        });
    }
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

// ===== NEWSLETTER FORM =====
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('#newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput.value.trim()) {
            alert('Cảm ơn bạn đã đăng ký nhận tin!');
            newsletterForm.reset();
        }
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

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts();
    renderAllProducts();
    setupShopFilters();
    renderProductDetail();
    setupContactForm();
    setupNewsletterForm();
    setupMobileFilterToggle();
});
