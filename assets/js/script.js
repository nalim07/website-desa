const header = document.getElementById("myHeader");
let scrollPosition = 0;

window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > 100) { // Ubah 100 menjadi posisi scroll yang Anda inginkan
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