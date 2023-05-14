const $ = document;

let userBasketCount = $.querySelector('.userBasket-count')
let cardItems = $.querySelector('.card-items')
let productNumStore = $.querySelector('.product-num-store')
///////////////////// modal1 //////////////////////////////////
let modalParent = $.querySelector('.modal-parent')
let headerElem = $.querySelector('header')
let sectionElem = $.querySelector('section')
let modalBtn = $.querySelector('.modal-btn')

let searchIcon = $.querySelector('.bi-search')
let searchingMessage = $.querySelector('.searching')
let findingInput = $.querySelector('.finding')
/////////////////// dark-mood //////////////////////////////////
let switchElem = $.querySelector('.switch')
////////////////////////////////////////////////////////////////
let homeTag = $.querySelector('.home-tag')
///////////////////////////////////////////////////////
let loginBeforOrder = $.querySelector('.not-received-modalParent')
let closeLoginModal = $.querySelector('.close-login-modal')
/////////// homeTag nav ///////////////////
window.addEventListener('load', function () {
    homeTag.classList.add('current-tag')
})
////////////////////////////////////////////////////////////////////////

function getLocalStorage() {
    let localStorageProducts = JSON.parse(localStorage.getItem('products'))
    if(localStorageProducts) {
        productNumStore.innerHTML = localStorageProducts.length
    }
    // let localStorageProductsImg = JSON.parse(localStorage.getItem('products'))

    if (localStorageProducts) {
        allProducts = localStorageProducts
    } else {
        allProducts = []
    }
    // console.log(allProducts)
    productGenerator(allProducts)
}

window.addEventListener('load', getLocalStorage)



let userBasket = []

function productGenerator(allProduct) {
    cardItems.innerHTML = ''
    allProduct.forEach(function (product) {

        let productItem = $.createElement('div')
        productItem.classList.add('card', 'text-center', 'shadow')

        let productImg = $.createElement('img')
        productImg.setAttribute('src', product.img)
        productImg.classList.add('card-img-top', 'p-3')

        let productTitle = $.createElement('h4')
        productTitle.classList.add('fw-bold', 'mt-3')
        productTitle.innerHTML = product.title

        let productPriceSection = $.createElement('div')
        productPriceSection.classList.add('card-body')

        let productVahed = $.createElement('p')
        productVahed.classList.add('card-text')
        productVahed.innerHTML = product.type

        let productPrice = $.createElement('p')
        productPrice.classList.add('fw-bold')
        productPrice.innerHTML = product.price + ' تومان'

        let productInfoBtn = $.createElement('button')
        productInfoBtn.classList.add('btn', 'btn-info', 'fw-bold', 'px-0', 'mb-2')
        productInfoBtn.addEventListener('click', function () {
            setSingleProduct(product)
        })

        let productInfoPageTag = $.createElement('a')
        productInfoPageTag.setAttribute('href', './pages/store/singleProduct.html')
        productInfoPageTag.classList.add('p-3')
        productInfoPageTag.innerHTML = 'مشاهده محصول'

        let addToBasketBtn = $.createElement('button')
        addToBasketBtn.classList.add('btn', 'btn-primary', 'fw-bold', 'mb-3')
        addToBasketBtn.innerHTML = 'افزودن به سبد خرید'
        addToBasketBtn.addEventListener('click', function () {

            let currentUserInfos = JSON.parse(localStorage.getItem('currentUser'))
            if (currentUserInfos) {
                getLocalStorageForUserBasket(product.id)
            } else {
                loginBeforOrder.style.display = 'block'
            }

            //      تابع برای زمانیکه محصول در سبد وجود دارد وا با کلیک روی دکمه ادد, فقط تعداد ان بیشتر شود
            //     let isExist = userBasket.some(function (userProduct) {
            //         return product === userProduct
            //     })
            //     if (isExist) {
            //         product.count++
            //         userBasketGenerator(userBasket)
            //         calcTotalPrice(userBasket)
            //     } else {
            //         addToBasketArray(product.id)
            //     }
        })

        productInfoBtn.append(productInfoPageTag)
        productPriceSection.append(productVahed, productPrice, productInfoBtn, addToBasketBtn)
        productItem.append(productImg, productTitle, productPriceSection)
        cardItems.append(productItem)
    })
}

