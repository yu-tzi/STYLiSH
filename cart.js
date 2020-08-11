/******  Cart Page Render & function ******/

let listGet


function getItem() {
  
  if (JSON.parse(localStorage.getItem("shoppingCartStorage")) !== undefined && JSON.parse(localStorage.getItem("shoppingCartStorage")) !== null) {

    listGet = JSON.parse(localStorage.getItem("shoppingCartStorage"))
    console.log(listGet)

  } else {

    listGet = []
    console.log(listGet)

  }
  
}

let tokenAmount

function getToken() {
  console.log('getToken')
  tokenAmount = localStorage.getItem('profileToken')
  console.log(JSON.parse(tokenAmount))
  console.log(JSON.parse(tokenAmount)[0].access_token)
  console.log(JSON.parse(tokenAmount)[0].user.email)
  console.log(JSON.parse(tokenAmount)[0].user.name)
}

function addItem(listGet) {

  localStorage.setItem("shoppingCartStorage", JSON.stringify(listGet))
}


let cartTotalNum = document.querySelector(".cartTitleNum")
let container = document.querySelector(".cartBoxFrame")
let beforePrice = document.querySelector(".beforePrice")
let afterPrice = document.querySelector(".afterPrice")


let cartItem =""
let allItem =""
let amountPrice = 0
let totalAmount = 0
let allItemPrice = 0


function renderCart() {
  
  console.log("function renderCart activated !")
  

  for (i = 0; i < listGet.length; i++) {

  amountPrice = listGet[i].qty * listGet[i].price

  cartItem =
    `
        <ul class="cartItem">
        <div class="cartItemInfor">
          <div class="cartImgnInfo">
          <img class="cartItemImg" src="${listGet[i].image}" alt="">

          <ul class="cartItemIntro">
            <li>${listGet[i].name}</li>
            <li>${listGet[i].id}</li>
            <li>顏色｜${listGet[i].color.name}</li>
            <li>尺寸｜${listGet[i].size}</li>
          </ul>
          </div>

          <img class="removeCartImg" src="images/cart-remove.png" alt="">
        </div>

          

        <ul class="hiddenCartTitle">
          <li class="hiddenCartSubtitle">數量</li>
          <li class="hiddenCartSubtitle">單價</li>
          <li class="hiddenCartSubtitle">小計</li>
        </ul>

        <ul class="cart">
          <input type="number" name="points" min="1" max="${listGet[i].stock}" value="${listGet[i].qty}" class="inputNum ${listGet[i].id} ${listGet[i].color.code} ${listGet[i].size}">
          <li>NT.${listGet[i].price}</li>
          <li>NT.${amountPrice}</li>
        </ul>

        <img class="removeCartImgHidden" src="images/cart-remove.png" alt="">
          
      </ul>
      `
  
  allItem += cartItem //put item into box
  totalAmount = i + 1 //cart title
  allItemPrice += amountPrice //all item price

  }//end of list get for

  container.innerHTML = allItem
  cartTotalNum.innerHTML = `購物車（${totalAmount})`
  beforePrice.innerHTML = allItemPrice
  afterPrice.innerHTML = allItemPrice + 65
  countCartAmount(listGet)
  
}//end of render function

//loading and get item

getItem()
renderCart()
getToken() 




//detect if input changed
let inputNode = document.querySelectorAll(".inputNum")

for (j = 0; j < inputNode.length; j++){
  inputNum = document.querySelectorAll(".inputNum")[j]
  //console.log(document.querySelectorAll(".inputNum")[j])

  inputNum.addEventListener('input', () => {


    //console.log(event.target.value)
    //console.log(event.target.classList)
    //console.log(event.target.parentNode.children[2])
    allItemPrice = 0


    for (i = 0; i < listGet.length; i++) {

      if (event.target.classList.contains(`${listGet[i].id}`) && event.target.classList.contains(`${listGet[i].size}`) && event.target.classList.contains(`${listGet[i].color.code}`))

        {
        listGet[i].qty = event.target.value
        
        event.target.parentNode.children[2].innerHTML = `NT.${listGet[i].price * listGet[i].qty}`

      }
      allItemPrice += listGet[i].price * listGet[i].qty
      console.log(allItemPrice)
      beforePrice.innerHTML = allItemPrice
      afterPrice.innerHTML = allItemPrice + 65

    }

    addItem(listGet)
    
  })//end of input event listener
}


let deleteBtnAll = document.querySelectorAll('.removeCartImgHidden')

for (i = 0; i < deleteBtnAll.length; i++){
  let deleteBtn = document.querySelectorAll('.removeCartImgHidden')[i]
  deleteBtn.addEventListener(('click'), () => {
    allItemPrice = 0
    
    //store changes in storage
    for (j = 0; j < listGet.length; j++){
      
      if (event.target.parentNode.children[0].innerText.includes(listGet[j].id) && event.target.parentNode.children[0].innerText.includes(listGet[j].color.name) && event.target.parentNode.children[0].innerText.includes(listGet[j].size))
      {
        //remove and renew storage
        listGet.splice(j, 1)
        console.log(listGet)
        addItem(listGet)
        totalAmount -= 1
      }

    }

    //remove item
    event.target.parentNode.remove()
    //count total spend
    for (k = 0; k < listGet.length;k++){
      allItemPrice += listGet[k].price * listGet[k].qty
    }
    beforePrice.innerHTML = allItemPrice
    afterPrice.innerHTML = allItemPrice + 65
    cartTotalNum.innerHTML = `購物車（${totalAmount})`
   

  })//event delete
}//for i 



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
  document.querySelector(".redAmount").innerHTML = cartAmount

}


