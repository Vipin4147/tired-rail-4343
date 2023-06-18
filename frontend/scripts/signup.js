

let form =document.getElementById("signup")
let button=document.getElementById("signup-login-button")
//signup data
button.addEventListener("click",(e)=>{
    e.preventDefault();
    
    let formdata={
        name:form.name.value,
        email:form.email.value,
        password:form.password.value,
    //    phone:form.phone.value,
    }
    
    fetch("https://localhost:1111/signup",{
        method:"POST",
       headers:{
        'Content-type':'Application/json'
       },
       body:
        JSON.stringify(formdata)
    }).then((res)=>res.json()).then((res)=>{alert(res.msg),window.location.href="../pages/login.html"})
    .catch((err)=>alert(err))
     
    
    })




// =============google===============

// document.querySelector("#social-signin google").addEventListener("click",async()=>{
//     let data = await fetch("http://localhost:1112/auth/google")
// })