closeLoginModal.addEventListener('click', function () {
    loginBeforOrder.style.display = 'none'
})

///////  user basket ////////////
let userBasketArray = []

function getLocalStorageForUserBasket(productId) {
    let allProducts = JSON.parse(localStorage.getItem('products'))
    let userBasket = JSON.parse(localStorage.getItem('userBasketArray'))

    let mainProduct = allProducts.find(function (product) {
        return product.id == productId
    })

    if (userBasket) {
        let isExist = userBasket.find(function (product) {
            return product.id == productId
        })

        if (isExist) {
            let mainPIndex = userBasket.findIndex(function (product) {
                return product.id == isExist.id
            })

            userBasket.splice(mainPIndex, 1)

            isExist.count++
            userBasket.push(isExist)

        } else {
            userBasket.push(mainProduct)
        }
        setMainProductTolocal(userBasket)
    } else {
        let mainProduct = allProducts.find(function (product) {
            return product.id === productId
        })
        userBasketArray.push(mainProduct)
        console.log(userBasketArray)
        setMainProductTolocal(userBasketArray)
    }
}

/////////  userBasketCount  ////////////////

function setMainProductTolocal(userBasketArray) {
    localStorage.setItem('userBasketArray', JSON.stringify(userBasketArray))
    userBasketCount.innerHTML = userBasketArray.length
}

function getLocalStorageForUserBasketCount() {
    let userBasketArray = JSON.parse(localStorage.getItem('userBasketArray'))

    if (!userBasketArray) {
        userBasketCount.innerHTML = 0
    } else {
        userBasketCount.innerHTML = userBasketArray.length
    }
}

window.addEventListener('load', getLocalStorageForUserBasketCount)

////////////  set Single Product  //////////////

function setSingleProduct(product) {
    let isExistSingleProduct = JSON.parse(localStorage.getItem('singleProduct'))

    if (isExistSingleProduct) {
        localStorage.removeItem('singleProduct')
        localStorage.setItem('singleProduct', JSON.stringify(product))
    } else {
        localStorage.setItem('singleProduct', JSON.stringify(product))
    }
}

///////////////////// dark mood ////////////////////////////////

switchElem.addEventListener('click', function () {
    document.body.classList.toggle('dark')

    if (document.body.className.includes('dark')) {
        localStorage.setItem('mood', 'dark')
    } else {
        localStorage.setItem('mood', 'light')
    }
})

window.onload = function () {

    let localStorageMood = localStorage.getItem('mood')

    if (localStorageMood === 'dark') {
        document.body.classList.add('dark')
    }
}

////////////// special discount /////////////////////////////////
let discountAlarm = $.querySelector('.discount-alarm')

let picturesArray = ['(./image/store/store/speaker.jpg) no-repeat center', '(./image/store/store/discount.png) no-repeat center']

let imgIndex = 0

function nextImage() {
    imgIndex++
    if (imgIndex > picturesArray.length - 1) {
        imgIndex = 0
    }
    discountAlarm.style.background = 'url' + picturesArray[imgIndex]
}

setInterval(nextImage, 400);

// navbar userBasket count
// function updateUserBasketCount() {
//     userBasketCount.innerHTML = userBasket.length
// }


//////////  search product //////////////////////////
findingInput.addEventListener('keyup', filterTask)

function filterTask(e) {
    const text = e.target.value.toLowerCase();

    let items = document.querySelectorAll('.card')
    items.forEach(function (task) {

        const item = task.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.classList.add("d-flex");
        } else {
            task.classList.remove("d-flex");
            task.style.display = 'none';
        }
    });
}

////   searchIcon   
searchIcon.addEventListener('mouseenter', function () {
    searchingMessage.style.display = 'flex'
})
searchIcon.addEventListener('mouseleave', function () {
    searchingMessage.style.display = 'none'
})

searchIcon.addEventListener('click', function () {

    document.documentElement.scrollTop = 936
    findingInput.focus()
})
// برای پیدا کردن نقطه اسکرول موردنظر
// document.addEventListener('scroll', dddddd)
// function dddddd (event) {
//     console.log(document.documentElement.scrollTop)
// }

//////////  teem carousel    ////////////////////////////////////////////////////
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