/****** API *****/

TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox')

TPDirect.card.setup({
  fields: {
    number: {
      // css selector
      element: '#card-number',
      placeholder: '**** **** **** ****'
    },
    expirationDate: {
      // DOM object
      element: document.getElementById('card-expiration-date'),
      placeholder: 'MM / YY'
    },
    ccv: {
      element: '#card-ccv',
      placeholder: '後三碼'
    }
  },
  styles: {
    // Style all elements
    'input': {
      'color': 'gray'
    },
    // Styling ccv field
    'input.cvc': {
      'font-size': '18px'
    },
    // Styling expiration-date field
    'input.expiration-date': {
      'font-size': '18px'
    },
    // Styling card-number field
    'input.card-number': {
      'font-size': '18px'
    },
    // style focus state
    ':focus': {
      // 'color': 'black'
    },
    // style valid state
    '.valid': {
      'color': 'green'
    },
    // style invalid state
    '.invalid': {
      'color': 'red'
    },
    // Media queries
    // Note that these apply to the iframe, not the root window.
    '@media screen and (max-width: 400px)': {
      'input': {
        'color': 'orange'
      }
    }
  }
})



/***** received prime and send data to checkout API *****/



//check if checkbox checked more than one



document.querySelector('.cartInfoCheck').addEventListener("click", () => {
  console.log(event.target.value)
  console.log(document.querySelectorAll(".cartInfoCheck input")[0].value)

  for (i = 0; i < document.querySelectorAll(".cartInfoCheck input").length; i++){
    
    if (document.querySelectorAll(".cartInfoCheck input")[i].value !== event.target.value) {
      document.querySelectorAll(".cartInfoCheck input")[i].checked = false
    }

  }
  
  
})


/* default infor */
document.querySelector('.cartName').placeholder = `${JSON.parse(tokenAmount)[0].user.name}`;
document.querySelector('.cartEmail').placeholder = `${JSON.parse(tokenAmount)[0].user.email}`;



let memberData

document.querySelector('.payBtn').addEventListener('click', function (event) {

  //check the blank
  //get name
  let name = document.querySelector('.cartName').value
  let phone = document.querySelector('.cartPhone').value
  let address = document.querySelector('.cartAddress').value
  let email = document.querySelector('.cartEmail').value

//get time
  let time = ""

  for (i = 0; i < document.querySelectorAll('.cartCheckbox input').length; i++) {

    if (document.querySelectorAll('.cartCheckbox input')[i].checked) {



      time = document.querySelectorAll('.cartCheckbox input')[i].value
    }
  }

 

  if (name.length === 0 || phone.length === 0 || address.length === 0 || email.length === 0 || time === "") {
    alert('喔喔 :/ 請將資訊填寫完整')
    return
  }


  //Tap pay
  event.preventDefault()

  // 取得 TapPay Fields 的 status
  const tappayStatus = TPDirect.card.getTappayFieldsStatus()

  // 確認是否可以 getPrime
  if (tappayStatus.canGetPrime === false) {
    alert('刷卡資料有誤！請再輸入一次')
    return
  }

  let primeNum =""
  // Get prime
  TPDirect.card.getPrime((result) => {
    if (result.status !== 0) {
      alert('刷卡資料有誤！請再輸入一次')
      return
    }
    
    primeNum = result.card.prime
    console.log(primeNum)
   

    // send prime to your server, to pay with Pay by Prime API .
    // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api


    

    let checkoutData = ""
    let listData = []
    
    
    
    let frePrice = allItemPrice + 65

    //get member data
    memberData =

    {
      "prime": `${primeNum}`,
      "order": {
        "shipping": "delivery",
        "payment": "credit_card",
        "subtotal": `${allItemPrice}`,
        "freight": "65",
        "total": `${frePrice}`,
        "recipient": {
          "name": `${name}`,
          "phone": `${phone}`,
          "email": `${email}`,
          "address": `${address}`,
          "time": `${time}`
        }, "list": []

      }
    }


    //get product data
    for (i = 0; i < listGet.length; i++) {

      let item = {
        "id": `${listGet[i].id}`,
        "name": `${listGet[i].name}`,
        "price": `${listGet[i].price}`,
        "color": {
          "name": `${listGet[i].color.name}`,
          "code": `${listGet[i].color.code}`
        },
        "size": `${listGet[i].size}`,
        "qty": `${listGet[i].qty}`
      }

      memberData.order.list.push(item)
    }
    console.log(memberData)


    checkOutData(memberData)
  

  });//end of click btn func



  //post

  function checkOutData(memberData) {
    var req = new XMLHttpRequest();
    req.open('POST', 'https://api.appworks-school.tw/api/1.0/order/checkout', true);

    req.setRequestHeader('Content-Type', 'application/json');

    req.setRequestHeader('Authorization', `Bearer ${(tokenAmount)[0].access_token}`);
    

    req.send(JSON.stringify(memberData));

    req.onload = function () {
      console.log(JSON.parse(this.response).data.number)
      let number = JSON.parse(this.response).data.number

      window.location.assign(`./thankyou.html?tag=${number}`);
    }
  }




  })//end of get prime
 



/*~*/