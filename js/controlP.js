let $ = document

////// object = product info 
let objectTitle = $.querySelector('.objectTitle')
let objectPrice = $.querySelector('.objectPrice')
let objectImg = $.querySelector('.objectImg')
let objectType = $.querySelector('.typeSelect')
let productCategory = $.querySelector('.product-category')
let descriptionProductInput = $.querySelector('.description-input')
let addObjectBtn = $.querySelector('.objectBtn')

let storeCountProducts = $.querySelector('.store-count-products')
let navStoreCount = $.querySelector('.nav-store-count')

//////////////////////// show edit modal  /////////////////////////////
let productEditTitle = $.querySelector('.product-edit-title')
let productEditPrice = $.querySelector('.product-edit-price')
let productEditType = $.querySelector('.product-edit-type')
let productEditCategory = $.querySelector('.product-edit-category')
let productEditDiscountValue = $.querySelector('.edit-discount-value')
let productEditCopenCode = $.querySelector('.edit-copen-code')
let productEditImg = $.querySelector('.product-edit-img')
let productEditDescription = $.querySelector('.edit-description-input')
let btnEditInfoProduct = $.querySelector('.btn-edit-info-product')

////////////// modal clear products ////////////////////////////////////
let btnClear = $.querySelector('.deleteAll')
let modalClear = $.querySelector('.modal-parent22')
let yesClear = $.querySelector('.yes')
let notClear = $.querySelector('.no')
let closedClearModal = $.querySelector('.X3')

let addSuccess = $.querySelector('.addparent-modal')
let addSuccessTitle = $.querySelector('.add-name')
////////////////  delete one product by search ///////////////////
let btnDelet = $.querySelector('.deleteOne')
let productTitleDeleteInput = $.querySelector('.inputDelete-oneP')
let modalDeleteOneParent = $.querySelector('.modal-deleteOne-parent')
let yesDeleteOne = $.querySelector('.yes-deleteOne')
let noDeleteOne = $.querySelector('.no-deleteOne')
let removeModalOneDelete = $.querySelector('.X4')
let modalTitleOneDelete = $.querySelector('.deletename')

/////////////////  delete one product by select btn //////////////////
let modalDeleteOneParent2 = $.querySelector('.modal-deleteOne-parent2')
let yesDeleteOne2 = $.querySelector('.yes-deleteOne2')
let noDeleteOne2 = $.querySelector('.no-deleteOne2')
let removeModalOneDelete2 = $.querySelector('.X5')
let modalTitleOneDelete2 = $.querySelector('.deletename2')

////////// add product-modal     ///////////////////////////////////////
let addProductModal = $.querySelector('.addProduct-modal')

////////////////  discount ///////////////////////
let discountInput = $.querySelector('.discount-value')
let copenCodeInput = $.querySelector('.copen-code')
let discountCollapsChek = $.querySelector('.form-check-input')

let descriptionInput = $.querySelector('.description-input')

/////////////  dark mood //////////////
let switchElem = $.querySelector('.switch')

/////////////// anbar list ////////////
let anbarInput = $.querySelector('.anbar-input')
let anbarList = $.querySelector('.ol-list')
let formatList = $.querySelector('.format-list')
let addToListBtn = $.querySelector('.add-toList')
let anbarCount = $.querySelector('.anbar-count')

///////////////////////// set product image /////////////////
let saveSrcProductImg = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;

        localStorage.setItem('productImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
};

objectImg.addEventListener('change', saveSrcProductImg)

///////////////////////// set product Edit image /////////////////
let saveSrcProductEditImg = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;

        localStorage.setItem('productEditImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
};

productEditImg.addEventListener('change', saveSrcProductEditImg)

////////////////// add to store (set local) //////////////////////////////

function addNewProduct() {
    // let allProducts = []

    let maxNumber = allProducts.reduce((prevVal, currentVal) => {
        currentVal = currentVal.id
        if (prevVal > currentVal) {
            return prevVal
        }

        return currentVal
    }, 0)


    let newProductObj = {
        id: maxNumber + 1,
        title: objectTitle.value,
        price: objectPrice.value,
        img: localStorage.getItem('productImgSrc'),
        type: objectType.value,
        count: 1,
        category: productCategory.value,
        copenCode: copenCodeInput.value,
        discountValue: discountInput.value,
        description: descriptionInput.value,
        // haveDicount: discountCollapsChek.value,
    }
    objectTitle.value = ''
    objectPrice.value = ''
    objectImg.value = ''
    copenCodeInput.value = ''
    discountInput.value = ''
    descriptionInput.value = ''
    objectType.value = 'لطفا واحد کالا را وارد کنید'
    productCategory.value = 'دسته بندی محصول'
    allProducts.push(newProductObj)
    storeCountProductsNumber(allProducts)
    navStoreCountNumber(allProducts)
    setLOcalStorage(allProducts)
    adminProductGenerator(allProducts)
    objectTitle.focus()
}

addObjectBtn.addEventListener('click', function (event) {
    event.preventDefault()
    addSuccessTitle.innerHTML = objectTitle.value
    if (objectTitle.value === '' || objectPrice.value === '' || objectImg.value === '' || objectType.value === 'لطفا واحد کالا را وارد کنید' || productCategory.value === 'دسته بندی محصول' || descriptionProductInput.value === '') {
        alert('برای ثبت محصول در فروشگاه لطفا تمام موارد خواسته شده را پرکنید')
    } else if (isNaN(objectPrice.value)) {
        alert('مبلغ صحیح نیست')
    } else {
        getLocalStorageStore()
    }
})

function setLOcalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products))
}

function getLocalStorageStore() {
    let localStorageStoreProducts = JSON.parse(localStorage.getItem('products'))

    if (!localStorageStoreProducts) {
        let allProducts = []
        // console.log('okkkkk')
        allProducts = localStorageStoreProducts
        addNewProduct()
        addSuccess.style.display = 'block'
        setTimeout(function () {
            addSuccess.style.display = 'none'
        }, 3000)
    } else {
        allProducts = localStorageStoreProducts
        let isExistProductIndex = allProducts.findIndex(function (product) {
            return product.title === objectTitle.value
        })
        // console.log(isExistProductIndex)

        if (isExistProductIndex >= 0) {
            alert('محصولی با این عنوان در فروشگاه موجود است')
            objectTitle.value = ''
            objectPrice.value = ''
            objectImg.value = ''
            objectType.value = 'لطفا واحد کالا را وارد کنید'
            productCategory.value = 'دسته بندی محصول'
            descriptionProductInput.value = ''
        } else {
            addNewProduct()
            addSuccess.style.display = 'block'
            setTimeout(function () {
                addSuccess.style.display = 'none'
            }, 3000)
        }
    }
}



//////////////// clear product //////////////////////////////////

btnClear.addEventListener('click', function (event) {
    event.preventDefault()
    modalClear.style.display = 'block'
})

function clearAllProducts() {
    allProducts = []
    localStorage.removeItem('products')
    remoeModalClear()
    adminProductGenerator(allProducts)
    navStoreCount.innerHTML = 0
    storeCountProducts.innerHTML = 0
}

function remoeModalClear() {
    modalClear.style.display = 'none'
}

yesClear.addEventListener('click', clearAllProducts)
notClear.addEventListener('click', remoeModalClear)
closedClearModal.addEventListener('click', remoeModalClear)
document.body.addEventListener('keyup', function (event) {
    if (event.keyCode === 27) {
        remoeModalClear()
        remoeModalOD()
    }
})

////////////////// delete one product ////////////////////////////////////////

