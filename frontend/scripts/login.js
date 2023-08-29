let user = JSON.parse(localStorage.getItem("user"));

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!user) {
    window.location.href = "../pages/signup.html";
  } else if (user.password === password.value && user.email === email.value) {
    localStorage.setItem("userName", user.name);

    window.location.href = "../index.html";
  } else {
    alert("Please enter correct password");
  }
});

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

            console.log(city.innerText);
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
