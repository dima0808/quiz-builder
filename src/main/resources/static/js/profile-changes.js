let isEditing = false; // Змінна для відстеження стану редагування

function editUserInfo() {
  if (!isEditing) {
    // Перевіряємо, чи кнопка "Редагувати" активна
    var spans = document.querySelectorAll(".account-grid-labels span");
    spans.forEach(function (span) {
      var input = document.createElement("input");
      input.value = span.textContent;
      span.parentNode.replaceChild(input, span);
    });

    var saveButton = document.createElement("button");
    saveButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="svg-change-characteristics">
    <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
  </svg>
  
  `;
    saveButton.className = "btn-save-characteristics btn-standart";
    saveButton.addEventListener("click", saveUserInfo); // Додаємо обробник подій
    document.querySelector(".btn-change-characteristics").remove();
    document.querySelector(".account-grid-buttons").appendChild(saveButton);

    isEditing = true; // Встановлюємо стан редагування
  } else {
    // Якщо ми вже редагуємо, просто виходимо з функції
    return;
  }
}

function saveUserInfo() {
  var inputs = document.querySelectorAll(".account-grid-labels input");
  inputs.forEach(function (input) {
    var span = document.createElement("span");
    span.textContent = input.value;
    input.parentNode.replaceChild(span, input);
  });

  var editButton = document.createElement("button");
  editButton.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="svg-change-characteristics"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
    />
  </svg>`;
  editButton.className = "btn-change-characteristics btn-standart";
  editButton.addEventListener("click", editUserInfo); // Додаємо обробник подій
  document.querySelector(".btn-save-characteristics").remove();
  document.querySelector(".account-grid-buttons").appendChild(editButton);

  isEditing = false; // Змінюємо стан редагування
}

// Додаємо обробник подій для початкової кнопки "Редагувати"
document
  .querySelector(".btn-change-characteristics")
  .addEventListener("click", editUserInfo);
