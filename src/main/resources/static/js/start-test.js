document.addEventListener('DOMContentLoaded', function() {
    // Отримання ID тесту з параметрів URL
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');

    // Виконання запиту до бази даних за допомогою fetch
    fetch(`/api/test/${testId}`)
        .then(response => response.json())
        .then(test => {
            // Перемішування питань та відповідей
            shuffleQuestionsAndAnswers(test);

            // Додавання обробника події для кліку на стрілочку "Назад"
            const backButton = document.querySelector('.icon-title');
            backButton.addEventListener('click', function() {
                window.location.href = `test-details.html?id=${testId}`;
            });

            // Відображення питань на сторінці
            const questionContainer = document.querySelector('.question-container');
            test.questions.forEach((question, index) => {
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                questionElement.innerHTML = `
                    <h3 class="question__header">${index + 1}. ${question.text}</h3>
                    ${question.answers.map(answer => `
                        <div>
                            ${question.type === 1 ? `<input id="${answer.id}" type="radio" name="question-${question.id}" value="${answer.id}">` : `<input id="${answer.id}" type="checkbox" name="question-${question.id}" value="${answer.id}">`}
                            <label for="${answer.id}">${answer.text}</label>
                        </div>
                    `).join('')}
                `;
                questionContainer.appendChild(questionElement);
            });

            // Функція для перевірки відповідей та збереження результату
            function checkAnswers() {
                let score = 0;
                test.questions.forEach(question => {
                    const selectedAnswers = Array.from(document.querySelectorAll(`input[name="question-${question.id}"]:checked`)).map(input => parseInt(input.value));
                    const correctAnswers = question.answers.filter(answer => answer.isCorrect).map(answer => answer.id);
                    if (JSON.stringify(selectedAnswers) === JSON.stringify(correctAnswers)) {
                        score++;
                    }
                });

                // Відправляємо результат тесту на сервер
                saveTestResult(testId, score);
            }

            // Обробник події кнопки "Завершити тест"
            const submitButton = document.getElementById('submit-btn');
            submitButton.addEventListener('click', checkAnswers);
        })
        .catch(error => console.error('Помилка при отриманні питань:', error));

    // Функція для збереження результату тесту на сервері
    function saveTestResult(testId, score) {
        fetch(`/api/test/${testId}/pass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(score),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Відповідь мережі була неправильною');
            }
            return response.json();
        })
        .then(data => {
            console.log('Результат тесту збережено:', data);
            // Перенаправлення на сторінку test-details.html з ідентифікатором тесту
            window.location.href = `test-details.html?id=${testId}`;
        })
        .catch(error => {
            console.error('Виникла проблема із збереженням результату тесту:', error);
        });
    }

    // Функція для перемішування питань та відповідей
    function shuffleQuestionsAndAnswers(test) {
        // Перемішуємо питання
        test.questions.sort(() => Math.random() - 0.5);
        // Перемішуємо відповіді кожного питання
        test.questions.forEach(question => {
            question.answers.sort(() => Math.random() - 0.5);
        });
    }
});
