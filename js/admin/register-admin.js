let $ = document

let registerBtn = $.querySelector('.btn-success')
let adminNameInput = $.querySelector('.admin-name')
let adminFamilyInput = $.querySelector('.admin-family')
let adminUsernameInput = $.querySelector('.admin-username')
let adminPasswordInput = $.querySelector('.admin-password')
let adminEmailInput = $.querySelector('.admin-email')
let usernameLength = $.querySelector('.username-length')
let passwordLength = $.querySelector('.password-length')
let registerModal = $.querySelector('.register-modal')



function creatAdminInfos(allAdmins) {

    let maxNumber = allAdmins.reduce((prevVal,currentVal) => {
        currentVal = currentVal.id
        if(prevVal > currentVal){
            return prevVal
        }
    
        return currentVal
    }, 0)

    let newAdmin = {
        id: maxNumber + 1,
        name: adminNameInput.value,
        family: adminFamilyInput.value,
        username: adminUsernameInput.value,
        password: adminPasswordInput.value,
        email: adminEmailInput.value,
        profile: ''
    }

    adminNameInput.value = ''
    adminFamilyInput.value = ''
    adminUsernameInput.value = ''
    adminPasswordInput.value = ''
    adminEmailInput.value = ''

    allAdmins.push(newAdmin)
    setAdminToLocal(allAdmins)
    registerModal.style.display = 'block'
    setTimeout(function () {
        window.location.href = '/pages/manager/login-admin.html'
    }, 3000)
}

function setAdminToLocal(allAdmins) {
    localStorage.setItem('adminsArray', JSON.stringify(allAdmins))
}

function getAdminsArrayForRepetitious() {
    let allAdminsToLocal = JSON.parse(localStorage.getItem('adminsArray'))

    if (!allAdminsToLocal) {
        let allAdmins = []
        creatAdminInfos(allAdmins)
    } else {
        allAdmins = allAdminsToLocal
        let admin = allAdmins.find(function (person) {
            return person.email == adminEmailInput.value
        })

        if (admin) {
            alert('ادمینی قبلا با این ایمیل ثبت نام کرده.')
        } else {
            creatAdminInfos(allAdmins)
        }
    }
}

adminNameInput.addEventListener('keyup', function () {
    if (adminNameInput.value.length > 0) {
        adminNameInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        adminNameInput.style.borderBottom = '2px solid red'
    }
})
adminFamilyInput.addEventListener('keyup', function () {
    if (adminFamilyInput.value.length > 0) {
        adminFamilyInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        adminFamilyInput.style.borderBottom = '2px solid red'
    }
})
adminEmailInput.addEventListener('keyup', function () {
    if (adminEmailInput.value.length > 0) {
        adminEmailInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        adminEmailInput.style.borderBottom = '2px solid red'
    }
})
adminUsernameInput.addEventListener('keyup', function () {
    if (adminUsernameInput.value.length > 7) {
        usernameLength.style.display = 'none'
        adminUsernameInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        usernameLength.style.display = 'block'
        adminUsernameInput.style.borderBottom = '2px solid red'
    }
})

adminPasswordInput.addEventListener('keyup', function () {
    if (adminPasswordInput.value.length > 7) {
        passwordLength.style.display = 'none'
        adminPasswordInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        passwordLength.style.display = 'block'
        adminPasswordInput.style.borderBottom = '2px solid red'
    }
})

registerBtn.addEventListener('click', function () {
    if (adminNameInput.value === '' || adminFamilyInput.value === '' || adminUsernameInput.value === '' || adminPasswordInput.value === '' || adminEmailInput.value === '') {
        alert('لطفا تمام موارد خواسته شده را پر کنید.')
    } else if (adminPasswordInput.value.length < 8 || adminUsernameInput.value.length < 8) {
        alert('نام کاربری و کلمه عبور نمیتوانند کمتر از 8 کاراکتر داشته باشند.')
    } else {
        getAdminsArrayForRepetitious()
    }
})



