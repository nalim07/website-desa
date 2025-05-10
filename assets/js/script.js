const header = document.getElementById("myHeader");
let scrollPosition = 0;

window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > 100) {
        header.classList.remove("transparent");
        header.classList.add("solid");
    } else {
        header.classList.remove("solid");
        header.classList.add("transparent");
    }

    scrollPosition = currentScrollPosition;
});

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('show-nav');
    navToggle.classList.toggle('nav-active');
});

document.addEventListener('click', (event) => {
    if (!navList.contains(event.target) && !navToggle.contains(event.target)) {
        navList.classList.remove('show-nav');
        navToggle.classList.remove('nav-active');
    }
});

// Smooth scroll dan offset untuk fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80;

        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

// Animasi scroll
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');

    const checkScroll = () => {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;

            if (isVisible) {
                el.classList.add('aos-animate');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Init check
}

initAOS();

// Slider Functionality
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider-item');
const dotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

// Navigation functions
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    sliderTrack.style.transform = `translateX(-${slideIndex * 100}%)`;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

document.querySelector('.next-slide').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
});

document.querySelector('.prev-slide').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
});

// Auto slide (optional)
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}, 5000);