function getLocalStorage(productTitle) {
    // modalDeleteOneParent.style.display = 'none'

    let localStorageProducts = JSON.parse(localStorage.getItem('products'))
    // console.log(localStorageProducts)
    allProducts = localStorageProducts

    let mainPIndex = allProducts.findIndex(function (product) {
        return product.title == productTitleDeleteInput.value
    })
    console.log(mainPIndex)

    if (mainPIndex < 0) {
        alert('کالای مورد نظر در فروشگاه موجود نیست')
    } else {
        modalTitleOneDelete.innerHTML = ' حذف ' + productTitleDeleteInput.value
        modalDeleteOneParent.style.display = 'block'
        allProducts.splice(mainPIndex, 1)
        yesDeleteOne.addEventListener('click', function () {
            // console.log(allProducts)
            setLOcalStorage(allProducts)
            navStoreCountNumber(allProducts)
            storeCountProductsNumber(allProducts)
            adminProductGenerator(allProducts)
            productTitleDeleteInput.value = ''
            modalDeleteOneParent.style.display = 'none'
        })
    }
}

btnDelet.addEventListener('click', function (event) {
    event.preventDefault()
    getLocalStorage()
})

productTitleDeleteInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        getLocalStorage()
    }
})

function remoeModalOD() {
    modalDeleteOneParent.style.display = 'none'
}

removeModalOneDelete.addEventListener('click', remoeModalOD)
noDeleteOne.addEventListener('click', remoeModalOD)

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

////////////////// anbar list ////////////////////////////
let AllList = []

function addList() {
    let newList = {
        name: anbarInput.value
    }
    AllList.push(newList)
    setLocalStorageList(AllList)
    listGenerator(AllList)
    anbarCountInnerhtml(AllList)
    anbarInput.value = ''
}

function setLocalStorageList(list) {
    localStorage.setItem('anbarList', JSON.stringify(list))
    // getLocalStorageList()   
}

function getLocalStorageList() {
    let localStorageList = JSON.parse(localStorage.getItem('anbarList'))

    if (localStorageList) {
        AllList = localStorageList
    } else {
        AllList = []
    }

    addList()
}
/////////////
function getLocalStorageList2() {
    let localStorageList = JSON.parse(localStorage.getItem('anbarList'))

    if (localStorageList) {
        AllList = localStorageList
    } else {
        AllList = []
    }
    anbarCountInnerhtml(AllList)
    listGenerator(AllList)
}
//////////////
function listGenerator(AllList) {
    anbarList.innerHTML = ''
    // anbarDiv.innerHTML = ''
    AllList.forEach(function (list) {

        let anbarDiv = $.createElement('div')
        anbarDiv.classList.add('list-allNames')

        let listname = $.createElement('li')
        listname.classList.add('m-0', 'py-2', 'px-1')
        listname.innerHTML = list.name

        let closeBtn = $.createElement('span')
        closeBtn.innerHTML = '&times'
        closeBtn.classList.add('remov-thanList')
        closeBtn.addEventListener('click', function () {
            removThanList(list.name)
        })

        anbarDiv.append(listname, closeBtn)
        anbarList.append(anbarDiv)
    })
}


function formatAllList() {
    if (confirm('برای حذف تمامی محصولات موجود در انبار مطمئن هستید ؟')) {
        localStorage.removeItem('anbarList')
        getLocalStorageList2()
        anbarCount.innerHTML = 0

    } else {
    }
}

addToListBtn.addEventListener('click', function () {
    if (anbarInput.value === '') {
        alert('ورودی نمیتواند خالی باشد')
    } else {
        getLocalStorageList()
        anbarInput.focus()
    }
})

anbarInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        if (anbarInput.value === '') {
            alert('ورودی نمیتواند خالی باشد')
        } else {
            getLocalStorageList()
        }
    }
})

function removThanList(listName) {
    let localStorageList = JSON.parse(localStorage.getItem('anbarList'))

    let newList = localStorageList.filter(function (product) {
        return product.name !== listName
    })

    if (confirm('برای حذف این محصول از انبار مطمئن هستید ؟')) {
        setLocalStorageList(newList)
        listGenerator(newList)
        anbarCountInnerhtml(newList)

    } else {
    }
}

function anbarCountInnerhtml(AllList) {
    anbarCount.innerHTML = AllList.length
}

formatList.addEventListener('click', formatAllList)
window.addEventListener('load', getLocalStorageList2)
//////////////////////////////////////////////////////////////
// admin add product
//////////////////////////////////////////////////////////////

function getLocalStorageAdmin() {
    let localStorageProducts = JSON.parse(localStorage.getItem('products'))

    if (localStorageProducts) {
        allProducts = localStorageProducts
    } else {
        allProducts = []
    }
    storeCountProductsNumber(allProducts)
    navStoreCountNumber(allProducts)
    adminProductGenerator(allProducts)
}

function adminProductGenerator(allProduct) {

    let productWrapper = $.querySelector('.product-wrapper')
    let productsFragment = $.createDocumentFragment()
    let productsContainer = $.querySelector('.products-container')

    productWrapper.innerHTML = ''

    allProduct.forEach(function (product) {
        // <span class="productNum">${allProduct.indexof}</span> برای نمایش شماره هر محصول در ادمین
        productWrapper.insertAdjacentHTML('beforeend', `
        <div class="product-item mb-4">
            <img class="product-img img-fluid" src="${product.img}" alt="...">
            <div class="product-Description w-100">
                <div class="product-title-section p-3">
                    <h5 class="fw-bold"> ${product.title}</h5>
                </div>
                <div class="product-statistics">
                    <div class="products-number">
                        <div>
                          <span class="products-font quest">قیمت :</span>
                          <span class="products-font">${product.price}</span>
                        </div>
                        <div>
                            <span class="products-font quest">دسته : </span>
                            <span class="products-font">${product.category}</span>
                        </div>
                        <div>
                            <span class="products-font quest">فروش :</span>
                            <span class="products-font">0</span>
                        </div>
                    </div>
                <div>
                    <button class="btn btn-info fw-bold py-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"
                      data-id ="${product.id}" onclick="showEditModal(event)"> ویرایش</button>
                    <button class="btn btn-danger fw-bold py-1 mx-1" data-id ="${product.id}" onclick="deleteItem(event)">حـذ‌‌‌‌‌ف</button>
                </div>
            </div>
            <div class="discount-box">
                <p class="m-0">${product.discountValue || 0} %</p>
            </div>
        </div>
    </div>
    `)

        productsFragment.appendChild(productWrapper)
    })

    productsContainer.appendChild(productsFragment)
}

function deleteItem(enent) {
    event.preventDefault()
    // modalTitleOneDelete2.innerHTML = ' حذف ' + productTitleDeleteInput.value
    // روش دیگری برای حذف از فروشگاه وجود دارد ک با زدن  دکمه حذف کالا متن داخل اینپوت حذف را برابر عنوان محصول کلی شده قرار میدهد و ادامه ماجرا از انجا با همان مدال اولی انجام میشود
    modalDeleteOneParent2.style.display = 'block'
    // document.body.style.filter = 'brightness(30%)'

    let productId = (event.target.dataset.id)

    getAdminLocalStorage(productId)
}

function getAdminLocalStorage(productId) {

    let allProducts = JSON.parse(localStorage.getItem('products'))

    let mainPIndex = allProducts.findIndex(function (product) {
        return product.id == productId
    })


    allProducts.splice(mainPIndex, 1)
    yesDeleteOne2.addEventListener('click', function () {

        storeCountProductsNumber(allProducts)
        navStoreCountNumber(allProducts)
        setLOcalStorage(allProducts)
        adminProductGenerator(allProducts)
        remoeModalOD2()
    })
}

