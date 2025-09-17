// 네비게이션 클릭 시 섹션으로 부드럽게 이동
document.querySelectorAll('.nav-links a, .logo').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// CTA 버튼 클릭 이벤트
document.querySelector('.cta-button')?.addEventListener('click', function (e) {
  e.preventDefault();
  const targetSection = document.querySelector('#about');
  targetSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// 스크롤 시 네비게이션 활성화
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
    link.style.color = "#000000";
  });
});

// 프로젝트 카드 클릭 애니메이션
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function () {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});

// 연락처 아이템 클릭 애니메이션
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('click', function () {
    const icon = this.querySelector('.contact-icon');
    icon.style.transform = 'rotate(360deg) scale(1.2)';
    icon.style.transition = 'transform 0.5s ease';
    setTimeout(() => {
      icon.style.transform = '';
    }, 500);
  });
});

// 랜덤 떠다니는 도형 생성
function createRandomShape() {
  const shape = document.createElement('div');
  shape.className = 'shape';
  shape.style.width = Math.random() * 60 + 40 + 'px';
  shape.style.height = shape.style.width;
  shape.style.left = Math.random() * 100 + '%';
  shape.style.top = Math.random() * 100 + '%';
  shape.style.animationDelay = Math.random() * 6 + 's';

  document.querySelector('.floating-shapes')?.appendChild(shape);

  setTimeout(() => {
    shape.remove();
  }, 6000);
}

// 주기적으로 새로운 도형 생성
setInterval(createRandomShape, 3000);

// 풀페이지 스크롤
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  let currentIndex = 0;
  let isScrolling = false;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;

    const target = sections[index].offsetTop;
    const start = window.scrollY;
    const distance = target - start;
    const duration = 1000;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // easeOutBounce
      let t = progress;
      let bounce;
      if (t < (1 / 2.75)) {
        bounce = 7.5625 * t * t;
      } else if (t < (2 / 2.75)) {
        t -= (1.5 / 2.75);
        bounce = 7.5625 * t * t + 0.75;
      } else if (t < (2.5 / 2.75)) {
        t -= (2.25 / 2.75);
        bounce = 7.5625 * t * t + 0.9375;
      } else {
        t -= (2.625 / 2.75);
        bounce = 7.5625 * t * t + 0.984375;
      }

      window.scrollTo(0, start + distance * bounce);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        isScrolling = false;
      }
    }

    requestAnimationFrame(animation);
  }

  // 마우스 휠
  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0) {
      currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
    scrollToSection(currentIndex);
  });

  // 키보드 ↑↓
  window.addEventListener("keydown", (e) => {
    if (isScrolling) return;
    if (e.key === "ArrowDown") {
      currentIndex = Math.min(currentIndex + 1, sections.length - 1);
      scrollToSection(currentIndex);
    } else if (e.key === "ArrowUp") {
      currentIndex = Math.max(currentIndex - 1, 0);
      scrollToSection(currentIndex);
    }
  });
});





// 
// =========================
// SKILLS 게이지: 페이지 진입 시 자동 애니메이션
// =========================
const observerSkills = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skills = entry.target.querySelectorAll('.skill');
      skills.forEach(skill => {
        const circle = skill.querySelector('.progress');
        const percent = skill.getAttribute('data-percent');
        const radius = 40;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        // 애니메이션 실행
        setTimeout(() => {
          const offset = circumference - (percent / 100) * circumference;
          circle.style.strokeDashoffset = offset;
        }, 300); // 약간 딜레이 후 실행
      });

      observerSkills.unobserve(entry.target); // 한 번만 실행
    }
  });
}, { threshold: 0.3 });
observerSkills.observe(document.querySelector('#about .skillsElements'));


// 페이지 이동시 네비게이션 색깔 변경
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const landing = document.querySelector("#landing");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 랜딩페이지 안에 있을 때
          header.classList.remove("scrolled");
        } else {
          // 랜딩페이지 벗어나면
          header.classList.add("scrolled");
        }
      });
    },
    { threshold: 0.5 } // 절반 이상 보이면 in-view로 판단
  );

  if (landing) observer.observe(landing);
});

