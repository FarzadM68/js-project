let $ = document

/////////////  dark mood //////////////
let switchElem = $.querySelector('.switch')
/////////////  user basket  //////////
let userBasketCount = $.querySelector('.nav-store-count')

let adminNameInput = $.querySelector('.admin-name')
let adminFamilyInput = $.querySelector('.admin-family')
let adminUsernameInput = $.querySelector('.admin-username')
let adminEmailInput = $.querySelector('.admin-email')
let notReceivedModalParent = $.querySelector('.not-received-modalParent')
let exitFromUserP = $.querySelector('.exit-from-controlP')
let headerName = $.querySelector('.header-name')
let headerFamily = $.querySelector('.header-family')
let headerEmail = $.querySelector('.header-email')

let passwordModal = $.querySelector('.password-modal')
let previousUsersPasswordInput = $.querySelector('.previous-admin-password')
let newPasswordAdmin = $.querySelector('.new-password-admin')
let repeteAdminPassword = $.querySelector('.repete-password-admin')
let makeChangesBtn = $.querySelector('.make-changes')
let openModalAchangeAdminInfoBtn = $.querySelector('.openModal-change-adminInfo-btn')
let CloseChangeInfos = $.querySelector('.Close-changeInfos')
let CloseChangeInfosX = $.querySelector('.Close-changeInfosX')
// tiket
let tiketTitleInput = $.querySelector('.tiket-title')
let tiketTextInput = $.querySelector('.tiket-text')
let sendTiketBtn = $.querySelector('.send-tiket')

// products-container
let productsContainer = $.querySelector('.products-container')
let noPurchase = $.querySelector('.no-purchase')
/////////  userBasketCount  ////////////////
function getLocalStorageForUserBasketCount() {
    let userBasketArray = JSON.parse(localStorage.getItem('userBasketArray'))

    if (!userBasketArray) {
        userBasketCount.innerHTML = 0
    } else {
        userBasketCount.innerHTML = userBasketArray.length
    }
}

// user tiket
tiketTitleInput.addEventListener('keyup', function () {
    if (tiketTitleInput.value.length > 0) {
        tiketTitleInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        tiketTitleInput.style.borderBottom = '3px solid red'
    }
})
tiketTextInput.addEventListener('keyup', function () {
    if (tiketTextInput.value.length > 0) {
        tiketTextInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        tiketTextInput.style.borderBottom = '3px solid red'
    }
})

function getTiketsArray() {
    if (tiketTitleInput.value === '' || tiketTextInput.value === '') {
        alert('برای ثبت تیکت لطفا همه فیلدها را پرکنید .')
    } else {
        let tiketsArray = JSON.parse(localStorage.getItem('tiketsArray'))
        if (tiketsArray) {
            allTikets = tiketsArray
            tiketGenerator(allTikets)
        } else {
            let allTikets = []
            tiketGenerator(allTikets)
        }
    }
}

function tiketGenerator(allTikets) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    let maxNumber = allTikets.reduce((prevVal, currentVal) => {
        currentVal = currentVal.seconId
        if (prevVal > currentVal) {
            return prevVal
        }

        return currentVal
    }, 0)

    let newTilet = {
        id: currentUser.id,
        seconId: maxNumber + 1,
        title: tiketTitleInput.value,
        text: tiketTextInput.value,
        answer: ''
    }

    allTikets.push(newTilet)
    localStorage.setItem('tiketsArray', JSON.stringify(allTikets))
    getTiketsInfo()
    tiketTitleInput.value = ''
    tiketTextInput.value = ''
    tiketTitleInput.style.borderBottom = '3px solid red'
    tiketTextInput.style.borderBottom = '3px solid red'
}

function getTiketsInfo() {
    tiketTitleInput.value = 'عنوان تیکت'
    let tiketsArray = JSON.parse(localStorage.getItem('tiketsArray'))
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (tiketsArray) {
        let mainTiket = tiketsArray.filter(function (tiket) {
            return tiket.id == currentUser.id
        })
        addToTiketSection(mainTiket)
    }
}

