// js.js
document.addEventListener('DOMContentLoaded', function () {
    // 스크롤 애니메이션 (IntersectionObserver)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 스무스 스크롤 (header 높이 오프셋 반영)
    function scrollToSection(sectionId) {
        const el = document.getElementById(sectionId);
        if (!el) return;
        const headerHeight = document.querySelector('.header').offsetHeight;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    }

    // 네비게이션 클릭 이벤트
    document.querySelectorAll('.nav-links a, .hero-buttons a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = href.substring(1);
                scrollToSection(target);
            }
        });
    });

    // 헤더 스크롤 효과 (class 토글)
    const header = document.querySelector('.header');
    function onScrollHeader() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScrollHeader);
    onScrollHeader();

    // 트레일러 재생 (예시) — 인라인 onclick 제거, 여기서 이벤트 연결
    function playTrailer() {
        alert('예고편이 재생됩니다.\n실제 서비스에서는 YouTube 또는 비메오 영상이 재생됩니다.');
    }
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', playTrailer);
    }
    // 필요하면 전역으로도 접근 가능하게 함
    window.playTrailer = playTrailer;

    // 시적 효과 - 타이핑 애니메이션 (HTML의 <br>을 보존)
    function typeWriter(element, speed = 100) {
        const originalHTML = element.innerHTML;
        // <br>을 줄바꿈으로 치환해서 문자 단위로 안전하게 타이핑
        const originalText = originalHTML.replace(/<br\s*\/?>/gi, '\n');
        element.innerHTML = '';
        let i = 0;
        function type() {
            if (i < originalText.length) {
                const ch = originalText.charAt(i);
                element.innerHTML += (ch === '\n') ? '<br>' : ch;
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // 페이지 로드시 타이핑 효과 (조금 지연)
    window.addEventListener('load', () => {
        setTimeout(() => {
            const tagline = document.querySelector('.tagline');
            if (tagline) typeWriter(tagline, 50);
        }, 500);
    });





});

// 스토리 슬라이더
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.story-visual .slide');
    const prevBtn = document.querySelector('.story-visual .prev');
    const nextBtn = document.querySelector('.story-visual .next');
    const slider = document.querySelector('.story-visual');

    let current = 0;
    let slideInterval = setInterval(nextSlide, 3000); // 자동 슬라이드

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        current = index;
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }

    // 버튼 클릭
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 마우스 호버 시 자동 슬라이드 멈춤
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 3000);
    });

    // 트레일러 재생
    const playButton = document.querySelector('.play-button');
    const video = document.getElementById('trailerVideo');

    playButton.addEventListener('click', () => {
        playButton.style.display = 'none'; // 버튼 숨기기
        video.style.display = 'block';      // iframe 표시
    });


});




