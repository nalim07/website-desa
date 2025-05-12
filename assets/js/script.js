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

// JavaScript untuk Hamburger Menu
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav-wrapper');
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';

function toggleNav() {
    navToggle.classList.toggle('nav-active');
    mobileNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

navToggle.addEventListener('click', toggleNav);
navOverlay.addEventListener('click', toggleNav);
document.body.appendChild(navOverlay);

// Close menu saat klik link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', toggleNav);
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Cek posisi scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    // Update class aktif
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Event listener untuk scroll
window.addEventListener('scroll', updateActiveNav);

// Inisialisasi saat pertama load
document.addEventListener('DOMContentLoaded', updateActiveNav);

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
    checkScroll();
}

initAOS();

// Slider
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

// Auto slide
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000);
}

// Pause saat hover
const sliderContainer = document.querySelector('.berita-slider');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// Inisialisasi
startAutoSlide();