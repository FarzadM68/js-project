let $ = document

let productsCount = $.querySelector('.products-count')
let homeTabPane = $.querySelector('#home-tab-pane')
let wallTabPane = $.querySelector('#wall-tab-pane')
let saghfTabPane = $.querySelector('#saghf-tab-pane')
let zaminiTabPane = $.querySelector('#zamini-tab-pane')
let otherTabPane = $.querySelector('#other-tab-pane')

// tabs
let homeTab = $.querySelector('#home-tab')
let wallTab = $.querySelector('#wall-tab')
let saghfTab = $.querySelector('#saghf-tab')
let zaminiTab = $.querySelector('#zamini-tab')
let otherTab = $.querySelector('#other-tab')

// tabs content
let homeTabContent = $.querySelector('.allProduct-tab')
let wallProductTab = $.querySelector('.wallProduct-tab')
let saghfProductTab = $.querySelector('.saghfProduct-tab')
let zaminifProductTab = $.querySelector('.zaminiProduct-tab')
let otherProductTab = $.querySelector('.otherProduct-tab')

let switchElem = $.querySelector('.switch')

let productTag = $.querySelector('.product-tag')

let userBasketCount = $.querySelector('.userBasket-count')

let searchIcon = $.querySelector('.bi-search')
let searchingMessage = $.querySelector('.searching')
let findingInput = $.querySelector('.finding')

///////////////////////////////////////////////////////
let loginBeforOrder = $.querySelector('.not-received-modalParent')
let closeLoginModal = $.querySelector('.close-login-modal')

///////////////////// dark mood ////////////////////////////////

switchElem.addEventListener('click', function () {
    document.body.classList.toggle('dark')

    if (document.body.className.includes('dark')) {
        localStorage.setItem('mood', 'dark')
    } else {
        localStorage.setItem('mood', 'light')
    }
})



// call funssss
function getLocalStorage() {
    let localStorageProducts = JSON.parse(localStorage.getItem('products'))
    if(localStorageProducts) {
        productsCount.innerHTML = localStorageProducts.length
    }

    if (localStorageProducts) {
        allProducts = localStorageProducts
    } else {
        allProducts = []
    }
    allProductsGenerator(allProducts)
    wallProductFind(allProducts)
    saghfProductFind(allProducts)
    zaminiProductFind(allProducts)
    otherProductFind(allProducts)
}


// find funsssss
function wallProductFind(allProduct) {
    let wallProductss = allProduct.filter(function (product) {
        return product.category == 'دیواری'
    })
    wallProductGenerator(wallProductss)
}

function saghfProductFind(allProduct) {
    let saghfProductss = allProduct.filter(function (product) {
        return product.category == 'سقفی'
    })
    saghfProductGenerator(saghfProductss)
}

function zaminiProductFind(allProduct) {
    let saghfProductss = allProduct.filter(function (product) {
        return product.category == 'زمینی'
    })
    zaminiProductGenerator(saghfProductss)
}

function otherProductFind(allProduct) {
    let otherProductss = allProduct.filter(function (product) {
        return product.category == 'عمومی'
    })
    otherProductGenerator(otherProductss)
}


// Generator funsss
function allProductsGenerator(allProduct) {

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
        homeTabContent.append(productItem)
    })
}

closeLoginModal.addEventListener('click', function () {
    loginBeforOrder.style.display = 'none'
})


function wallProductGenerator(allProduct) {

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
        productInfoBtn.classList.add('btn', 'btn-info', 'fw-bold','px-0', 'mb-2')
        productInfoBtn.addEventListener('click', function () {
            setSingleProduct(product)
        })

let productInfoPageTag = $.createElement('a')
        productInfoPageTag.setAttribute('href', './singleProduct.html')
        productInfoPageTag.classList.add('p-3')
        productInfoPageTag.innerHTML =  'مشاهده محصول'
        
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
        wallProductTab.append(productItem)
    })
}


function saghfProductGenerator(allProduct) {

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
        productInfoBtn.classList.add('btn', 'btn-info', 'fw-bold','px-0', 'mb-2')
        productInfoBtn.addEventListener('click', function () {
            setSingleProduct(product)
        })

        let productInfoPageTag = $.createElement('a')
        productInfoPageTag.setAttribute('href', './singleProduct.html')
        productInfoPageTag.classList.add('p-3')
        productInfoPageTag.innerHTML =  'مشاهده محصول'
  
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
        saghfProductTab.append(productItem)
    })
}

function zaminiProductGenerator(allProduct) {

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
        productInfoBtn.classList.add('btn', 'btn-info', 'fw-bold','px-0', 'mb-2')
        productInfoBtn.addEventListener('click', function () {
            setSingleProduct(product)
        })
        
        let productInfoPageTag = $.createElement('a')
        productInfoPageTag.setAttribute('href', './singleProduct.html')
        productInfoPageTag.classList.add('p-3')
        productInfoPageTag.innerHTML =  'مشاهده محصول'
  
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
        zaminifProductTab.append(productItem)
    })
}

