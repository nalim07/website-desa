let current = 0;
const slides = document.querySelectorAll('.hero-carousel img');
const total = slides.length;

setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % total;
    slides[current].classList.add('active');
}, 5000);