function addToTiketSection(mainTiket) {

    let questionContainer = $.querySelector('.question-container')
    questionContainer.innerHTML = ''
    mainTiket.forEach(function (tiket) {
        questionContainer.insertAdjacentHTML('beforeend', `
        <div class="question-section mt-3">
            <div class="question-header">
                <i class="bi bi-hourglass-split text-warning"></i>
                <button class="infos-btn question-header" type="button" data-bs-toggle="collapse" data-bs-target="#question${mainTiket.indexOf(tiket)}"
                    data-id="${tiket.seconId}" onclick="getAnswersFunc(event)">
                    ${tiket.text}
                </button>
            </div>
            <div class="collapse multi-collapse" id="question${mainTiket.indexOf(tiket)}">
                <div class="not-answer-section">
                    <h6 class="m-0">${tiket.answer}</h6>
                </div>
            </div>
        </div>
        `)
    })
}

function getAnswersFunc(event) {
    let tiketSecondId = event.target.dataset.id
    let tiketHeader = event.target
    // console.log(tiketHeader)
    let allTikets = JSON.parse(localStorage.getItem('tiketsArray'))
    let mainTiket = allTikets.find(function (tiket) {
        return tiket.seconId == tiketSecondId
    })
    if (mainTiket.answer) {
        // tiketHeader.style.backgroudColor = 'green'
        tiketHeader.classList.add('bg-green')
    } else {
        tiketHeader.classList.add('bg-red')
    }
}


// user infoes 
function getCurrentUserInfosFromLocal() {
    let currentUserInfos = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUserInfos) {
        console.log('yes')
        adminNameInput.value = currentUserInfos.name
        adminFamilyInput.value = currentUserInfos.family
        adminUsernameInput.value = currentUserInfos.username
        adminEmailInput.value = currentUserInfos.email
        headerName.innerHTML = currentUserInfos.name
        headerFamily.innerHTML = currentUserInfos.family
        headerEmail.innerHTML = currentUserInfos.email
        getTiketsInfo()
        getUserPurchase(currentUserInfos)
    } else {
        console.log('no')
        notReceivedModalParent.style.display = 'block'
    }
}

function checkPasswordfunc() {
    let currentUserInfos = JSON.parse(localStorage.getItem('currentUser'))
    if (previousUsersPasswordInput.value === '') {
        alert('برای انجام تغییرات رمز عبور جاری خودرا وارد کنید .')
    } else if (previousUsersPasswordInput.value !== currentUserInfos.password) {
        alert('رمز عبور جاری شما اشتباه است .')
        previousUsersPasswordInput.value = ''
    } else if (newPasswordAdmin.value === '' && repeteAdminPassword.value === '') {
        createNewCurrentUser(currentUserInfos)
        alert('تغییر اطلاعات با موفقیت انجام شد .')
        passwordModal.style.display = 'none'
        previousUsersPasswordInput.value = ''
        previousUsersPasswordInput.style.borderBottom = '2px solid red'
    } else {
        if (newPasswordAdmin.value.length < 8) {
            alert('رمز جدید باید حداقل 8 کاراکتر داشته باشد.')
        } else if (newPasswordAdmin.value === previousUsersPasswordInput.value) {
            alert('رمز جدید نمیتواند شبیه رمز قبلی باشد')
        } else if (repeteAdminPassword.value === '') {
            alert('تکرار رمز جدید الزامیست .')
        } else if (newPasswordAdmin.value !== repeteAdminPassword.value) {
            alert('تکرار رمز جدید اشتباه است .')
        } else {
            createNewCurrentUser(currentUserInfos)
            alert('تغییر اطلاعات با موفقیت انجام شد .')
            passwordModal.style.display = 'none'
            previousUsersPasswordInput.value = ''
            newPasswordAdmin.value = ''
            repeteAdminPassword.value = ''
            previousUsersPasswordInput.style.borderBottom = '2px solid red'
            newPasswordAdmin.style.borderBottom = '1px solid rgb(180, 180, 180)'
            repeteAdminPassword.style.borderBottom = '1px solid rgb(180, 180, 180)'
        }
    }
}

