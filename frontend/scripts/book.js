const city = document.querySelector("#location>span");
const main = document.querySelector("main");
let classFee = 1000
let currOffer = '0%'
var offers ={
  "FIT50":"50%",
  "MASAI20":"20%",
  "GET10":"10%",
}
// getLocation();
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

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)
if(id){
    // getClass(id)
}else{
    window.location.href = "../pages/class.html"
}
function getClass(id) {
  fetch(`http://localhost:3030/class/classId/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      display(data)
    })
    .catch((error) => {
      console.log(error);
    });
}
function display(data) {
    classFee = data.classFee
  let html =''
  html += `
    <div id="left">
    <img src="${data.imageUrl}" alt="" id="displayImage">
    </div>
    <div id="right">
      <h1>${data.className}</h1>
      <h3>By ${data.trainerName}</h3>
      <p>Time: ${data.classTime} ${data.classDate}</p>
      <p>Important Note: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span>${data.classNote}</span></p>
    </div>
  `
//   main.innerHTML=html
}
  function hover(event) {
    let imageUrl = event.src
    document.getElementById('displayImage').src=imageUrl
  }

  function book(id){
    window.location.href = `../images/book/${id}`
  }

  const checkboxes = document.querySelectorAll('input[name="paymentMethod"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    checkboxes.forEach((otherCheckbox) => {
      if (otherCheckbox !== event.target) {
        otherCheckbox.checked = false;
      }
    });
  });
});


let btn = document.querySelector("#code")
btn.addEventListener('click', (event) => {
  console.log(event.target.textContent)
  let span = document.querySelector("#right>div:nth-child(1)>span")
  if(event.target.textContent == 'Check'){
    let code = document.querySelector('#codeInput').value
    let offer = offers[code] 
    currOffer = offer
    console.log(offer);
    if(offer){
      event.target.textContent = "Apply offer"
      span.innerHTML = `Elegible for ${offer} off in this booking`
    }
  }else{
    let off = currOffer.split("%")
    console.log(off)
    classFee=+classFee*(+off[0]/100)
    console.log(classFee);
    document.querySelector("#right>div:nth-child(1)>h1").innerHTML=`Total Fee : ${classFee}`
  }
})