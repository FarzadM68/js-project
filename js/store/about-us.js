let $ = document

let aboutUsTag = $.querySelector('.about-us')
let switchElem = $.querySelector('.switch')
let userBasketCount = $.querySelector('.userBasket-count')

let card = $.querySelector('.card ')
let contactToworker = $.querySelector('.contact-toworker')
let contactToworkerParent = $.querySelector('.contact-toworker-parent')



// card.addEventListener('mouseenter', function () {
//     contactToworkerParent.style.display = 'block'
// })
// card.addEventListener('mouseleave', function () {
//     contactToworkerParent.style.display = 'none'
// })


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
/////////////////////////
function getLocalSAllPerson() {
    let allPerson = JSON.parse(localStorage.getItem('personArray'))
    if (allPerson) {
        cardPersonGenerator(allPerson)
    }

}

function cardPersonGenerator(allPerson) {

    let cardsContainer = $.querySelector('.cards-container')

    allPerson.forEach(function (person) {

        cardsContainer.insertAdjacentHTML('beforeend', `
        <div class="card" style="width: 18rem;" data-id="${person.id}" onmouseenter="mouseEnterFunc(event)" onmouseleave="mouseLeaveFunc(event)">
            <img src="${person.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${person.name}</h5>
                <p class="card-text fw-bold">${person.job}</p>
                <p class="card-text">${person.description}</p>
                <p>کد پرسنلی : ${person.id * 565}</p>
                
            </div>
        </div>
        `)
        // dddddddddd(person.id)
    })
}

window.addEventListener('load', getLocalSAllPerson)

// function dddddddddd(personId) {
//     console.log(personId)
// }


function mouseEnterFunc(event) {
    let personId = Number(event.target.dataset.id)
    // console.log(personId)
    // contactToworkerParent.style.display = 'block'
}

function mouseLeaveFunc(event) {
    let personId = Number(event.target.dataset.id)
    // console.log(personId)
    // contactToworkerParent.style.display = 'none'
}


///////////////////////////////////
function getTeemInfos() {
    let allTeem = JSON.parse(localStorage.getItem('personArray'))
    if(allTeem) {
        teemGenerator(allTeem)
    }
}

function teemGenerator(allTeem) {

    let teemContainer = $.querySelector('.carousel-teem-container')

    allTeem.forEach(function (person) {

        teemContainer.insertAdjacentHTML('beforeend', `
        <div class="carousel-item carousel-caption-container" data-bs-interval="2500">
            <div class="text-center">
                <img class="teem-image" src="${person.image}" alt="...">
                <h5 class="my-4 fw-bold">${person.name}</h5>
                <h5 class="teem-job">${person.job}</h5>
                <h4 class="my-4 teem-like">⭐</h4>
                <span>کد پرسنلی </span>
                <span>${person.id * 565}</span>
            </div>
        </div>
        `)
    })
}



window.addEventListener('load', getTeemInfos)

window.addEventListener('load', getLocalSAllPerson)
// homeTag nav 
window.addEventListener('load', function () {
    aboutUsTag.classList.add('current-tag')
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



// let cardee = document.querySelectorAll('.card-hoveree')

// cardee.forEach(function (change1) {
//     change1.addEventListener('mouseenter', function (event) {
//         let buyBtn = event.target.firstElementChild.lastElementChild

//         buyBtn.classList.add('btn-light')

//     })
// })

// cardee.forEach(function (change1) {
//     change1.addEventListener('mouseleave', function (event) {

//         let buyBtn = event.target.firstElementChild.lastElementChild

//         buyBtn.classList.remove('btn-light')
//     })
// })