function addProfileFunc() {

    let allUsers = JSON.parse(localStorage.getItem('usersArray'))
    let currentUserInfos = JSON.parse(localStorage.getItem('currentUser'))

    let mainUser = allUsers.findIndex(function (user) {
        return user.username == currentUserInfos.username
    })

    allUsers.splice(mainUser, 1)
    localStorage.setItem('currentUser', JSON.stringify(currentUserInfos))
    allUsers.push(currentUserInfos)
    localStorage.setItem('usersArray', JSON.stringify(allUsers))
}

function createNewCurrentUser(currentUserInfos) {

    currentUserInfos.name = adminNameInput.value
    currentUserInfos.family = adminFamilyInput.value
    currentUserInfos.username = adminUsernameInput.value
    currentUserInfos.email = adminEmailInput.value
    if (repeteAdminPassword.value !== '') {
        currentUserInfos.password = repeteAdminPassword.value
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUserInfos))
    getCurrentUserInfosFromLocal()
    addProfileFunc()
}

function chekAllInputs() {

    if (adminNameInput.value === '' || adminFamilyInput.value === '' || adminUsernameInput.value === '' || adminEmailInput.value === '') {
        alert('برای انجام تغییرات لطفا تمام گزینه ها را پر کنید')
    } else if (adminUsernameInput.value.length < 8) {
        alert('نام کاربری باید حداقل 8 کاراکتر داشته باشد .')
    } else {
        passwordModal.style.display = 'block'
        previousUsersPasswordInput.focus()
    }
}

function CloseChangeInfosFunc() {
    passwordModal.style.display = 'none'
}

adminNameInput.addEventListener('keyup', function () {
    if (adminNameInput.value.length > 0) {
        adminNameInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        adminNameInput.style.borderBottom = '2px solid red'
    }
})
adminFamilyInput.addEventListener('keyup', function () {
    if (adminFamilyInput.value.length > 0) {
        adminFamilyInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        adminFamilyInput.style.borderBottom = '2px solid red'
    }
})
adminEmailInput.addEventListener('keyup', function () {
    if (adminEmailInput.value.length > 0) {
        adminEmailInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        adminEmailInput.style.borderBottom = '2px solid red'
    }
})
adminUsernameInput.addEventListener('keyup', function () {
    if (adminUsernameInput.value.length > 7) {
        adminUsernameInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        adminUsernameInput.style.borderBottom = '2px solid red'
    }
})
previousUsersPasswordInput.addEventListener('keyup', function () {
    if (previousUsersPasswordInput.value !== '') {
        previousUsersPasswordInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        previousUsersPasswordInput.style.borderBottom = '2px solid red'
    }
})
newPasswordAdmin.addEventListener('keyup', function () {
    if (newPasswordAdmin.value === '' && repeteAdminPassword.value === '') {
        newPasswordAdmin.style.borderBottom = '2px solid red'
        repeteAdminPassword.style.borderBottom = '2px solid red'
    } else if (newPasswordAdmin.value !== '' && repeteAdminPassword.value === '') {
        newPasswordAdmin.style.borderBottom = '2px solid rgb(15, 199, 55)'
        repeteAdminPassword.style.borderBottom = '2px solid red'
    } else if (newPasswordAdmin.value === '' && repeteAdminPassword.value !== '') {
        newPasswordAdmin.style.borderBottom = '2px solid red'
        repeteAdminPassword.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        newPasswordAdmin.style.borderBottom = '2px solid rgb(15, 199, 55)'
        repeteAdminPassword.style.borderBottom = '2px solid rgb(15, 199, 55)'
    }
})
repeteAdminPassword.addEventListener('keyup', function () {
    if (newPasswordAdmin.value === '' && repeteAdminPassword.value === '') {
        newPasswordAdmin.style.borderBottom = '2px solid red'
        repeteAdminPassword.style.borderBottom = '2px solid red'
    } else if (newPasswordAdmin.value !== '' && repeteAdminPassword.value === '') {
        newPasswordAdmin.style.borderBottom = '2px solid rgb(15, 199, 55)'
        repeteAdminPassword.style.borderBottom = '2px solid red'
    } else if (newPasswordAdmin.value === '' && repeteAdminPassword.value !== '') {
        newPasswordAdmin.style.borderBottom = '2px solid red'
        repeteAdminPassword.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        newPasswordAdmin.style.borderBottom = '2px solid rgb(15, 199, 55)'
        repeteAdminPassword.style.borderBottom = '2px solid rgb(15, 199, 55)'
    }
})

