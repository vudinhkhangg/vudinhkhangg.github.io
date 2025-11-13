// ===== LOAD HEADER & FOOTER =====
async function loadHeaderFooter() {
    try {
        // Load TailwindCSS config first
        const configResponse = await fetch('includes/tailwind-config.html');
        const configHTML = await configResponse.text();
        document.head.insertAdjacentHTML('beforeend', configHTML);
        
        // Load header
        const headerResponse = await fetch('includes/header.html');
        const headerHTML = await headerResponse.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;
        
        // Load footer
        const footerResponse = await fetch('includes/footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerHTML;
        
        // Load floating call button
        const floatingBtnResponse = await fetch('includes/floating-call-button.html');
        const floatingBtnHTML = await floatingBtnResponse.text();
        document.body.insertAdjacentHTML('beforeend', floatingBtnHTML);
        
        // Highlight active menu item based on current page
        highlightActiveMenu();
        
        // Re-initialize menu toggle after header is loaded
        initMenuToggle();
        
        // Initialize search toggle
        initSearchToggle();
        
        // Initialize user account notification
        initUserAccountNotification();
        
        // Initialize cart notification
        initCartNotification();
        
    } catch (error) {
        console.error('Error loading header/footer:', error);
    }
}

// ===== HIGHLIGHT ACTIVE MENU =====
function highlightActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active', 'text-blue-600', 'font-semibold');
        }
    });
}

// ===== MENU TOGGLE (Extracted for reuse) =====
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = !mobileMenu.classList.contains('hidden');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
}

// ===== SEARCH TOGGLE =====
function initSearchToggle() {
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('hidden');
            if (!searchBar.classList.contains('hidden')) {
                const searchInput = searchBar.querySelector('input');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            }
        });
        
        // Close search bar on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !searchBar.classList.contains('hidden')) {
                searchBar.classList.add('hidden');
            }
        });
    }
}

// ===== USER ACCOUNT NOTIFICATION =====
function initUserAccountNotification() {
    const userAccountBtn = document.getElementById('userAccountBtn');
    
    if (userAccountBtn) {
        userAccountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Tính năng đăng nhập đang được phát triển', 'info');
        });
    }
}

// ===== CART NOTIFICATION =====
function initCartNotification() {
    const cartBtn = document.getElementById('cartBtn');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Tính năng giỏ hàng đang được phát triển', 'info');
        });
    }
}

// ===== SHOW NOTIFICATION (Reusable function) =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    const bgColor = type === 'info' ? 'bg-blue-600' : 'bg-green-600';
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-down`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas fa-info-circle text-2xl"></i>
            <div>
                <p class="font-semibold mb-1">Thông báo</p>
                <p class="text-sm">${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== CALL ON LOAD =====
loadHeaderFooter();
