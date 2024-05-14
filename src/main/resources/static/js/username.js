const usernames = document.querySelectorAll('.header__user-name');
const divSignBtns = document.querySelectorAll('.header__link');
const divUsers = document.querySelectorAll('.header__user');
const divContactBlockeds = document.querySelectorAll('.contact-us__blocked');
const divLinkCreateTest = document.getElementById('btn-link-create');
const divLinkLogin = document.getElementById('btn-link-login')
const divLike = document.querySelectorAll('btn__like')

async function getUsername() {
    const response = await fetch('/api/home', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
    response.json().then(user => {
        const isAnonymous = user.username === "anonymousUser";
        usernames.forEach(username => {
            username.innerHTML = isAnonymous ? 'anonymousUser' : user.username;
        });
        divSignBtns.forEach(divSignBtn => {
            if (isAnonymous) {
                divSignBtn.classList.remove('visually-hidden');
            } else {
                divSignBtn.classList.add('visually-hidden');
            }
        });
        divUsers.forEach(divUser => {
            if (isAnonymous) {
                divUser.classList.add('visually-hidden');
            } else {
                divUser.classList.remove('visually-hidden');
            }
        });
        divContactBlockeds.forEach(divContactBlocked => {
            if (isAnonymous) {
                divContactBlocked.classList.remove('visually-hidden');
            } else {
                divContactBlocked.classList.add('visually-hidden');
            }
        });
        if (isAnonymous) {
            divLinkCreateTest.classList.add("visually-hidden");
            divLinkLogin.classList.remove("visually-hidden");
        } else {
            divLinkCreateTest.classList.remove("visually-hidden");
            divLinkLogin.classList.add("visually-hidden");
        }
    });
}

getUsername();
