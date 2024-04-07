const username = document.querySelector('.header__user-name')
const divSignBtn = document.querySelector('.header__link')
const divUser = document.querySelector('.header__user')
const divContactBlocked = document.querySelector('.contact-us__blocked')

async function getUsername() {
    const response = await fetch('/api/home', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
    response.json().then(user => {
        if (user.username !== "anonymousUser") {
            username.innerHTML = user.username
            divSignBtn.classList.add('visually-hidden')
            divUser.classList.remove('visually-hidden')
            divContactBlocked.classList.add('visually-hidden')
        } else {
            divSignBtn.classList.remove('visually-hidden')
            divUser.classList.add('visually-hidden')
        }
    })
}

getUsername()