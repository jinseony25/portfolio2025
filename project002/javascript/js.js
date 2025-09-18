// 장바구니설정1

$('.util li').eq(2).click(function (e) {
    e.preventDefault()

    $('.shop').show();
    $('.shop1').stop().animate({ 'right': 0 }, 800)
})

$('.close').click(function () {

    $('.shop').hide();
    $('.shop1').stop().animate({ 'right': '-30%' }, 800)
})


document.addEventListener('DOMContentLoaded', function () {
    // =========================
    // 우측 상단 고정 장바구니
    // =========================
    const cartIcon = document.querySelector('.shopping .icon');
    const cartPage = document.querySelector('.shopping .cart_page');
    const closeBtn = document.querySelector('.cart_page .close-btn');
    const cartIconCount = document.querySelector('.shopping .icon span');
    const cartBody = document.querySelector('.cart_page .cart-body');

    let cart = []; // 장바구니 데이터 배열

    if (cartIcon && cartPage && closeBtn) {
        const setExpanded = (open) => {
            cartIcon.setAttribute('aria-expanded', open ? 'true' : 'false');
            cartPage.classList.toggle('active', open);
        };

        cartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            const willOpen = !cartPage.classList.contains('active');
            setExpanded(willOpen);
        });

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setExpanded(false);
        });

        document.addEventListener('click', (e) => {
            if (cartPage.classList.contains('active') && !cartPage.contains(e.target) && !cartIcon.contains(e.target)) {
                setExpanded(false);
            }
        });
    }

    // 기존 updateCartUI 함수를 아래 코드로 전체 교체하세요.

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIconCount.textContent = totalItems;

        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = totalItems > 0 ? 3000 : 0;
        const orderTotal = totalPrice + shipping;

        // --- 수정된 부분 ---
        // 구매하기 버튼 HTML을 담을 변수 생성
        let purchaseButtonHTML = '';

        // 장바구니에 상품이 1개 이상 있을 경우에만 버튼 생성
        if (totalItems > 0) {
            purchaseButtonHTML = `<a href="login.html" class="purchase-btn">구매하기</a>`;
        }
        // --- 수정 끝 ---

        cartBody.innerHTML = `
        <p>총 상품금액 : <em>${totalPrice.toLocaleString()}</em> 원</p>
        <p>총 배송비 : <em>${shipping.toLocaleString()}</em> 원</p>
        <hr class="cart-divider">
        <p class="total">총 주문금액 : <em>${orderTotal.toLocaleString()}</em> 원</p>
        ${purchaseButtonHTML}
    `;
    }








    // =========================
    // NEW DROPS 개별 상품 장바구니
    // =========================
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = btn.dataset.name;
            const price = parseInt(btn.dataset.price);
            const option = btn.dataset.option || '옵션없음';

            let existing = cart.find(item => item.name === name && item.option === option);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ name, price, option, quantity: 1 });
            }

            updateCartUI();
        });
    });









    // =========================
    // ABOUT 이미지 호버
    // =========================
    const aboutImgBox = document.querySelector('.about .imgBox');
    const nameItems = document.querySelectorAll('.about .name-list li');
    if (aboutImgBox && nameItems.length) {
        nameItems.forEach(li => {
            li.addEventListener('mouseenter', () => {
                aboutImgBox.style.backgroundImage = `url('${li.dataset.image}')`;
            });

        });
    }







    // =========================
    // NEW DROPS 썸네일 클릭 시 메인 이미지 변경
    // =========================
    const freshMainImg = document.querySelector('.fresh .shoes .mainImg');
    const freshThumbs = document.querySelectorAll('.fresh .shoes .thumbs .imgBox');
    if (freshMainImg && freshThumbs.length) {
        freshThumbs.forEach((thumb, idx) => {
            thumb.addEventListener('click', () => {
                // active 표시
                freshThumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                // 메인 이미지 변경
                const bg = thumb.style.backgroundImage;
                freshMainImg.style.backgroundImage = bg;
            });
        });
    };









});





// history
// Intersection Observer를 사용한 스크롤 애니메이션
const observerOptions = {
    threshold: 0.3, // 30%가 보이면 트리거
    rootMargin: '0px 0px -50px 0px' // 하단에서 50px 여유
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // 스크롤 업 시 다시 숨기기 (원한다면 주석 해제)
            // entry.target.classList.remove('active');
        }
    });
}, observerOptions);

