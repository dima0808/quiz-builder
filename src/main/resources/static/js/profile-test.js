// Отримання елементів з ID "my-test" та "test-finish"
const myTestDiv = document.getElementById('my-test');
const testFinishDiv = document.getElementById('test-finish');

// Отримання елементів списків тестів в межах цих контейнерів
const myTestList = myTestDiv.querySelector('.blue-ul-grid');
const testFinishList = testFinishDiv.querySelector('.blue-ul-grid');

// Асинхронна функція для отримання даних тестів
async function fetchTests() {
  try {
    const response = await fetch('/api/test');
    return await response.json();
  } catch (error) {
    console.error('Помилка при отриманні даних тестів:', error);
    throw error;
  }
}

// Асинхронна функція для отримання статистики тесту
async function fetchTestStatistics(testId) {
  try {
    const response = await fetch(`/api/test/${testId}/statistics`);
    return await response.json();
  } catch (error) {
    console.error(`Помилка при отриманні статистики для тесту ${testId}:`, error);
    throw error;
  }
}

// Асинхронна функція для отримання даних пройдених тестів
async function fetchPassedTests() {
  try {
    const response = await fetch('/api/test/passed');
    return await response.json();
  } catch (error) {
    console.error('Помилка при отриманні даних пройдених тестів:', error);
    throw error;
  }
}

// Функція для створення елемента списку тестів
function createTestListItem(test, textContent, additionalContent) {
  const listItem = document.createElement('li');
  listItem.classList.add('blue-li-grid');

  const testLinkDiv = document.createElement('div');
  testLinkDiv.classList.add('white-div');
  const testLink = document.createElement('a');
  testLink.classList.add('a-in-li');
  testLink.textContent = textContent;
  testLink.href = `/test-details.html?id=${test.id}`;
  testLinkDiv.appendChild(testLink);

  listItem.appendChild(testLinkDiv);
  listItem.appendChild(additionalContent);

  return listItem;
}

// Функція для відображення повідомлення
function displayMessage(container, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.textContent = message;
  container.appendChild(messageDiv);
}

// Основна функція для завантаження та відображення тестів
async function loadTests() {
  try {
    const allTests = await fetchTests();
    const userName = document.querySelector('.header__user-name').textContent;

    // Фільтрація тестів, створених користувачем
    const userCreatedTests = allTests.filter(test => test.author === userName);

    // Відображення створених тестів
    if (userCreatedTests.length > 0) {
      for (const test of userCreatedTests) {
        const totalAttempts = await fetchTestStatistics(test.id).then(stats => Object.keys(stats).length);

        const attemptsDiv = document.createElement('div');
        attemptsDiv.classList.add('white-div', 'white-div-center');
        attemptsDiv.textContent = `${totalAttempts}`;

        const listItem = createTestListItem(test, test.name, attemptsDiv);
        myTestList.appendChild(listItem);
      }
    } else {
      myTestDiv.removeChild(myTestList);
      displayMessage(myTestDiv, 'Ви ще не створювали жодного тесту.');
    }

    // Отримання та відображення пройдених тестів
    const passedTests = await fetchPassedTests();
    if (Object.keys(passedTests).length > 0) {
      for (const testId of Object.keys(passedTests)) {
        const test = allTests.find(t => t.id == testId);
        if (test) {
          const scoreDiv = document.createElement('div');
          scoreDiv.classList.add('white-div', 'white-div-center');
          scoreDiv.textContent = `${passedTests[testId]}/${test.questions.length}`;

          const listItem = createTestListItem(test, test.name, scoreDiv);
          testFinishList.appendChild(listItem);
        }
      }
    } else {
      testFinishDiv.removeChild(testFinishList);
      displayMessage(testFinishDiv, 'Ви ще не проходили жодного тесту.');
    }
  } catch (error) {
    console.error('Помилка при завантаженні тестів:', error);
  }
}

// Виклик основної функції для завантаження тестів
loadTests();
