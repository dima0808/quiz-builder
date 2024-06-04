document.addEventListener('DOMContentLoaded', function () {
    // Функція для створення нового елементу списку з запитанням і відповіддю
    function createRequestItem(item) {
        const listItem = document.createElement('li');
        const technicalSupportRequest = document.createElement('div');
        technicalSupportRequest.classList.add('technical-support-request');

        const technicalSupportRequestTheme = document.createElement('div');
        technicalSupportRequestTheme.classList.add('technical-support-request-text-theme');
        technicalSupportRequestTheme.textContent = item.theme;

        const technicalSupportRequestText = document.createElement('div');
        technicalSupportRequestText.classList.add('technical-support-request-text');
        technicalSupportRequestText.textContent = item.message;

        const divBetweenData = document.createElement('div');
        divBetweenData.classList.add('div-between-data');

        const nicknameRequest = document.createElement('div');
        nicknameRequest.classList.add('nickname-request', 'text-with-tint');
        nicknameRequest.textContent = item.username;

        const dateRequest = document.createElement('div');
        dateRequest.classList.add('date-request', 'text-with-tint');
        dateRequest.textContent = item.questionDate;

        divBetweenData.appendChild(nicknameRequest);
        divBetweenData.appendChild(dateRequest);

        technicalSupportRequest.appendChild(technicalSupportRequestTheme);
        technicalSupportRequest.appendChild(technicalSupportRequestText);
        technicalSupportRequest.appendChild(divBetweenData);

        const technicalSupportAnswer = document.createElement('div');
        technicalSupportAnswer.classList.add('technical-support-answer');

        if (item.answer) {
            const technicalSupportAnswerText = document.createElement('div');
            technicalSupportAnswerText.classList.add('technical-support-answer-text');
            technicalSupportAnswerText.textContent = item.answer;

            const divBetweenDataAdmin = document.createElement('div');
            divBetweenDataAdmin.classList.add('div-between-data');

            const nicknameAdmin = document.createElement('div');
            nicknameAdmin.classList.add('nickname-admin');
            nicknameAdmin.textContent = 'admin';

            const dateAnswer = document.createElement('div');
            dateAnswer.classList.add('date-answer');
            dateAnswer.textContent = item.answerDate;

            divBetweenDataAdmin.appendChild(nicknameAdmin);
            divBetweenDataAdmin.appendChild(dateAnswer);

            technicalSupportAnswer.appendChild(technicalSupportAnswerText);
            technicalSupportAnswer.appendChild(divBetweenDataAdmin);
        } else {
            // Додавання поля для відповіді, якщо немає відповіді
            const technicalSupportAnswerUnanswered = document.createElement('div');
            technicalSupportAnswerUnanswered.classList.add('technical-support-answer-unanswered');

            const textarea = document.createElement('textarea');
            textarea.classList.add('text-support-unanswered', 'sent-textarea');
            textarea.name = 'text-support-unanswered';
            textarea.placeholder = 'Напишіть відповідь';

            const sendButton = document.createElement('button');
            sendButton.classList.add('reply-to-the-workers', 'btn-colors');
            sendButton.textContent = 'Надіслати';

            sendButton.addEventListener('click', function() {
                const answer = textarea.value;
                if (answer.trim()) {
                    fetch(`/api/admin/feedback/${item.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ answer: answer })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Помилка надсилання відповіді');
                        }
                        return response.json();
                    })
                    .then(updatedItem => {
                        // Оновити відображення відповіді
                        technicalSupportAnswerUnanswered.remove();
                        const technicalSupportAnswerText = document.createElement('div');
                        technicalSupportAnswerText.classList.add('technical-support-answer-text');
                        technicalSupportAnswerText.textContent = updatedItem.answer;

                        const divBetweenDataAdmin = document.createElement('div');
                        divBetweenDataAdmin.classList.add('div-between-data');

                        const nicknameAdmin = document.createElement('div');
                        nicknameAdmin.classList.add('nickname-admin');
                        nicknameAdmin.textContent = 'admin';

                        const dateAnswer = document.createElement('div');
                        dateAnswer.classList.add('date-answer');
                        dateAnswer.textContent = updatedItem.answerDate;

                        divBetweenDataAdmin.appendChild(nicknameAdmin);
                        divBetweenDataAdmin.appendChild(dateAnswer);

                        technicalSupportAnswer.appendChild(technicalSupportAnswerText);
                        technicalSupportAnswer.appendChild(divBetweenDataAdmin);
                    })
                    .catch(error => console.error('Помилка надсилання відповіді:', error));
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-reply-to-the-workers', 'btn-colors');
            deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

            deleteButton.addEventListener('click', function() {
                fetch(`/api/feedback/${item.id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Помилка видалення запиту');
                    }
                    // Видалити елемент зі списку
                    listItem.remove();
                })
                .catch(error => console.error('Помилка видалення запиту:', error));
            });

            technicalSupportAnswerUnanswered.appendChild(textarea);
            technicalSupportAnswerUnanswered.appendChild(sendButton);
            technicalSupportAnswerUnanswered.appendChild(deleteButton);

            technicalSupportAnswer.appendChild(technicalSupportAnswerUnanswered);
        }

        listItem.appendChild(technicalSupportRequest);
        listItem.appendChild(technicalSupportAnswer);

        return listItem;
    }

    // Отримуємо дані про користувача
    fetch('/api/user')
        .then(response => response.json())
        .then(user => {
            const roles = user.roles.map(role => role.name);
            if (roles.includes('ROLE_ADMIN')) {
                // Якщо користувач має роль ADMIN, виконуємо запит до /api/admin/feedback
                fetch('/api/admin/feedback')
                    .then(response => response.json())
                    .then(data => {
                        const kpiSupport = document.getElementById('kpi-support');
                        const unansweredRequests = document.createElement('div');
                        unansweredRequests.classList.add('unanswered-requests');
                        unansweredRequests.innerHTML = `
                            <h2 class="h2-contact">Запити без відповіді</h2>
                            <ul id="noAnswer" class="ul-grid-support-unanswered ul-grid-support"></ul>
                            <div id="no-unanswered-requests" class="no-requests-message" style="display:none;">Ще питань для відповіді немає</div>
                        `;
                        kpiSupport.appendChild(unansweredRequests);

                        const answeredRequests = document.createElement('div');
                        answeredRequests.classList.add('answered-requests');
                        answeredRequests.innerHTML = `
                            <h2 class="h2-contact">Запити на які відповіли</h2>
                            <ul id="yesAnswer" class="ul-grid-support-answered ul-grid-support"></ul>
                            <div id="no-answered-requests" class="no-requests-message" style="display:none;">Ви ще ні разу не відповідали на питання</div>
                        `;
                        kpiSupport.appendChild(answeredRequests);

                        const noAnswerList = unansweredRequests.querySelector('#noAnswer');
                        const yesAnswerList = answeredRequests.querySelector('#yesAnswer');
                        const noUnansweredRequestsMessage = unansweredRequests.querySelector('#no-unanswered-requests');
                        const noAnsweredRequestsMessage = answeredRequests.querySelector('#no-answered-requests');

                        // Заповнення списків запитів
                        if (data.length === 0) {
                            noUnansweredRequestsMessage.style.display = 'block';
                            noAnsweredRequestsMessage.style.display = 'block';
                        } else {
                            data.forEach(item => {
                                if (item.answer) {
                                    yesAnswerList.appendChild(createRequestItem(item));
                                } else {
                                    noAnswerList.appendChild(createRequestItem(item));
                                }
                            });

                            if (noAnswerList.children.length === 0) {
                                noUnansweredRequestsMessage.style.display = 'block';
                            }

                            if (yesAnswerList.children.length === 0) {
                                noAnsweredRequestsMessage.style.display = 'block';
                            }
                        }

                        kpiSupport.classList.add('contact-section-admin');
                        unansweredRequests.style.display = 'block';
                        answeredRequests.style.display = 'block';
                    })
                    .catch(error => console.error('Помилка надсилання:', error));
            } else {
                // Якщо користувач не має роль ADMIN, виконуємо запит до /api/feedback
                fetch('/api/feedback')
                    .then(response => response.json())
                    .then(data => {
                        const supportList = document.getElementById('support-list');
                        if (data.length === 0) {
                            supportList.innerHTML = `<div id="no-feedback" class="no-requests-message">Ви ще ні разу не відправляли повідомлення</div>`;
                        } else {
                            supportList.innerHTML = data.map(item => `
                                <li>
                                    <div class="technical-support-request">
                                        <div class="technical-support-request-text-theme">
                                            ${item.theme}
                                        </div>
                                        <div class="technical-support-request-text">
                                            ${item.message}
                                        </div>
                                        <div class="div-between-data">
                                            <div class="nickname-request text-with-tint">${item.username}</div>
                                            <div class="date-request text-with-tint">${item.questionDate}</div>
                                        </div>
                                    </div>
                                    <div class="technical-support-answer">
                                        ${item.answer 
                                            ? `<div class="technical-support-answer-text">${item.answer}</div>
                                               <div class="div-between-data">
                                                 <div class="nickname-admin">admin</div>
                                                 <div class="date-answer">${item.answerDate}</div>
                                               </div>` 
                                            : 'Зачекайте на відповідь...'
                                        }
                                    </div>
                                </li>
                            `).join('');
                        }
                        supportList.style.display = 'grid';
                    })
                    .catch(error => console.error('Помилка надсилання:', error));
            }
        })
        .catch(error => console.error('Помилка отримання даних про користувача:', error));
});