// 모든 히스토리 아이템을 관찰
document.addEventListener('DOMContentLoaded', () => {
    const historyItems = document.querySelectorAll('.historyL, .historyR');
    historyItems.forEach(item => {
        observer.observe(item);
    });
});

// 추가적인 패럴랙스 효과 (라인에 미세한 움직임)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const historySection = document.querySelector('.history');

    if (historySection) {
        const historyTop = historySection.offsetTop;
        const historyHeight = historySection.offsetHeight;

        // 히스토리 섹션이 뷰포트에 있을 때만 실행
        if (scrolled >= historyTop - window.innerHeight && scrolled <= historyTop + historyHeight) {
            const parallaxSpeed = 0.3;
            const yPos = -(scrolled - historyTop) * parallaxSpeed;

            // 라인에 미세한 패럴랙스 효과 적용
            const line = document.querySelector('.line');
            if (line) {
                line.style.transform = `translateX(-50%) translateY(${yPos}px)`;
            }
        }
    }
});









// brands
document.addEventListener('DOMContentLoaded', () => {

    // 1. 브랜드 탭 기능
    const brandData = {
        TENSOR: {
            name: 'TENSOR',
            desc: 'TENSOR TRUCKS는 경량화와 혁신적인 디자인을 통해 스케이터들의 요구를 반영하고 있습니다.'
        },
        THERE: {
            name: 'THERE',
            desc: 'THERE SKATEBOARDS는 예술과 포용성을 강조하는 브랜드로, 다양한 아티스트들과의 협업을 통해 독특한 그래픽을 선보입니다.'
        },
        THRASHER: {
            name: 'THRASHER',
            desc: '1981년 창간된 스케이트보드 매거진으로 시작하여, 이제는 스케이트 컬처를 상징하는 의류 브랜드로 자리 잡았습니다.'
        },
        THUNDER: {
            name: 'THUNDER',
            desc: 'THUNDER TRUCKS는 뛰어난 반응성과 내구성으로 유명하며, 길거리 스케이팅부터 파크까지 모든 환경에서 사랑받는 트럭입니다.'
        },
        TIMBER: {
            name: 'TIMBER',
            desc: 'TIMBER! SKATEBOARDS는 친환경 소재와 독창적인 그래픽 디자인으로 주목받는 브랜드입니다. 자연과의 조화를 추구합니다.'
        },
        TRIPLE8: {
            name: 'TRIPLE 8',
            desc: 'TRIPLE 8은 스케이트보드, 롤러스케이트, BMX 등 다양한 액션 스포츠를 위한 고품질 보호 장비를 전문적으로 제작합니다.'
        }
    };

    const brandLinks = document.querySelectorAll('.brand-link');
    const brandNameEl = document.getElementById('brand-name');
    const brandDescEl = document.getElementById('brand-desc');
    const watermarkContainer = document.getElementById('watermark-container');

    function updateBrandInfo(brandKey) {
        const data = brandData[brandKey];
        if (!data) return;

        // 텍스트 정보 업데이트
        brandNameEl.textContent = data.name;
        brandDescEl.innerHTML = data.desc;

        // 워터마크 업데이트
        updateWatermark(brandKey);

        // 활성 클래스 업데이트
        brandLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.brand === brandKey) {
                link.classList.add('active');
            }
        });
    }

    function updateWatermark(text) {
        watermarkContainer.innerHTML = ''; // 기존 워터마크 제거
        const positions = [
            { top: '10%', left: '15%' }, { top: '30%', left: '70%' },
            { top: '50%', left: '5%' }, { top: '75%', left: '50%' },
            { top: '5%', left: '80%' }, { top: '60%', left: '30%' },
            { top: '85%', left: '8%' }, { top: '40%', left: '45%' },
        ];

        text.split('').forEach((char, index) => {
            const tag = document.createElement('div');
            tag.className = 'street-tag';
            tag.textContent = char;
            const pos = positions[index % positions.length];
            tag.style.top = pos.top;
            tag.style.left = pos.left;
            watermarkContainer.appendChild(tag);

            // 글자가 순차적으로 나타나는 효과
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    brandLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const brandKey = e.target.dataset.brand;
            updateBrandInfo(brandKey);
        });
    });

    // 초기 로드 시 TENSOR 정보 및 워터마크 설정
    updateBrandInfo('TENSOR');

    // 2. 스크롤 진입 애니메이션
    const brandsSection = document.querySelector('.brands');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                brandsSection.classList.add('is-visible');
                observer.unobserve(entry.target); // 한 번 실행 후 관찰 중지
            }
        });
    }, { threshold: 0.1 }); // 섹션이 10% 보였을 때 실행

    observer.observe(brandsSection);
});










