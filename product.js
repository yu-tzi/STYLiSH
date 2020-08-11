
//render product
let stockData = []
let nowColorStock = []
let nowStock = 0 
let sizeFirst 
let nowColor 


//produce cart item
let data = [] //cart function
let productList = []

let idPicked = ""
let titlePicked = ""
let pricePicked = ""
let sizePicked = ""
let nowAmount = ""
let nowColorName = ""
let cartImage = ""
let cartAmount = 0
let stockValue = 0
let storStock = 0
let leftStock
let stockAvai

/***********product details***********/

//getting tag number

let tag

function getTag() {
  let address = window.location.href
  let addressIndex = address.indexOf('=')
  tag = address.slice(addressIndex + 1)

}

getTag()


//get product details from API
let baseURL = "https://api.appworks-school.tw/api/1.0/products/details?id="

function getProductDetails(tag) {
  var req = new XMLHttpRequest();
  req.open("get", `${baseURL}${tag}`)
  req.onload = function () {

    let result = JSON.parse(this.response).data
    productDetails(result)
   
  }

  req.send();
}

getProductDetails(tag)



//product render function
let productName = document.querySelector('.name')
let productId = document.querySelector('.id')
let productPrice = document.querySelector('.price')
let productColor = document.querySelector('.color')
let productSize = document.querySelector('.size')
let productIntro = document.querySelector('.product-intro')
let productPara = document.querySelector('.productPara')
let mainImage = document.querySelector('.main-image')



function productDetails(result) {
 //title id price and intro
  let id = result.id
  idPicked = id
  productId.innerHTML = id
  let title = result.title
  titlePicked = title
  productName.innerHTML = title
  let price = `TWD.${result.price}`
  productPrice.innerHTML = price
  pricePicked = result.price
  
  let str = result.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
  
  let intro = `${result.note}<p></p>${result.texture}<br><p></p>${str}<p></p>素材產地/${result.place}<br>加工產地/${result.place}`
  productIntro.innerHTML = intro
  mainImage.innerHTML = `<img src="${result.main_image}">`
  cartImage = result.main_image
  

 



  //color 
  let colorBlock = ""
  let colorCode = ""
  //render color block
  for (i = 0; i < result.colors.length; i++){

    
    colorCode =(result.colors[i].code)
    colorBlock += `<div class="color-code ${result.colors[i].name}"  style="background-color:#${colorCode};"></div>`
    
  }

  let color = `<div class="colorW">顏色</div>${colorBlock}`
  productColor.innerHTML = color


  //change the class of first color block to clicked
  let colorFirst = document.querySelector(".color-code")
  colorFirst.classList.add("colorClicked")
  


  //check now color to find corresponding sotck value
  nowColor = result.colors[0].code
  stockData = [result.variants]
  nowColorName = result.colors[0].name

  for (var i = 0; i < stockData[0].length; i++) {

    if (stockData[0][i].color_code === nowColor) {
      nowColorStock.push(stockData[0][i])
    }

  }

  //store sotck value into variable
  nowStock = nowColorStock[0].stock
  console.log(`loading msg : now stock is ${nowStock}`)

  //rendering size blocks
  let sizeBlcok = ""
  let size = ""
  
  for (i = 0; i < result.sizes.length; i++) {
    size += `<div class="${result.sizes[i]} sizeB">${result.sizes[i]}</div>`    
    }
        
  sizeBlcok = `<div class="sizeW">尺寸</div>${size}`

  productSize.innerHTML = sizeBlcok

  //change the class of first size block to clicked
  sizeFirst = document.querySelector(`.${result.sizes[0]}`)
  buyAmount.innerHTML = 0

  if (nowStock > 0) {
    sizePicked = sizeFirst.innerText
    sizeFirst.classList.add("sizeClicked")
    if (document.querySelector(".minus").classList.contains("minus")) {

      document.querySelector(".minus").classList.remove("countRunOut")
      document.querySelector(".plus").classList.remove("countRunOut")
      document.querySelector(".buyAmount").classList.remove("countRunOut")
    }

    }else{
     //plus minus btn become grey if there is zero stock
     sizePicked = sizeFirst.innerText
     sizeFirst.classList.add("sizeClicked")
     document.querySelector(".minus").classList.add("countRunOut")
     document.querySelector(".plus").classList.add("countRunOut")
     document.querySelector(".buyAmount").classList.add("countRunOut")
   }



  //rendering images
  let image = ""
  for (i = 0; i < result.images.length; i++){

    image += ` <div>${result.story}</div><img class="explainImg" src="${result.images[i]}" alt="">
    `
  }

  productPara.innerHTML = image

  //make visual adjustment base on the stock
  soldOutRender(nowColorStock)
  //loading your cart item and number
  getItem()  
  renewStock()
}





