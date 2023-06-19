
let user = JSON.parse(localStorage.getItem("user"))

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(!user){
        window.location.href = "../pages/signup.html"
    }
    else
    if(user.password === password.value && user.email === email.value){
        localStorage.setItem("userName",user.name)
        
        window.location.href = "../index.html"
    }else{
        alert("Please enter correct password")
    }
})