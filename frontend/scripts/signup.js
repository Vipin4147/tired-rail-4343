const host = "https://fit-india.onrender.com"
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");


const city = document.querySelector("#location>span");

let userLocation = localStorage.getItem("userLocation") || null;

if(userLocation){
  city.innerHTML = userLocation
}else{
  getLocation();
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var geocodingAPI =
          "https://api.openweathermap.org/geo/1.0/reverse?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&limit=1&appid=8b908a8f4e3018596a0c6ea121b4bd30";

        fetch(geocodingAPI)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            city.innerHTML = data[0].name.toUpperCase();

            localStorage.setItem("userLocation", data[0].name.toUpperCase())
            console.log(data);
          })
          .catch(function (error) {
            console.log("Error:", error);
          });
      },
      function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      }
    );
  } else {
    console.log("Geolocation is not supported.");
  }
}



const form = document.querySelector("form");

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    signupCheck()
})

function signupCheck() {
    if (
        name.value &&
        email.value &&
        password.value
    ) {
        signUp();
    } else {
        alert("Please enter all required fields");
    }
}
async function signUp() {
    let user = {
        name:name.value,
        email:email.value,
        password:password.value
    }
    console.log(user);

    try {
        const response = await fetch(`${host}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        

        const data = await response.json();
        console.log(data);
        alert(data.message);
        window.location.href = "../pages/login.html"
    } catch (error) {
        alert(error.message);
    }
}