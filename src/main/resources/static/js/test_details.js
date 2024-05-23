function showNotification(message, duration) {
    const notification = document.getElementById('notification');
    const progressBar = document.getElementById('progressBar');
  
    notification.style.padding = '20px 40px';
  
    notification.innerText = message;
    notification.style.display = 'block';
  
    progressBar.style.width = '0'; 
    progressBar.style.transition = `width ${duration}ms linear`;
  
    progressBar.style.width = '100%'; 
  
    setTimeout(() => {
        notification.style.display = 'none';
        progressBar.style.width = '0';
        notification.style.padding = '0';
    }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
    // Отримання ID тесту з параметрів URL
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');

    // Отримання кнопки редагування тесту
    const updateTestButton = document.getElementById('test-update');

    // Додавання обробника події для кнопки редагування тесту
    updateTestButton.addEventListener('click', function() {
        // Перенаправлення користувача на сторінку редагування тесту з передачею ID тесту в URL
        window.location.href = `/update.html?id=${testId}`;
    });

    // Отримання кнопки видалення тесту
    const deleteTestButton = document.getElementById('test-delete');

    // Додавання обробника події для кнопки видалення тесту
    deleteTestButton.addEventListener('click', function() {
        // Підтвердження дії користувачем
        if (confirm('Ви впевнені, що хочете видалити цей тест?')) {
            // Виконання запиту на видалення тесту
            fetch(`/api/test/${testId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Перенаправлення користувача на головну сторінку після успішного видалення тесту
                    window.location.href = '/test.html';
                } else {
                    console.error('Помилка при видаленні тесту');
                }
            })
            .catch(error => console.error('Помилка при видаленні тесту:', error));
        }
    });

    // Виконання запиту до бази даних за допомогою fetch для отримання інформації про тест
    fetch(`/api/test/${testId}`)
        .then(response => response.json())
        .then(test => {
            const currentUser = document.querySelector('.header__user-name').textContent;

            // Відображення інформації про тест на сторінці
            document.querySelector('.details__header h1').textContent = test.name;
            document.querySelector('.details__description h4').textContent = test.description;
            document.querySelector('.details__questcount p').textContent = `Кількість питань тесту: ${test.questions.length}`;

            // Отримання списку пройдених тестів
            fetch('/api/test/passed')
                .then(response => response.json())
                .then(passedTests => {
                    // Перевірка, чи тест пройдено
                    if (passedTests.hasOwnProperty(testId)) {
                        const testPassedText = `Тест пройдено. Результат: ${passedTests[testId]}/${test.questions.length}`;
                        // Видаляємо кнопку "Почати тестування"
                        const startTestButton = document.querySelector('.details__btn--start');
                        startTestButton.parentNode.removeChild(startTestButton);

                        // Створюємо елемент <p> для відображення результату
                        const resultElement = document.createElement('p');
                        resultElement.classList.add('details__result');
                        resultElement.textContent = testPassedText;

                        // Додаємо елемент <p> до DOM
                        const detailsContainer = document.querySelector('.details__questcount');
                        detailsContainer.appendChild(resultElement);
                    } else {
                        // Додавання обробника події для кнопки "Почати тестування"
                        const startTestButton = document.querySelector('.details__btn--start');
                        startTestButton.addEventListener('click', function() {
                            if (currentUser === 'anonymousUser') { // Перевірка на анонімного користувача
                                showNotification('⚠ Увійдіть в акаунт!', 5000);
                            } else {
                                // Перенаправлення користувача на сторінку для проходження тесту
                                window.location.href = `/start-test.html?id=${testId}`;
                            }
                        });
                    }
                })
                .catch(error => console.error('Помилка при отриманні списку пройдених тестів:', error));

            // Перевірка, чи поточний користувач є автором тесту
            if (currentUser === test.author) {
                // Приховування елементів з класами author-panel та id="result_user"
                document.querySelectorAll('.author-panel').forEach(el => el.style.display = 'flex');
                const resultUser = document.getElementById('result_user');       
                resultUser.style.display = 'block';
                // Отримання статистики користувачів, які пройшли тест
                fetch(`/api/test/${testId}/statistics`)
                    .then(response => response.json())
                    .then(statistics => {
                        // Відображення статистики на сторінці
                        const userResultsContainer = document.querySelector('.details__result--list');
                        
                        if (Object.keys(statistics).length === 0) {
                            const noResultsElement = document.createElement('p');
                            noResultsElement.textContent = 'Тест ще ніхто не проходив';
                            userResultsContainer.appendChild(noResultsElement);
                        } else {
                            Object.entries(statistics).forEach(([username, score]) => {
                                // Створення елемента для кожного користувача
                                const userResultElement = document.createElement('div');
                                userResultElement.classList.add('user-result');

                                // Додавання імені користувача та оцінки
                                const userNameElement = document.createElement('span');
                                userNameElement.textContent = `Користувач: ${username}, Результат: ${score}`;

                                // Створення кнопки для видалення спроби
                                const deleteButton = document.createElement('button');
                                deleteButton.innerHTML = '&times;';
                                deleteButton.title = 'Видалити спробу';
                                deleteButton.addEventListener('click', function() {
                                    // Виконання запиту на видалення спроби користувача
                                    fetch(`/api/test/${testId}/statistics/${username}`, {
                                        method: 'DELETE'
                                    })
                                    .then(response => {
                                        if (response.ok) {
                                            // Видалення елемента користувача зі сторінки
                                            userResultElement.remove();
                                        } else {
                                            console.error('Помилка при видаленні спроби користувача');
                                        }
                                    })
                                    .catch(error => console.error('Помилка при видаленні спроби користувача:', error));
                                });

                                // Додавання елементів до DOM
                                userResultElement.appendChild(userNameElement);
                                userResultElement.appendChild(deleteButton);
                                userResultsContainer.appendChild(userResultElement);
                            });
                        }
                    })
                    .catch(error => console.error('Помилка при отриманні статистики тесту:', error));
            }
        })
        .catch(error => console.error('Помилка при отриманні інформації про тест:', error));
});