// User Purchase
function getUserPurchase(currentUserInfos) {
    let purchaseArray = JSON.parse(localStorage.getItem('userPurches'))
    
    if (purchaseArray) {
        let currentUserPurcase = purchaseArray.filter(function (purchase) {
            return purchase.id == currentUserInfos.id
        })

        if (currentUserPurcase == '') {
            noPurchase.style.display = 'block'

        } else {
            purchaseCardGenerator(currentUserPurcase)
        }
    } else {
        noPurchase.style.display = 'block'
    }
}

function purchaseCardGenerator(currentUserPurcase) {
    
    let purchasInfos = $.querySelector('.purchas-infos')
    purchasInfos.innerHTML = ''
    currentUserPurcase.forEach(function (purchase) {
        // console.log(purchase)
        productsAndPricesCard(purchase)
        purchasInfos.insertAdjacentHTML('beforeend', `
            <div>
                <p> مجموع پرداختی : ${purchase.totalPrice}</p>
            </div>
            <div>
                <p>تاریخ : ${purchase.date} </p>
            </div>
            <div>
                <p>کدپیگیری : ${purchase.peygiriCode} </p>
            </div>
        `)
    })
}

function productsAndPricesCard(purchase) {

    let productsAndPrices = purchase.content
    console.log(productsAndPrices)
    let tbody = $.querySelector('.tbody')
    tbody.innerHTML = ''
    productsAndPrices.forEach(function(product) {
        tbody.insertAdjacentHTML('beforeend', `
        
        <tbody>
            <tr>
                <th scope="row">${productsAndPrices.indexOf(product) + 1}</th>
                <td colspan="2">${product.title}</td>
                <td colspan="2">${product.price} </td>
                <td colspan="2">${product.count} </td>
            </tr>
        </tbody>
        `)
    })
}


// ${currentUserPurcase.indexOf(purchase).title}

// function getUserPurcase(currentUserPurcase) {
//     currentUserPurcase.forEach(function (purchas) {
//         purchaseCardGenerator()
//         console.log(purchas.content)
//     })
// }

// function purchaseCardGenerator() {



//     
// }




// tiket events 
sendTiketBtn.addEventListener('click', getTiketsArray)
// window.addEventListener('load', getTiketsInfo)
////////////////
CloseChangeInfosX.addEventListener('click', CloseChangeInfosFunc)
CloseChangeInfos.addEventListener('click', CloseChangeInfosFunc)
makeChangesBtn.addEventListener('click', checkPasswordfunc)
exitFromUserP.addEventListener('click', function () {
    localStorage.removeItem('currentUser')
})
openModalAchangeAdminInfoBtn.addEventListener('click', chekAllInputs)
window.addEventListener('load', getCurrentUserInfosFromLocal)



//////////////////////////  dark mood ////////////////////////////////////////
switchElem.addEventListener('click', function () {
    document.body.classList.toggle('dark')

    if (document.body.className.includes('dark')) {
        localStorage.setItem('mood2', 'dark')
    } else {
        localStorage.setItem('mood2', 'light')
    }
})

window.onload = function () {

    let localStorageMood = localStorage.getItem('mood2')

    if (localStorageMood === 'dark') {
        document.body.classList.add('dark')
    }
}
// userBasketCount
window.addEventListener('load', getLocalStorageForUserBasketCount)

