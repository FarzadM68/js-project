let $ = document

let loginBtn = $.querySelector('.btn-success')

let usernameInput = $.querySelector('.username-input')
let usernameLabel = $.querySelector('.username-label')
let passwordInput = $.querySelector('.password-input')
let passwordLabel = $.querySelector('.password-label')

let loginModal = $.querySelector('.login-modal')

usernameInput.addEventListener('keyup', function () {
    if (usernameInput.value.length > 0) {
        usernameLabel.style.display = 'block'
        usernameInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        usernameLabel.style.display = 'none'
        usernameInput.style.borderBottom = '2px solid red'
    }
})

passwordInput.addEventListener('keyup', function () {
    if (passwordInput.value.length > 0) {
        passwordLabel.style.display = 'block'
        passwordInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        passwordLabel.style.display = 'none'
        passwordInput.style.borderBottom = '2px solid red'
    }
})


function checkForusername() {
    let adminsArray = JSON.parse(localStorage.getItem('adminsArray'))

    if (!adminsArray) {
        alert('لطفا ابتدا ثبت نام کنید.')
    } else {
        let isExist = adminsArray.find(function (person) {
            return person.username == usernameInput.value
        })
        if (isExist) {
            checkForPassword(adminsArray)
        } else {
            alert('نام کاربری یا رمز عبور اشتباه است')
        }
    }
}

function checkForPassword(adminsArray) {
    let isExist = adminsArray.find(function (person) {
        return person.password == passwordInput.value
    })

    if (isExist) {
        let currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'))
        if (currentAdmin) {
            localStorage.removeItem('currentAdmin')
            localStorage.setItem('currentAdmin', JSON.stringify(isExist))
        } else {
            localStorage.setItem('currentAdmin', JSON.stringify(isExist))
        }
        loginModal.style.display = 'block'
        setTimeout(function () {
            window.location.href = '/controlP.html'
        }, 2000)
    } else {
        alert('نام کاربری یا رمز عبور اشتباه است')
    }
}



loginBtn.addEventListener('click', function () {
    if (usernameInput.value === '' || passwordInput.value === '') {
        alert(' لطفا تمام موارد خواسته شده را پرکنید. ')
    } else {
        checkForusername()
    }
})
