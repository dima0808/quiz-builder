const form = document.querySelector("form");
const eField = form.querySelector(".email"),
  eInput = eField.querySelector("input"),
  pField = form.querySelector(".password"),
  pInput = pField.querySelector("input"),
  lField = form.querySelector(".username"),
  lInput = lField.querySelector("input"),
  rpField = form.querySelector(".repeat-password"),
  rpInput = rpField.querySelector("input");

form.onsubmit = async (e) => {
  e.preventDefault(); // Попередження від відправки форми

  // Перевірка полів форми на валідність
  eInput.value == "" ? eField.classList.add("shake", "error") : checkEmail();
  pInput.value == "" ? pField.classList.add("shake", "error") : checkPass();
  lInput.value == "" ? lField.classList.add("shake", "error") : checkLogin();
  rpInput.value == "" ? rpField.classList.add("shake", "error") : checkRepeatPassword();

  // Видалення класу shake через 500мс
  setTimeout(() => {
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    lField.classList.remove("shake");
    rpField.classList.remove("shake");
  }, 500);

  // Відслідковування введення користувачем у поля форми
  eInput.onkeyup = () => { checkEmail(); };
  pInput.onkeyup = () => { checkPass(); };
  lInput.onkeyup = () => { checkLogin(); };
  rpInput.onkeyup = () => { checkRepeatPassword(); };

  // Функція перевірки електронної адреси
  function checkEmail() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!eInput.value.match(pattern)) {
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      eInput.value != "" ? (errorTxt.innerText = "Введіть дійсну адресу електронної пошти") : (errorTxt.innerText = "Поле не може бути пустим");
    } else {
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  // Функція перевірки паролю
  function checkPass() {
    if (pInput.value == "") {
      pField.classList.add("error");
      pField.classList.remove("valid");
    } else {
      pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }

  // Функція перевірки логіну
  function checkLogin() {
    if (lInput.value == "") {
      lField.classList.add("error");
      lField.classList.remove("valid");
    } else {
      lField.classList.remove("error");
      lField.classList.add("valid");
    }
  }

  // Функція перевірки повторення паролю
  function checkRepeatPassword() {
    if (rpInput.value == "") {
      rpField.classList.add("error");
      rpField.classList.remove("valid");
    } else {
      if (rpInput.value !== pInput.value) {
        rpField.classList.add("error");
        rpField.classList.remove("valid");
        let errorTxt = rpField.querySelector(".error-txt");
        errorTxt.innerText = "Паролі не збігаються";
      } else {
        rpField.classList.remove("error");
        rpField.classList.add("valid");
      }
    }
  }

  // Якщо хоча б одне поле має помилку, не відправляємо форму
  if (
    !eField.classList.contains("error") &&
    !pField.classList.contains("error") &&
    !lField.classList.contains("error") &&
    !rpField.classList.contains("error")
  ) {
    try {
      const formData = {
        username: lInput.value,
        email: eInput.value,
        password: pInput.value
      };

      // Відправка форми на сервер
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 201) {
        window.location.href = "/";
      } else {
        response.json().then(message => {
          if (message.message === 'User already exists.') {
            lField.classList.add("error");
            lField.classList.remove("valid");
            let errorTxt = lField.querySelector(".error-txt");
            errorTxt.innerText = "Такий користувач вже існує";
          } else {
            eField.classList.add("error");
            eField.classList.remove("valid");
            let errorTxt = eField.querySelector(".error-txt");
            errorTxt.innerText = "Така пошта вже існує";
          }
        })
          
      }

    } catch (error) {
      console.error('Помилка при реєстрації:', error.message);
    }
  }
};
