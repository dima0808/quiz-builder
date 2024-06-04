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

    // Виконуємо запит до бази даних для отримання інформації про тест
    fetch(`/api/test/${testId}`)
        .then(response => response.json())
        .then(test => {
            // Відображення інформації про тест на сторінці
            document.querySelector('.details__header h1').textContent = test.name;
            document.querySelector('.details__description h4').textContent = test.description;
            document.querySelector('.details__questcount p').textContent = `Кількість питань тесту: ${test.questions.length}`;
            const resultUser = document.getElementById('result_user');    

            // Виконуємо запит для отримання інформації про користувача
            fetch('/api/user')
                .then(response => response.json())
                .then(user => {
                    const roles = user.roles.map(role => role.name);
                    const currentUser = document.querySelector('.header__user-name').textContent;

                    fetch('/api/test/passed')
                        .then(response => response.json())
                        .then(passedTests => {
                            if (passedTests.hasOwnProperty(testId)) {
                                const testPassedText = `Тест пройдено. Результат: ${passedTests[testId]}/${test.questions.length}`;
                                const startTestButton = document.querySelector('.details__btn--start');
                                startTestButton.parentNode.removeChild(startTestButton);

                                const resultElement = document.createElement('p');
                                resultElement.classList.add('details__result');
                                resultElement.textContent = testPassedText;

                                const detailsContainer = document.querySelector('.details__questcount');
                                detailsContainer.appendChild(resultElement);
                            } else {
                                const startTestButton = document.querySelector('.details__btn--start');
                                startTestButton.addEventListener('click', function() {
                                    if (currentUser === 'anonymousUser') {
                                        showNotification('⚠ Увійдіть в акаунт!', 5000);
                                    } else {
                                        window.location.href = `/start-test.html?id=${testId}`;
                                    }
                                });
                            }
                        })
                        .catch(error => console.error('Помилка при отриманні списку пройдених тестів:', error));

                    // Панель автора і адміністратора
                    if (currentUser === test.author || roles.includes('ROLE_ADMIN')) {
                        document.querySelectorAll('.author-panel').forEach(el => el.style.display = 'flex');     
                        resultUser.style.display = 'block';

                        const updateTestButton = document.getElementById('test-update');
                        updateTestButton.addEventListener('click', function() {
                            window.location.href = `/update.html?id=${testId}`;
                        });

                        const deleteTestButton = document.getElementById('test-delete');
                        deleteTestButton.addEventListener('click', function() {
                            if (confirm('Ви впевнені, що хочете видалити цей тест?')) {
                                fetch(`/api/test/${testId}`, { method: 'DELETE' })
                                .then(response => {
                                    if (response.ok) {
                                        window.location.href = '/test.html';
                                    } else {
                                        console.error('Помилка при видаленні тесту');
                                    }
                                })
                                .catch(error => console.error('Помилка при видаленні тесту:', error));
                            }
                        });

                        // Приховати список пройдених тестів і кнопку для адміністратора
                        if (roles.includes('ROLE_ADMIN')) {
                            document.querySelector('.details__result--list').style.display = 'none';
                            document.getElementById('list-user').style.display = 'none';      
                            resultUser.style.display = 'none';
                        } else {
                            fetch(`/api/test/${testId}/statistics`)
                                .then(response => response.json())
                                .then(statistics => {
                                    const userResultsContainer = document.querySelector('.details__result--list');

                                    if (Object.keys(statistics).length === 0) {
                                        const noResultsElement = document.createElement('p');
                                        noResultsElement.textContent = 'Тест ще ніхто не проходив';
                                        userResultsContainer.appendChild(noResultsElement);
                                    } else {
                                        Object.entries(statistics).forEach(([username, score]) => {
                                            const userResultElement = document.createElement('div');
                                            userResultElement.classList.add('user-result');

                                            const userNameElement = document.createElement('span');
                                            userNameElement.textContent = `Користувач: ${username}, Результат: ${score}`;

                                            const deleteButton = document.createElement('button');
                                            deleteButton.innerHTML = '&times;';
                                            deleteButton.title = 'Видалити спробу';
                                            deleteButton.addEventListener('click', function() {
                                                fetch(`/api/test/${testId}/statistics/${username}`, { method: 'DELETE' })
                                                .then(response => {
                                                    if (response.ok) {
                                                        userResultElement.remove();
                                                    } else {
                                                        console.error('Помилка при видаленні спроби користувача');
                                                    }
                                                })
                                                .catch(error => console.error('Помилка при видаленні спроби користувача:', error));
                                            });

                                            userResultElement.appendChild(userNameElement);
                                            userResultElement.appendChild(deleteButton);
                                            userResultsContainer.appendChild(userResultElement);
                                        });
                                    }
                                })
                                .catch(error => console.error('Помилка при отриманні статистики тесту:', error));
                        }
                    } else {
                        document.querySelectorAll('.author-panel').forEach(el => el.style.display = 'none');     
                        resultUser.style.display = 'none';
                    }
                })
                .catch(error => {
                    // Обробка для анонімних користувачів або у випадку помилки запиту користувача
                    console.error('Помилка при отриманні інформації про користувача:', error);
                    const startTestButton = document.querySelector('.details__btn--start');
                    startTestButton.addEventListener('click', function() {
                        showNotification('⚠ Увійдіть в акаунт, щоб розпочати тест!', 5000);
                    });
                });
        })
        .catch(error => console.error('Помилка при отриманні інформації про тест:', error));
});