function remoeModalOD2() {
    modalDeleteOneParent2.style.display = 'none'
}

function storeCountProductsNumber(allProducts) {
    storeCountProducts.innerHTML = allProducts.length
}
function navStoreCountNumber(allProducts) {
    navStoreCount.innerHTML = allProducts.length
}

removeModalOneDelete2.addEventListener('click', remoeModalOD2)
noDeleteOne2.addEventListener('click', remoeModalOD2)
window.addEventListener('load', getLocalStorageAdmin)

///////////// edit product /////////////////////////////////////

function showEditModal(event) {

    let allProductForEdit = JSON.parse(localStorage.getItem('products'))
    let productId = (event.target.dataset.id)

    let targetProductEdit = allProductForEdit.find(function (product) { return product.id == productId })

    let productEditTitle = $.querySelector('.product-edit-title')
    let productEditPrice = $.querySelector('.product-edit-price')
    let productEditType = $.querySelector('.product-edit-type')
    let productEditCategory = $.querySelector('.product-edit-category')
    let productEditDiscountValue = $.querySelector('.edit-discount-value')
    let productEditCopenCode = $.querySelector('.edit-copen-code')
    let productEditDescription = $.querySelector('.edit-description-input')
    let editCollapsSection = $.querySelector('.edit-collaps-section')
    let editFormCheckInput = $.querySelector('.edit-form-check-input')


    productEditTitle.value = targetProductEdit.title
    productEditPrice.value = targetProductEdit.price
    productEditType.value = targetProductEdit.type
    productEditCategory.value = targetProductEdit.category
    productEditDescription.value = targetProductEdit.description
    productEditDiscountValue.value = targetProductEdit.discountValue || ''
    productEditCopenCode.value = targetProductEdit.copenCode || ''


    if (targetProductEdit.discountValue) {
        editFormCheckInput.checked = true
        editCollapsSection.classList.add('show')
    } else {
        editFormCheckInput.checked = false
        editCollapsSection.classList.remove('show')
    }

    btnEditInfoProduct.setAttribute('data-id', `${productId}`)
}

//////////////////   submit edit product ////////////////////////////////
function submitEditProduct() {
    if (productEditTitle.value === '' || productEditPrice.value === '' || productEditImg.value === '' || productEditType.value === 'لطفا واحد کالا را وارد کنید' || productEditCategory.value === 'دسته بندی محصول') {
        alert('برای ویرایش محصول لطفا تمام موارد خواسته شده را پرکنید')
    } else if (isNaN(productEditPrice.value)) {
        alert('مبلغ صحیح نیست')
    } else {
        getLocalStorageStoreForEdit(event)
    }
}

function getLocalStorageStoreForEdit(event) {
    // برای  اینکه موقع ویرایش محصول تکرارری ثبت نکنیم

    let localStorageStoreProducts = JSON.parse(localStorage.getItem('products'))
    allProducts = localStorageStoreProducts

    let productId = Number(event.target.dataset.id)

    let nonRepetitive = allProducts.filter(function (product) {
        return product.id !== productId
    })

    let isExistProductIndex = nonRepetitive.findIndex(function (product) {
        return product.title === productEditTitle.value
    })

    if (isExistProductIndex >= 0) {
        alert('محصولی با این عنوان در فروشگاه موجود است')
    } else {

        // delete Previous product after edit
        let mainPIndex = allProducts.findIndex(function (product) {
            return product.id === productId
        })
        allProducts.splice(mainPIndex, 1)
        setLOcalStorage(allProducts)
        adminProductGenerator(allProducts)
    }
    addNewProductAfterEdit(productId)
}

function addNewProductAfterEdit(productId) {
    let newProductAfterEdit = {
        id: productId,
        title: productEditTitle.value,
        price: productEditPrice.value,
        type: productEditType.value,
        category: productEditCategory.value,
        copenCode: productEditCopenCode.value,
        discountValue: productEditDiscountValue.value,
        img: localStorage.getItem('productEditImgSrc'),
        description: productEditDescription.value,
        count: 1,
    }

    productEditTitle.value = ''
    productEditPrice.value = ''
    productEditType.value = ''
    productEditCategory.value = ''
    productEditCopenCode.value = ''
    productEditDiscountValue.value = ''
    productEditImg.value = ''
    productEditDescription.value = ''

    allProducts.push(newProductAfterEdit)
    setLOcalStorage(allProducts)
    adminProductGenerator(allProducts)
}

btnEditInfoProduct.addEventListener('click', submitEditProduct)

////////////////////////////////////////////////////////////////////////
////// admin infos //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
let adminNameInput = $.querySelector('.admin-name')
let adminFamilyInput = $.querySelector('.admin-family')
let adminUsernameInput = $.querySelector('.admin-username')
let adminEmailInput = $.querySelector('.admin-email')
let notReceivedModalParent = $.querySelector('.not-received-modalParent')
let exitFromControlP = $.querySelector('.exit-from-controlP')
let headerName = $.querySelector('.header-name')
let headerFamily = $.querySelector('.header-family')
let headerEmail = $.querySelector('.header-email')
let cardEmail = $.querySelector('.card-email')
let cardName = $.querySelector('.card-name')
let cardFamily = $.querySelector('.card-family')
let selectProfileInput = $.querySelector('.select-profile')

let addProfileBtn = $.querySelector('.addProfile-btn')
let navbarProfile = $.querySelector('.navbar-profile')
let cardProfile = $.querySelector('.card-img-profile')

let passwordModal = $.querySelector('.password-modal')
let previousAdminPasswordInput = $.querySelector('.previous-admin-password')
let newPasswordAdmin = $.querySelector('.new-password-admin')
let repeteAdminPassword = $.querySelector('.repete-password-admin')
let makeChangesBtn = $.querySelector('.make-changes')
let openModalAchangeAdminInfoBtn = $.querySelector('.openModal-change-adminInfo-btn')
let CloseChangeInfos = $.querySelector('.Close-changeInfos')
let CloseChangeInfosX = $.querySelector('.Close-changeInfosX')

let profileImgSrc = localStorage.getItem('profileImgSrc')

function getCurrentAdminInfosFromLocal() {
    let currentAdminInfos = JSON.parse(localStorage.getItem('currentAdmin'))

    if (currentAdminInfos) {
        adminNameInput.value = currentAdminInfos.name
        adminFamilyInput.value = currentAdminInfos.family
        adminUsernameInput.value = currentAdminInfos.username
        adminEmailInput.value = currentAdminInfos.email
        headerName.innerHTML = currentAdminInfos.name
        headerFamily.innerHTML = currentAdminInfos.family
        headerEmail.innerHTML = currentAdminInfos.email
        cardEmail.innerHTML = currentAdminInfos.email
        cardName.innerHTML = currentAdminInfos.name
        cardFamily.innerHTML = currentAdminInfos.family
        navbarProfile.setAttribute('src', currentAdminInfos.profile)
        cardProfile.setAttribute('src', currentAdminInfos.profile)
    } else {
        notReceivedModalParent.style.display = 'block'
    }

    if (currentAdminInfos.profile === '') {
        setTimeout(function () {
            alert('در صورت تمایل میتوانید یک عکس پروفایل برای پنل خود  انتخاب کنید.' + "\n" + "\n" + 'برای این کار به قسمت اطلاعات / اطلاعات شما مراجعه کنید .')
        }, 3000)
    }
}

