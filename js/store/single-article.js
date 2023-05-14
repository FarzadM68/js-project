let $ = document

// let articleNav = $.querySelector('.article-nav')
let switchElem = $.querySelector('.switch')
let userBasketCount = $.querySelector('.userBasket-count')

// comments
let sendCommentBtn = $.querySelector('.send-comment')
let commentNameInput = $.querySelector('.comment-name')
let commentEmaileInput = $.querySelector('.comment-email')
let commentTaxtInput = $.querySelector('.comment-text')
let commentCount = $.querySelector('.comment-count')


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



// get single Articles Info
function getSingleArticlesInfo() {
    let singleArticle = JSON.parse(localStorage.getItem('singleArticle'))
    let allArticle = JSON.parse(localStorage.getItem('articleArray'))
    sigleArticleGenerator(singleArticle)
    sigleArticleTitlesGenerator(allArticle)
    sigleArticleTagsGenerator(singleArticle)
}

function sigleArticleGenerator(singleArticle) {

    let articleImage = $.querySelector('.article-image')
    // articleImage.innerHTML = ''

    articleImage.insertAdjacentHTML('afterbegin', `
        <div class="col-sm-8 col-12">
            <img class="col-12" src="${singleArticle.img}" alt="">
            <div class="under-image">
                <div class="d-flex ms-4">
                    <i class="bi bi-pen ms-2"></i>
                    <h6 class="card-title"> : <span> ${singleArticle.writer} </span></h6>
                </div>
                <div class="d-flex">
                    <i class="bi bi-calendar2-plus ms-2"></i>
                    <h6 class="card-title"> : <span> ${singleArticle.date} </span></h6>
                </div>
            </div>
            <div class="article-content me-3 mb-5">
                <h3 class="my-3"> ${singleArticle.name}</h3>
                <h5 class="my-3 fw-bold"> ${singleArticle.title}</h5>
                <p>
                    ${singleArticle.Text}
                </p>
            </div>
        </div>
    `)
}
function sigleArticleTitlesGenerator(allArticle) {

    let titlsSection = $.querySelector('.titls-section')
    // titlsSection.innerHTML = ''

    allArticle.forEach(function (article) {

        titlsSection.insertAdjacentHTML('beforeend', `
        <ul class="pe-4 mb-2 articles-title">
            <li class="footer-item">
                <a href="./single-article.html" data-id ="${article.id}" onclick="goToSingleArticle(event)"> ${article.name} </a> 
            </li>
        </ul>
        `)
    })
}
function sigleArticleTagsGenerator(singleArticle) {

    let tagsArray = singleArticle.tags


    let tagContainer = $.querySelector('.tag-container')
    // tagContainer.innerHTML = ''

    tagsArray.forEach(function (tag) {
        tagContainer.insertAdjacentHTML('beforeend', `

            <p>#${tag}</p>
        `)
    })

}
// go To other Single Article from Single Article page
function goToSingleArticle(event) {
    // event.preventDefault()
    let articleId = (event.target.dataset.id)
    console.log(articleId)

    let singleArticle = JSON.parse(localStorage.getItem('singleArticle'))
    let allArticle = JSON.parse(localStorage.getItem('articleArray'))

    // let isExist = allArticle.find(function(article) {
    //     return article.id == singleArticle.id
    // })


    // if (!isExist) {
    //     location.href = 'file:///C:/Users/barman/Desktop/%D8%AA%D8%B3%D8%AA%20%D9%BE%D8%B1%D9%88%DA%98%D9%87/project/pages/store/article.html'
    // } else {

    // }


    let mainArticle = allArticle.find(function (article) {
        return article.id == articleId
    })
    localStorage.removeItem('singleArticle')
    localStorage.setItem('singleArticle', JSON.stringify(mainArticle))
}
// comments input
commentNameInput.addEventListener('keyup', function () {
    if (commentNameInput.value !== '') {
        commentNameInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        commentNameInput.style.borderBottom = '2px solid red'
    }
})
commentEmaileInput.addEventListener('keyup', function () {
    if (commentEmaileInput.value !== '') {
        commentEmaileInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        commentEmaileInput.style.borderBottom = '2px solid red'
    }
})
commentTaxtInput.addEventListener('keyup', function () {
    if (commentTaxtInput.value !== '') {
        commentTaxtInput.style.borderBottom = '3px solid rgb(15, 199, 55)'
    } else {
        commentTaxtInput.style.borderBottom = '2px solid red'
    }
})

