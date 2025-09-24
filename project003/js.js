// 실행 시점 통일
document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Smooth Scrolling ---------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---------------- Dynamic Bubbles ---------------- */
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 30 + 10;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (Math.random() * 4 + 6) + 's';
        document.body.appendChild(bubble);

        setTimeout(() => bubble.remove(), 10000); // 오래된 버블 제거
    }
    setInterval(createBubble, 600);

    /* ---------------- Story Parallax ---------------- */
    const storyItems = document.querySelectorAll('.story-item');
    const visualElement = document.createElement('div');
    visualElement.classList.add('story-visual');
    document.body.prepend(visualElement);

    function updateParallax() {
        const viewportHeight = window.innerHeight;
        let activeFound = false;

        storyItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
                if (!item.classList.contains('active')) {
                    const imageUrl = item.getAttribute('data-image-url');
                    visualElement.style.backgroundImage = `url(${imageUrl})`;
                    item.classList.add('active');
                }
                activeFound = true;
            } else {
                item.classList.remove('active');
            }
        });

        if (!activeFound) {
            visualElement.style.backgroundImage = 'none';
        }
    }
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    updateParallax();

    /* ---------------- Gallery Effects ---------------- */
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        // ripple-container 자동 생성
        if (!item.querySelector('.ripple-container')) {
            const rippleContainer = document.createElement('div');
            rippleContainer.className = 'ripple-container';
            item.appendChild(rippleContainer);
        }

        item.addEventListener('click', e => {
            createRipple(e, item);
            createMagicParticles(item);
        });
        item.addEventListener('mouseenter', () => createSubtleRipple(item));
    });

    function createRipple(event, element) {
        const rippleContainer = element.querySelector('.ripple-container');
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x - 25 + 'px';
        ripple.style.top = y - 25 + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        rippleContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    function createSubtleRipple(element) {
        const rippleContainer = element.querySelector('.ripple-container');
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = rect.width / 2 - 15 + 'px';
        ripple.style.top = rect.height / 2 - 15 + 'px';
        ripple.style.width = '30px';
        ripple.style.height = '30px';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)';
        rippleContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    function createMagicParticles(element) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'magic-particle';
                particle.style.left = Math.random() * element.offsetWidth + 'px';
                particle.style.top = Math.random() * element.offsetHeight + 'px';
                particle.style.animation = `particleFloat 2s ease-out forwards`;
                element.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }

    /* ---------------- Character Cards ---------------- */
    const characterCards = document.querySelectorAll('.character-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
        });
    }, { threshold: 0.1 });

    characterCards.forEach(card => observer.observe(card));

    characterCards.forEach((card, index) => {
        card.setAttribute('role', 'button'); // 접근성 향상
        card.tabIndex = 0;

        card.addEventListener('mouseenter', () => createWaterDroplets(card));
        card.addEventListener('click', () => {
            createMagicEffect(card);
            playClickSound(index);
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const rotateX = (e.clientY - (rect.top + rect.height / 2)) / 10;
            const rotateY = ((rect.left + rect.width / 2) - e.clientX) / 10;
            card.style.transform = `translateY(-20px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    function createWaterDroplets(card) {
        for (let i = 0; i < 5; i++) {
            const droplet = document.createElement('div');
            droplet.className = 'water-droplet';
            droplet.style.cssText = `
                position: absolute; width: 8px; height: 8px;
                background: radial-gradient(circle, rgba(74,144,226,0.8), transparent);
                border-radius: 50%; left:${Math.random() * 100}%; top:${Math.random() * 100}%;
                animation: droplet-fall 1s ease-out forwards; pointer-events:none;
            `;
            card.appendChild(droplet);
            setTimeout(() => droplet.remove(), 1000);
        }
    }

    function createMagicEffect(card) {
        const circle = document.createElement('div');
        circle.className = 'magic-circle';
        card.appendChild(circle);
        setTimeout(() => circle.remove(), 800);
    }

    function playClickSound(index) {
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = window.audioContext;
        const frequencies = [523.25, 587.33, 659.25]; // C5, D5, E5
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = frequencies[index] || frequencies[0];
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start(); osc.stop(ctx.currentTime + 0.5);
    }
});

// 스토리 섹션 간단한 스크롤 애니메이션
function initStoryAnimations() {
    const storyItems = document.querySelectorAll('.story-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    storyItems.forEach(item => {
        observer.observe(item);
    });

    // 이미지 클릭 효과
    document.querySelectorAll('.story-img').forEach(img => {
        img.addEventListener('click', function () {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// 페이지 로드 후 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoryAnimations);
} else {
    initStoryAnimations();
}

// 갤러리 팝업
// 실행 시점 통일
document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Smooth Scrolling ---------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---------------- Dynamic Bubbles ---------------- */
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 30 + 10;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (Math.random() * 4 + 6) + 's';
        document.body.appendChild(bubble);

        setTimeout(() => bubble.remove(), 10000); // 오래된 버블 제거
    }
    setInterval(createBubble, 600);

    /* ---------------- Story Parallax ---------------- */
    const storyItems = document.querySelectorAll('.story-item');
    const visualElement = document.createElement('div');
    visualElement.classList.add('story-visual');
    document.body.prepend(visualElement);

    function updateParallax() {
        const viewportHeight = window.innerHeight;
        let activeFound = false;

        storyItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
                if (!item.classList.contains('active')) {
                    const imageUrl = item.getAttribute('data-image-url');
                    visualElement.style.backgroundImage = `url(${imageUrl})`;
                    item.classList.add('active');
                }
                activeFound = true;
            } else {
                item.classList.remove('active');
            }
        });

        if (!activeFound) {
            visualElement.style.backgroundImage = 'none';
        }
    }
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    updateParallax();

    /* ---------------- Gallery Effects ---------------- */
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        // ripple-container 자동 생성
        if (!item.querySelector('.ripple-container')) {
            const rippleContainer = document.createElement('div');
            rippleContainer.className = 'ripple-container';
            item.appendChild(rippleContainer);
        }

        item.addEventListener('click', e => {
            createRipple(e, item);
            createMagicParticles(item);
        });
        item.addEventListener('mouseenter', () => createSubtleRipple(item));
    });

    function createRipple(event, element) {
        const rippleContainer = element.querySelector('.ripple-container');
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x - 25 + 'px';
        ripple.style.top = y - 25 + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        rippleContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    function createSubtleRipple(element) {
        const rippleContainer = element.querySelector('.ripple-container');
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = rect.width / 2 - 15 + 'px';
        ripple.style.top = rect.height / 2 - 15 + 'px';
        ripple.style.width = '30px';
        ripple.style.height = '30px';
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)';
        rippleContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    function createMagicParticles(element) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'magic-particle';
                particle.style.left = Math.random() * element.offsetWidth + 'px';
                particle.style.top = Math.random() * element.offsetHeight + 'px';
                particle.style.animation = `particleFloat 2s ease-out forwards`;
                element.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }

    /* ---------------- Character Cards ---------------- */
    const characterCards = document.querySelectorAll('.character-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
        });
    }, { threshold: 0.1 });

    characterCards.forEach(card => observer.observe(card));

    characterCards.forEach((card, index) => {
        card.setAttribute('role', 'button'); // 접근성 향상
        card.tabIndex = 0;

        card.addEventListener('mouseenter', () => createWaterDroplets(card));
        card.addEventListener('click', () => {
            createMagicEffect(card);
            playClickSound(index);
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const rotateX = (e.clientY - (rect.top + rect.height / 2)) / 10;
            const rotateY = ((rect.left + rect.width / 2) - e.clientX) / 10;
            card.style.transform = `translateY(-20px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    function createWaterDroplets(card) {
        for (let i = 0; i < 5; i++) {
            const droplet = document.createElement('div');
            droplet.className = 'water-droplet';
            droplet.style.cssText = `
                position: absolute; width: 8px; height: 8px;
                background: radial-gradient(circle, rgba(74,144,226,0.8), transparent);
                border-radius: 50%; left:${Math.random() * 100}%; top:${Math.random() * 100}%;
                animation: droplet-fall 1s ease-out forwards; pointer-events:none;
            `;
            card.appendChild(droplet);
            setTimeout(() => droplet.remove(), 1000);
        }
    }

    function createMagicEffect(card) {
        const circle = document.createElement('div');
        circle.className = 'magic-circle';
        card.appendChild(circle);
        setTimeout(() => circle.remove(), 800);
    }

    function playClickSound(index) {
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const ctx = window.audioContext;
        const frequencies = [523.25, 587.33, 659.25]; // C5, D5, E5
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = frequencies[index] || frequencies[0];
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start(); osc.stop(ctx.currentTime + 0.5);
    }

    /* ---------------- ✅ Gallery Modal ---------------- */
    const modal = document.getElementById("galleryModal");
    const modalImage = document.getElementById("modalImage");
    const modalCloseBtn = document.querySelector(".modal-close");

    function extractUrl(bgImage) {
        // url("...") 또는 url(...) 모두 대응
        const match = bgImage && bgImage.match(/url\((?:\"|\')?(.*?)(?:\"|\')?\)/);
        return match ? match[1] : "";
    }

    // 아이템 클릭 → 모달 열기
    document.querySelectorAll(".gallery-item").forEach(item => {
        item.addEventListener("click", () => {
            const bgImage = getComputedStyle(item).backgroundImage;
            const imageUrl = extractUrl(bgImage);
            if (imageUrl) {
                modalImage.src = imageUrl;
            } else {
                modalImage.removeAttribute('src'); // 이미지 없을 때도 모달은 뜨도록
            }
            modal.classList.add("open");
            document.body.style.overflow = "hidden"; // 배경 스크롤 잠금
        });
    });

    // 닫기(배경 클릭/버튼/ESC)
    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "";
        // 접근성: 포커스 트랩 해제 등 필요 시 여기서 처리
    }
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(); // 배경 클릭 시 닫기
    });
    modalCloseBtn.addEventListener("click", closeModal);
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });

});

// 스토리 섹션 간단한 스크롤 애니메이션
function initStoryAnimations() {
    const storyItems = document.querySelectorAll('.story-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    storyItems.forEach(item => {
        observer.observe(item);
    });

    // 이미지 클릭 효과
    document.querySelectorAll('.story-img').forEach(img => {
        img.addEventListener('click', function () {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// 페이지 로드 후 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoryAnimations);
} else {
    initStoryAnimations();
}

// 갤러리 팝업 좌우
document.addEventListener('DOMContentLoaded', () => {
    /* ... 기존 코드 생략 ... */

    /* ---------------- ✅ Gallery Modal ---------------- */
    const modal = document.getElementById("galleryModal");
    const modalImage = document.getElementById("modalImage");
    const modalCloseBtn = document.querySelector(".modal-close");
    const modalPrevBtn = document.querySelector(".modal-prev");
    const modalNextBtn = document.querySelector(".modal-next");

    const galleryItems = document.querySelectorAll(".gallery-item");
    let currentIndex = 0; // 현재 보고 있는 이미지 인덱스

    function extractUrl(bgImage) {
        const match = bgImage && bgImage.match(/url\((?:\"|\')?(.*?)(?:\"|\')?\)/);
        return match ? match[1] : "";
    }

    function showImage(index) {
        if (index < 0) index = galleryItems.length - 1;
        if (index >= galleryItems.length) index = 0;
        currentIndex = index;

        const bgImage = getComputedStyle(galleryItems[currentIndex]).backgroundImage;
        const imageUrl = extractUrl(bgImage);
        modalImage.src = imageUrl;
    }

    // 아이템 클릭 → 모달 열기
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentIndex = index;
            showImage(currentIndex);
            modal.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    // 닫기
    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
    modalCloseBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
        if (e.key === "ArrowLeft" && modal.classList.contains("open")) showImage(currentIndex - 1);
        if (e.key === "ArrowRight" && modal.classList.contains("open")) showImage(currentIndex + 1);
    });

    // 좌우 버튼
    modalPrevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    modalNextBtn.addEventListener("click", () => showImage(currentIndex + 1));
});

// 커서 트레일 효과
let mouseX = 0;
let mouseY = 0;
let bubbleCount = 0;
let fishCount = 0;

const customCursor = document.getElementById('customCursor');
// const fishEmojis = ['🐠', '🐟', '🦈', '🐙', '🦑', '🐡'];

// 마우스 움직임 추적
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 커스텀 커서 위치 업데이트
    customCursor.style.left = mouseX + 'px';
    customCursor.style.top = mouseY + 'px';

    // 물방울 생성 (매 3번째 움직임마다)
    bubbleCount++;
    if (bubbleCount % 3 === 0) {
        createBubbleTrail(mouseX, mouseY);
    }

    // 물고기 생성 (매 15번째 움직임마다)
    fishCount++;
    if (fishCount % 15 === 0) {
        createFishTrail(mouseX, mouseY);
    }
});

// 클릭 효과
document.addEventListener('mousedown', () => {
    customCursor.classList.add('clicked');
    createRippleEffect(mouseX, mouseY);
});

document.addEventListener('mouseup', () => {
    customCursor.classList.remove('clicked');
});

// 물방울 트레일 생성
function createBubbleTrail(x, y) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble-trail';
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';

    // 랜덤한 크기
    const size = Math.random() * 8 + 4;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';

    // 랜덤한 색상 변화
    const hue = Math.random() * 60 + 180; // 180-240도 (파란계열)
    bubble.style.background = `radial-gradient(circle at 30% 30%, 
                hsla(${hue}, 70%, 90%, 0.9) 0%, 
                hsla(${hue}, 60%, 70%, 0.6) 100%)`;

    document.body.appendChild(bubble);

    // 애니메이션 끝나면 제거
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    }, 2000);
}