function addProfileFunc() {

    if (selectProfileInput.value === '') {
        alert('لطفا فایل مورد نظر را انتخاب کنید .')
    } else {
        let allAdmins = JSON.parse(localStorage.getItem('adminsArray'))
        let currentAdminInfos = JSON.parse(localStorage.getItem('currentAdmin'))
        let profileImgSrc = localStorage.getItem('profileImgSrc')

        let mainAdmin = allAdmins.findIndex(function (admin) {
            return admin.username == currentAdminInfos.username
        })

        allAdmins.splice(mainAdmin, 1)
        currentAdminInfos.profile = profileImgSrc
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdminInfos))
        allAdmins.push(currentAdminInfos)
        localStorage.setItem('adminsArray', JSON.stringify(allAdmins))
        navbarProfile.setAttribute('src', profileImgSrc)
        cardProfile.setAttribute('src', profileImgSrc)
    }
}

let saveSrcProfileImg = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        localStorage.setItem('profileImgSrc', dataURL)
    };

    if (selectProfileInput.value !== '') {
        selectProfileInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        selectProfileInput.style.borderBottom = '2px solid red'
    }

    reader.readAsDataURL(input.files[0]);
}

function checkPasswordfunc() {
    let currentAdminInfos = JSON.parse(localStorage.getItem('currentAdmin'))
    if (previousAdminPasswordInput.value === '') {
        alert('برای انجام تغییرات رمز عبور جاری خودرا وارد کنید .')
    } else if (previousAdminPasswordInput.value !== currentAdminInfos.password) {
        alert('رمز عبور جاری شما اشتباه است .')
        previousAdminPasswordInput.value = ''
    } else if (newPasswordAdmin.value === '' && repeteAdminPassword.value === '') {
        createNewCurrentAdmin(currentAdminInfos)
        alert('تغییر اطلاعات با موفقیت انجام شد .')
        passwordModal.style.display = 'none'
        previousAdminPasswordInput.value = ''
        previousAdminPasswordInput.style.borderBottom = '2px solid red'
        selectProfileInput.value = ''
        selectProfileInput.style.borderBottom = '2px solid red'
    } else {
        if (newPasswordAdmin.value.length < 8) {
            alert('رمز جدید باید حداقل 8 کاراکتر داشته باشد.')
        } else if (newPasswordAdmin.value === previousAdminPasswordInput.value) {
            alert('رمز جدید نمیتواند شبیه رمز قبلی باشد')
        } else if (repeteAdminPassword.value === '') {
            alert('تکرار رمز جدید الزامیست .')
        } else if (newPasswordAdmin.value !== repeteAdminPassword.value) {
            alert('تکرار رمز جدید اشتباه است .')
        } else {
            createNewCurrentAdmin(currentAdminInfos)
            alert('تغییر اطلاعات با موفقیت انجام شد .')
            passwordModal.style.display = 'none'
            previousAdminPasswordInput.value = ''
            newPasswordAdmin.value = ''
            repeteAdminPassword.value = ''
            selectProfileInput.value = ''
            previousAdminPasswordInput.style.borderBottom = '2px solid red'
            selectProfileInput.style.borderBottom = '2px solid red'
            newPasswordAdmin.style.borderBottom = '1px solid rgb(180, 180, 180)'
            repeteAdminPassword.style.borderBottom = '1px solid rgb(180, 180, 180)'
        }
    }
}

function createNewCurrentAdmin(currentAdminInfos) {

    currentAdminInfos.name = adminNameInput.value
    currentAdminInfos.family = adminFamilyInput.value
    currentAdminInfos.username = adminUsernameInput.value
    currentAdminInfos.email = adminEmailInput.value
    currentAdminInfos.profile = profileImgSrc
    if (repeteAdminPassword.value !== '') {
        currentAdminInfos.password = repeteAdminPassword.value
    }

    localStorage.setItem('currentAdmin', JSON.stringify(currentAdminInfos))
    getCurrentAdminInfosFromLocal()
    addProfileFunc()
}

