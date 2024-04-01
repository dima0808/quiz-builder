const form = document.querySelector("form");
const eField = form.querySelector(".email"),
  eInput = eField.querySelector("input"),
  pField = form.querySelector(".password"),
  pInput = pField.querySelector("input"),
  // nField = form.querySelector(".name"),
  // nInput = nField.querySelector("input"),
  lField = form.querySelector(".username"),
  lInput = lField.querySelector("input"),
  rpField = form.querySelector(".repeat-password"),
  rpInput = rpField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault(); //попередження від відправки форми
  // якщо електронна адреса та пароль пусті, то додайте клас shake, інакше викличте відповідну функцію
  eInput.value == "" ? eField.classList.add("shake", "error") : checkEmail();
  pInput.value == "" ? pField.classList.add("shake", "error") : checkPass();
  // nInput.value == "" ? nField.classList.add("shake", "error") : checkName();
  lInput.value == "" ? lField.classList.add("shake", "error") : checkLogin();
  rpInput.value == "" ? rpField.classList.add("shake", "error") : checkRepeatPassword();

  setTimeout(() => {
    //видалення класу shake через 500мс
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    // nField.classList.remove("shake");
    lField.classList.remove("shake");
    rpField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = () => {
    checkEmail();
  }; //виклик функції checkEmail при введенні ключа email
  pInput.onkeyup = () => {
    checkPass();
  }; //виклик функції checkPassword при введенні ключа пас
  // nInput.onkeyup = () => {
  //   checkName();
  // };
  lInput.onkeyup = () => {
    checkLogin();
  };
  rpInput.onkeyup = () => {
    checkRepeatPassword();
  };

  function checkEmail() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //шаблон для перевірки електронної адреси
    if (!eInput.value.match(pattern)) {
      //якщо шаблон не відповідає, то додайте помилку та видаліть клас valid
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      eInput.value != ""
        ? (errorTxt.innerText = "Введіть дійсну адресу електронної пошти")
        : (errorTxt.innerText = "Поле не може бути пустим");
    } else {
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  function checkPass() {
    if (pInput.value == "") {
      pField.classList.add("error");
      pField.classList.remove("valid");
    } else {
      pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }

  // function checkName() {
  //   if (nInput.value == "") {
  //     nField.classList.add("error");
  //     nField.classList.remove("valid");
  //   } else {
  //     nField.classList.remove("error");
  //     nField.classList.add("valid");
  //   }
  // }

  function checkLogin() {
    if (lInput.value == "") {
      lField.classList.add("error");
      lField.classList.remove("valid");
    } else {
      lField.classList.remove("error");
      lField.classList.add("valid");
    }
  }

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

  if (
    !eField.classList.contains("error") &&
    !pField.classList.contains("error") &&
    // !nField.classList.contains("error") &&
    !lField.classList.contains("error") &&
    !rpField.classList.contains("error")
  ) {
    window.location.href = form.getAttribute("action");
  }
};
