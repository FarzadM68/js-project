let $ = document

// utiliti
let contactUsNav = $.querySelector('.contact-us')
let switchElem = $.querySelector('.switch')
let userBasketCount = $.querySelector('.userBasket-count')
// user coments
let userName = $.querySelector('.comment-name')
let userEmail = $.querySelector('.comment-email')
let userPhone = $.querySelector('.comment-number')
let userSubject = $.querySelector('.comment-sbj')
let userText = $.querySelector('.comment-text')
let sendCommentBtn = $.querySelector('.send-comment')

////////////////////// utiliti ////////////
// dark mood
switchElem.addEventListener('click', function () {
    document.body.classList.toggle('dark')

    if (document.body.className.includes('dark')) {
        localStorage.setItem('mood', 'dark')
    } else {
        localStorage.setItem('mood', 'light')
    }
})
/////////  userBasketCount  ////////////////
function getLocalStorageForUserBasketCount() {
    let userBasketArray = JSON.parse(localStorage.getItem('userBasketArray'))

    if (!userBasketArray) {
        userBasketCount.innerHTML = 0
    } else {
        userBasketCount.innerHTML = userBasketArray.length
    }
}
// end utiliti


// comments input
userName.addEventListener('keyup', function () {
    if (userName.value !== '') {
        userName.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        userName.style.borderBottom = '2px solid red'
    }
})
userEmail.addEventListener('keyup', function () {
    if (userEmail.value !== '') {
        userEmail.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        userEmail.style.borderBottom = '2px solid red'
    }
})
userPhone.addEventListener('keyup', function () {
    if (userPhone.value !== '') {
        userPhone.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        userPhone.style.borderBottom = '2px solid red'
    }
})
userSubject.addEventListener('keyup', function () {
    if (userSubject.value !== '') {
        userSubject.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        userSubject.style.borderBottom = '2px solid red'
    }
})
userText.addEventListener('keyup', function () {
    if (userText.value !== '') {
        userText.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        userText.style.borderBottom = '2px solid red'
    }
})

function checkCommentsInout() {
    if (userName.value === '' || userEmail.value === '' || userPhone.value === '' || userSubject.value === '' || userText.value === '') {
        alert('برای ثبت نظر لطفا همه فیلدها را پرکنید .')
    } else {
        let enteghadArray = JSON.parse(localStorage.getItem('enteghadArray'))
        if (enteghadArray) {
            allComments = enteghadArray
            entegadGenerator(allComments)
        } else {
            let allComments = []
            entegadGenerator(allComments)
        }
    }
}

function entegadGenerator(allComments) {

    let maxNumber = allComments.reduce((prevVal, currentVal) => {
        currentVal = currentVal.id
        if (prevVal > currentVal) {
            return prevVal
        }
        return currentVal
    }, 0)

    let newComment = {
        id: maxNumber + 1,
        name: userName.value,
        email: userEmail.value,
        phone: userPhone.value,
        subj: userSubject.value,
        text: userText.value,
    }
    allComments.push(newComment)
    localStorage.setItem('enteghadArray', JSON.stringify(allComments))
    userName.value = ''
    userEmail.value = ''
    userPhone.value = ''
    userSubject.value = ''
    userText.value = ''
    userName.style.borderBottom = '2px solid red'
    userEmail.style.borderBottom = '2px solid red'
    userPhone.style.borderBottom = '2px solid red'
    userSubject.style.borderBottom = '2px solid red'
    userText.style.borderBottom = '2px solid red'
}






sendCommentBtn.addEventListener('click', checkCommentsInout)
// utiliti
window.addEventListener('load', function () {
    contactUsNav.classList.add('current-tag')
})
// user Basket Count
window.addEventListener('load', getLocalStorageForUserBasketCount)
// dark mood
window.onload = function () {

    let localStorageMood = localStorage.getItem('mood')

    if (localStorageMood === 'dark') {
        document.body.classList.add('dark')
    }
}
////////////////////// end utiliti ////////////