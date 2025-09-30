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

// nav의 ticket 클릭시 연동
const ticketButton = document.querySelector('.hero-content .cta-button');
const navTicketButton = document.querySelector('.nav-ticket'); // 네비 TICKET
const modal = document.getElementById('booking-modal');
const closeButton = document.querySelector('.close-button');

function openModal(e) {
    e.preventDefault();
    modal.style.display = 'block';
}

if (ticketButton && modal && closeButton) {
    ticketButton.addEventListener('click', openModal);
}

if (navTicketButton && modal && closeButton) {
    navTicketButton.addEventListener('click', openModal);
}

if (closeButton) {
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const bookingModal = document.getElementById('booking-modal');
  const closeButton = document.querySelector('#booking-modal .close-button');
  const ticketButton = document.querySelector('.hero-content .cta-button');
  const bookingForm = document.getElementById('booking-form');

  // Custom Alert Modal
  const customAlertModal = document.getElementById('custom-alert-modal');
  const customAlertCloseButton = document.querySelector('#custom-alert-modal .custom-alert-close-button');
  const customAlertConfirmButton = document.querySelector('#custom-alert-modal .custom-alert-confirm-button');
  const reservationDetails = document.getElementById('reservation-details');

  // --- Modal 제어 함수 ---
  function openModal(modalElement) {
    modalElement.style.display = 'block';
    body.classList.add('modal-open');
  }

  function closeModal(modalElement) {
    modalElement.style.display = 'none';
    body.classList.remove('modal-open');
  }

  // 예약 모달 열기
  if (ticketButton) {
    ticketButton.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(bookingModal);
    });
  }

  // 예약 모달 닫기
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeModal(bookingModal);
    });
  }

  // 예약 폼 제출 시
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 선택된 값 가져오기
      const time = document.getElementById('time-select').value;
      const adult = document.getElementById('adult').value;
      const teen = document.getElementById('teen').value;
      const child = document.getElementById('child').value;

      // 표시할 메시지 구성
      reservationDetails.textContent = `시간: ${time} | 성인: ${adult}명, 청소년: ${teen}명, 소아: ${child}명`;

      // 모달 전환
      closeModal(bookingModal);
      openModal(customAlertModal);
    });
  }

  // 알림 모달 닫기
  if (customAlertCloseButton) {
    customAlertCloseButton.addEventListener('click', () => {
      closeModal(customAlertModal);
    });
  }

  if (customAlertConfirmButton) {
    customAlertConfirmButton.addEventListener('click', () => {
      closeModal(customAlertModal);
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeModal(bookingModal);
    }
    if (e.target === customAlertModal) {
      closeModal(customAlertModal);
    }
  });
});









