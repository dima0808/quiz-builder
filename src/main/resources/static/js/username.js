const usernames = document.querySelectorAll('.header__user-name');
const divSignBtns = document.querySelectorAll('.header__link');
const divUsers = document.querySelectorAll('.header__user');
const divContactBlockeds = document.querySelectorAll('.contact-us__blocked');

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
            username.innerHTML = isAnonymous ? '' : user.username;
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
    });
}

getUsername();
