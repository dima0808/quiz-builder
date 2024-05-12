// Додаємо обробник подій для радіокнопок
const radioButtons = document.querySelectorAll('input[name="menu"]');
radioButtons.forEach(button => {
    button.addEventListener('change', function() {

        // Отримуємо список тестів з урахуванням вибраного фільтра
        handleFilterChange();
    });
});


// Функція для отримання лайкнутих тестів
function getLikedTests() {
    // Перевіряємо, чи ім'я користувача не є "anonymousUser"
    if (document.querySelector('.header__user-name').textContent !== "anonymousUser") {
        return fetch('/api/test/liked')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch liked tests');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching liked tests:', error);
            });
    } else {
        return Promise.resolve([]); // Повертаємо пустий масив, якщо користувач анонімний
    }
}


// Функція для додавання до списку вподобань
function likeTest(testId) {
    fetch(`/api/test/like/${testId}`, {
        method: 'PATCH'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Не вдалося виконати запит для лайкнення тесту');
        }
        console.log(`Тест з id ${testId} було лайкнуто`);
        // Опціонально: оновити інтерфейс користувача для відображення змін
    })
    .catch(error => console.error('Сталася помилка при лайкненні тесту:', error));
}

function dislikeTest(testId) {
    fetch(`/api/test/dislike/${testId}`, {
        method: 'PATCH'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Не вдалося виконати запит для видалення лайку з тесту');
        }
        console.log(`Лайк з тесту з id ${testId} було видалено`);
        // Опціонально: оновити інтерфейс користувача для відображення змін
    })
    .catch(error => console.error('Сталася помилка при видаленні лайку з тесту:', error));
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

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
        // Змінюємо значення `selectedMenu` на "home"
        document.getElementById("home").checked = true;
        
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

// Функція для обробки фільтрації тестів
async function handleFilterChange() {
    const selectedMenu = document.querySelector('input[name="menu"]:checked').value;
    const selectedFilter = document.querySelector('input[name="topic"]:checked').value;
    const searchText = document.getElementById("search-test").value.trim().toLowerCase();

    let filteredTests = [];

    // Фільтрація тестів відповідно до обраного типу тесту (Головна, Мої тести, Вподобані)
    if (selectedMenu === 'home') {
        filteredTests = allTests;
    } else if (selectedMenu === 'mytest') {
        const currentUser = document.querySelector('.header__user-name').textContent;
        filteredTests = allTests.filter(test => test.author === currentUser);
    } else if (selectedMenu === 'favorite') {
        filteredTests = await getFilteredLikedTests(); // Отримуємо та фільтруємо лайкнуті тести
    }

    // Фільтрація за темою
    if (selectedFilter !== 'all') {
        filteredTests = filteredTests.filter(test => test.topic === selectedFilter);
    }

    // Фільтрація за пошуковим запитом
    filteredTests = filteredTests.filter(test => test.name.toLowerCase().includes(searchText) || test.description.toLowerCase().includes(searchText));

    // Відображення відфільтрованих тестів
    displayTests(filteredTests);
}

// Функція для отримання лайкнутих тестів та їх фільтрації
async function getFilteredLikedTests() {
    const likedTests = await getLikedTests(); // Отримати список клікнутих тестів

    // Фільтруємо тести відповідно до обраних критеріїв
    const selectedFilter = document.querySelector('input[name="topic"]:checked').value;
    const searchText = document.getElementById("search-test").value.trim().toLowerCase();
    const filteredTests = likedTests.filter(test => {
        return (selectedFilter === 'all' || test.topic === selectedFilter) &&
               (test.name.toLowerCase().includes(searchText) || test.description.toLowerCase().includes(searchText));
    });

    return filteredTests;
}




// Додаємо обробник подій для радіо кнопок
document.querySelectorAll('input[name="topic"]').forEach(function(radio) {
    radio.addEventListener('change', handleFilterChange);
});

function showNotification(message, duration) {
    const notification = document.getElementById('notification');
    const progressBar = document.getElementById('progressBar');
  
    notification.style.padding = '20px 40px';
  
    notification.innerText = message;
    notification.style.display = 'block';
  
    progressBar.style.width = '0'; 
    progressBar.style.transition = `width ${duration}ms linear`;
  
    progressBar.style.width = '100%'; // 
  
    setTimeout(() => {
      notification.style.display = 'none';
      progressBar.style.width = '0';
      
      notification.style.padding = '0';
    }, duration);
  }


// Функція для відображення тестів на сторінці
async function displayTests(testsToDisplay) {
    let likedTests = await getLikedTests(); // Отримати список клікнутих тестів
    
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
            // Перенаправляємо користувача на сторінку з детальною інформацією про тест
            window.location.href = `/test-details.html?id=${test.id}`; 
        });
        
    
        let likeButton = document.createElement("div");
        likeButton.classList.add("btn__like");
        let likeBtn = document.createElement("button");
        likeBtn.classList.add("like-btn");
        likeBtn.textContent = "❤";
        
        // Перевірити, чи `test.id` є у списку клікнутих тестів
        if (likedTests.some(likedTest => likedTest.id === test.id)) {
            likeBtn.classList.add('liked'); // Додати клас "liked", якщо тест клікнуто
        }
        const isAnonymous = document.querySelector('.header__user-name').textContent
        likeBtn.addEventListener("click", function() {
            // Перевіряємо, чи користувач анонімний
            if (isAnonymous === "anonymousUser") {
                // Показуємо вспливаюче повідомлення з проханням увійти в акаунт
                showNotification('⚠ Увійдіть в акаунт!', 5000)
                
                // Виходимо з функції, оскільки дія користувача не дозволена
                return;
            }
        
            // Якщо користувач не анонімний, виконуємо звичайну логіку кнопки лайка
            if (likeBtn.classList.contains('liked')) {
                // Якщо так, видаляємо клас "liked"
                likeBtn.classList.remove('liked');
                dislikeTest(test.id);
            } else {
                // Інакше додаємо клас "liked"
                likeBtn.classList.add('liked');
                likeTest(test.id);
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