/***********product variants***********/

//check if stock in different size sold out
//if sold out make the visual effect change
let buyAmount = document.querySelector('.buyAmount')

let sizeCheck
let sizeClass
let sizeColor
let cartBtn


function soldOutRender(nowColorStock) {

  let allAmount = 0 

  for (j = 0; j < document.querySelectorAll(".sizeB").length; j++) {
    sizeCheck = document.querySelectorAll(".sizeB")[j].innerText
    sizeClass = document.querySelectorAll(".sizeB")[j]

    for (i = 0; i < nowColorStock.length; i++) {

      if (sizeCheck === nowColorStock[i].size) {
      
        allAmount += nowColorStock[i].stock
        console.log(`stock value under now color - ${nowColorStock[i].size}:${nowColorStock[i].stock}`)

        if (nowColorStock[i].stock < 0) {
          sizeClass.className = "sizeOut sizeB"
        }
      }
    }//end if i loop
  }//end if j loop

  //if stock in all sizes are sold out ,make send btn grey
  if (allAmount < 0) {
    document.querySelector(".send-btn").style.backgroundColor = "RGB(222, 222, 222)"
  }

}//end of soldOutRender func


//function RGB to hex
function rgbSepe(rgbColor) {
  rgbColor = rgbColor.substring(rgbColor.indexOf('(') + 1, rgbColor.lastIndexOf(')')).split(/,\s*/)
  ColorHex(rgbColor[0], rgbColor[1], rgbColor[2])
}

function ColorHex(r, g, b) {
  let red = rgbToHex(r)
  let green = rgbToHex(g)
  let blue = rgbToHex(b)
  let hex = red + green + blue
  hexColor = hex.toUpperCase()
}

function rgbToHex(rgb) {
  let hex = Number(rgb).toString(16)
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};


//function click on colorBtn
let rgbColor
let hexColor

let colorBtn = document.querySelector(".color")
colorBtn.addEventListener('click', () => {
  
  //take off clicked effect
  for (j = 0; j < event.target.parentNode.childNodes.length; j++) {
    if (event.target.parentNode.childNodes[j].classList.contains("colorClicked")) {
      event.target.parentNode.childNodes[j].classList.remove("colorClicked")
    }
  }

  //and add click effect to now color
  event.target.classList.add("colorClicked")
  nowColorName = event.target.classList[1]
 
  //storing stock value in variable base on color clicked
  rgbColor = `${event.target.style.backgroundColor}`
  
  rgbSepe(rgbColor)//rgb to hex
  nowColor = hexColor

  nowColorStock = []
  for (var i = 0; i < stockData[0].length; i++) {
    if (stockData[0][i].color_code === nowColor) {
      nowColorStock.push(stockData[0][i])

    }
  }

  //re-check now color stock value make visaul adjustment
  soldOutRender(nowColorStock)


  //getting stock value from default M size stock
  //and the default M size should have clicked effect
  nowStock = nowColorStock[0].stock
  sizeFirst = document.querySelector(`.${nowColorStock[0].size}`)

  for (j = 0; j < nowColorStock.length; j++) {
    if (document.querySelector(`.${nowColorStock[j].size}`).classList.contains("sizeClicked")) {
      document.querySelector(`.${nowColorStock[j].size}`).classList.remove("sizeClicked")
    }
  }
  

  if (nowStock > 0) {
    //make cart amount trun to 1 when clicking color btn
    buyAmount.innerHTML = 0
    sizePicked = sizeFirst.innerText
    sizeFirst.classList.add("sizeClicked")
    console.log(`stock value after color ${nowColor} is clicked - ${nowStock}`)

    if (document.querySelector(".minus").classList.contains("minus")) {

      document.querySelector(".minus").classList.remove("countRunOut")
      document.querySelector(".plus").classList.remove("countRunOut")
      document.querySelector(".buyAmount").classList.remove("countRunOut")
    }


  } else {
        //make cart amount trun to 1 when clicking color btn
        
        sizePicked = sizeFirst.innerText
        buyAmount.innerHTML = 0
    
        sizeFirst.classList.add("sizeClicked")
        //plus minus btn become grey if there is zero stock
        document.querySelector(".minus").classList.add("countRunOut")
        document.querySelector(".plus").classList.add("countRunOut")
        document.querySelector(".buyAmount").classList.add("countRunOut")

      }
  
})//end of color click btn



