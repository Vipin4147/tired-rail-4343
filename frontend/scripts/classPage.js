const city = document.querySelector("#location>span");
const main = document.querySelector("main");
getLocation();
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
const id = urlParams.get("id") || 1;
if (id) {
  getClass(id);
} else {
  window.location.href = "../pages/class.html";
}
function getClass(id) {
  fetch(`https://weak-teal-lemur-slip.cyclic.app/class/classId/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      display(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function display(data) {
  document.title = `${data.className} | FitIndia`;
  let html = "";
  html += `
    <div id="left">
    <img src="${data.imageUrl}" alt="" id="displayImage">
    <div id="images">
      <img src="${data.imageUrl}" alt="" onmouseover="hover(this)" onclick="hover(this)">
      <img src="https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_640.jpg" alt="" onmouseover="hover(this)" onclick="hover(this)">
      <img src="https://cdn.pixabay.com/photo/2016/11/18/15/05/beach-1835213_640.jpg" alt="" onmouseover="hover(this)" onclick="hover(this)">
      <img src="https://cdn.pixabay.com/photo/2022/06/27/08/37/monk-7287041_640.jpg" alt="" onmouseover="hover(this)" onclick="hover(this)">
    </div>
    </div>
    <div id="right">
      <h1>${data.className}</h1>
      <h3>By ${data.trainerName}</h3>
      <p>Time: ${data.classTime} ${data.classDate}</p>
      <p>Class description: <br>&nbsp &nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  <span>${data.classDiscription}</span></p>
      <p>Important Note: <br>&nbsp &nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span>${data.classNote}</span></p>
      <h3>Fee: ${data.classFee}</h3>
      <button  onclick="book('${data._id}')">Book Now</button>
    </div>
  `;
  main.innerHTML = html;
}
function hover(event) {
  let imageUrl = event.src;
  document.getElementById("displayImage").src = imageUrl;
}

function book(id) {
  // window.location.href = `../images/book/${id}`
  let url = "../pages/book.html?id=" + id;
  window.location.href = url;
}