// 물고기 트레일 생성
function createFishTrail(x, y) {
    const fish = document.createElement('div');
    fish.className = 'fish-trail';
    fish.style.left = x + 'px';
    fish.style.top = y + 'px';
    fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];

    // 랜덤한 크기
    const size = Math.random() * 8 + 12;
    fish.style.fontSize = size + 'px';

    document.body.appendChild(fish);

    // 애니메이션 끝나면 제거
    setTimeout(() => {
        if (fish.parentNode) {
            fish.parentNode.removeChild(fish);
        }
    }, 3000);
}

// 파장 효과 생성 (클릭 시)
function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    // 랜덤한 색상
    const colors = ['rgba(255,255,255,0.6)', 'rgba(255,215,0,0.6)', 'rgba(255,107,157,0.6)', 'rgba(74,144,226,0.6)'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    ripple.style.borderColor = randomColor;

    document.body.appendChild(ripple);

    // 애니메이션 끝나면 제거
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1200);
}

// 페이지를 벗어날 때 커서 보이기
document.addEventListener('mouseleave', () => {
    customCursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    customCursor.style.opacity = '1';
});

// 터치 디바이스에서는 기본 커서 사용
if ('ontouchstart' in window) {
    document.body.style.cursor = 'auto';
    const style = document.createElement('style');
    style.textContent = '* { cursor: auto !important; }';
    document.head.appendChild(style);
    customCursor.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  const storyItems = document.querySelectorAll(".story-item");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const content = entry.target.querySelector(".story-content");
        const elements = [
          content.querySelector("h2"),
          content.querySelector(".story-img"),
          content.querySelector("p")
        ];

        elements.forEach((el, index) => {
          if (el) {
            setTimeout(() => el.classList.add("fade-in"), index * 400);
          }
        });

        observer.unobserve(entry.target); // 한 번만 실행
      }
    });
  }, {
    threshold: 0.2
  });

  storyItems.forEach(item => observer.observe(item));
});

