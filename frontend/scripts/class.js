const city = document.querySelector("#location>span");
const main = document.querySelector("article");
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

function searchToggle(obj, evt) {
  var container = $(obj).closest(".search-wrapper");
  if (!container.hasClass("active")) {
    container.addClass("active");
    evt.preventDefault();
  } else if (
    container.hasClass("active") &&
    $(obj).closest(".input-holder").length == 0
  ) {
    container.removeClass("active");
    container.find(".search-input").val("");
  }
}

let search = document.querySelector(".search-input");
search.addEventListener("change", () => {
  console.log("adlfjk");
});

getAllClasses();
function getAllClasses() {
  fetch(`http://localhost:3030/class/`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      displayClasses(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayClasses(data) {
  let html = "";
  data.forEach((cls) => {
    let className = cls.className;
    let maxLength = 17;
    if (className.length > maxLength) {
      className = className.substring(0, maxLength) + "...";
    }
    html += `
    <div id="class">
                <img src="${cls.imageUrl}" alt="${cls.className}">
                <h3>${className}</h3>
                <p>${cls.trainerName}</p>
                <p>${cls.classTime} ${cls.classDate}</p>
                <p>Fee ${cls.classFee}</p>
                <button>Book Now</button>
                <button>View Details</button>
              </div>
            `;
  });
  main.innerHTML = html;
}
