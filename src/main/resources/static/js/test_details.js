// Приклад коду для заповнення інформації про тест з бази даних
document.addEventListener("DOMContentLoaded", function() {
    // Отримання ID тесту з URL
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');

    // Отримання інформації про тест з бази даних
    // Ваш код для запиту до бази даних, наприклад, з використанням Fetch або AJAX

    // Приклад коду для відображення інформації на сторінці
    const testNameElement = document.querySelector('.details__header h1');
    const testDescriptionElement = document.querySelector('.details__description h4');
    const testQuestCountElement = document.querySelector('.details__questcount p');

    // Заповнення отриманою інформацією
    testNameElement.textContent = testData.name; // testData - об'єкт із інформацією про тест
    testDescriptionElement.textContent = testData.description;
    testQuestCountElement.textContent = `Кількість питань тесту: ${testData.questionCount}`;

    // Додавання обробника події на кнопку "Почати тестування"
    const startTestButton = document.querySelector('.details__btn--start');
    startTestButton.addEventListener('click', function() {
        // Перенаправлення на сторінку з тестуванням, де ви можете розпочати тест
        window.location.href = `/start-test.html?id=${testId}`;
    });
});