function checkCommentsInout() {
    if (commentNameInput.value === '' || commentEmaileInput.value === '' || commentTaxtInput.value === '') {
        alert('برای ثبت نظر لطفا همه فیلدها را پرکنید .')
    } else {
        let commentsArray = JSON.parse(localStorage.getItem('commentsArray'))
        if (commentsArray) {
            allComments = commentsArray
            commentGenerator(allComments)
        } else {
            let allComments = []
            commentGenerator(allComments)
        }
    }
}
// get current time  
function getCurrentDate() {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date().toLocaleDateString('fa-IR', options);

    return today
}
// comment Generator
function commentGenerator(allComments) {
    let singleArticle = JSON.parse(localStorage.getItem('singleArticle'))

    let newComment = {
        id: singleArticle.id,
        name: commentNameInput.value,
        email: commentEmaileInput.value,
        text: commentTaxtInput.value,
        date: getCurrentDate()
    }

    allComments.push(newComment)
    localStorage.setItem('commentsArray', JSON.stringify(allComments))
    getCommentsInfo()
    commentNameInput.value = ''
    commentEmaileInput.value = ''
    commentTaxtInput.value = ''
    commentNameInput.style.borderBottom = '2px solid red'
    commentEmaileInput.style.borderBottom = '2px solid red'
    commentTaxtInput.style.borderBottom = '2px solid red'

}

function getCommentsInfo() {
    let commentsArray = JSON.parse(localStorage.getItem('commentsArray'))
    let singleArticle = JSON.parse(localStorage.getItem('singleArticle'))
    if (commentsArray) {
        let mainComment = commentsArray.filter(function (comment) {
            return comment.id == singleArticle.id
        })
        addToCommentSection(mainComment)
    }
}

function addToCommentSection(mainComment) {

    let commentContent = $.querySelector('.comment-content')
    commentCount.innerHTML = mainComment.length + ' کامنت '
    commentContent.innerHTML = ''
    mainComment.forEach(function (comment) {
        commentContent.insertAdjacentHTML('beforeend', `
        <div class="d-flex user-comment mb-4">
            <img src="../../image/store/store/comment-img.jpg" alt="">
            <div class="me-3">
                <div class="d-flex mb-3">
                    <p class="ms-4 mb-0 fw-bold">${comment.name}</p>
                    <p class="mb-0 text-mute"> ${comment.date}</p>
                </div>
                <p class="w-75"> ${comment.text}</p>
            </div>
        </div>
        `)
    })
    // getCommentsInfo()
}

function isExistSingleArticle() {
    let singleArticle = JSON.parse(localStorage.getItem('singleArticle'))
    let allArticle = JSON.parse(localStorage.getItem('articleArray'))

    let isExist = allArticle.find(function (article) {
        return article.id == singleArticle.id
    })
    if (!isExist) {
        location.href = '/project/pages/store/article.html'
    }
}








sendCommentBtn.addEventListener('click', checkCommentsInout)
window.addEventListener('load', getSingleArticlesInfo)
window.addEventListener('load', getCommentsInfo)
// utiliti
// window.addEventListener('load', function () {
//     articleNav.classList.add('current-tag')
// })
// user Basket Count
window.addEventListener('load', getLocalStorageForUserBasketCount)
window.addEventListener('load', isExistSingleArticle)
// dark mood
window.onload = function () {

    let localStorageMood = localStorage.getItem('mood')

    if (localStorageMood === 'dark') {
        document.body.classList.add('dark')
    }
}
////////////////////// end utiliti ////////////