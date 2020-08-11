let currentURL = window.location.href
let index = currentURL.indexOf('=')
let num = currentURL.slice(index+1)
console.log(num)


document.querySelector(".showOrder").innerHTML = `${num}`