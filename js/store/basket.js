let $ = document

let userBasketContainer = $.querySelector('.basket-user')
let purchaseBtn = $.querySelector('#purchase')
let totalPrice = $.querySelector('.total-price')
let navUserBasketCount = $.querySelector('.userBasket-count')
let userBasketCount = $.querySelector('.userBasket-count2')

let totalDiscount = 0
let discountBtn = $.querySelector('.discount-btn')
let discountPriceTable = $.querySelector('.discount-price')
let Payable = $.querySelector('.payable')

let copenCodeInput = $.querySelector('.copenCode')
/////////////////// dark-mood //////////////////////////////////
let switchElem = $.querySelector('.switch')

let basketTag = $.querySelector('.basket-tag')

function getLocalStorage() {
    let userBasketArray = JSON.parse(localStorage.getItem('userBasketArray'))

    if (userBasketArray) {
        userBasketGenerator(userBasketArray)
        calcTotalPrice(userBasketArray)
        userBasketCount.innerHTML = userBasketArray.length
        navUserBasketCount.innerHTML = userBasketArray.length
        discountPriceTable.innerHTML = 0
    } else {
        userBasketCount.innerHTML = 0
        navUserBasketCount.innerHTML = 0
        discountPriceTable.innerHTML = 0
        totalPrice.innerHTML = 0
        Payable.innerHTML = 0
    }
}

function setnewUserBasketToLS(userBasket) {
    localStorage.setItem('userBasketArray', JSON.stringify(userBasket))
    userBasketGenerator(userBasket)
}

function userBasketGenerator(userBasket) {
    userBasketContainer.innerHTML = ''
    userBasket.forEach(function (product) {

        let basketParent = $.createElement('div')
        basketParent.classList.add('add-product')

        let basketImgVsTitle = $.createElement('div')
        basketImgVsTitle.classList.add('small-img', 'mt-2', 'd-sm-flex', 'align-items-center')

        let basketImg = $.createElement('img')
        basketImg.setAttribute('src', product.img)
        basketImg.classList.add('basket-img')

        let basketTitle = $.createElement('p')
        basketTitle.innerHTML = product.title
        basketTitle.classList.add('product-title', 'mb-0', 'me-2')

        let productPrice = $.createElement('div')
        productPrice.classList.add('price')

        let productPriceTxt = $.createElement('p')
        productPriceTxt.innerHTML = product.price + ' تومان'
        productPriceTxt.classList.add('tomans', 'mb-0')

        let deleteDiv = $.createElement('div')
        deleteDiv.classList.add('delete', 'px-sm-5')

        let productN = $.createElement('input')
        productN.setAttribute('type', 'Number')
        productN.setAttribute('min', '0')
        productN.setAttribute('value', product.count)
        productN.classList.add('product-n')
        productN.addEventListener('change', function () {
            updateProductCount(product.id, productN.value)
        })

        let btnDelete = $.createElement('button')
        btnDelete.classList.add('btn-del')
        btnDelete.innerHTML = 'حذف کالا'
        btnDelete.addEventListener('click', function () {
            product.count = 1
            removeProduct(product.id)
        })

        basketImgVsTitle.append(basketImg, basketTitle)
        productPrice.append(productPriceTxt)
        deleteDiv.append(productN, btnDelete)
        basketParent.append(basketImgVsTitle, productPrice, deleteDiv)
        userBasketContainer.append(basketParent)
    })
}

// removeProduct
function removeProduct(productId) {
    productId.count = 1

    let userBasketArray = JSON.parse(localStorage.getItem('userBasketArray'))

    let userBasket = userBasketArray.filter(function (product) {
        return product.id !== productId
    })
    setnewUserBasketToLS(userBasket)
    calcTotalPrice(userBasket)
    userBasketCount.innerHTML = userBasket.length
    navUserBasketCount.innerHTML = userBasket.length
}

// get current time  
function getCurrentDate() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date().toLocaleDateString('fa-IR', options);

    return today
}

// purchase
purchaseBtn.addEventListener('click', function () {

    if (userBasketContainer.innerHTML === '') {
        alert('سبد خرید شما خالیست !!')
    } else {
        let purchaseArray = JSON.parse(localStorage.getItem('userPurches'))
        if (purchaseArray) {
            allPurchase = purchaseArray
            purchaseArrayGenerator(allPurchase)
        } else {
            let allPurchase = []
            purchaseArrayGenerator(allPurchase)
        }
    }

})

function purchaseArrayGenerator(allPurchase) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let userBasketArray = JSON.parse(localStorage.getItem('userBasketArray'))

    // userBasketArray.forEach(function(product) {
    //     console.log(product.title)
    // })
    // console.log(userBasketArray)
    let peygiri = Math.floor(Math.random() * 10000)

    let newPurches = {
        id: currentUser.id,
        content: userBasketArray,
        peygiriCode: peygiri,
        totalPrice: Payable.innerHTML,
        date: getCurrentDate()
    }

    allPurchase.push(newPurches)
    // console.log(allPurchase)
    localStorage.setItem('userPurches', JSON.stringify(allPurchase))
    localStorage.removeItem('userBasketArray')
    userBasketContainer.innerHTML = ''
    userBasketCount.innerHTML = 0
    navUserBasketCount.innerHTML = 0
    totalPrice.innerHTML = 0
    Payable.innerHTML = 0
    discountPriceTable.innerHTML = 0

    alert('پرداخت با موفقیت انجام شد' + "\n" + 'شماره پیگیری : ' + peygiri)
}



// Total Price
function calcTotalPrice(userBasketArray) {
    let sum = 0
    userBasketArray.forEach(function (product) {
        sum += product.price * product.count
    })
    totalPrice.innerHTML = sum + '   تومان'
    Payable.innerHTML = sum - Number(discountPriceTable.innerHTML) + ' تومان'
}

function updateProductCount(productId, newCount) {
    // product.count = 1

    let userBasketArray = JSON.parse(localStorage.getItem('userBasketArray'))
    userBasketArray.forEach(function (product) {
        if (product.id === productId) {
            product.count = newCount
        }
    })
    localStorage.setItem('userBasketArray', JSON.stringify(userBasketArray))
    calcTotalPrice(userBasketArray)
    if (newCount <= 0) {
        newCount = 1
        removeProduct(productId)
    }
}

// discount
function discountOperation() {
    let userBasketArray = JSON.parse(localStorage.getItem('userBasketArray'))

    if (copenCodeInput.value === '') {
        alert('برای استفاده از تخفیف لطفا کد تخفیف خود را وارد نمایید.')
    } else {
        let targetProductForDiscount = userBasketArray.find(function (product) {
            return copenCodeInput.value == product.copenCode
        })
        totalDiscount = 0

        if (targetProductForDiscount) {
            discountPrice = (targetProductForDiscount.price * (targetProductForDiscount.discountValue / 100)) * targetProductForDiscount.count
            totalDiscount += (Number(discountPrice))
            discountPriceTable.innerHTML = totalDiscount
            calcTotalPrice(userBasketArray)
        } else {
            totalDiscount = 0
            discountPriceTable.innerHTML = 0
            calcTotalPrice(userBasketArray)
        }
    }
    copenCodeInput.value = ''
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

////////////// listeners /////////////////////////////////

window.onload = function () {

    let localStorageMood = localStorage.getItem('mood')

    if (localStorageMood === 'dark') {
        document.body.classList.add('dark')
    }
}

copenCodeInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        discountOperation()
    }
})

discountBtn.addEventListener('click', discountOperation)
window.addEventListener('load', getLocalStorage)
window.addEventListener('load', function () {
    basketTag.classList.add('current-tag')
})
