document.addEventListener("DOMContentLoaded", function () {
  let questions = []; // Масив для зберігання питань та відповідей
  let radioBtnCounter = 3; // Лічильник для унікальних id радіо кнопок

  // Додати обробник подій для кнопки "plus"
  document.querySelector(".radio-batton-tests-plus").addEventListener("click", function () {
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
    document.querySelector(".radio-batton-tests-ol").appendChild(newLi);

    // Додати обробник подій для кнопки "delete" на новоствореному елементі li
    newLi.querySelector(".radio-batton-tests-buttons-delete").addEventListener("click", function () {
      // Видалити батьківський елемент li
      newLi.remove();
    });
  });

  document.querySelector(".button-add-test").addEventListener("click", function() {
    // Створення нового елемента li new-test-li
    let newLiTest = document.createElement("li");
    newLiTest.classList.add("new-test-li", "before-creation-h2", "before-creation-h1-blue");
    // Заповнення елемента li необхідними елементами
    newLiTest.innerHTML = `
      Оберіть вид тесту:
      <div class="build-test">
        <div class="build-test-choise">
          <input
            type="radio"
            id="radio1"
            name="radios-choise"
            value="1"
            checked
          />
          <label for="radio1"><img class="build-test-img" src="" /></label>

          <input
            type="radio"
            id="radio2"
            name="radios-choise"
            value="2"
          />
          <label for="radio2"><img class="build-test-img" src="" /></label>
        </div>
      </div>
      <div class="question-area">
        <label
          for="test-question"
          class="question-area-label before-creation-text-blue before-creation-h2 before-creation-h1-blue"
        >Заповніть всі комірки</label>
        <textarea
          class="before-creation-text question-area-text before-creation-text-blue"
          id="test-question"
          name="test-question"
          placeholder="Напишіть питання"
          required
        ></textarea>
      </div>
      <div class="radio-batton-tests">
        <ol class="radio-batton-tests-ol before-creation-text-blue">
          <li class="radio-batton-tests-li">
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
                  id="radio-button-test1"
                  name="radio-buttons-test"
                  class="visually-hidden"
                />
                <label
                  for="radio-button-test1"
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
          </li>
          <li class="radio-batton-tests-li">
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
                  id="radio-button-test2"
                  name="radio-buttons-test"
                  class="visually-hidden"
                />
                <label
                  for="radio-button-test2"
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
          </li>
        </ol>
        <div class="buttons-flex">
          <button class="radio-batton-tests-plus">
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <button class="radio-batton-tests-buttons-delete delete-page">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="trash-icon block-center"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    `;
    // Додати новий елемент li до ol
    document.querySelector(".new-test-ol").appendChild(newLiTest);

    // Додати обробник подій для кнопки "delete" на вже існуючих елементах li
    newLiTest.querySelectorAll(".radio-batton-tests-buttons-delete").forEach(function (button) {
      button.addEventListener("click", function () {
        // Видалити батьківський елемент li
        button.closest("li").remove();
      });
    });

    // Додати обробник подій для кнопки "plus" всередині нового тесту
    newLiTest.querySelector(".radio-batton-tests-plus").addEventListener("click", function () {
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
      newLiTest.querySelector(".radio-batton-tests-ol").appendChild(newLi);

      // Додати обробник подій для кнопки "delete" на новоствореному елементі li
      newLi.querySelector(".radio-batton-tests-buttons-delete").addEventListener("click", function () {
        // Видалити батьківський елемент li
        newLi.remove();
      });
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
  document.querySelector(".button-save-test").addEventListener("click", function () {
    let questionText = document.getElementById("test-question").value.trim(); // Отримати текст питання
    let answerTexts = Array.from(document.querySelectorAll(".radio-batton-tests-li-grid textarea")).map((textarea) => textarea.value.trim()); // Отримати всі тексти відповідей

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
      document.querySelectorAll(".radio-batton-tests-li-grid textarea").forEach((textarea) => (textarea.value = ""));

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