// banner
document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer API로 애니메이션 실행
    const banner = document.querySelector('.banner');
    const banner1 = document.querySelector('.banner1');
    const banner2 = document.querySelector('.banner2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                banner1.classList.add('animate-left');
                banner2.classList.add('animate-right');
                observer.unobserve(entry.target); // 한 번 실행 후 관찰 중지
            }
        });
    }, {
        threshold: 0.5 // 배너가 50% 보였을 때 실행
    });

    observer.observe(banner);





    // 3. 마우스 패럴랙스 효과
    const bannerTexts = document.querySelectorAll('.banner-text');
    banner.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = banner;

        // 배너 중앙을 기준으로 마우스 위치 계산
        const moveX = (clientX - offsetWidth / 2) / (offsetWidth / 2);
        const moveY = (clientY - offsetHeight / 2) / (offsetHeight / 2);

        // 이동 강도 조절
        const intensity1 = 10;
        const intensity2 = 20;

        // 각 텍스트에 다른 강도로 효과 적용
        banner1.style.transform = `translate(${moveX * intensity1}px, ${moveY * intensity1}px)`;
        banner2.style.transform = `translate(${moveX * intensity2}px, ${moveY * intensity2}px)`;
    });

    // 마우스가 배너를 벗어나면 원래 위치로
    banner.addEventListener('mouseleave', () => {
        banner1.style.transform = 'translate(0, 0)';
        banner2.style.transform = 'translate(0, 0)';
    });
});




// --- Hot Drops (디자인 요소 개선 최종 코드) ---
document.addEventListener('DOMContentLoaded', () => {
    const hotLinks = document.querySelectorAll('.hot .txtBox li a');
    const hotImgBox = document.querySelector('.hot .imgBox');
    const linkIndicator = document.querySelector('.hot .link-indicator');

    if (!hotLinks.length || !hotImgBox || !linkIndicator) return;

    // --- 1. 오버레이 및 텍스트 영역 동적 생성 ---
    const productOverlay = document.createElement('div');
    productOverlay.className = 'product-overlay';
    productOverlay.innerHTML = `<div class="product-info">
        <h3 id="product-brand"></h3><h2 id="product-title"></h2><p id="product-price"></p>
    </div>`;
    hotImgBox.appendChild(productOverlay);

    const productBrandEl = document.getElementById('product-brand');
    const productTitleEl = document.getElementById('product-title');
    const productPriceEl = document.getElementById('product-price');

    // --- 2. 이미지 교차 전환을 위한 레이어 생성 ---
    const defaultImageUrl = hotImgBox.dataset.defaultImage;
    const layer1 = document.createElement('div');
    const layer2 = document.createElement('div');
    layer1.className = 'img-layer';
    layer2.className = 'img-layer';
    hotImgBox.append(layer1, layer2);

    let activeLayer = layer1; // 현재 활성화된 레이어

    if (defaultImageUrl) {
        layer1.style.backgroundImage = `url('${defaultImageUrl}')`;
        layer1.style.opacity = 1;
        layer2.style.opacity = 0;
    }

    // --- 3. 이벤트 리스너 추가 ---
    hotLinks.forEach(link => {
        const linkParentLi = link.parentElement;

        link.addEventListener('mouseenter', () => {
            // 인디케이터 위치 및 크기 업데이트
            linkIndicator.style.top = `${linkParentLi.offsetTop}px`;
            linkIndicator.style.height = `${linkParentLi.offsetHeight}px`;

            // 데이터 읽어오기
            const newImage = link.dataset.image;
            const newBrand = link.dataset.brand;
            const newTitle = link.dataset.title;
            const newPrice = link.dataset.price;

            // 비활성 레이어에 새 이미지 설정
            const inactiveLayer = (activeLayer === layer1) ? layer2 : layer1;
            if (newImage) {
                inactiveLayer.style.backgroundImage = `url('${newImage}')`;
            }

            // 레이어 교차 전환
            activeLayer.style.opacity = 0;
            inactiveLayer.style.opacity = 1;
            activeLayer = inactiveLayer; // 활성 레이어 업데이트

            // 텍스트 업데이트 및 오버레이 보이기
            productBrandEl.textContent = newBrand || '';
            productTitleEl.textContent = newTitle || '';
            productPriceEl.textContent = newPrice || '';
            productOverlay.classList.add('show');
        });

        link.addEventListener('mouseleave', () => {
            // 인디케이터 숨기기 (높이를 0으로)
            linkIndicator.style.height = '0px';

            // 기본 이미지로 교차 전환
            const inactiveLayer = (activeLayer === layer1) ? layer2 : layer1;
            if (defaultImageUrl) {
                inactiveLayer.style.backgroundImage = `url('${defaultImageUrl}')`;
            }
            activeLayer.style.opacity = 0;
            inactiveLayer.style.opacity = 1;
            activeLayer = inactiveLayer;

            // 오버레이 숨기기
            productOverlay.classList.remove('show');
        });
    });
});







