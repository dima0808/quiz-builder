document.addEventListener('DOMContentLoaded', function() {
    // Отримання ID тесту з параметрів URL
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');

    // Виконання запиту до бази даних за допомогою fetch
    fetch(`/api/test/${testId}`)
        .then(response => response.json())
        .then(test => {
            // Відображення інформації про тест на сторінці
            document.querySelector('.details__header h1').textContent = test.name;
            document.querySelector('.details__description h4').textContent = test.description;
            document.querySelector('.details__questcount p').textContent = `Кількість питань тесту: ${test.questions.length}`;

            // Додавання обробника події для кнопки "Почати тестування"
            const startTestButton = document.querySelector('.details__btn--start');
            startTestButton.addEventListener('click', function() {
                // Перенаправлення користувача на сторінку для проходження тесту
                window.location.href = `/start-test.html?id=${testId}`;
            });
        })
        .catch(error => console.error('Помилка при отриманні інформації про тест:', error));
});