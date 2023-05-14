let $ = document

let singleProductContent = $.querySelector('.singleProduct-content')
let singleProductContainer = $.querySelector('.singleProduct-container')
let singleProductTitle = $.querySelector('.singleProduct-title')
let switchElem = $.querySelector('.switch')
let cardItemsSimilar = $.querySelector('.card-items')
let userBasketCount = $.querySelector('.userBasket-count')
///////////////////////////////////////////////////////
let loginBeforOrder = $.querySelector('.not-received-modalParent')
let closeLoginModal = $.querySelector('.close-login-modal')


// main product generator
function getLocalSingleProduct() {
    let getLocal = JSON.parse(localStorage.getItem('singleProduct'))
    singleProductTitle.innerHTML = getLocal.title
    sigleProductGenerator(getLocal)
}

function sigleProductGenerator(product) {

    let productsFragment = $.createDocumentFragment()
    singleProductContent.insertAdjacentHTML('beforeend', `   
    <div class="col-md-5">
        <img class="w-100 shadow p-3" src="${product.img}" alt="...">
    </div>
    <div class="col-md-6 mt-5 mt-md-0">
        <h2 class="fw-bold">${product.title}</h2>
        <h6 class="my-3">${product.type}</h6>
        <h4 class="mb-3">${product.price + ' تومان '}</h4>
        <p> توضیحات : ${product.description}</p>
        <span>دسته بندی :</span>
        <span> ${product.category} </span>
        <button class="btn btn-primary d-block mt-3" onclick="checkForLogin(${product.id})">افزودن به سبد خرید</button>
    </div>
    `)
    productsFragment.appendChild(singleProductContent)
    singleProductContainer.appendChild(productsFragment)
}

function checkForLogin(productId) {

    let currentUserInfos = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUserInfos) {
        getLocalStorageForUserBasket(productId)
    } else {
        loginBeforOrder.style.display = 'block'
    }
}


// similar products generator
function getLocalForSimilarProduct() {
    let allProducts = JSON.parse(localStorage.getItem('products'))
    let getLocal = JSON.parse(localStorage.getItem('singleProduct'))

    let similar = allProducts.filter(function (product) {
        return product.category == getLocal.category
    })
    if (getLocal.category !== 'عمومی') {
        similarProductsGenerator(similar)
    }
}

function similarProductsGenerator(similarArray) {

    let getLocal = JSON.parse(localStorage.getItem('singleProduct'))
    let similarProductS = similarArray.filter(function (product) {
        return product.title !== getLocal.title
    })

    similarProductS.forEach(function (product) {

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
        productInfoPageTag.setAttribute('href', './singleProduct.html')
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
        })

        productInfoBtn.append(productInfoPageTag)
        productPriceSection.append(productVahed, productPrice, productInfoBtn, addToBasketBtn)
        productItem.append(productImg, productTitle, productPriceSection)
        cardItemsSimilar.append(productItem)
    })
}

closeLoginModal.addEventListener('click', function () {
    loginBeforOrder.style.display = 'none'
})

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
//////////////////////////////////////////

/////// add to user basket ////////////
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





///////////////////// dark mood ////////////////////////////////
switchElem.addEventListener('click', function () {
    document.body.classList.toggle('dark')

    if (document.body.className.includes('dark')) {
        localStorage.setItem('mood', 'dark')
    } else {
        localStorage.setItem('mood', 'light')
    }
})
//////////////////////////////////////////////////////





window.addEventListener('load', getLocalStorageForUserBasketCount)
window.addEventListener('load', getLocalSingleProduct)
window.addEventListener('load', getLocalForSimilarProduct)
window.onload = function () {
    let localStorageMood = localStorage.getItem('mood')
    if (localStorageMood === 'dark') {
        document.body.classList.add('dark')
    }
}




