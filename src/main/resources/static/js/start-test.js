document.addEventListener('DOMContentLoaded', function() {
    // Отримання ID тесту з параметрів URL
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');

    // Виконання запиту до бази даних за допомогою fetch
    fetch(`/api/test/${testId}`)
        .then(response => response.json())
        .then(test => {
            // Відображення питань на сторінці
            const questionContainer = document.querySelector('.question-container');
            test.questions.forEach(question => {
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                questionElement.innerHTML = `
                    <h3>${question.text}</h3>
                    ${question.answers.map(answer => `
                        <div>
                            ${question.type === 1 ? `<input type="radio" name="question-${question.id}" value="${answer.id}">` : `<input type="checkbox" name="question-${question.id}" value="${answer.id}">`}
                            <label>${answer.text}</label>
                        </div>
                    `).join('')}
                `;
                questionContainer.appendChild(questionElement);
            });

            // Функція для перевірки відповідей
            function checkAnswers() {
                let score = 0;
                test.questions.forEach(question => {
                    const selectedAnswers = Array.from(document.querySelectorAll(`input[name="question-${question.id}"]:checked`)).map(input => parseInt(input.value));
                    const correctAnswers = question.answers.filter(answer => answer.isCorrect).map(answer => answer.id);
                    if (JSON.stringify(selectedAnswers) === JSON.stringify(correctAnswers)) {
                        score++;
                    }
                });
                alert(`Ваш результат: ${score}/${test.questions.length}`);
            }

            // Обробник події кнопки "Завершити тест"
            const submitButton = document.getElementById('submit-btn');
            submitButton.addEventListener('click', checkAnswers);
        })
        .catch(error => console.error('Помилка при отриманні питань:', error));
});
