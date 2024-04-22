document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".button-add-test").click();
});

let questions = []; // Масив для зберігання питань та відповідей
let questionCounter = 0;
document
  .querySelector(".button-add-test")
  .addEventListener("click", function () {
    // Створення нового елемента li new-test-li
    let newLiTest = document.createElement("li");
    newLiTest.classList.add(
      "new-test-li",
      "before-creation-h2",
      "before-creation-h1-blue"
    );
    // Заповнення елемента li необхідними елементами

    let answerInnerCounter = 1;
    questionCounter++;

    newLiTest.innerHTML = `
      Оберіть вид тесту:
      <div class="build-test">
        <div class="build-test-choise">
          <input
            type="radio"
            id="radio-${questionCounter}-1"
            name="radios-choise-${questionCounter}"
            value="1"
            checked
          />
          <label for="radio-${questionCounter}-1"><img class="build-test-img" src="/images/radio-button-icon.png"  alt="одна відповідь"/></label>

          <input
            type="radio"
            id="radio-${questionCounter}-2"
            name="radios-choise-${questionCounter}"
            value="2"
          />
          <label for="radio-${questionCounter}-2"><img class="build-test-img" src="/images/checkbox-icon.png"  alt="декілька відповідей"/></label>
        </div>
      </div>
      <div class="question-area">
        <label
          for="test-question-${questionCounter}"
          class="question-area-label before-creation-text-blue before-creation-h2 before-creation-h1-blue"
        >Заповніть всі комірки</label>
        <textarea
          class="before-creation-text question-area-text before-creation-text-blue"
          id="test-question-${questionCounter}"
          name="test-question"
          placeholder="Напишіть питання"
          required
        ></textarea>
      </div>
      <div id="question-block-${questionCounter}">
            <div class="radio-batton-tests">
              <ol class="radio-batton-tests-ol before-creation-text-blue">
                <li class="radio-batton-tests-li">
                  <div class="radio-batton-tests-li-grid">
                    <textarea
                      class="before-creation-text question-area-text before-creation-text-blue"
                      id="test-answer-${questionCounter}-${answerInnerCounter}"
                      name="test-question"
                      placeholder="Напишіть варіант відповіді"
                      required
                    ></textarea>
                    <div class="radio-batton-tests-buttons">
                      <input
                        type="radio"
                        id="radio-button-test-${questionCounter}-${answerInnerCounter}"
                        name="radio-buttons-test-${questionCounter}"
                        class="visually-hidden"
                      />
                      <label
                        for="radio-button-test-${questionCounter}-${answerInnerCounter}"
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
                      id="test-answer-${questionCounter}-${answerInnerCounter++}"
                      name="test-question"
                      placeholder="Напишіть варіант відповіді"
                      required
                    ></textarea>
                    <div class="radio-batton-tests-buttons">
                      <input
                        type="radio"
                        id="radio-button-test-${questionCounter}-${answerInnerCounter}"
                        name="radio-buttons-test-${questionCounter}"
                        class="visually-hidden"
                      />
                      <label
                        for="radio-button-test-${questionCounter}-${answerInnerCounter}"
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
                <button class="radio-batton-tests-plus" id="add-answer-${questionCounter}">
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
      </div>
    `;
    // Додати новий елемент li до ol
    document.querySelector(".new-test-ol").appendChild(newLiTest);

    let typeRadios = document.getElementsByName(
      "radios-choise-" + questionCounter
    );
    typeRadios.forEach((typeRadio) =>
      typeRadio.addEventListener("change", function () {
        let localQuestionCounter = this.id.split("-")[1];
        let questionDiv = document.getElementById(
          "question-block-" + localQuestionCounter
        );
        switch (this.value) {
          case "1":
            questionDiv.innerHTML = `
            <div class="radio-batton-tests">
              <ol class="radio-batton-tests-ol before-creation-text-blue">
                <li class="radio-batton-tests-li">
                  <div class="radio-batton-tests-li-grid">
                    <textarea
                      class="before-creation-text question-area-text before-creation-text-blue"
                      id="test-answer-${localQuestionCounter}-${answerInnerCounter}"
                      name="test-question"
                      placeholder="Напишіть варіант відповіді"
                      required
                    ></textarea>
                    <div class="radio-batton-tests-buttons">
                      <input
                        type="radio"
                        id="radio-button-test-${localQuestionCounter}-${answerInnerCounter}"
                        name="radio-buttons-test-${localQuestionCounter}"
                        class="visually-hidden"
                      />
                      <label
                        for="radio-button-test-${localQuestionCounter}-${answerInnerCounter}"
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
                      id="test-answer-${localQuestionCounter}-${answerInnerCounter++}"
                      name="test-question"
                      placeholder="Напишіть варіант відповіді"
                      required
                    ></textarea>
                    <div class="radio-batton-tests-buttons">
                      <input
                        type="radio"
                        id="radio-button-test-${localQuestionCounter}-${answerInnerCounter}"
                        name="radio-buttons-test-${localQuestionCounter}"
                        class="visually-hidden"
                      />
                      <label
                        for="radio-button-test-${localQuestionCounter}-${answerInnerCounter}"
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
                <button class="radio-batton-tests-plus" id="add-answer-${localQuestionCounter}">
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
            break;
          case "2":
            questionDiv.innerHTML = `
            <div class="checkbox-tests">
              <ol class="radio-batton-tests-ol before-creation-text-blue">
                <li class="radio-batton-tests-li">
                  <div class="radio-batton-tests-li-grid">
                    <textarea
                      class="before-creation-text question-area-text before-creation-text-blue"
                      id="test-answer-${questionCounter}-${answerInnerCounter}"
                      name="test-question"
                      placeholder="Напишіть варіант відповіді"
                      required
                    ></textarea>
                    <div class="radio-batton-tests-buttons">
                      <input
                        type="checkbox"
                        id="checkbox-test-${questionCounter}-${answerInnerCounter}"
                        name="checkboxes-test-${questionCounter}"
                        class="visually-hidden"
                      />
                      <label
                        for="checkbox-test-${questionCounter}-${answerInnerCounter}"
                        class="checkbox-tests-buttons"
                      >
                      </label>

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
                      id="test-answer-${questionCounter}-${answerInnerCounter++}"
                      name="test-question"
                      placeholder="Напишіть варіант відповіді"
                      required
                    ></textarea>
                    <div class="radio-batton-tests-buttons">
                      <input
                        type="checkbox"
                        id="checkbox-test-${questionCounter}-${answerInnerCounter}"
                        name="checkboxes-test-${questionCounter}"
                        class="visually-hidden"
                      />
                      <label
                        for="checkbox-test-${questionCounter}-${answerInnerCounter}"
                        class="checkbox-tests-buttons"
                      >
                      </label>

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
                <button class="radio-batton-tests-plus" id="add-answer-${questionCounter}">
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
            break;
        }
        // Видалення відповідей/тесту
        questionDiv
          .querySelectorAll(".radio-batton-tests-buttons-delete")
          .forEach(function (button) {
            button.addEventListener("click", function () {
              button.closest("li").remove();
            });
          });

        // Добавити нову відповідь
        questionDiv
          .querySelectorAll(".radio-batton-tests-plus")
          .forEach(function (button) {
            button.addEventListener("click", function () {
              let localQuestionCounter = button.id.split("-")[2];
              let selectedValue = document.querySelector(
                `input[name="radios-choise-${localQuestionCounter}"]:checked`
              ).value;
              let newLiAnswer = document.createElement("li");
              newLiAnswer.classList.add("radio-batton-tests-li");
              // Заповнення елемента li необхідними елементами
              switch (selectedValue) {
                case "1":
                  newLiAnswer.innerHTML = `
          <div class="radio-batton-tests-li-grid">
            <textarea
              class="before-creation-text question-area-text before-creation-text-blue"
              id="test-answer-${localQuestionCounter}-${answerInnerCounter++}"
              name="test-question"
              placeholder="Напишіть варіант відповіді"
              required
            ></textarea>
            <div class="radio-batton-tests-buttons">
              <input
                type="radio"
                id="radio-button-test-${localQuestionCounter}-${answerInnerCounter}"
                name="radio-buttons-test-${localQuestionCounter}"
                class="visually-hidden"
              />
              <label
                for="radio-button-test-${localQuestionCounter}-${answerInnerCounter}"
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
                  break;
                case "2":
                  newLiAnswer.innerHTML = `
          <div class="radio-batton-tests-li-grid">
            <textarea
              class="before-creation-text question-area-text before-creation-text-blue"
              id="test-answer-${localQuestionCounter}-${answerInnerCounter++}"
              name="test-question"
              placeholder="Напишіть варіант відповіді"
              required
            ></textarea>
            <div class="radio-batton-tests-buttons">
              <input
                type="checkbox"
                id="checkbox-test-${localQuestionCounter}-${answerInnerCounter}"
                name="checkboxes-test-${localQuestionCounter}"
                class="visually-hidden"
              />
              <label
                for="checkbox-test-${localQuestionCounter}-${answerInnerCounter}"
                class="checkbox-tests-buttons"
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
                  break;
              }
              // Додати новий елемент li до ol
              newLiTest
                .querySelector(".radio-batton-tests-ol")
                .appendChild(newLiAnswer);

              // Додати обробник подій для кнопки "delete" на новоствореному елементі li
              newLiAnswer
                .querySelector(".radio-batton-tests-buttons-delete")
                .addEventListener("click", function () {
                  // Видалити батьківський елемент li
                  newLiAnswer.remove();
                });
            });
          });
      })
    );

    newLiTest
      .querySelectorAll(".radio-batton-tests-buttons-delete")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          // Видалити батьківський елемент li
          button.closest("li").remove();
        });
      });

    newLiTest
      .querySelector(".radio-batton-tests-plus")
      .addEventListener("click", function () {
        let localQuestionCounter = this.id.split("-")[2];
        let newLiAnswer = document.createElement("li");
        newLiAnswer.classList.add("radio-batton-tests-li");

        // Заповнення елемента li необхідними елементами
        newLiAnswer.innerHTML = `
        <div class="radio-batton-tests-li-grid">
          <textarea
            class="before-creation-text question-area-text before-creation-text-blue"
            id="test-answer-${localQuestionCounter}-${answerInnerCounter++}"
            name="test-question"
            placeholder="Напишіть варіант відповіді"
            required
          ></textarea>
          <div class="radio-batton-tests-buttons">
            <input
              type="radio"
              id="radio-button-test-${localQuestionCounter}-${answerInnerCounter}"
              name="radio-buttons-test-${localQuestionCounter}"
              class="visually-hidden"
            />
            <label
              for="radio-button-test-${localQuestionCounter}-${answerInnerCounter}"
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

        // Додати новий елемент li до ol
        newLiTest
          .querySelector(".radio-batton-tests-ol")
          .appendChild(newLiAnswer);

        // Додати обробник подій для кнопки "delete" на новоствореному елементі li
        newLiAnswer
          .querySelector(".radio-batton-tests-buttons-delete")
          .addEventListener("click", function () {
            // Видалити батьківський елемент li
            newLiAnswer.remove();
          });
      });
  });

document
  .querySelector(".button-save-test")
  .addEventListener("click", function () {
    // отримання даних тесту
    let author = document
      .querySelector(".header__user-name")
      .textContent.trim();
    let name = document.getElementById("course-name").value.trim();
    let description = document
      .getElementById("course-description")
      .value.trim();
    let topic = document.querySelector(".dropdown__button").textContent.trim();

    let test = {
      author: author,
      name: name,
      description: description,
      topic: topic,
      questions: [],
    };

    let questionAreas = document.querySelectorAll(".question-area");
    questionAreas.forEach((questionArea, questionIndex) => {
      let questionText = questionArea.querySelector("textarea").value.trim();
      let testTypeRadios = questionArea.parentNode
        .querySelector(".build-test-choise")
        .querySelectorAll('input[type="radio"]');
      let testType;
      testTypeRadios.forEach((radio) => {
        if (radio.checked) {
          testType = radio.value;
        }
      });

      let answers = [];
      let answerTextareas = questionArea.parentNode.querySelectorAll(
        ".radio-batton-tests-li textarea"
      );
      let answerCheckboxes = questionArea.parentNode.querySelectorAll(
        '.radio-batton-tests-li input[type="checkbox"]'
      );

      if (answerTextareas.length > 0 && answerCheckboxes.length > 0) {
        answerTextareas.forEach((answerTextarea, answerIndex) => {
          let answerText = answerTextarea.value.trim();
          let isCorrect =
            answerCheckboxes[answerIndex] &&
            answerCheckboxes[answerIndex].checked;
          answers.push({
            text: answerText,
            isCorrect: isCorrect,
          });
        });
      } else if (testType === "1") {
        let answerRadios = questionArea.parentNode.querySelectorAll(
          '.radio-batton-tests-li input[type="radio"]'
        );
        answerRadios.forEach((answerRadio, answerIndex) => {
          let isCorrect = answerRadio.checked;
          let answerText = answerTextareas[answerIndex].value.trim();
          answers.push({
            text: answerText,
            isCorrect: isCorrect,
          });
        });
      }

      test.questions.push({
        text: questionText,
        type: testType,
        answers: answers,
      });
    });

    // відправка даних на сервер
    fetch("/api/test/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
        // перенаправлення на головну сторінку після успішного збереження
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        // відповідний обробник подій для помилки
      });
  });