// review
document.addEventListener('DOMContentLoaded', () => {
    const reviewSlider = document.querySelector('.review-slider');
    const reviewTrack = document.querySelector('.review-track');
    const prevBtn = document.querySelector('.arrow.prev');
    const nextBtn = document.querySelector('.arrow.next');

    if (!reviewTrack || !reviewSlider) return;

    let items = Array.from(reviewTrack.children);
    let itemWidth;
    let totalWidth;
    let position = 0;
    let autoSlide;

    // 트랙 복제 → 무한 루프 효과
    reviewTrack.innerHTML += reviewTrack.innerHTML;
    items = Array.from(reviewTrack.children);

    // 카드 폭 + 총 길이 계산
    function updateSizes() {
        const style = getComputedStyle(items[0]);
        const marginRight = parseInt(style.marginRight) || 0;
        itemWidth = items[0].offsetWidth + marginRight;
        totalWidth = (items.length / 2) * itemWidth; // 원본 카드 4개 기준 길이
    }

    updateSizes();
    window.addEventListener('resize', updateSizes);

    // 슬라이드 이동 함수
    function moveSlide(step = 1) {
        position -= step;
        reviewTrack.style.transform = `translateX(${position}px)`;

        // 원본 길이 넘어가면 리셋
        if (Math.abs(position) >= totalWidth) {
            setTimeout(() => {
                position = 0;
                reviewTrack.style.transition = 'none';
                reviewTrack.style.transform = `translateX(0px)`;

                requestAnimationFrame(() => {
                    reviewTrack.style.transition = 'transform 0.5s linear';
                });
            }, 50);
        }
    }

    // 자동 슬라이드
    function startAutoSlide() {
        autoSlide = setInterval(() => moveSlide(2), 30); // 속도 조절 가능 (2px씩 30ms마다)
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    reviewSlider.addEventListener('mouseenter', stopAutoSlide);
    reviewSlider.addEventListener('mouseleave', startAutoSlide);

    // 수동 슬라이드 이동 함수 (버튼용)
    function moveSlideByCard(direction) {
        const moveDistance = itemWidth * direction;
        position -= moveDistance;

        reviewTrack.style.transition = 'transform 0.5s ease-in-out';
        reviewTrack.style.transform = `translateX(${position}px)`;

        // 경계 체크 및 리셋
        if (Math.abs(position) >= totalWidth) {
            setTimeout(() => {
                position = 0;
                reviewTrack.style.transition = 'none';
                reviewTrack.style.transform = `translateX(0px)`;

                requestAnimationFrame(() => {
                    reviewTrack.style.transition = 'transform 0.5s linear';
                });
            }, 500);
        } else if (position > 0) {
            setTimeout(() => {
                position = -totalWidth + itemWidth;
                reviewTrack.style.transition = 'none';
                reviewTrack.style.transform = `translateX(${position}px)`;

                requestAnimationFrame(() => {
                    reviewTrack.style.transition = 'transform 0.5s linear';
                });
            }, 500);
        }
    }

    // 버튼 제어
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        moveSlideByCard(1); // 이전 카드 (오른쪽으로 한 카드폭 이동)
        setTimeout(() => startAutoSlide(), 1500);
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        moveSlideByCard(-1); // 다음 카드 (왼쪽으로 한 카드폭 이동)
        setTimeout(() => startAutoSlide(), 1500);
    });

    reviewTrack.style.transition = 'transform 0.5s linear';
    startAutoSlide();
});

