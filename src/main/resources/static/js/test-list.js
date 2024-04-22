// Функція для відображення тестів на сторінці
function displayTests(testsToDisplay) {
    let testList = document.getElementById("test-list");
    testList.innerHTML = ""; // Очищення вмісту перед оновленням

    testsToDisplay.forEach(function(test) {
        let testItem = document.createElement("li");
        testItem.classList.add("search-result__item");

        let testCard = document.createElement("article");
        testCard.classList.add("search-result-card");

        let testCardBody = document.createElement("div");
        testCardBody.classList.add("search-result-card__body");

        let testHeader = document.createElement("div");
        testHeader.classList.add("search-result-card__header");
        let testName = document.createElement("h3");
        testName.textContent = test.name;
        testHeader.appendChild(testName);

        let testDescription = document.createElement("div");
        testDescription.classList.add("search-result-card__description");
        let testDescriptionText = document.createElement("p");
        testDescriptionText.textContent = test.description;
        testDescription.appendChild(testDescriptionText);

        let startButton = document.createElement("div");
        startButton.classList.add("search-result-card__start");
        let startLink = document.createElement("a");
        startLink.href = "#"; // Посилання на початок тесту (змініть за потребою)
        startLink.classList.add("search-result-card__link");
        startLink.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-52.1 52.1 0 0-1-1 0 0-16-16-96-96-17-17 52.1-52.1c25-25 65.5-25 90.5 0zM241 114.9c-9.4-9.4-24.6-9.4-33.9 0L105 217c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L173.1 81c28.1-28.1 73.7-28.1 101.8 0L288 94.1l17 17 96 96 16 16 1 1-17 17L229.5 412.5c-48 48-109.2 80.8-175.8 94.1l-25 5c-7.9 1.6-16-.9-21.7-6.6s-8.1-13.8-6.6-21.7l5-25c13.3-66.6 46.1-127.8 94.1-175.8L254.1 128 241 114.9z"/></svg>
            Переглянути тест
        `;
        startLink.addEventListener("click", function() {
            alert("Ви хочете перейти на сторінку з текстом: " + test.name);
        });
        startButton.appendChild(startLink);

        testCardBody.appendChild(testHeader);
        testCardBody.appendChild(testDescription);
        testCardBody.appendChild(startButton);
        testCard.appendChild(testCardBody);
        testItem.appendChild(testCard);

        testList.appendChild(testItem);
    });
}

// Функція для отримання тестів зі служби
function fetchTests() {
    fetch('api/test')
        .then(response => response.json())
        .then(tests => {
            displayTests(tests);
            // Зберігаємо дані про всі тести
            window.allTests = tests;
        })
        .catch(error => console.error('Сталася помилка під час отримання тестів:', error));
}

// Функція для пошуку тестів за назвою
function searchTests() {
    let searchText = document.getElementById("search-test").value.toLowerCase();
    let filteredTests = window.allTests.filter(function(test) {
        return test.name.toLowerCase().includes(searchText);
    });
    displayTests(filteredTests);
}

// Додаємо обробник події для пошуку при введенні тексту в полі
document.getElementById("search-test").addEventListener("input", searchTests);

// Отримуємо тести при завантаженні сторінки
fetchTests();