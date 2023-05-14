let $ = document

let registerBtn = $.querySelector('.btn-success')
let userNameInput = $.querySelector('.admin-name')
let userFamilyInput = $.querySelector('.admin-family')
let userUsernameInput = $.querySelector('.admin-username')
let userPasswordInput = $.querySelector('.admin-password')
let userEmailInput = $.querySelector('.admin-email')
let usernameLength = $.querySelector('.username-length')
let passwordLength = $.querySelector('.password-length')
let registerModal = $.querySelector('.register-modal')



function creatUserInfos(allUsers) {

    let maxNumber = allUsers.reduce((prevVal,currentVal) => {
        currentVal = currentVal.id
        if(prevVal > currentVal){
            return prevVal
        }
    
        return currentVal
    }, 0)

    let newUser = {
        id: maxNumber + 1,
        name: userNameInput.value,
        family: userFamilyInput.value,
        username: userUsernameInput.value,
        password: userPasswordInput.value,
        email: userEmailInput.value,
    }

    userNameInput.value = ''
    userFamilyInput.value = ''
    userUsernameInput.value = ''
    userPasswordInput.value = ''
    userEmailInput.value = ''

    allUsers.push(newUser)
    setUserToLocal(allUsers)
    registerModal.style.display = 'block'
    setTimeout(function () {
        window.location.href = '/pages/users/login-user.html'
    }, 3000)
}

function setUserToLocal(allUsers) {
    localStorage.setItem('usersArray', JSON.stringify(allUsers))
}

function getUsersArrayForRepetitious() {
    let allUsersToLocal = JSON.parse(localStorage.getItem('usersArray'))

    if (!allUsersToLocal) {
        let allUsers = []
        creatUserInfos(allUsers)
    } else {
        allUsers = allUsersToLocal
        let admin = allUsers.find(function (person) {
            return person.email == userEmailInput.value
        })

        if (admin) {
            alert('ادمینی قبلا با این ایمیل ثبت نام کرده.')
        } else {
            creatUserInfos(allUsers)
        }
    }
}

userNameInput.addEventListener('keyup', function () {
    if (userNameInput.value.length > 0) {
        userNameInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        userNameInput.style.borderBottom = '2px solid red'
    }
})
userFamilyInput.addEventListener('keyup', function () {
    if (userFamilyInput.value.length > 0) {
        userFamilyInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        userFamilyInput.style.borderBottom = '2px solid red'
    }
})
userEmailInput.addEventListener('keyup', function () {
    if (userEmailInput.value.length > 0) {
        userEmailInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        userEmailInput.style.borderBottom = '2px solid red'
    }
})
userUsernameInput.addEventListener('keyup', function () {
    if (userUsernameInput.value.length > 7) {
        usernameLength.style.display = 'none'
        userUsernameInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        usernameLength.style.display = 'block'
        userUsernameInput.style.borderBottom = '2px solid red'
    }
})

userPasswordInput.addEventListener('keyup', function () {
    if (userPasswordInput.value.length > 7) {
        passwordLength.style.display = 'none'
        userPasswordInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        passwordLength.style.display = 'block'
        userPasswordInput.style.borderBottom = '2px solid red'
    }
})

registerBtn.addEventListener('click', function () {
    if (userNameInput.value === '' || userFamilyInput.value === '' || userUsernameInput.value === '' || userPasswordInput.value === '' || userEmailInput.value === '') {
        alert('لطفا تمام موارد خواسته شده را پر کنید.')
    } else if (userPasswordInput.value.length < 8 || userUsernameInput.value.length < 8) {
        alert('نام کاربری و کلمه عبور نمیتوانند کمتر از 8 کاراکتر داشته باشند.')
    } else {
        getUsersArrayForRepetitious()
    }
})



