//related to cart
let productList = []


/**** general main page render function ****/

let loading = false
let nextPage
let nowCat //在render的過程中存入下一頁以及當前分類，loading的時候用來參考
let productContainer = document.querySelector('.product')

function mainPageRender(productData) {
    let allProducts = productData
    let colors = ""
    let product = ""
    let i
    let j
    let code




    for (i = 0; i < allProducts.length; i++) {

        //color
        for (j = 0; j < allProducts[i].colors.length; j++) {

            code = (allProducts[i].colors[j].code)
            colors += `<div style="height: 20px; width:20px; background-color:#${code} ;border-width:0.1px;border-color:grey;border-style:solid; margin-right: 6px;"></div>`

        }



        product = `
      <li>
        <img src="${allProducts[i].main_image}" class="img" onclick="window.location.href='./product.html?tag=${allProducts[i].id}';" />
        <ul class="color_dom">${colors}</ul>
        <div class="item-name">${allProducts[i].title}</div>
        <div class="price">${allProducts[i].price}</div>
      </li>
    `

        productContainer.innerHTML += product
        colors = ""

    }

}



/*********** product list rendering *********/

let baseURL = "https://api.appworks-school.tw/api/1.0/products/"
let productsAll = "all"
let productsWomen = "women"
let productsMen = "men"
let productsAccessor = "accessories"
let search = "search?keyword="
let newURL

function getProduct(url) {
    var req = new XMLHttpRequest();
    req.open("get", `${baseURL}${url}`)
    req.onload = function() {
        loading = true
        nextPage = ""
        nextPage = `?paging=${JSON.parse(this.response).next_paging}`
        mainPageRender(JSON.parse(this.response).data)
        nowCat = ""
        if (url.indexOf('?') > 1) {
            newURL = url.slice(0, 3)
        } else {
            newURL = url
        }

        nowCat = `${newURL}`
        loading = false
        getItem()
    }

    req.send();
}



//get tag 

let tag

function getTag() {
    let address = window.location.href
    let addressIndex = address.indexOf('=')
    tag = address.slice(addressIndex + 1)

    console.log(address.indexOf('='))
    console.log(tag)

}

getTag()

/******loading page******/

if (tag === "women") {
    console.log('women')
    getProduct(productsWomen)
} else if (tag === "men") {
    console.log('men')
    getProduct(productsMen)
} else if (tag === "acc") {
    console.log('acc')
    getProduct(productsAccessor)

} else {
    console.log('all')
    getProduct(productsAll)
}


//product list event listen

let logo = document.querySelector('.logo')
let man = document.querySelector('.man')
let woman = document.querySelector('.women')
let accessor = document.querySelector('.accessor')

logo.addEventListener('click', () => {
    productContainer.innerHTML = ""
    getProduct(productsAll)
    console.log('clicked!')
})


man.addEventListener('click', () => {
    productContainer.innerHTML = ""
    getProduct(productsMen)
    console.log('clicked!')
})

woman.addEventListener('click', () => {
    productContainer.innerHTML = ""
    getProduct(productsWomen)
    console.log('clicked!')
})

accessor.addEventListener('click', () => {
    productContainer.innerHTML = ""
    getProduct(productsAccessor)
    console.log('clicked!')
})


/********* searching function *********/




document.getElementById('search-form').onsubmit = function(e) {

    let searchValue = ""
    searchValue = document.getElementById('search-input').value;
    e.preventDefault()
    renderSearchData(searchValue)

};

let hiddenSubmit = document.getElementById('hiddenSubmit')
let hiddenInput = document.getElementById('hiddenInput')
hiddenSubmit.addEventListener('click', (e) => {
    console.log('heee')
    console.log(hiddenInput.value)
    if (hiddenInput.value !== "輸入關鍵字") {
        e.preventDefault()
        renderSearchData(hiddenInput.value)
        console.log(hiddenInput.value)
    }
})

document.querySelector('#hiddenInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        // code for enter
        console.log(hiddenInput.value)
        renderSearchData(hiddenInput.value)
        e.preventDefault()
    }
});



function renderSearchData(keywords) {
    var req = new XMLHttpRequest();
    req.open("get", `${baseURL}${search}${keywords}`)
    req.onload = function() {

        productContainer.innerHTML = ""
        nextPage = ""
        nextPage = `paging=${JSON.parse(this.response).next_paging}`
        mainPageRender(JSON.parse(this.response).data)
        nowCat = ""
        nowCat = `${search}${keywords}&`
        console.log(nowCat)
        console.log(nextPage)
        getItem()
    }

    req.send();
}