// 스토리 책장 넘기기
// 스토리북 페이지 넘김 기능
class StoryBook {
    constructor() {
        this.pages = document.querySelectorAll('.page');
        this.nextBtn = document.getElementById('nextBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.dots = document.querySelectorAll('.dot');
        
        this.currentPage = 0;
        this.totalPages = this.pages.length;
        this.isFlipping = false;
        this.autoFlipTimer = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updatePageStates();
        this.startAutoFlip();
        
        // 페이지 클릭으로도 넘기기
        this.pages.forEach((page, index) => {
            page.addEventListener('click', (e) => {
                if (!this.isFlipping && e.target.closest('.nav-btn') === null) {
                    this.nextPage();
                }
            });
        });
    }
    
    setupEventListeners() {
        // 네비게이션 버튼
        this.nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextPage();
            this.resetAutoFlip();
        });
        
        this.prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevPage();
            this.resetAutoFlip();
        });
        
        // 인디케이터 점들
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToPage(index);
                this.resetAutoFlip();
            });
        });
        
        // 키보드 네비게이션
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextPage();
                this.resetAutoFlip();
            } else if (e.key === 'ArrowLeft') {
                this.prevPage();
                this.resetAutoFlip();
            }
        });
        
        // 마우스 호버 시 자동넘김 일시정지
        const book = document.querySelector('.book');
        book.addEventListener('mouseenter', () => {
            this.pauseAutoFlip();
        });
        
        book.addEventListener('mouseleave', () => {
            this.resumeAutoFlip();
        });
    }
    
    nextPage() {
        if (this.isFlipping) return;
        
        const nextIndex = (this.currentPage + 1) % this.totalPages;
        this.flipToPage(nextIndex);
    }
    
    prevPage() {
        if (this.isFlipping) return;
        
        const prevIndex = this.currentPage === 0 ? this.totalPages - 1 : this.currentPage - 1;
        this.flipToPage(prevIndex);
    }
    
    goToPage(pageIndex) {
        if (this.isFlipping || pageIndex === this.currentPage) return;
        
        this.flipToPage(pageIndex);
    }
    
    flipToPage(pageIndex) {
        if (this.isFlipping) return;
        
        this.isFlipping = true;
        const currentPageEl = this.pages[this.currentPage];
        const targetPageEl = this.pages[pageIndex];
        
        // 현재 페이지에 flipping 클래스 추가
        currentPageEl.classList.add('flipping');
        
        // 애니메이션 효과
        this.addPageFlipEffect(currentPageEl);
        
        // 페이지 넘김 애니메이션
        setTimeout(() => {
            // 이전 페이지들 모두 flipped 상태로
            for (let i = 0; i <= this.currentPage; i++) {
                if (i < pageIndex) {
                    this.pages[i].classList.add('flipped');
                } else {
                    this.pages[i].classList.remove('flipped');
                }
            }
            
            // 새로운 페이지들 상태 설정
            for (let i = pageIndex; i < this.totalPages; i++) {
                if (i < pageIndex) {
                    this.pages[i].classList.add('flipped');
                } else {
                    this.pages[i].classList.remove('flipped');
                }
            }
            
            this.currentPage = pageIndex;
            this.updatePageStates();
            
        }, 100);
        
        // 애니메이션 완료 후 정리
        setTimeout(() => {
            currentPageEl.classList.remove('flipping');
            this.isFlipping = false;
        }, 1200);
    }
    
    addPageFlipEffect(page) {
        // 페이지 넘김 시 반짝이는 효과
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
            pointer-events: none;
            z-index: 100;
            animation: pageShimmer 1.2s ease-out;
        `;
        
        page.appendChild(shimmer);
        
        setTimeout(() => {
            if (shimmer.parentNode) {
                shimmer.parentNode.removeChild(shimmer);
            }
        }, 1200);
    }
    
    updatePageStates() {
        // 페이지 z-index 및 상태 업데이트
        this.pages.forEach((page, index) => {
            page.classList.remove('current');
            
            if (index === this.currentPage) {
                page.classList.add('current');
            }
            
            if (index < this.currentPage) {
                page.classList.add('flipped');
            } else {
                page.classList.remove('flipped');
            }
        });
        
        // 인디케이터 업데이트
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentPage);
        });
        
        // 버튼 상태 업데이트 (항상 순환이므로 비활성화 안함)
        this.updateButtonStates();
    }
    
    updateButtonStates() {
        // 부드러운 버튼 효과
        if (this.currentPage === 0) {
            this.prevBtn.style.opacity = '0.7';
        } else {
            this.prevBtn.style.opacity = '1';
        }
        
        if (this.currentPage === this.totalPages - 1) {
            this.nextBtn.style.opacity = '0.7';
        } else {
            this.nextBtn.style.opacity = '1';
        }
    }
    
    // 자동 넘김 기능
    startAutoFlip() {
        this.autoFlipTimer = setInterval(() => {
            this.nextPage();
        }, 6000); // 6초마다 자동 넘김
    }
    
    pauseAutoFlip() {
        if (this.autoFlipTimer) {
            clearInterval(this.autoFlipTimer);
            this.autoFlipTimer = null;
        }
    }
    
    resumeAutoFlip() {
        if (!this.autoFlipTimer) {
            this.startAutoFlip();
        }
    }
    
    resetAutoFlip() {
        this.pauseAutoFlip();
        this.startAutoFlip();
    }
}

// CSS 애니메이션 동적 추가
const pageShimmerCSS = `
@keyframes pageShimmer {
    0% {
        transform: translateX(-100%) skewX(-15deg);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateX(200%) skewX(-15deg);
        opacity: 0;
    }
}
`;

// 스타일 추가
const style = document.createElement('style');
style.textContent = pageShimmerCSS;
document.head.appendChild(style);

// 페이지 로드 후 스토리북 초기화
document.addEventListener('DOMContentLoaded', () => {
    const storyBook = new StoryBook();
});

// 터치 스와이프 지원 (모바일)
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // 최소 스와이프 거리
    if (Math.abs(diffX) < 50 || Math.abs(diffY) > 100) return;
    
    const storyBook = window.storyBook;
    if (!storyBook) return;
    
    if (diffX > 0) {
        // 왼쪽으로 스와이프 - 다음 페이지
        storyBook.nextPage();
    } else {
        // 오른쪽으로 스와이프 - 이전 페이지
        storyBook.prevPage();
    }
    
    storyBook.resetAutoFlip();
    
    touchStartX = 0;
    touchStartY = 0;
});

// 전역 접근을 위해 storyBook 인스턴스 저장
window.addEventListener('load', () => {
    if (!window.storyBook) {
        window.storyBook = new StoryBook();
    }
});

// 캐릭터 섹션 인터랙션 초기화
function initCharacterInteractions() {
    const charactersContainer = document.querySelector('.characters-container');
    const characterCards = document.querySelectorAll('.character-card');
    
    // Intersection Observer for section visibility
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('characters-visible');
                
                // 카드들 순차적으로 등장
                setTimeout(() => {
                    characterCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('card-visible');
                            addMagicParticles(card);
                        }, index * 200);
                    });
                }, 500);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    if (charactersContainer) {
        sectionObserver.observe(charactersContainer);
    }
    
    // 각 캐릭터 카드에 호버 이벤트
    characterCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            addMagicParticles(card);
            playCharacterSound(index); // 효과음 (옵션)
        });
        
        card.addEventListener('mouseleave', () => {
            removeMagicParticles(card);
        });
        
        // 클릭 시 특별 효과
        card.addEventListener('click', () => {
            triggerSpecialEffect(card);
        });
    });
}

// 마법 파티클 생성
function addMagicParticles(card) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        
        // 랜덤 위치
        const left = Math.random() * 80 + 10; // 10% ~ 90%
        const delay = Math.random() * 2;
        const size = Math.random() * 4 + 3;
        
        particle.style.left = left + '%';
        particle.style.bottom = '20px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDelay = delay + 's';
        
        card.appendChild(particle);
        
        // 3초 후 제거
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000 + delay * 1000);
    }
}

// 파티클 제거
function removeMagicParticles(card) {
    const particles = card.querySelectorAll('.magic-particle');
    particles.forEach(particle => {
        particle.style.animation = 'particleFloat 0.5s ease-out forwards';
    });
}

// 특별 효과 (클릭 시)
function triggerSpecialEffect(card) {
    // 카드 전체가 반짝이는 효과
    card.style.animation = 'cardSparkle 1s ease-out';
    
    setTimeout(() => {
        card.style.animation = '';
    }, 1000);
    
    // 추가 파티클 폭발
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #FFD700, #FF6B9D);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            left: 50%;
            top: 50%;
            animation: particleBurst 1.5s ease-out forwards;
        `;
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        
        particle.style.setProperty('--angle', angle + 'rad');
        particle.style.setProperty('--velocity', velocity + 'px');
        
        card.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

// 효과음 재생 (옵션)
function playCharacterSound(index) {
    // Web Audio API 사용한 간단한 효과음
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const AudioContextClass = AudioContext || webkitAudioContext;
        const audioContext = new AudioContextClass();
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 캐릭터별 다른 음높이
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
        oscillator.frequency.setValueAtTime(frequencies[index] || 523.25, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

// 추가 CSS 애니메이션
const additionalCharacterCSS = `
@keyframes cardSparkle {
    0% { filter: brightness(1) hue-rotate(0deg); }
    25% { filter: brightness(1.3) hue-rotate(90deg); }
    50% { filter: brightness(1.5) hue-rotate(180deg); }
    75% { filter: brightness(1.3) hue-rotate(270deg); }
    100% { filter: brightness(1) hue-rotate(360deg); }
}

@keyframes particleBurst {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(
            calc(-50% + cos(var(--angle)) * var(--velocity)),
            calc(-50% + sin(var(--angle)) * var(--velocity))
        ) scale(0);
        opacity: 0;
    }
}
`;

// 스타일 추가
const characterStyle = document.createElement('style');
characterStyle.textContent = additionalCharacterCSS;
document.head.appendChild(characterStyle);

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initCharacterInteractions);

// 갤러리 캐러셀
// 캐러셀 회전 제어
let currentRotation = 0;
const carousel = document.getElementById('carousel');

function rotateCarousel(degrees) {
    currentRotation += degrees;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
}

// 자동 회전 (6개 아이템용 60도씩)
setInterval(() => {
    rotateCarousel(60);
}, 3000);

// 캐릭터 썸네일 클릭 시 섹션 배경 및 팝업 변경
document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const charactersSection = document.querySelector(".characters-section");
    const characterPopup = document.querySelector(".character-popup");
    const popupName = document.querySelector(".popup-name");
    const popupDescription = document.querySelector(".popup-description");

    // 초기 배경 이미지 및 팝업 설정
    const initialImage = document.querySelector(".thumbnail.active").getAttribute("data-image");
    charactersSection.style.backgroundImage = `url('${initialImage}')`;

    // ⭐ 추가된 코드: 각 썸네일의 배경 이미지 설정
    thumbnails.forEach(thumbnail => {
        const thumbImage = thumbnail.getAttribute("data-image");
        thumbnail.style.backgroundImage = `url('${thumbImage}')`;
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", () => {
            // 모든 썸네일의 'active' 클래스 제거
            thumbnails.forEach(t => t.classList.remove("active"));
            
            // 클릭한 썸네일에 'active' 클래스 추가
            thumbnail.classList.add("active");
            
            // 클릭한 썸네일의 data-image 값으로 섹션 배경 변경
            const newImage = thumbnail.getAttribute("data-image");
            charactersSection.style.backgroundImage = `url('${newImage}')`;
            
            // 팝업창에 캐릭터 정보 업데이트 및 표시
            const characterName = thumbnail.getAttribute("data-name");
            const characterDescription = thumbnail.getAttribute("data-description");

            popupName.textContent = characterName;
            popupDescription.textContent = characterDescription;
            
            // 팝업창을 서서히 나타나게 함
            characterPopup.classList.add("show");
        });
    });
});

