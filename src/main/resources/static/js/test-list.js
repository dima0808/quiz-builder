// Функція для додавання до списку вподобань
function addToFavorites(item) {
    console.log('Додано до списку вподобань: ' + item);
}

// Функція для видалення зі списку вподобань
function removeFromFavorites(item) {
    console.log('Видалено зі списку вподобань: ' + item);
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
function searchTests(event) {
    if (event.key === 'Enter') {
        let searchText = document.getElementById("search-test").value.trim().toLowerCase();
        
        // Отримання відповідних тестів
        let filteredTests = window.allTests.filter(function(test) {
            return test.name.toLowerCase().includes(searchText) || test.description.toLowerCase().includes(searchText);
        });

        // Фільтрація за темою
        let selectedTopic = document.querySelector('input[name="topic"]:checked').value;
        if (selectedTopic !== 'all') {
            filteredTests = filteredTests.filter(function(test) {
                return test.topic === selectedTopic;
            });
        }

        // Відображення тестів на сторінці
        displayTests(filteredTests);

        // Забираємо фокус з поля вводу
        document.getElementById("search-test").blur();

        // Приховуємо список
        document.querySelector(".search-list").style.display = "none";
    }
}

// Додаємо обробник події для пошуку при натисканні клавіші Enter у полі введення
document.getElementById("search-test").addEventListener("keypress", searchTests);

// Отримуємо тести при завантаженні сторінки
fetchTests();

// Отримуємо посилання на елементи DOM
const searchInput = document.getElementById("search-test");
const searchList = document.querySelector(".search-list");

// Обробник події введення тексту у поле пошуку
searchInput.addEventListener("input", function() {
    const searchText = this.value.toLowerCase();
    const filteredTests = window.allTests.filter(function(test) {
        return test.name.toLowerCase().includes(searchText);
    });
    displaySearchResults(filteredTests);
});

// Функція для відображення результатів пошуку
function displaySearchResults(results) {
    // Очищаємо список
    searchList.innerHTML = "";
    // Додаємо результати пошуку до списку
    results.forEach(function(result) {
        const listItem = document.createElement("li");
        listItem.textContent = result.name;
        listItem.addEventListener("click", function() {
            // При кліку на елемент списку, додаємо назву тесту до поля введення
            searchInput.value = result.name;
            // Після вибору, список приховується
            searchList.style.display = "none";
            // Викликаємо функцію для оновлення списку тестів
            searchTests();
        });
        searchList.appendChild(listItem);
    });
}

// Обробник події введення тексту у поле пошуку
searchInput.addEventListener("input", function() {
    const searchText = this.value.toLowerCase();
    
    if (searchText.trim() === "") {
        searchList.style.display = "none"; // Приховуємо список, якщо поле порожнє
    } else {
        searchList.style.display = "block"; // Показуємо список, якщо є введений текст
        const filteredTests = window.allTests.filter(function(test) {
            return test.name.toLowerCase().includes(searchText);
        });
        displaySearchResults(filteredTests);
    }

    // Оновлюємо список тестів на основі введеного тексту
    displayTests(filteredTests);
});

// Функція для обробки вибору теми зі списку
function handleListItemClick(event) {
    // Отримуємо текст теми з вибраного елементу списку
    let selectedTheme = event.target.textContent;
    
    // Встановлюємо текст теми у поле вводу пошуку
    document.getElementById("search-test").value = selectedTheme;

    // Створюємо та ініціюємо подію клавіші Enter
    let enterEvent = new KeyboardEvent("keypress", {
        key: "Enter"
    });
    document.getElementById("search-test").dispatchEvent(enterEvent);
}

// Додаємо обробник події для вибору теми зі списку
document.querySelector(".search-list").addEventListener("click", handleListItemClick);

// Функція для обробки подій вибору типу тесту та пошуку
function handleFilterChange() {
    let selectedFilter = document.querySelector('input[name="topic"]:checked').value;
    let searchText = document.getElementById("search-test").value.trim().toLowerCase();
    
    // Отримання відповідних тестів
    let filteredTests = window.allTests.filter(function(test) {
        return test.name.toLowerCase().includes(searchText) || test.description.toLowerCase().includes(searchText);
    });

    // Фільтрація за темою
    if (selectedFilter !== 'all') {
        filteredTests = filteredTests.filter(function(test) {
            return test.topic === selectedFilter;
        });
    }

    // Відображення відфільтрованих тестів на сторінці
    displayTests(filteredTests);
}

// Додаємо обробник подій для радіо кнопок
document.querySelectorAll('input[name="topic"]').forEach(function(radio) {
    radio.addEventListener('change', handleFilterChange);
});

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
    
        let testInfo = document.createElement("div");
        testInfo.classList.add("search-result-card__info");
    
        let testCounter = document.createElement("p");
        testCounter.classList.add("search-result-card__info--counter");
        testCounter.textContent = "Кількість проходжень: " + test.counter;
        testInfo.appendChild(testCounter);
    
        let testRating = document.createElement("p");
        testRating.classList.add("search-result-card__info--rating");
        testRating.textContent = "Тест " + (test.passed ? "пройдено" : "не пройдено");
        testInfo.appendChild(testRating);
    
        let startButton = document.createElement("div");
        startButton.classList.add("search-result-card__start");
    
        let startLink = document.createElement("a");
        startLink.href = "#"; // Посилання на початок тесту
        startLink.classList.add("search-result-card__link");
        startLink.innerHTML = `
            <i class="fa-solid fa-eye"></i>
            Переглянути тест
        `;
        startLink.addEventListener("click", function() {
            alert("Ви хочете перейти на сторінку з текстом: " + test.name);
        });
    
        let likeButton = document.createElement("div");
        likeButton.classList.add("btn__like");
        let likeBtn = document.createElement("button");
        likeBtn.classList.add("like-btn");
        likeBtn.textContent = "❤";
        likeBtn.addEventListener("click", function() {
            // Перевіряємо, чи кнопка має клас "liked"
            if (likeBtn.classList.contains('liked')) {
                // Якщо так, видаляємо клас "liked"
                likeBtn.classList.remove('liked');
                removeFromFavorites(test.name);
            } else {
                // Інакше додаємо клас "liked"
                likeBtn.classList.add('liked');
                addToFavorites(test.name);
            }
        });
        likeButton.appendChild(likeBtn);
    
        startButton.appendChild(startLink);
        startButton.appendChild(likeButton);
    
        testCardBody.appendChild(testHeader);
        testCardBody.appendChild(testDescription);
        testCardBody.appendChild(testInfo);
        testCardBody.appendChild(startButton);
    
        testCard.appendChild(testCardBody);
        testItem.appendChild(testCard);
    
        testList.appendChild(testItem);
    });    
}