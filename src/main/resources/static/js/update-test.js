document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');
    const questionsList = document.getElementById("questions-list");
    const addQuestionBtn = document.getElementById("add-question-btn");
    const saveTestBtn = document.getElementById("save-test-btn");

    // Отримання даних про тест з сервера (замініть URL на ваш)
    fetch(`api/test/${testId}`)
        .then(response => response.json())
        .then(data => {
            // Відображення інформації про тест
            document.getElementById("course-name").value = data.name;
            document.getElementById("course-description").value = data.description;
            document.querySelector(".dropdown__button").textContent = data.topic;
            
            // Відображення блоків питань
            data.questions.forEach((question, index) => {
                const questionItem = document.createElement("li");
                questionItem.innerHTML = `
                    <div class="question-area-update">
                        <textarea class="question-text">${question.text}</textarea>
                        <button title="Додати відповідь" class="add-answer-btn radio-batton-tests-buttons-delete">+</button>
                        <p class="update-type">Оберіть тип відповіді:</p>
                        <select class="question-type">
                            <option value="1" ${question.type === 1 ? 'selected' : ''}>Одна відповідь</option>
                            <option value="2" ${question.type === 2 ? 'selected' : ''}>Декілька відповідей</option>
                        </select>
                        <button title="Видалити запитання" class="delete-question-btn radio-batton-tests-buttons-delete">×</button>
                    </div>
                    <ul class="answers-list">
                        ${question.answers.map(answer => `
                            <li>
                                <input type="${question.type === 1 ? 'radio' : 'checkbox'}" name="answer-group-${index}" ${answer.isCorrect ? 'checked' : ''}>
                                <input class="answer-text" value="${answer.text}">
                                <button title="Видалити відповідь" class="delete-answer-btn radio-batton-tests-buttons-delete">×</button>
                            </li>
                        `).join('')}
                    </ul>
                `;
                questionsList.appendChild(questionItem);
            });
        });

    // Додавання обробників подій
    addQuestionBtn.addEventListener("click", function () {
        const questionIndex = questionsList.children.length;
        const questionItem = document.createElement("li");
        questionItem.innerHTML = `
            <div class="question-area-update">
                <textarea class="question-text" placeholder="Введіть текст запитання"></textarea>
                <button class="add-answer-btn radio-batton-tests-buttons-delete">+</button>
                <select class="question-type">
                    <option value="1">Радіобатон</option>
                    <option value="2">Чекбокс</option>
                </select>
                <button class="delete-question-btn radio-batton-tests-buttons-delete">×</button>
            </div>
            <ul class="answers-list"></ul>
        `;
        questionsList.appendChild(questionItem);
    });

    questionsList.addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("add-answer-btn")) {
            const answersList = target.parentElement.nextElementSibling;
            const questionType = target.parentElement.querySelector(".question-type").value;
            const questionIndex = Array.from(questionsList.children).indexOf(target.closest("li"));
            const answerItem = document.createElement("li");
            answerItem.innerHTML = `
                <input type="${questionType === '1' ? 'radio' : 'checkbox'}" name="answer-group-${questionIndex}">
                <input class="answer-text" placeholder="Введіть текст відповіді">
                <button class="delete-answer-btn radio-batton-tests-buttons-delete">×</button>
            `;
            answersList.appendChild(answerItem);
        } else if (target.classList.contains("delete-answer-btn")) {
            target.parentElement.remove();
        } else if (target.classList.contains("delete-question-btn")) {
            target.closest("li").remove();
        }
    });

    questionsList.addEventListener("change", function (event) {
        const target = event.target;
        if (target.classList.contains("question-type")) {
            const questionItem = target.closest("li");
            const questionIndex = Array.from(questionsList.children).indexOf(questionItem);
            const answersList = questionItem.querySelector(".answers-list");
            const newType = target.value;
            const inputs = answersList.querySelectorAll("input[type='radio'], input[type='checkbox']");
            inputs.forEach(input => {
                input.type = newType === '1' ? 'radio' : 'checkbox';
                input.name = `answer-group-${questionIndex}`;
            });
        }
    });

    saveTestBtn.addEventListener("click", function () {
        // Отримання даних про тест для збереження та відправлення на сервер
        let author = document.querySelector(".header__user-name").textContent.trim();
        let name = document.getElementById("course-name").value.trim();
        let description = document.getElementById("course-description").value.trim();
        let topic = document.querySelector(".dropdown__button").textContent.trim();

        let test = {
            author: author,
            name: name,
            description: description,
            topic: topic,
            questions: []
        };

        let questionAreas = document.querySelectorAll(".question-area-update");
        questionAreas.forEach((questionArea, questionIndex) => {
            let questionText = questionArea.querySelector("textarea").value.trim();
            let testTypeRadios = questionArea.parentNode.querySelector(".question-type");
            let testType = testTypeRadios.value;

            let answers = [];
            let answerItems = questionArea.parentNode.querySelectorAll(".answers-list li");
            answerItems.forEach((answerItem, answerIndex) => {
                let answerText = answerItem.querySelector(".answer-text").value.trim();
                let isCorrect = answerItem.querySelector(`input[type="${testType === '1' ? 'radio' : 'checkbox'}"]`).checked;
                answers.push({
                    text: answerText,
                    isCorrect: isCorrect,
                });
            });

            test.questions.push({
                text: questionText,
                type: parseInt(testType),
                answers: answers,
            });
        });

        console.log(test)
        fetch(`/api/test/${testId}/update`, {
            method: "PUT", 
            body: JSON.stringify(test),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = `/test-details.html?id=${testId}`;
            } else {
                alert("Виникла помилка при збереженні змін.");
            }
        })
        .catch(error => console.error("Помилка при відправленні даних на сервер:", error));
    });
});