//click on size btn
let sizeBtn = document.querySelector(".size")
sizeBtn.addEventListener('click', () => {

  //take off clicked effect
  for (j = 0; j < event.target.parentNode.childNodes.length; j++) {
    if (event.target.parentNode.childNodes[j].classList.contains("sizeClicked")) {
      event.target.parentNode.childNodes[j].classList.remove("sizeClicked")
    }
  }

  // clear the sotck value  when clicking size btn
  nowStock = []
  let clickSize = event.target.innerHTML


  // find stock amount using now click size
  for (i = 0; i < nowColorStock.length; i++) {

    if (clickSize === nowColorStock[i].size) {
   
      nowStock = nowColorStock[i].stock
      sizePicked = clickSize
      console.log(productList)
      console.log(`${clickSize === nowColorStock[i].size}`)
      
      
      //if nowStock < 0 no click effect
      if (nowStock > 0) {
        // change the cart amount to 1 when clicking size btn
        buyAmount.innerHTML = 0


        event.target.classList.add("sizeClicked")

        if (document.querySelector(".minus").classList.contains("minus")) {

          document.querySelector(".minus").classList.remove("countRunOut")
          document.querySelector(".plus").classList.remove("countRunOut")
          document.querySelector(".buyAmount").classList.remove("countRunOut")
        }

      

      } else {
        // change the cart amount to 1 when clicking size btn
        buyAmount.innerHTML = 0

        event.target.classList.add("sizeClicked")
        //plus minus btn become grey if there is zero stock
        document.querySelector(".minus").classList.add("countRunOut")
        document.querySelector(".plus").classList.add("countRunOut")
        document.querySelector(".buyAmount").classList.add("countRunOut")


      }
    }

    console.log(`stock value after size ${clickSize} is clicked - ${nowStock}`)
    

  }
  renewStock()
  console.log('click and renew!')
})// end of click size func



//add amount function
let plus = document.querySelector('.plus')
let minus = document.querySelector('.minus')

plus.addEventListener('click', function () {
  nowAmount = parseInt(buyAmount.innerHTML)
  stockAvai = nowStock - storStock
  console.log(`now stock when clicking add btn is - ${nowStock}`)
  console.log(`avai ${stockAvai} = now ${nowStock} - store ${storStock}`)
  
  if (nowAmount < stockAvai) {
    nowAmount += 1
    buyAmount.innerHTML = nowAmount
    console.log(`now amount is - ${nowAmount}`)
  }

})


minus.addEventListener('click', function () {
  nowAmount = parseInt(buyAmount.innerHTML)
  console.log(`now stock when clicking minus btn is - ${nowStock}`)
  
  
  if (nowAmount > 1) {
    nowAmount -= 1
    buyAmount.innerHTML = nowAmount
    console.log(`now amount is - ${nowAmount}`)
    

  }


})

/******* add to cart implementation ********/

//store list into the storage
function addItem(list) {
  localStorage.setItem("shoppingCartStorage", JSON.stringify(list))
  countCartAmount(list)
}

