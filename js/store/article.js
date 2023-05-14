let $ = document

let articleNav = $.querySelector('.article-nav')
let switchElem = $.querySelector('.switch')
let userBasketCount = $.querySelector('.userBasket-count')
//




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


// article Card Generator
function getArticlelsFromLocal() {
    let articleArray = JSON.parse(localStorage.getItem('articleArray'))
    if (articleArray) {
        articleCardGenerator(articleArray)
        // console.log(articleArray)
    }
}

function articleCardGenerator(articleArray) {

    let articleCards = $.querySelector('.article-cards')
    let articleFragment = $.createDocumentFragment()
    let articleContainer = $.querySelector('.article-container')

    articleArray.forEach(function (article) {

        articleContainer.insertAdjacentHTML('beforeend', `
        <div class="card" style="width: 18rem;">
            <img src="${article.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title mb-3 fw-bold">" ${article.name} "</h5>
                <div class="d-flex text-mute">
                    <i class="bi bi-pen ms-2"></i>
                    <h6 class="card-title">نویسنده : <span> ${article.writer}</span></h6>
                </div>
                <div class="d-flex my-3 text-mute">
                    <i class="bi bi-calendar2-plus ms-2"></i>
                    <h6 class="card-title">تاریخ انتشار : <span> ${article.date} </span></h6>
                </div>
                <div class="d-flex mb-3">
                    <i class="bi bi-textarea-t ms-2"></i>
                    <p class="card-text"> تیتر : <span> ${article.title}</span></p>
                </div>
                <a class="continues" href="./single-article.html" data-id ="${article.id}" onclick="setSingleArticle(event)">مشاهده مقاله ←</a>
            </div>
        </div>
        `)
        articleFragment.appendChild(articleContainer)
    })
    articleCards.appendChild(articleFragment)
}


function setSingleArticle(event) {
    // event.preventDefault()
    let articleId = (event.target.dataset.id)
    let allArticles = JSON.parse(localStorage.getItem('articleArray'))
    let mainArticle = allArticles.find(function (article) {
        return article.id == articleId
    })

    localStorage.removeItem('singleArticle')
    localStorage.setItem('singleArticle', JSON.stringify(mainArticle))
}






window.addEventListener('load', getArticlelsFromLocal)
// utiliti
window.addEventListener('load', function () {
    articleNav.classList.add('current-tag')
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


