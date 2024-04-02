let lastScrollTop = 0;
const navbar = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Користувач прокрутив сторінку вниз
        navbar.style.transition = 'top 0.3s ease';
        navbar.style.top = "-100px";
    } else {
        // Користувач прокрутив сторінку вгору або сторінка не прокручена
        navbar.style.transition = 'top 0.3s ease';
        navbar.style.top = "0";
        
        // Додавання box-shadow, коли верхня частина сторінки
        if (!scrollTop == 0) {
            navbar.classList.add("scroll-header")
        } else {
            navbar.classList.remove("scroll-header")
        }
    }
    lastScrollTop = scrollTop;
});
