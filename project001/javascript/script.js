document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Navigation ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Scroll-based Fade-in Animations ---
    const scrollElements = document.querySelectorAll('section');
    
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-scroll', 'is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => {
        el.setAttribute('data-scroll', '');
        elementObserver.observe(el);
    });

    // --- 4. Infinite Scroll for Reviews & Gallery ---
    function setupInfiniteScroll(selector) {
        const scroller = document.querySelector(selector);
        if (scroller) {
            const content = Array.from(scroller.children);
            content.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute('aria-hidden', true);
                scroller.appendChild(duplicatedItem);
            });
        }
    }
    setupInfiniteScroll('.reviews-scroll');
    setupInfiniteScroll('.gallery-scroll');

    // --- 5. Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            // This is a basic toggle. For a full implementation, 
            // the nav-menu would need mobile-specific styles to appear correctly.
            alert('Mobile menu clicked! Full implementation requires additional CSS for the mobile navigation overlay.');
        });
    }

});
