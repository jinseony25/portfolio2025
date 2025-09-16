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

