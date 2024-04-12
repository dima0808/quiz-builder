document.addEventListener("DOMContentLoaded", function () {
  let questions = []; // Масив для зберігання питань та відповідей
  let radioBtnCounter = 2; // Лічильник для унікальних id радіо кнопок

  // Додати обробник подій для кнопки "plus"
  document
    .querySelector(".radio-batton-tests-plus")
    .addEventListener("click", function () {
      // Створення нового елемента li
      let newLi = document.createElement("li");
      newLi.classList.add("radio-batton-tests-li");

      // Заповнення елемента li необхідними елементами
      newLi.innerHTML = `
        <div class="radio-batton-tests-li-grid">
          <textarea
            class="before-creation-text question-area-text before-creation-text-blue"
            id="test-answer"
            name="test-question"
            placeholder="Напишіть варіант відповіді"
            required
          ></textarea>
          <div class="radio-batton-tests-buttons">
            <input
              type="radio"
              id="radio-button-test${radioBtnCounter}"
              name="radio-buttons-test"
              class="visually-hidden"
            />
            <label
              for="radio-button-test${radioBtnCounter}"
              class="radio-batton-tests-buttons-circle"
            ></label>

            <button class="radio-batton-tests-buttons-delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      `;

      // Збільшення лічильника для наступної радіо кнопки
      radioBtnCounter++;

      // Додати новий елемент li до ol
      document
        .querySelector(".radio-batton-tests-ol")
        .appendChild(newLi);

      // Додати обробник подій для кнопки "delete" на новоствореному елементі li
      newLi
        .querySelector(".radio-batton-tests-buttons-delete")
        .addEventListener("click", function () {
          // Видалити батьківський елемент li
          newLi.remove();
        });
    });

  // Додати обробник подій для кнопки "delete" на вже існуючих елементах li
  document.querySelectorAll(".radio-batton-tests-buttons-delete").forEach(function (button) {
    button.addEventListener("click", function () {
      // Видалити батьківський елемент li
      button.closest("li").remove();
    });
  });

  // Додати обробник подій для кнопки "save"
  document
    .querySelector(".button-save-test")
    .addEventListener("click", function () {
      let questionText = document
        .getElementById("test-question")
        .value.trim(); // Отримати текст питання
      let answerTexts = Array.from(
        document.querySelectorAll(
          ".radio-batton-tests-li-grid textarea"
        )
      ).map((textarea) => textarea.value.trim()); // Отримати всі тексти відповідей

      // Перевірка, чи є текст питання та хоча б одна відповідь непорожньою
      if (questionText !== "" && answerTexts.some((answer) => answer !== "")) {
        // Створення об'єкта для питання
        let question = {
          text: questionText,
          answers: answerTexts.map((answerText) => ({ text: answerText })),
        };

        // Додати інформацію про питання до масиву
        questions.push(question);

        // Очистити поля
        document.getElementById("test-question").value = "";
        document
          .querySelectorAll(".radio-batton-tests-li-grid textarea")
          .forEach((textarea) => (textarea.value = ""));

        // Оновити список питань та відповідей
        updateQuestionList();
      }
    });

  // Функція для оновлення списку питань та відповідей
  function updateQuestionList() {
    // Виведення масиву з питаннями та відповідями у консоль
    console.log(questions);
  }
});