function otherProductGenerator(allProduct) {

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
        productInfoBtn.classList.add('btn', 'btn-info', 'fw-bold','px-0', 'mb-2')
        productInfoBtn.addEventListener('click', function () {
            setSingleProduct(product)
        })
        
        let productInfoPageTag = $.createElement('a')
        productInfoPageTag.setAttribute('href', './singleProduct.html')
        productInfoPageTag.classList.add('p-3')
        productInfoPageTag.innerHTML =  'مشاهده محصول'
        
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
        otherProductTab.append(productItem)
    })
}

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





function showHomeContent() {
    wallTabPane.classList.remove('show')
    wallTabPane.classList.remove('active')
    wallTab.classList.remove('active')
    saghfTabPane.classList.remove('show')
    saghfTabPane.classList.remove('active')
    saghfTab.classList.remove('active')
    zaminiTabPane.classList.remove('show')
    zaminiTabPane.classList.remove('active')
    zaminiTab.classList.remove('active')
    otherTabPane.classList.remove('show')
    otherTabPane.classList.remove('active')
    otherTab.classList.remove('active')
    homeTabPane.className += 'show active'
    homeTab.className += ' active'
}

function showWallContent() {
    homeTabPane.classList.remove('show')
    homeTabPane.classList.remove('active')
    homeTab.classList.remove('active')
    saghfTabPane.classList.remove('show')
    saghfTabPane.classList.remove('active')
    saghfTab.classList.remove('active')
    zaminiTabPane.classList.remove('show')
    zaminiTabPane.classList.remove('active')
    zaminiTab.classList.remove('active')
    otherTabPane.classList.remove('show')
    otherTabPane.classList.remove('active')
    otherTab.classList.remove('active')
    wallTabPane.className += 'show active'
    wallTab.className += ' active'
}

function showsaghfContent() {
    homeTabPane.classList.remove('show')
    homeTabPane.classList.remove('active')
    homeTab.classList.remove('active')
    wallTabPane.classList.remove('show')
    wallTabPane.classList.remove('active')
    wallTab.classList.remove('active')
    zaminiTabPane.classList.remove('show')
    zaminiTabPane.classList.remove('active')
    zaminiTab.classList.remove('active')
    otherTabPane.classList.remove('show')
    otherTabPane.classList.remove('active')
    otherTab.classList.remove('active')
    saghfTabPane.className += 'show active'
    saghfTab.className += ' active'
}

function showzaminiContent() {
    homeTabPane.classList.remove('show')
    homeTabPane.classList.remove('active')
    homeTab.classList.remove('active')
    wallTabPane.classList.remove('show')
    wallTabPane.classList.remove('active')
    wallTab.classList.remove('active')
    saghfTabPane.classList.remove('show')
    saghfTabPane.classList.remove('active')
    saghfTab.classList.remove('active')
    otherTabPane.classList.remove('show')
    otherTabPane.classList.remove('active')
    otherTab.classList.remove('active')
    zaminiTabPane.className += 'show active'
    zaminiTab.className += ' active'
}

function showOtherContent() {
    homeTabPane.classList.remove('show')
    homeTabPane.classList.remove('active')
    homeTab.classList.remove('active')
    wallTabPane.classList.remove('show')
    wallTabPane.classList.remove('active')
    wallTab.classList.remove('active')
    saghfTabPane.classList.remove('show')
    saghfTabPane.classList.remove('active')
    saghfTab.classList.remove('active')
    zaminiTabPane.classList.remove('show')
    zaminiTabPane.classList.remove('active')
    zaminiTab.classList.remove('active')
    otherTabPane.className += 'show active'
    otherTab.className += ' active'
}



homeTab.addEventListener('click', showHomeContent)
wallTab.addEventListener('click', showWallContent)
saghfTab.addEventListener('click', showsaghfContent)
zaminiTab.addEventListener('click', showzaminiContent)
otherTab.addEventListener('click', showOtherContent)


// find product 
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




searchIcon.addEventListener('mouseenter', function () {
    searchingMessage.style.display = 'flex'
})
searchIcon.addEventListener('mouseleave', function () {
    searchingMessage.style.display = 'none'
})

searchIcon.addEventListener('click', function () {
    document.documentElement.scrollTop = 500
    findingInput.focus()
})
// برای پیدا کردن نقطه اسکرول موردنظر
// document.addEventListener('scroll', dddddd)
// function dddddd (event) {
//     console.log(document.documentElement.scrollTop)
// }
findingInput.addEventListener('keyup', filterTask)
window.addEventListener('load', getLocalStorage)
window.addEventListener('load', getLocalStorageForUserBasketCount)
window.addEventListener('load', function () {
    homeTabPane.className += 'show active'
    homeTab.className += ' active'
})

window.onload = function () {

    let localStorageMood = localStorage.getItem('mood')

    if (localStorageMood === 'dark') {
        document.body.classList.add('dark')
    }
}

window.addEventListener('load', function () {
    productTag.classList.add('current-tag')
})