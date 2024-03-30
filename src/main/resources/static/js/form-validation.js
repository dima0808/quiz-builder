const form = document.querySelector(".form");
const inputFields = form.getElementsByClassName("form-control");

for (const item of inputFields) {
  item.addEventListener("blur", (event) => {
    validateForm(event);
  });
}

const setError = (element, message) => {
  const errorSection = element.parentElement.querySelector(".error");
  errorSection.innerText = message;
  element.classList.add("invalid");
  element.classList.remove("valid");
};

const setValid = (element) => {
  const errorSection = element.parentElement.querySelector(".error");
  errorSection.innerText = "";
  element.classList.remove("invalid");
  element.classList.add("valid");
};

const validateEmail = (email) => {
  const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  if (email.value === "") {
    setError(email, "Необхідно вказати адресу електронної пошти");
  } else if (!regex.test(email.value)) {
    setError(email, "Електронна адреса неправильна");
  } else {
    setValid(email);
  }
};

const validateName = (name) => {

    if (name.value === "") {
      setError(name, "Необхідно вказати ім'я, яке буде відображатись на сайті");
    } else {
      setValid(name);
    }
};

const validateLogin = (login) => {

    if (login.value === "") {
      setError(login, "Необхідно вказати логін");
    } else {
      setValid(login);
    }
};

const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

  if (password.value === "") {
    setError(password, "Необхідно ввести пароль");
  } else if (!regex.test(password.value)) {
    setError(
      password,
      "Пароль повинен містити не менше 6 символів та одну цифру"
    );
  } else {
    setValid(password);
  }
};

const validatePasswordConfirm = (passwordConfirm) => {
  if (passwordConfirm.value === "") {
    setError(passwordConfirm, "Потрібен пароль підтвердження");
  } else if (passwordConfirm.value !== password.value) {
    setError(passwordConfirm, "Пароль не збігається!");
  } else {
    setValid(passwordConfirm);
  }
};

const validateForm = (event) => {
  switch (event.target.id) {
    case "email":
      validateEmail(event.target);
      break;
    case "name":
      validateName(event.target);
      break;
    case "username":
      validateLogin(event.target);
      break;
    case "password":
      validatePassword(event.target);
      break;
    case "repeat-password":
      validatePasswordConfirm(event.target);
      break;
    default:
      alert("Помилка підтвердження!");
  }
};