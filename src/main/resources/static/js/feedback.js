document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми
  
    // Отримуємо значення полів форми
    const userName = document.querySelector('.header__user-name').textContent;
    const requestType = document.querySelector('input[name="request-type"]:checked').value;
    const topic = document.getElementById('topic').value;
    const message = document.getElementById('message').value;
  
    // Створюємо об'єкт з даними для відправки
    const data = {
      username: userName,
      type: requestType === 'Say Hi' ? 'Say Hi' : 'Get a Quote',
      theme: topic,
      message: message
    };
  
    // Відправляємо POST запит на сервер
    fetch('/api/feedback/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Успіх:', data)
      window.location.href = '/profile.html'
    })
    .catch((error) => {
      console.error('Помилка:', error);
    });
});