// 메일 클릭시 복사 + 알림
function copyToClipboard(text, message) {
  const alertBox = document.getElementById("copy-alert");

  navigator.clipboard.writeText(text).then(() => {
    alertBox.textContent = message; // 알람 문구 변경
    alertBox.classList.add("show");

    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 1500);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const emailItem = document.getElementById("email-item");
  const websiteItem = document.getElementById("website-item");

  if (emailItem) {
    emailItem.addEventListener("click", () => {
      copyToClipboard("jinseony25@gmail.com", "Email Copy!");
    });
  }

  if (websiteItem) {
    websiteItem.addEventListener("click", () => {
      copyToClipboard("www.portfolio.com", "Website Copy!");
    });
  }
});

// 컨셉뷰 클릭시 팝업
  // 팝업 열기 함수
        function openPopup(imageSrc) {
            const popup = document.getElementById('popupOverlay');
            const popupImage = document.getElementById('popupImage');
            
            popupImage.src = imageSrc;
            popup.style.display = 'flex';
            
            // 애니메이션 효과
            setTimeout(() => {
                popup.style.opacity = '1';
            }, 10);
        }

        // 팝업 닫기 함수
        function closePopup() {
            const popup = document.getElementById('popupOverlay');
            popup.style.opacity = '0';
            
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }

        // 오버레이 클릭시 팝업 닫기
        document.getElementById('popupOverlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });

        // ESC 키로 팝업 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });


        // 마우스 커서 효과
        // 3D 모던 스타일 커서 효과 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let particleCount = 0;
    let shapeCount = 0;

    // 마우스 움직임 추적
    document.addEventListener('mousemove', function(e) {
        const random = Math.random();
        
        if (random < 0.15) {
            createParticle(e.clientX, e.clientY);
        } else if (random < 0.08) {
            createWave(e.clientX, e.clientY);
        }
    });

    // 클릭시 효과
    document.addEventListener('mousedown', function(e) {
        createBurst(e.clientX, e.clientY);
        createGlow(e.clientX, e.clientY);
        
        // 50% 확률로 3D 형태 생성
        if (Math.random() < 0.5) {
            create3DShape(e.clientX, e.clientY);
        }
    });

    // 3D 스타일 파티클 생성
    function createParticle(x, y) {
        if (particleCount > 15) return;
        
        const colors = ['blue', 'pink', 'yellow', 'green', 'purple'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const particle = document.createElement('div');
        particle.className = `cursor-particle ${randomColor}`;
        particle.style.left = (x - 6 + Math.random() * 12) + 'px';
        particle.style.top = (y - 6 + Math.random() * 12) + 'px';
        
        document.body.appendChild(particle);
        particleCount++;
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                particleCount--;
            }
        }, 1200);
    }

    // 3D 형태 생성
    function create3DShape(x, y) {
        if (shapeCount > 8) return;
        
        const shapes = ['sphere', 'cube', 'triangle'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        const shape = document.createElement('div');
        shape.className = `cursor-shape ${randomShape}`;
        shape.style.left = (x - 10) + 'px';
        shape.style.top = (y - 10) + 'px';
        
        document.body.appendChild(shape);
        shapeCount++;
        
        setTimeout(() => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
                shapeCount--;
            }
        }, 2000);
    }

    // 웨이브 효과
    function createWave(x, y) {
        const wave = document.createElement('div');
        wave.className = 'cursor-wave';
        wave.style.left = (x - 15) + 'px';
        wave.style.top = (y - 15) + 'px';
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 1000);
    }

    // 버스트 효과 (8방향 파티클)
    function createBurst(x, y) {
        const burst = document.createElement('div');
        burst.className = 'cursor-burst';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        
        // 8개 파티클 생성
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            particle.style.transform = `rotate(${i * 45}deg)`;
            burst.appendChild(particle);
        }
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 800);
    }

    // 3D 글로우 효과
    function createGlow(x, y) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.left = (x - 30) + 'px';
        glow.style.top = (y - 30) + 'px';
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            if (glow.parentNode) {
                glow.parentNode.removeChild(glow);
            }
        }, 1500);
    }

    // 버튼/링크 호버시 특별 효과
    const interactiveElements = document.querySelectorAll('.btn, .nav-links a, .contact-item, .project-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            // 호버시 다채로운 파티클 효과
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // 여러 개의 파티클을 원형으로 배치
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const angle = (i / 5) * Math.PI * 2;
                    const radius = 30;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    createParticle(x, y);
                }, i * 80);
            }
        });

        element.addEventListener('mouseleave', function(e) {
            // 마우스 떠날 때 웨이브 효과
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            createWave(centerX, centerY);
        });
    });

    // 스크롤시 효과 (부드러운 파티클)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const x = window.innerWidth / 2;
            const y = window.innerHeight / 2;
            createWave(x, y);
        }, 100);
    });

    // 터치 디바이스 대응
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            createBurst(touch.clientX, touch.clientY);
            create3DShape(touch.clientX, touch.clientY);
            createGlow(touch.clientX, touch.clientY);
        }
    });

    // 키보드 입력시 효과 (타이핑 파티클)
    document.addEventListener('keydown', function(e) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.3 + window.innerHeight * 0.7; // 하단에서 생성
        createParticle(x, y);
    });

    // 페이지 로드 완료시 웰컴 효과
    window.addEventListener('load', function() {
        setTimeout(() => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // 중앙에서 시작하는 웰컴 효과
            for (let i = 0; i < 12; i++) {
                setTimeout(() => {
                    const angle = (i / 12) * Math.PI * 2;
                    const radius = 100;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    
                    create3DShape(x, y);
                    createParticle(x, y);
                }, i * 100);
            }
        }, 500);
    });

    // 성능 최적화: 페이지 언로드시 모든 효과 제거
    window.addEventListener('beforeunload', function() {
        const effects = document.querySelectorAll(
            '.cursor-particle, .cursor-shape, .cursor-wave, .cursor-burst, .cursor-glow'
        );
        effects.forEach(effect => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        });
    });

    // 포트폴리오 텍스트에 클래스 추가 (CSS 효과 적용용)
    const headings = document.querySelectorAll('h1, h2, .logo');
    headings.forEach(heading => {
        heading.classList.add('portfolio-text');
    });
});