//get item from the storage and renew stock num
let listGet
function getItem() {
  

  if (JSON.parse(localStorage.getItem("shoppingCartStorage")) !== undefined && JSON.parse(localStorage.getItem("shoppingCartStorage")) !== null) {

    listGet = JSON.parse(localStorage.getItem("shoppingCartStorage"))
    productList = listGet
    countCartAmount(productList)


  } else {
   
    listGet = []
    productList = listGet
    console.log(productList)
    countCartAmount(productList)

  }

}

//click send btn and produce cart item
let sendBtn = document.querySelector(".send-btn")

sendBtn.addEventListener('click', () => {
  produceCartItem()
  addItem(productList) 
  buyAmount.innerHTML = 0
  renewStock()
  
})

//produce cart item function
function produceCartItem() {

  //get item infor
  /*console.log(`idPicked is ${idPicked}`)
  console.log(`titlePicked is ${titlePicked}`)
  console.log(`pricePicked is ${pricePicked}`)
  console.log(`nowColor is ${nowColor}`)
  console.log(`nowColorName is ${nowColorName}`)
  console.log(`nowStock is ${ nowStock }`)
  console.log(`buyAmount is ${buyAmount.innerText}`)
  console.log(`sizePicked is ${sizePicked}`)*/


 //checking if there's same product
  if (productList.length > 0) {
    for (i = 0; i < productList.length; i++){


      if (parseInt(productList[i].id) === idPicked && productList[i].color.code === nowColor && productList[i].size === sizePicked) {

        let stockNum = parseInt(productList[i].qty)//amount that already been buyed
        productList[i].qty = stockNum + parseInt(buyAmount.innerText)
        console.log(productList[i].qty)
        return

      }
    }
  }


  if (buyAmount.innerText < 1) {
    return
  }


  //add infor to product infor
  data = {
    "id": `${idPicked}`,
    "name": `${titlePicked}`,
    "price": `${pricePicked}`,
    "color": {
      "name": `${nowColorName}`,
      "code": `${nowColor}`
    },
    "size": `${sizePicked}`,
    "qty": `${buyAmount.innerText}`,
    "image": `${cartImage}`,
    "stock": `${nowStock}`
  }

  
  productList.push(data)
  //console.log(data)
  //console.log(productList.length)
  if (buyAmount.innerHTML > 0) {
    buyAmount.innerHTML = 0
  }
 

}//end of produce cart item function

//remove item
function removeItem(){
  localStorage.removeItem("shoppingCartStorage");
}

//count all stuff number func
function countCartAmount(obj) {
  cartAmount = 0

  if (obj.length > 0) {
    for (i = 0; i < obj.length; i++) {
      cartAmount += parseInt(obj[i].qty)
    }
  } else {
    cartAmount = 0
  }

  console.log(`cartAmount is ${cartAmount}`)
  document.querySelector(".cartAmount").innerHTML = cartAmount
  document.querySelector(".cartAmountW").innerHTML = cartAmount

}


//renew stock number and change plus minus visual
function renewStock(){

  
  console.log(`idPicked is ${idPicked}`)
  console.log(`titlePicked is ${titlePicked}`)
  console.log(`pricePicked is ${pricePicked}`)
  console.log(`nowColor is ${nowColor}`)
  console.log(`nowColorName is ${nowColorName}`)
  console.log(`nowStock is ${nowStock}`)
  console.log(`buyAmount is ${buyAmount.innerText}`)
  console.log(`sizePicked is ${sizePicked}`)

  let corres = false
  for (i = 0; i < productList.length; i++) {

    //check if there's same item in buying list 
    if (parseInt(productList[i].id) === idPicked && productList[i].color.code === nowColor && productList[i].size === sizePicked) {
      console.log(productList[i].size === sizePicked)
      //if yes, console log the list item
      console.log(productList[i])
      //item qty that's already in cart
      //send the value to plus minus func
      console.log(productList[i].qty)
      storStock = productList[i].qty
      corres = true
    } 
  }
  //if now size has no corresponding item in storage

  if (!corres) {
    storStock = 0
  }
  
  

  

}


//removeItem()