// (기존 DOMContentLoaded 이벤트 리스너 안에 추가)

// =========================
// 위로가기 버튼 기능
// =========================
const toTopBtn = document.querySelector('.to-top');

if (toTopBtn) {
    // 스크롤 이벤트 감지
    window.addEventListener('scroll', () => {
        // 300px 이상 스크롤되면 'show' 클래스 추가, 아니면 제거
        if (window.scrollY > 300) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }
    });

    // 클릭 이벤트
    toTopBtn.addEventListener('click', (e) => {
        e.preventDefault(); // a 태그의 기본 동작(페이지 이동) 방지
        window.scrollTo({
            top: 0, // 맨 위로
            behavior: 'smooth' // 부드럽게 이동
        });
    });
}






// hot
class HotDropsController {
    constructor() {
        this.imageContainer = document.getElementById('imageContainer');
        this.productImage = document.getElementById('productImage');
        this.productDetails = document.getElementById('productDetails');
        this.indicator = document.getElementById('indicator');
        this.links = document.querySelectorAll('.txtBox li a');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // 첫 번째 상품으로 초기화
        this.updateProduct(this.links[0]);
        this.updateIndicator(0);

        // 이벤트 리스너 등록
        this.links.forEach((link, index) => {
            link.addEventListener('mouseenter', () => {
                this.updateProduct(link);
                this.updateIndicator(index);
                this.currentIndex = index;
            });

            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleProductClick(link);
            });
        });

        // 자동 슬라이드 (선택사항)
        // this.startAutoSlide();
    }

    updateProduct(link) {
        const image = link.dataset.image;
        const brand = link.dataset.brand;
        const title = link.dataset.title;
        const price = link.dataset.price;

        // 로딩 효과 시작
        this.imageContainer.classList.add('loading-shimmer');

        // 이미지 페이드 아웃
        this.productImage.style.opacity = '0';

        setTimeout(() => {
            // 이미지 변경
            this.productImage.style.backgroundImage = `url(${image})`;

            // 상품 정보 업데이트
            document.getElementById('productBrand').textContent = brand;
            document.getElementById('productTitle').textContent = title;
            document.getElementById('productPrice').textContent = price;

            // 이미지 페이드 인
            this.productImage.style.opacity = '1';

            // 로딩 효과 제거
            setTimeout(() => {
                this.imageContainer.classList.remove('loading-shimmer');
            }, 300);
        }, 300);
    }

    updateIndicator(index) {
        const linkElement = this.links[index];
        const rect = linkElement.getBoundingClientRect();
        const containerRect = linkElement.closest('ul').getBoundingClientRect();

        const top = rect.top - containerRect.top;
        const height = rect.height;

        this.indicator.style.top = `${top}px`;
        this.indicator.style.height = `${height}px`;
    }

    handleProductClick(link) {
        // 클릭 애니메이션
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);

        // 여기에 실제 상품 페이지로 이동하는 로직 추가
        console.log('상품 클릭:', link.dataset.title);
    }

    startAutoSlide() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.links.length;
            this.updateProduct(this.links[this.currentIndex]);
            this.updateIndicator(this.currentIndex);
        }, 5000); // 5초마다 변경
    }
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    new HotDropsController();
});

// 1. 필요한 요소들을 선택합니다.
const header = document.querySelector('.header');

// 2. 스크롤 이벤트를 감지하는 함수를 만듭니다.
function handleScroll() {
    // window.scrollY는 수직 스크롤 위치를 픽셀 단위로 반환합니다.
    // 100px보다 많이 스크롤되면
    if (window.scrollY > 100) {
        // header 요소에 'sticky' 클래스를 추가합니다.
        header.classList.add('sticky');
    } else {
        // 100px 미만이면 'sticky' 클래스를 제거합니다.
        header.classList.remove('sticky');
    }
}

// 3. window 객체에 스크롤 이벤트 리스너를 추가합니다.
// 스크롤될 때마다 handleScroll 함수가 실행됩니다.
window.addEventListener('scroll', handleScroll);