// 스크롤바
// 재미있는 스크롤바 인터랙션 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let scrollbarMode = 'default';
    let partyModeActive = false;
    let konami = [];
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

    // 스크롤 속도 감지
    let scrollTimer = null;
    let scrollSpeed = 0;
    let lastScrollTop = 0;

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollSpeed = Math.abs(currentScrollTop - lastScrollTop);
        lastScrollTop = currentScrollTop;

        // 빠른 스크롤시 파티 모드
        if (scrollSpeed > 50) {
            activatePartyMode();
        }

        // 스크롤 멈춤 감지
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            scrollSpeed = 0;
            if (partyModeActive && scrollbarMode === 'party') {
                deactivatePartyMode();
            }
        }, 200);
    });

    // 파티 모드 활성화
    function activatePartyMode() {
        if (!partyModeActive) {
            partyModeActive = true;
            document.body.classList.add('party-scroll');
            
            // 파티 사운드 효과 (선택사항)
            playPartySound();
            
            // 3초 후 자동 비활성화
            setTimeout(() => {
                if (scrollSpeed < 10) {
                    deactivatePartyMode();
                }
            }, 3000);
        }
    }

    // 파티 모드 비활성화
    function deactivatePartyMode() {
        partyModeActive = false;
        document.body.classList.remove('party-scroll');
        scrollbarMode = 'default';
    }

    // 마우스 휠 이벤트
    window.addEventListener('wheel', function(e) {
        const wheelSpeed = Math.abs(e.deltaY);
        
        // 매우 빠른 휠 스크롤시 글리치 효과
        if (wheelSpeed > 100) {
            activateGlitchMode();
        }
    });

    // 글리치 모드
    function activateGlitchMode() {
        document.body.classList.add('glitch-scroll');
        setTimeout(() => {
            document.body.classList.remove('glitch-scroll');
        }, 1000);
    }

    // 페이지 다른 부분 클릭시 모드 변경
    let clickCount = 0;
    document.addEventListener('click', function(e) {
        clickCount++;
        
        // 5번 연속 클릭시 슬라임 모드
        if (clickCount >= 5) {
            activateSlimeMode();
            clickCount = 0;
        }
        
        // 클릭 카운트 리셋
        setTimeout(() => {
            clickCount = Math.max(0, clickCount - 1);
        }, 2000);
    });

    // 슬라임 모드
    function activateSlimeMode() {
        document.body.classList.add('slime-scroll');
        setTimeout(() => {
            document.body.classList.remove('slime-scroll');
        }, 5000);
    }

    // 코나미 코드 감지
    document.addEventListener('keydown', function(e) {
        konami.push(e.keyCode);
        if (konami.length > konamiCode.length) {
            konami.shift();
        }
        
        if (arraysEqual(konami, konamiCode)) {
            activateSecretMode();
            konami = [];
        }
    });

    // 비밀 모드 (모든 효과 동시 적용)
    function activateSecretMode() {
        document.body.className = '';
        document.body.classList.add('party-scroll', 'glitch-scroll', 'slime-scroll');
        
        // 특별 메시지
        showSecretMessage();
        
        // 10초 후 모든 효과 제거
        setTimeout(() => {
            document.body.className = '';
            hideSecretMessage();
        }, 10000);
    }

    // 비밀 메시지 표시
    function showSecretMessage() {
        const message = document.createElement('div');
        message.id = 'secret-message';
        message.innerHTML = '🎉 SECRET MODE ACTIVATED! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #FF6B9D, #00D4FF, #FFD93D);
            color: white;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 24px;
            font-weight: bold;
            z-index: 10000;
            animation: secretPulse 1s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(255, 107, 157, 0.8);
        `;
        
        // 애니메이션 CSS 추가
        const style = document.createElement('style');
        style.textContent = `
            @keyframes secretPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(message);
    }

    // 비밀 메시지 숨기기
    function hideSecretMessage() {
        const message = document.getElementById('secret-message');
        if (message) {
            message.remove();
        }
    }

    // 시간대별 자동 모드 변경
    function autoModeChanger() {
        const hour = new Date().getHours();
        
        if (hour >= 22 || hour <= 6) {
            // 밤에는 차분한 모드
            document.body.style.filter = 'hue-rotate(240deg) brightness(0.8)';
        } else if (hour >= 12 && hour <= 14) {
            // 점심시간에는 에너지 모드
            if (Math.random() < 0.3) {
                activatePartyMode();
            }
        }
    }

    // 스크롤 패턴 분석
    let scrollPattern = [];
    let patternTimer;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        scrollPattern.push(scrollTop);
        
        // 패턴 배열이 너무 길어지면 자르기
        if (scrollPattern.length > 20) {
            scrollPattern.shift();
        }
        
        clearTimeout(patternTimer);
        patternTimer = setTimeout(() => {
            analyzeScrollPattern();
        }, 1000);
    });

    // 스크롤 패턴 분석
    function analyzeScrollPattern() {
        if (scrollPattern.length < 10) return;
        
        // 지그재그 패턴 감지
        let zigzag = 0;
        for (let i = 1; i < scrollPattern.length - 1; i++) {
            if ((scrollPattern[i] > scrollPattern[i-1] && scrollPattern[i] > scrollPattern[i+1]) ||
                (scrollPattern[i] < scrollPattern[i-1] && scrollPattern[i] < scrollPattern[i+1])) {
                zigzag++;
            }
        }
        
        // 지그재그가 많으면 특별 효과
        if (zigzag > 5) {
            activateZigzagMode();
        }
        
        scrollPattern = [];
    }

    // 지그재그 모드
    function activateZigzagMode() {
        document.body.style.transform = 'rotate(0.5deg)';
        setTimeout(() => {
            document.body.style.transform = 'rotate(-0.5deg)';
        }, 100);
        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
        }, 200);
    }

    // 더블클릭으로 모드 토글
    document.addEventListener('dblclick', function(e) {
        // 스크롤바 영역 더블클릭 감지 (오른쪽 가장자리)
        if (e.clientX > window.innerWidth - 30) {
            toggleScrollbarMode();
        }
    });

    // 스크롤바 모드 토글
    function toggleScrollbarMode() {
        const modes = ['default', 'party', 'slime', 'glitch'];
        const currentIndex = modes.indexOf(scrollbarMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        scrollbarMode = modes[nextIndex];
        
        // 모든 모드 클래스 제거
        document.body.classList.remove('party-scroll', 'slime-scroll', 'glitch-scroll');
        
        // 새 모드 적용
        if (scrollbarMode !== 'default') {
            document.body.classList.add(scrollbarMode + '-scroll');
        }
        
        // 모드 변경 알림
        showModeChangeNotification(scrollbarMode);
    }

    // 모드 변경 알림
    function showModeChangeNotification(mode) {
        const notification = document.createElement('div');
        notification.textContent = `Scrollbar Mode: ${mode.toUpperCase()}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            z-index: 9999;
            font-size: 14px;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // 유틸리티 함수들
    function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    function playPartySound() {
        // 웹 오디오 API를 사용한 간단한 비프음
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // 오디오 지원하지 않는 브라우저에서는 무시
        }
    }

    // 초기화
    autoModeChanger();
    setInterval(autoModeChanger, 3600000); // 1시간마다 체크
});