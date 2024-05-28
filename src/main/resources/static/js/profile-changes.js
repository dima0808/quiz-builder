let isEditing = false; // Змінна для відстеження стану редагування

function editUserInfo() {
  if (!isEditing) {
      var spans = document.querySelectorAll(".account-grid-labels span");
      spans.forEach(function (span) {
          var input = document.createElement("input");
          input.value = span.textContent;
          input.id = span.id; // Переносимо id
          span.parentNode.replaceChild(input, span);
      });

      var saveButton = document.createElement("button");
      saveButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
      saveButton.className = "btn-save-characteristics btn-standart";
      saveButton.addEventListener("click", saveUserInfo);
      document.querySelector(".btn-change-characteristics").remove();
      document.querySelector(".account-grid-buttons").appendChild(saveButton);

      isEditing = true;
  } else {
      return;
  }
}

function saveUserInfo() {
  var inputs = document.querySelectorAll(".account-grid-labels input");
  inputs.forEach(function (input) {
      var span = document.createElement("span");
      span.textContent = input.value;
      span.id = input.id; // Переносимо id
      input.parentNode.replaceChild(span, input);
  });

  var editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fa-solid fa-feather"></i>`;
  editButton.className = "btn-change-characteristics btn-standart";
  editButton.addEventListener("click", editUserInfo);
  document.querySelector(".btn-save-characteristics").remove();
  document.querySelector(".account-grid-buttons").appendChild(editButton);

  isEditing = false;

  var userData = {
      firstName: document.getElementById('firstName').textContent.trim(),
      secondName: document.getElementById('lastName').textContent.trim(),
      phoneNumber: document.getElementById('phoneNumber').textContent.trim(),
      username: document.getElementById('userName').textContent.trim(),
      email: document.getElementById('email').textContent.trim()
  };

  fetch('/api/user', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Дані користувача оновлено успішно:', data);
      window.location.href = "/profile.html"
  })
  .catch(error => {
      console.error('Помилка при збереженні даних користувача:', error);
  });
}

document
  .querySelector(".btn-change-characteristics")
  .addEventListener("click", editUserInfo);

function populateUserData(data) {
  document.getElementById('userName').textContent = data.username || "Не вказано";
  document.getElementById('lastName').textContent = data.secondName || "Не вказано";
  document.getElementById('firstName').textContent = data.firstName || "Не вказано";
  document.getElementById('email').textContent = data.email || "Не вказано";
  document.getElementById('phoneNumber').textContent = data.phoneNumber || "Не вказано";
}

fetch('/api/user')
  .then(response => response.json())
  .then(data => {
      populateUserData(data);
  })
  .catch(error => {
      console.error('Помилка при отриманні даних:', error);
  });
