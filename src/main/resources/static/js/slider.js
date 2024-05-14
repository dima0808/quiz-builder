document.addEventListener('DOMContentLoaded', function() {
    // Перевіряємо ширину екрана
    const screenWidth = window.innerWidth;

    // Перевіряємо, чи ширина екрана більше за 1024px
    if (screenWidth > 1024) {
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        const popularTestList = document.querySelector('.popular-test__list');
        const popularTestItems = document.querySelectorAll('.popular-test__item');
        const slideWidth = popularTestItems[0].offsetWidth; // Ширина одного слайда
        const slideCount = 4; // Кількість слайдів
        let currentIndex = 0; // Поточний індекс слайда

        updateButtonsState(); // Викликаємо функцію для оновлення стану кнопок при завантаженні сторінки

        // Функція для оновлення стану кнопок
        function updateButtonsState() {
            // Оновлюємо стан кнопки prevButton
            if (currentIndex === 0) {
                prevButton.classList.add('disabled');
            } else {
                prevButton.classList.remove('disabled');
            }

            // Оновлюємо стан кнопки nextButton
            if (currentIndex === slideCount - 1) {
                nextButton.classList.add('disabled');
            } else {
                nextButton.classList.remove('disabled');
            }
        }

        // Функція для переміщення слайдів вліво
        function slideLeft() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            popularTestList.style.transform = `translateX(-${(slideWidth * 1.0625) * currentIndex}px)`;
            updateButtonsState(); // Після переміщення слайдів, оновлюємо стан кнопок
        }

        // Функція для переміщення слайдів вправо
        function slideRight() {
            currentIndex = (currentIndex + 1) % slideCount;
            popularTestList.style.transform = `translateX(-${(slideWidth * 1.0625) * currentIndex}px)`;
            updateButtonsState(); // Після переміщення слайдів, оновлюємо стан кнопок
        }

        // Обробники подій для кнопок "Наступний" і "Попередній"
        prevButton.addEventListener('click', slideLeft);
        nextButton.addEventListener('click', slideRight);
    }
});
