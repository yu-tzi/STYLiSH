let userName
let userEmail
let userPic
let token
let nowStatus







/* Facebook SDK */

window.fbAsyncInit = function () {
    FB.init({
        appId: '613004069344496',
        cookie: true,
        xfbml: true,
        version: 'v7.0'
    });

    FB.AppEvents.logPageView();

    /* get login response */
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

    document.querySelector(".profileLog").addEventListener("click", function logout() {

        alert('redirecting...');
        FB.logout(function () {
            window.location.href = '/Front-End-Class-Batch11/students/kiki/'
            let blank = []
            localStorage.setItem('profileToken', JSON.stringify(blank))

        });

    })

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().  
    console.log('statusChangeCallback');
    console.log(response); // The current login status of the person.
    if (response.status === 'connected') { // Logged into your webpage and Facebook.
        token = response.authResponse.accessToken
        console.log(`token is ${token}`)
        testAPI();
    } else { // Not logged into your webpage or we are unable to tell.
        nowStatus = false;
    }
}


function checkLoginState() { // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) { // See the onlogin handler
        statusChangeCallback(response);
    });
};


function testAPI() {
    FB.api('/me?fields=name,email,picture', function (response) {
        if (response && !response.error) {
            buildProfile(response)
        }



    })
}

function buildProfile(response) {

    console.log(response)
    console.log(token)
    signIn(token)

    
}



function logIn() {
        FB.login(function (response) {
            if (response.status === 'connected') {
                FB.getLoginStatus(function (response) {

                    console.log("YOLO");
                    statusChangeCallback(response);
                    window.location.href = 'https://yu-tzi.github.io/Front-End-Class-Batch11/students/kiki/profile.html' 
                
                });

                /*  window.location.href = '/profile.html' 
     
                 document.querySelector(".profileName").innerHTML = userName
                 
                 document.querySelector(".profileEmail").innerHTML = userEmail
                 console.log(userEmail)    
                 document.querySelector(".profileAvatar").innerHTML = `<img src="${userPic}" class="profileAvatarImg">` */

            }
        }, { scope: 'public_profile,email' });
    }





/*post*/
let tokenData =[]


function signIn(token) {
    console.log(token)
    var req = new XMLHttpRequest();
    req.open('POST', 'https://api.appworks-school.tw/api/1.0/user/signin', true);

    req.setRequestHeader('Content-Type', 'application/json');

    let allData = ""
    
    allData = 
    {
        "provider": "facebook",
        "access_token": `${token}`
    }


    

    console.log(allData)
    req.send(JSON.stringify(allData));

    req.onload = function () {
        console.log(this.response)
        console.log(JSON.parse(this.response).data.user.name)
        console.log(JSON.parse(this.response).data.user.email)
        console.log(JSON.parse(this.response).data.user.picture)

      
        tokenData.push(JSON.parse(this.response).data)
        
        function setToken() {
            localStorage.setItem('profileToken', JSON.stringify(tokenData))
        }
        console.log(tokenData)
        setToken()

        userName = JSON.parse(this.response).data.user.name
        userEmail = JSON.parse(this.response).data.user.email
        userPic = JSON.parse(this.response).data.user.picture

        if (window.location.href.includes("profile.html")){
            console.log('yaaa')
            document.querySelector(".profileName").innerHTML = userName

            document.querySelector(".profileEmail").innerHTML = userEmail
            console.log(userEmail)
            document.querySelector(".profileAvatar").innerHTML = `<img src="${userPic}" class="profileAvatarImg">`
        }

    } 
}