let hiddenSearch = document.getElementById('hidden-search')
let searchBtn = document.querySelector('.search')
let searchX = document.querySelector('.search-X')

searchBtn.addEventListener('click', () => {
    hiddenSearch.style.display = "inline-block"

})

searchX.addEventListener('click', () => {
    hiddenSearch.style.display = "none"

})



/******** changing page *********/



function scrollFunc() {
    let buttom = document.querySelector(".buttom");
    let buttomRect = buttom.getBoundingClientRect()
    let scrollHeight = (buttomRect.y + buttomRect.height - window.innerHeight)

    if (nextPage !== "?paging=undefined" && nextPage !== "paging=undefined" && scrollHeight < 20 && !loading) {
        loading = true
        getProduct(`${nowCat}${nextPage}`)
        console.log('scrollfunc activated')
    }


}





/******** slide effect *********/
//circle event listen
let nowPage
let allPage
let slideLoad = false
let carouselCir = document.querySelector('.carousel-nav')
let slidesA = document.querySelector('.carousel-slides')
carouselCir.addEventListener('click', () => {
    slideLoad = true
    console.log(event.target)
    if (event.target.className.includes("carouselCir")) {
        event.target.style.backgroundColor = "rgb(50, 51, 54)";
    }

    let pageId = event.target.id - 1
    if (pageId >= 0) {
        slidesA.style.marginLeft = `calc(${pageId}*-100%)`;
    } else {}

    nowPage = event.target.id
    nowPage = parseInt(nowPage)
    console.log("event click stroe now page as" + nowPage)
    slideLoad = false

})




//silde auto change
window.setInterval(() => {
    if (nowPage !== allPage && !slideLoad) {
        console.log('nowPage !== allPage, slideLoaded')
        slideLoad = true
        slidesA.style.marginLeft = `calc(${nowPage}*-100%)`;
        nowPage = parseInt(nowPage)
        nowPage += 1
    } else {
        console.log('nowPage = allPage, slideRestart')
        slidesA.style.marginLeft = "0%";
        nowPage = 1;

    }
    slideLoad = false

}, 10000);

window.setInterval(() => {

    for (i = 0; i < carouselCir.children.length; i++) {
        if (!slideLoad) {
            carouselCir.children[i].style.backgroundColor = "white";
        }
    }

}, 2000);


//slide layout 
let carouselNav = document.querySelector('.carousel-nav')
let carouselItem = document.querySelector('.carousel-slides')
let circle
let slides


function slideRender(result) {

    circle = ""
    slides = ""
    carouselNav.innerHTML = ""
    carouselItem.innerHTML = ""
    console.log(result.data.length)


    for (i = 0; i < result.data.length; i++) {
        let storyReorg = result.data[i].story.replace(/\r\n/g, "<br />");

        let bannerImage = `https://api.appworks-school.tw${result.data[i].picture}`
        console.log(bannerImage)

        let id = result.data[i].id

        let url = `./product.html?tag=${result.data[i].product_id}`

        circle = `<div class="carouselCir ${id}" id = "${id}"></div> `
        carouselNav.innerHTML += circle
        slides = `<a href="${url}" class="carousel-item ${id}" style="background-image:url(${bannerImage}); background-size: cover;">

    <div class="w">${storyReorg}</div>

    </a>`
        carouselItem.innerHTML += slides

        slidesA.style.width = `calc(${i + 1}*100%)`;
        allPage = i + 1
        nowPage = 1
    }




}



//silde get API
function sliderData() {
    var req = new XMLHttpRequest();
    req.open("get", `https://api.appworks-school.tw/api/1.0/marketing/campaigns`)
    req.onload = function() {
        console.log('sliderAPIreceived')
        slideRender(JSON.parse(this.response))

    }

    req.send();
}

sliderData()


/************* cart function **************/
let cartAmount = 0


function getItem() {

    if (JSON.parse(localStorage.getItem("shoppingCartStorage")) !== undefined && JSON.parse(localStorage.getItem("shoppingCartStorage")) !== null) {
        listGet = JSON.parse(localStorage.getItem("shoppingCartStorage"))
        productList = listGet
        cartAmount = 0
        countCartAmount(productList)
    } else {
        listGet = []
        productList = listGet
        cartAmount = 0
        countCartAmount(productList)
    }

}

//count all stuff number func
function countCartAmount(obj) {

    if (obj.length > 0) {
        for (i = 0; i < obj.length; i++) {
            cartAmount += parseInt(obj[i].qty)
        }
    }
    console.log(`cartAmount is ${cartAmount}`)
    document.querySelector(".cartAmountM").innerHTML = cartAmount
    document.querySelector(".cartAmount").innerHTML = cartAmount
}