function chekAllInputs() {

    if (adminNameInput.value === '' || adminFamilyInput.value === '' || adminUsernameInput.value === '' || adminEmailInput.value === '' || selectProfileInput.value === '') {
        alert('برای انجام تغییرات لطفا تمام گزینه ها را پر کنید')
    } else if (adminUsernameInput.value.length < 8) {
        alert('نام کاربری باید حداقل 8 کاراکتر داشته باشد .')
    } else {
        passwordModal.style.display = 'block'
        previousAdminPasswordInput.focus()
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
previousAdminPasswordInput.addEventListener('keyup', function () {
    if (previousAdminPasswordInput.value !== '') {
        previousAdminPasswordInput.style.borderBottom = '2px solid rgb(15, 199, 55)'
    } else {
        previousAdminPasswordInput.style.borderBottom = '2px solid red'
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

CloseChangeInfosX.addEventListener('click', CloseChangeInfosFunc)
CloseChangeInfos.addEventListener('click', CloseChangeInfosFunc)
makeChangesBtn.addEventListener('click', checkPasswordfunc)
selectProfileInput.addEventListener('change', saveSrcProfileImg)
addProfileBtn.addEventListener('click', addProfileFunc)
exitFromControlP.addEventListener('click', function () {
    localStorage.removeItem('currentAdmin')
})
openModalAchangeAdminInfoBtn.addEventListener('click', chekAllInputs)
window.addEventListener('load', getCurrentAdminInfosFromLocal)

/////////////////////////////////////////////////////////
/////////  teem-infos    ////////////////////////////////
// add person modal
let newPersonNameInput = $.querySelector('.new-person-name')
let newPersonJobInput = $.querySelector('.new-person-job')
let newPersonImgInput = $.querySelector('.new-person-img')
let newPersonDescriptionInput = $.querySelector('.new-person-description')
let saveNewPersonInfosBtn = $.querySelector('.save-newPerson-infos')
// edit person modal
let editPersonNameInput = $.querySelector('.edit-person-name')
let editPersonJobInput = $.querySelector('.edit-person-job')
let editPersonImgInput = $.querySelector('.edit-person-img')
let editPersonDescriptionInput = $.querySelector('.edit-person-description')
let saveEditPersonInfosBtn = $.querySelector('.save-editPerson-infos')

function getTeemCardsAfterLoad() {
    let getAllPersons = JSON.parse(localStorage.getItem('personArray'))
    if (getAllPersons) {
        cardPersonGenerator(getAllPersons)
    }
}

let saveSrcPersonImage = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        localStorage.setItem('personImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
}

function saveNewPersonInfosFunc() {
    let personArray = JSON.parse(localStorage.getItem('personArray'))

    if (personArray) {
        allPerson = personArray
        creatNewPersonInfos(allPerson)
    } else {
        let allPerson = []
        creatNewPersonInfos(allPerson)
    }
}

function creatNewPersonInfos(allPerson) {

    let maxNumber = allPerson.reduce((prevVal, currentVal) => {
        currentVal = currentVal.id
        if (prevVal > currentVal) {
            return prevVal
        }

        return currentVal
    }, 0)

    let newPerson = {

        id: maxNumber + 1,
        name: newPersonNameInput.value,
        job: newPersonJobInput.value,
        image: localStorage.getItem('personImgSrc'),
        description: newPersonDescriptionInput.value
    }

    allPerson.push(newPerson)
    setLocalSNewPerson(allPerson)
    cardPersonGenerator(allPerson)
    newPersonNameInput.value = ''
    newPersonJobInput.value = ''
    newPersonImgInput.value = ''
    newPersonDescriptionInput.value = ''
    alert('عضو جدید اضافه شد .')
}

function setLocalSNewPerson(allPerson) {
    localStorage.setItem('personArray', JSON.stringify(allPerson))
    cardPersonGenerator(allPerson)
}


function cardPersonGenerator(allPerson) {

    let teemContainer = $.querySelector('.teem-container')
    let personsFragment = $.createDocumentFragment()
    let cardTeemParent = $.querySelector('.card-teem-parent')

    teemContainer.innerHTML = ''

    allPerson.forEach(function (person) {
        teemContainer.insertAdjacentHTML('beforeend', `
        
        <div class="card teem-card">
            <img src="${person.image}" class="card-img-top p-2" alt="...">
            <div class="card-body p-1">
                <h6>${person.name}</h6>
                <h6 class="my-3">${person.job}</h6>
                <button data-id ="${person.id}" class="btn btn-primary" onclick="editePerson(event)" data-bs-toggle="modal" data-bs-target="#exampleModalEdit">ویرایش</button>
                <button class="btn btn-warning" data-id="${person.id}" onclick="deletePerson(event)">حذف</button>
            </div>
        </div>
        `)
        personsFragment.appendChild(teemContainer)
    })
    cardTeemParent.appendChild(personsFragment)
}
// delete person
function deletePerson(event) {
    let personId = Number(event.target.dataset.id)

    let allPerson = JSON.parse(localStorage.getItem('personArray'))

    let mainPerson = allPerson.findIndex(function (person) {
        return person.id == personId
    })

    if (confirm('برای حذف این پرسنل مطمئن هستید ؟')) {
        allPerson.splice(mainPerson, 1)
        setLocalSNewPerson(allPerson)
    } else {
    }

}
// edit person
function editePerson(event) {
    let personId = (event.target.dataset.id)
    let allPerson = JSON.parse(localStorage.getItem('personArray'))

    let mainPerson = allPerson.find(function (person) {
        return person.id == personId
    })

    editPersonNameInput.value = mainPerson.name
    editPersonJobInput.value = mainPerson.job
    editPersonDescriptionInput.value = mainPerson.description
    editPersonImgInput.value = ''

    saveEditPersonInfosBtn.setAttribute('data-id', `${personId}`)
}

function submitEditPerson() {

    if (editPersonNameInput.value === '' || editPersonJobInput.value === '' || editPersonDescriptionInput.value === '' || editPersonImgInput.value === '') {
        alert('برای انجام تغییرات لطفا تمامی موارد را پر کنید .')
    } else {
        getLocalStoragePersonArrayForEdit(event)
    }
}

function getLocalStoragePersonArrayForEdit(event) {

    let allPerson = JSON.parse(localStorage.getItem('personArray'))
    let personId = (event.target.dataset.id)
    let indexPerson = allPerson.findIndex(function (person) {
        return person.id == personId
    })

    allPerson.splice(indexPerson, 1)
    // setLocalSNewPerson(allPerson)
    addNewPersonAfterEdit(personId, allPerson)
}

function addNewPersonAfterEdit(personId, allPerson) {

    // let allPerson = JSON.parse(localStorage.getItem('personArray'))
    let personAfterEdit = {
        id: Number(personId),
        name: editPersonNameInput.value,
        job: editPersonJobInput.value,
        image: localStorage.getItem('editPersonImgSrc'),
        description: editPersonDescriptionInput.value
    }

    allPerson.push(personAfterEdit)
    setLocalSNewPerson(allPerson)
    editPersonNameInput.value = ''
    editPersonJobInput.value = ''
    editPersonDescriptionInput.value = ''
    editPersonImgInput.value = ''
    alert('تغییرات به درستی انجام شد .')
}

let saveSrcEditPersonImage = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        localStorage.setItem('editPersonImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
}


saveEditPersonInfosBtn.addEventListener('click', submitEditPerson)
window.addEventListener('load', getTeemCardsAfterLoad)
newPersonImgInput.addEventListener('change', saveSrcPersonImage)
editPersonImgInput.addEventListener('change', saveSrcEditPersonImage)
saveNewPersonInfosBtn.addEventListener('click', function () {
    if (newPersonNameInput.value === '' || newPersonJobInput.value === '' || newPersonImgInput.value === '' || newPersonDescriptionInput.value === '') {
        alert('لطفا همه موارد را پر کنید .')
    } else {
        saveNewPersonInfosFunc()
    }
})

///////////////////////////////////////////////////////////////////////
///////////////////////////  article section ////////////////////////
//////////////////////////////////////////////////////////////////////
let addNewArticleBtn = $.querySelector('.add-newArticle-btn')
let newArticleNameInput = $.querySelector('.new-article-name')
let newArticleWriterInput = $.querySelector('.new-article-writer')
let newArticleImg = $.querySelector('.new-article-img')
let newArticleDate = $.querySelector('.new-article-date')
let newArticleTags = $.querySelector('.new-article-tags')
let tagContainer = $.querySelector('.tag-container')
let newArticleDescriptionInput = $.querySelector('.new-article-description')
let newArticleTextInput = $.querySelector('.new-article-text')
let createNewArticleBtn = $.querySelector('.create-new-article')
let closeArticleModalX = $.querySelector('.close-article-modal2')
let closeArticleModalBtn = $.querySelector('.close-article-modal')
// edie article
let editArticleNameInput = $.querySelector('.edit-article-name')
let editArticleWriterInput = $.querySelector('.edit-article-writer')
let editArticleImg = $.querySelector('.edit-article-img')
let editArticleDate = $.querySelector('.edit-article-date')
let editArticleTagsInput = $.querySelector('.edit-article-tags')
let editTagContainer = $.querySelector('.edit-tag-container')
let editArticleDescriptionInput = $.querySelector('.edit-article-description')
let editArticleTextInput = $.querySelector('.edit-article-text')
let closeEditArticleModalX = $.querySelector('.close-edit-article-modal2')
let closeEditArticleModalBtn = $.querySelector('.close-edit-article-modal')
let addEditArticleBtn = $.querySelector('.create-edit-article')

// get current time  
function getCurrentDate() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date().toLocaleDateString('fa-IR', options);

    return today
}

// tag Generator
function tagGenerator() {

    let pTag = $.createElement('p')

    let spanTag = $.createElement('span')
    spanTag.classList.add('ps-2')
    spanTag.innerHTML = newArticleTags.value.trim()

    let iSpan = $.createElement('i')
    iSpan.classList.add('bi', 'bi-x', 'fs-4', 'close-tag')
    iSpan.addEventListener('click', function (event) {
        event.target.parentElement.remove()
        removeTag(spanTag.innerHTML)
    })

    pTag.append(spanTag, iSpan)
    tagContainer.append(pTag)

    saveTags(newArticleTags.value)
    newArticleTags.value = ''
}

function removeTag(spanTag) {
    console.log(spanTag)
    let tagArray = JSON.parse(localStorage.getItem('tagArray'))
    let newTags = tagArray.filter(function (tag) {
        return tag !== spanTag
    })
    console.log(newTags)
    localStorage.setItem('tagArray', JSON.stringify(newTags))
}

function saveTags(newTag) {
    let tagArray = JSON.parse(localStorage.getItem('tagArray'))

    if (tagArray) {
        tagArray.push(newTag)
        localStorage.setItem('tagArray', JSON.stringify(tagArray))
    } else {
        let allTags = []
        allTags.push(newTag)
        localStorage.setItem('tagArray', JSON.stringify(allTags))
    }
}

// save article img
let saveSrcArticleImage = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        localStorage.setItem('articleImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
}

// check New Article Inputs
function checkNewArticleInputs() {
    if (newArticleNameInput.value === '' || newArticleWriterInput.value === '' || newArticleDescriptionInput.value === '' || newArticleTextInput.value === '' || newArticleImg.value === '') {
        alert('لطفا تمامی موارد را پرکنید')
    } else if (tagContainer.innerHTML === '' && newArticleTags.value !== '') {
        alert('با زدن دکمه  Enter در فیلد تگ ها; تگ مربوطه را به قسمت خود اضافه کنید .')
    } else if (tagContainer.innerHTML === '' && newArticleTags.value === '') {
        alert('جهت دسترسی راحتتر از طریق سرچ; لطفا تگ هایی متناسب با مقاله وارد کنید .')
    } else if (newArticleTags.value !== '') {
        alert('با زدن دکمه  Enter در فیلد تگ ها; تگ تایپ شده را به قسمت مربوطه اضافه کنید .')
    } else {
        saveNewArticleInfosFunc()
        // console.log(tagContainer.innerHTML)
    }
}


// saveNewArticle
function saveNewArticleInfosFunc() {
    let articleArray = JSON.parse(localStorage.getItem('articleArray'))

    if (articleArray) {
        allArticle = articleArray
        creatNewArticleInfos(allArticle)
    } else {
        let allArticle = []
        creatNewArticleInfos(allArticle)
    }
}

function creatNewArticleInfos(allArticle) {

    let maxNumber = allArticle.reduce((prevVal, currentVal) => {
        currentVal = currentVal.id
        if (prevVal > currentVal) {
            return prevVal
        }

        return currentVal
    }, 0)

    let newArticle = {
        id: maxNumber + 1,
        name: newArticleNameInput.value,
        writer: newArticleWriterInput.value,
        img: localStorage.getItem('articleImgSrc'),
        date: getCurrentDate(),
        tags: JSON.parse(localStorage.getItem('tagArray')),
        title: newArticleDescriptionInput.value,
        Text: newArticleTextInput.value
    }

    allArticle.push(newArticle)
    allArticleSetToLocal(allArticle)
    localStorage.removeItem('tagArray')
    alert('مقاله با موفقیت به سایت اضافه شد .✔✔✔')
    newArticleNameInput.value = ''
    newArticleWriterInput.value = ''
    newArticleImg.value = ''
    tagContainer.innerHTML = ''
    newArticleDescriptionInput.value = ''
    newArticleTextInput.value = ''
}

function allArticleSetToLocal(allArticle) {
    localStorage.setItem('articleArray', JSON.stringify(allArticle))
    articleCardGenerator(allArticle)
}

function articleCardGenerator(allArticle) {

    let articleContainer = $.querySelector('.article-container')

    articleContainer.innerHTML = ''

    allArticle.forEach(function (article) {

        articleContainer.insertAdjacentHTML('beforeend', `
        <div class="article-item mb-4">
        <img class="product-img img-fluid" src="${article.img}" alt="...">
        <div class="product-Description w-100">
            <div class="article-title-section p-3 text-start">
                <h5 class="fw-bold">${article.name}</h5>
                <p class="fw-bold">${article.title}</p>
            </div>
            <div class="articles-statistics">
                <div class="article-number">
                    <div>
                        <span class="products-font quest">بازدید :</span>
                        <span class="products-font">0</span>
                        <i class="bi bi-person fs-5 text-primary"></i>
                    </div>
                    <div class="ms-3">
                        <span class="products-font quest">تاریخ انتشار :</span>
                        <span class="products-font">${article.date}</span>                            
                    </div>
                </div>
                <div class="m-auto">                                                                                                 
                    <button class="btn btn-info fw-bold py-1" data-id ="${article.id}" onclick="editeArticle(event)" data-bs-toggle="modal" data-bs-target="#exampleModalEditArticle">ویرایش</button>
                    <button class="btn btn-danger fw-bold py-1" data-id ="${article.id}" onclick="deleteArticle(event)">حـذ‌‌‌‌‌ف</button>
                </div>
            </div>
        </div>
    </div>
                        
    `)
    })
}

function editeArticle(event) {
    let articleId = (event.target.dataset.id)
    let allArticle = JSON.parse(localStorage.getItem('articleArray'))
    localStorage.removeItem('tagArray')

    let mainArticle = allArticle.find(function (article) {
        return article.id == articleId
    })

    // console.log(mainArticle)
    editArticleNameInput.value = mainArticle.name
    editArticleWriterInput.value = mainArticle.writer
    editArticleDate.value = mainArticle.date
    editArticleDescriptionInput.value = mainArticle.title
    editArticleTextInput.value = mainArticle.Text
    if (mainArticle.tags) {

        allTags = mainArticle.tags
        // console.log(allTags)
        editTagContainer.innerHTML = ''
        allTags.forEach(function (tag) {

            let pTag = $.createElement('p')

            let spanTag = $.createElement('span')
            spanTag.classList.add('ps-2')
            spanTag.innerHTML = tag

            let iSpan = $.createElement('i')
            iSpan.classList.add('bi', 'bi-x', 'fs-4', 'close-tag')
            iSpan.addEventListener('click', function (event) {
                event.target.parentElement.remove()
                removeTag(spanTag.innerHTML)
            })

            pTag.append(spanTag, iSpan)
            editTagContainer.append(pTag)
        })
        // saveTags(allTags)
        tagsss(allTags)
    }
    addEditArticleBtn.setAttribute('data-id', `${articleId}`)
}

function tagsss(allTags) {

    allTags.forEach(function (tag) {
        saveTags(tag)
    })
}

function editTagGenerator() {
    let pTag = $.createElement('p')

    let spanTag = $.createElement('span')
    spanTag.classList.add('ps-2')
    spanTag.innerHTML = editArticleTagsInput.value.trim()

    let iSpan = $.createElement('i')
    iSpan.classList.add('bi', 'bi-x', 'fs-4', 'close-tag')
    iSpan.addEventListener('click', function (event) {
        event.target.parentElement.remove()
        removeTag(spanTag.innerHTML)
    })

    pTag.append(spanTag, iSpan)
    editTagContainer.append(pTag)

    saveTags(editArticleTagsInput.value)
    editArticleTagsInput.value = ''
}

function checkEditArticleInputs() {

    if (editArticleNameInput.value === '' || editArticleWriterInput.value === '' || editArticleDescriptionInput.value === '' || editArticleTextInput.value === '' || editArticleImg.value === '') {
        alert('لطفا تمامی موارد را پرکنید')
    } else if (editTagContainer.innerHTML === '' && editArticleTagsInput.value !== '') {
        alert('با زدن دکمه  Enter در فیلد تگ ها; تگ مربوطه را به قسمت خود اضافه کنید .')
    } else if (editTagContainer.innerHTML === '' && editArticleTagsInput.value === '') {
        alert('جهت دسترسی راحتتر از طریق سرچ; لطفا تگ هایی متناسب با مقاله وارد کنید .')
    } else if (editArticleTagsInput.value !== '') {
        alert('با زدن دکمه  Enter در فیلد تگ ها; تگ تایپ شده را به قسمت مربوطه اضافه کنید .')
    } else {
        // console.log(tagContainer.innerHTML)
        getLocalAllArticlesForEdit(event)
    }
}

function getLocalAllArticlesForEdit(event) {

    let allArticle = JSON.parse(localStorage.getItem('articleArray'))
    let articleId = (event.target.dataset.id)
    let indexArticle = allArticle.findIndex(function (article) {
        return article.id == articleId
    })
    allArticle.splice(indexArticle, 1)
    addNewArticleAfterEdit(articleId, allArticle)
    // console.log(allArticle)
}

function addNewArticleAfterEdit(articleId, allArticle) {
    let articleAfterEdit = {
        id: Number(articleId),
        name: editArticleNameInput.value,
        writer: editArticleWriterInput.value,
        img: localStorage.getItem('editArticleImgSrc'),
        date: editArticleDate.value,
        tags: JSON.parse(localStorage.getItem('tagArray')),
        title: editArticleDescriptionInput.value,
        Text: editArticleTextInput.value
    }
    allArticle.push(articleAfterEdit)
    allArticleSetToLocal(allArticle)
    localStorage.removeItem('tagArray')
    alert('مقاله با موفقیت به ویرایش شد .✔✔✔')
    editArticleNameInput.value = ''
    editArticleWriterInput.value = ''
    editArticleImg.value = ''
    editTagContainer.innerHTML = ''
    editArticleDescriptionInput.value = ''
    editArticleTextInput.value = ''
}

let saveSrcEditArticleImage = function (event) {
    let input = event.target;
    let dataURL
    let reader = new FileReader();
    reader.onload = function () {
        dataURL = reader.result;
        localStorage.setItem('editArticleImgSrc', dataURL)
    };
    reader.readAsDataURL(input.files[0]);
}

function deleteArticle(event) {
    let articleId = (event.target.dataset.id)
    // console.log(articleId)
    if (confirm('برای حذف مقاله مطمئن هستید ؟')) {
        removeArticle(articleId)
    } else {
    }
}

function removeArticle(articleId) {
    let articleArray = JSON.parse(localStorage.getItem('articleArray'))

    let mainArticle = articleArray.findIndex(function (article) {
        return article.id == articleId
    })
    articleArray.splice(mainArticle, 1)
    localStorage.setItem('articleArray', JSON.stringify(articleArray))
    articleCardGenerator(articleArray)
    removeComments(articleId)
}

function removeComments(articleId) {
    let allComments = JSON.parse(localStorage.getItem('commentsArray'))
    let mainComments = allComments.filter(function (comment) {
        return comment.id != articleId
    })

    localStorage.setItem('commentsArray', JSON.stringify(mainComments))

}

// article Card Generator on load
function articleCardGeneratorFunc() {
    let localStorageAricles = JSON.parse(localStorage.getItem('articleArray'))

    if (localStorageAricles) {
        allAricles = localStorageAricles
        articleCardGenerator(allAricles)
    }
    localStorage.removeItem('tagArray')
    tagContainer.innerHTML = ''
}

// closed Article Modal
function closedArticleModal() {
    localStorage.removeItem('tagArray')
    tagContainer.innerHTML = ''
}


// save Article Image
newArticleImg.addEventListener('change', saveSrcArticleImage)
// edit Article Image
editArticleImg.addEventListener('change', saveSrcEditArticleImage)
// create New Article
createNewArticleBtn.addEventListener('click', checkNewArticleInputs)
// date generator
addNewArticleBtn.addEventListener('click', function () {
    localStorage.removeItem('tagArray')
    tagContainer.innerHTML = ''
    newArticleDate.value = getCurrentDate()
})
// tag generator
newArticleTags.addEventListener('keyup', function (event) {

    if (event.keyCode === 13 || event.keyCode === 32) {
        if (newArticleTags.value === '' || newArticleTags.value === ' ' || newArticleTags.value === '  ') {
            alert('برای اضافه کردن تگ عبارت مورد نظر را تایپ کنید .')
        } else {
            tagGenerator()
        }
    }
    newArticleTags.focus()
})
// add Edit Article Btn
addEditArticleBtn.addEventListener('click', checkEditArticleInputs)
// edit tag generator
editArticleTagsInput.addEventListener('keyup', function (event) {

    if (event.keyCode === 13 || event.keyCode === 32) {
        if (editArticleTagsInput.value === '' || editArticleTagsInput.value === ' ' || editArticleTagsInput.value === '  ') {
            alert('برای اضافه کردن تگ عبارت مورد نظر را تایپ کنید .')
        } else {
            editTagGenerator()
        }
    }
    editArticleTagsInput.focus()
})
// close modal 
closeArticleModalX.addEventListener('click', closedArticleModal)
closeArticleModalBtn.addEventListener('click', closedArticleModal)
closeEditArticleModalX.addEventListener('click', closedArticleModal)
closeEditArticleModalBtn.addEventListener('click', closedArticleModal)
// article card generator
window.addEventListener('load', articleCardGeneratorFunc)

////////////////////////////////////////////////////////////////////////////////
/////////////  انتقادات و پیشنهادات///////////////////////////////////////////////////////////////////

function getCamment() {
    let allComments = JSON.parse(localStorage.getItem('enteghadArray'))
    if (allComments) {
        cammentCardGenerator(allComments)
    }
}

function cammentCardGenerator(allComments) {

    let enteghadContainer = $.querySelector('.enteghad-container')
    let commentsFragment = $.createDocumentFragment()
    let enteghadParent = $.querySelector('#analis-tab-pane')
    enteghadContainer.innerHTML = ''
    // console.log(comment)
    allComments.forEach(function (comment) {
        enteghadContainer.insertAdjacentHTML('beforeend', `

        <div class="card enteghad-card" style = "width: 99%;">
            <div class="card-body pb-1">
                <div class="commaent-closed">
                    <h6 class="card-title fw-bold">موضوع : ${comment.subj}</h6>
                    <button class="delete-enteghad" data-id ="${comment.id}" onclick="deleteComment(event)">&times;</button>
                </div>
                <p class="card-text"> ${comment.text} </p>
                <hr>
                    <div class="text-muted">
                        <span>${comment.name}</span>
                        <span>${comment.email}</span>
                        <span class="mx-4">${comment.phone}</span>
                    </div>
            </div>
        </div >
        `)
        commentsFragment.appendChild(enteghadContainer)
    })
    enteghadParent.appendChild(commentsFragment)
}

function deleteComment(event) {
    let commentId = event.target.dataset.id
    let allComments = JSON.parse(localStorage.getItem('enteghadArray'))
    let mainComment = allComments.findIndex(function (comment) {
        return comment.id == commentId
    })

    if (confirm('آیا از حذف این کامنت مطمئنید؟' + '\n' + '\n' + 'در صورت تایید قادر به بازگشت نیستید .')) {
        allComments.splice(mainComment, 1)
        localStorage.setItem('enteghadArray', JSON.stringify(allComments))
        getCamment()
        console.log(allComments)
    } else {
    }
}

window.addEventListener('load', getCamment)

//////////////////////////////////////////////////////////////////////
/////////////////   users section  ///////////////////////////////////
//////////////////////////////////////////////////////////////////////
let userTiket = $.querySelector('.user-tiket')
let sendAdminAnswerBtn = $.querySelector('.send-admin-answer')
let tiketAnswerInput = $.querySelector('#replay-tiket')
let replayInputSection = $.querySelector('.replay-input-section')
let answerInput = $.querySelector('#answerInput')

let findUsersInput = $.querySelector('.find-users')


function getUsersInfoes() {
    let usersArray = JSON.parse(localStorage.getItem('usersArray'))
    if (usersArray) {
        allUsers = usersArray
        userCardGenerator(allUsers)
    } else {
        allUsers = []
        userCardGenerator(allUsers)
    }
}

function userCardGenerator(allUsers) {

    let usersCardsContainer = $.querySelector('.users-cards-container')
    let userssFragment = $.createDocumentFragment()
    let usersCards = $.querySelector('.users-cards')
    usersCardsContainer.innerHTML = ''

    allUsers.forEach(function (user) {
        usersCardsContainer.insertAdjacentHTML('beforeend', `
        <div class="card mt-4 user-card">
            <div class="card-body">
                <h5 class="card-title mb-3"> ${user.name} ${user.family}</h5>
                <h6 class="card-subtitle mb-2">${user.email}</h6>
                <div class="d-flex mt-3">
                    <button class="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#usersTikets" onclick="usersTikets(${user.id})">پیامها</button>
                    <button class="btn btn-primary mx-4" type="button" data-bs-toggle="modal" data-bs-target="#usersInfoes" onclick="userInfoesModal(${user.id})">اطلاعات</button>
                    <button class="btn btn-danger" onclick="deleteUserInfoes(${user.id})">حذف</button>
                </div>
            </div>
        </div>
        `)
        userssFragment.appendChild(usersCardsContainer)
    })
    usersCards.appendChild(userssFragment)
}

// user Infoes
function userInfoesModal(userId) {

    let usersName = $.querySelector('.users-name')
    let usersFamily = $.querySelector('.users-family')
    let usersEmail = $.querySelector('.users-email')
    let usersUsername = $.querySelector('.users-username')
    let usersPassword = $.querySelector('.users-password')
    let usersPurches = $.querySelector('.users-purches')

    let usersArray = JSON.parse(localStorage.getItem('usersArray'))
    let usersPurchesArray = JSON.parse(localStorage.getItem('userPurches'))
    
    let mainUser = usersArray.find(function (user) {
        return user.id == userId
    })
    
    if (usersPurchesArray) {
        let mainPurchase = usersPurchesArray.find(function(purches) {
            return purches.id == userId
        })
        if (mainPurchase == undefined) {
            usersPurches.value = 0
        } else {
            usersPurches.value = mainPurchase.content.length + ' محصول '
        }
    }



    usersName.value = mainUser.name
    usersFamily.value = mainUser.family
    usersEmail.value = mainUser.email
    usersUsername.value = mainUser.username
    usersPassword.value = mainUser.password
}

// delete user
function deleteUserInfoes(userId) {
    if (confirm('برای حذف کاربر مورد نظر مطمئنید ؟' + "\n" + "\n" + 'در صورت تایید قادر به بازگشت نیستید !')) {
        let usersArray = JSON.parse(localStorage.getItem('usersArray'))

        let mainUser = usersArray.findIndex(function (user) {
            return user.id == userId
        })
        usersArray.splice(mainUser, 1)
        userCardGenerator(usersArray)
        localStorage.setItem('usersArray', JSON.stringify(usersArray))
        deleteUserTiket(userId)
        deleteCurrentUser(userId)
    } else {
    }
}

// delete current user
function deleteCurrentUser(userId) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    // if 
    if (currentUser.id === userId) {
        localStorage.removeItem('currentUser')
    }

}

// delete user tiket 
function deleteUserTiket(userId) {
    let tiketsArray = JSON.parse(localStorage.getItem('tiketsArray'))
    let mainTiket = tiketsArray.filter(function (tiket) {
        return tiket.id !== userId
    })
    localStorage.setItem('tiketsArray', JSON.stringify(mainTiket))
    console.log(mainTiket)
}

// users Tikets
function usersTikets(userId) {
    tiketAnswerInput.value = ''
    let tiketsArray = JSON.parse(localStorage.getItem('tiketsArray'))
    if (tiketsArray) {
        let mainTiket = tiketsArray.filter(function (tiket) {
            return tiket.id == userId
        })
        userTiket.innerHTML = ''
        tiketGenerator(mainTiket)
    }
}

function tiketGenerator(mainTiket) {
    let usersTikets = $.querySelector('.users-tikets')
    let tiketsFragment = $.createDocumentFragment()
    let tiketContainer = $.querySelector('.tiket-container')
    tiketContainer.innerHTML = ''

    mainTiket.forEach(function (tiket) {

        tiketContainer.insertAdjacentHTML('beforeend', `
        <div class="question-section mt-3">
            <div class="question-header">
                <i class="bi bi-hourglass-split text-warning"></i>
                <button class="infos-btn question-header" data-bs-toggle="collapse" href="#anewer${mainTiket.indexOf(tiket)}">
                    ${tiket.title}
                </button>
            </div>
            <div class="collapse multi-collapse" id="anewer${mainTiket.indexOf(tiket)}">
                <div class="user-question">
                    <h6 class="m-0">${tiket.text}</h6>
                </div>
                <div class="answer-section">
                    <h6 class="m-0"> پاسخ شما : <span class="tiket-answer">${tiket.answer}</span></h6>
                </div>
                <p>
                    <button class="answer-tiket" type="button" data-bs-toggle="collapse"
                        data-bs-target="#answerInput" data-id ="${tiket.seconId}" onclick="sendAnswerFunc(event)">
                        پاسخ
                    </button>
                </p>
            </div>
        </div>
        `)
        tiketsFragment.appendChild(tiketContainer)
    })
    usersTikets.appendChild(tiketsFragment)
}

function sendAnswerFunc(event) {
    let tiketSecondId = event.target.dataset.id
    let answerTiketBtn = event.target

    let tiketsArray = JSON.parse(localStorage.getItem('tiketsArray'))
    let mainTiket = tiketsArray.find(function (tiket) {
        return tiket.seconId == tiketSecondId
    })

    userTiket.innerHTML = mainTiket.text

    sendAdminAnswerBtn.addEventListener('click', function () {

        if (tiketAnswerInput.value === '') {
            alert('برای پاسخ دادن به تیکت کاربر همه فیلدها را پر کنید .')
        } else {
            checkReplayInput(mainTiket, answerTiketBtn)
        }
    })
}

function checkReplayInput(mainTiket, answerTiketBtn) {

    // console.log(mainTiket)  answer
    let tiketsArray = JSON.parse(localStorage.getItem('tiketsArray'))
    let previousTiketIndex = tiketsArray.findIndex(function (tiket) {
        return tiket.seconId == mainTiket.seconId
    })
    tiketsArray.splice(previousTiketIndex, 1)

    tiketAfterReplay = {
        id: mainTiket.id,
        seconId: mainTiket.seconId,
        title: mainTiket.title,
        text: mainTiket.text,
        answer: tiketAnswerInput.value
    }
    tiketsArray.push(tiketAfterReplay)
    localStorage.setItem('tiketsArray', JSON.stringify(tiketsArray))
    let userTikets = tiketsArray.filter(function (tiket) {
        return tiket.id == mainTiket.id
    })

    tiketGenerator(userTikets)
    sendQuestion(mainTiket)
    console.log(answerTiketBtn)
    answerTiketBtn.classList.add('d-none')
}

function sendQuestion(mainTiket) {

    // console.log(mainTiket)
    userTiket.innerHTML = ''
    tiketAnswerInput.value = ''
    answerInput.classList.remove('show')
}


function filterUser(e) {
    const text = e.target.value.toLowerCase();

    let users = document.querySelectorAll('.user-card')
    users.forEach(function (user) {

        const item = user.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            user.classList.add("d-flex");
        } else {
            user.classList.remove("d-flex");
            user.style.display = 'none';
        }
    });
}


window.addEventListener('load', getUsersInfoes)

findUsersInput.addEventListener('keyup', filterUser)









