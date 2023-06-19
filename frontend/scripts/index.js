let sarr = [
  "https://www.fitnessfirst.net.in/sites/default/files/styles/style_1200x500/public/club1.jpg?itok=1WNoapWy",
  "https://www.stylist.co.uk/images/app/uploads/2020/07/31161953/how-to-choose-a-weight-gym-1680x880.jpg?w=1680&h=880&fit=max&auto=format%2Ccompress",
  "https://www.lakeshoresf.com/wp-content/uploads/2021/04/Kids-Fitness-Training-Lincoln-Park-Chicago-scaled.jpeg",
];

let name = localStorage.getItem("userName");
if (name) {
  let n = document.querySelector("#user>span");
  n.innerHTML = name;
}

let i = 1;
let simg = document.getElementById("container");
let img = document.createElement("img");
img.src = sarr[0];
simg.append(img);
const slider = () => {
  setInterval(() => {
    if (i == 3) {
      i = 0;
    }
    simg.innerHTML = null;
    let img = document.createElement("img");
    img.src = sarr[i];
    simg.append(img);
    i++;
  }, 4000);
};

slider();

let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");

btn1.onclick = () => {
  btn1.style.backgroundColor = "#d23d1b";
  simg.innerHTML = null;
  let img = document.createElement("img");
  img.src = sarr[0];
  simg.append(img);
  btn2.style.backgroundColor = "#999999";
  btn3.style.backgroundColor = "#999999";
};

btn2.onclick = () => {
  btn2.style.backgroundColor = "#d23d1b";
  simg.innerHTML = null;
  let img = document.createElement("img");
  img.src = sarr[1];
  simg.append(img);
  btn1.style.backgroundColor = "#999999";
  btn3.style.backgroundColor = "#999999";
};

btn3.onclick = () => {
  btn3.style.backgroundColor = "#d23d1b";
  simg.innerHTML = null;
  let img = document.createElement("img");
  img.src = sarr[2];
  simg.append(img);
  btn2.style.backgroundColor = "#999999";
  btn1.style.backgroundColor = "#999999";
};

let arr = [
  "https://www.hdwallpaper.nu/wp-content/uploads/2017/02/fitness-17.jpg",
  "https://www.hdwallpaper.nu/wp-content/uploads/2017/02/fitness-16.jpg",
  "https://www.hdwallpaper.nu/wp-content/uploads/2017/02/fitness-20.jpg",
  "http://www.pixelstalk.net/wp-content/uploads/2016/06/Free-Desktop-Fitness-Wallpapers-Images.jpg",
  "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg",
];
let slide = document.getElementById("slide");
let start = (im) => {
  slide.innerHTML = null;
  let ima = document.createElement("img");
  ima.src = im;
  slide.append(ima);
};

let first = document.getElementById("first");
first.onclick = () => {
  let im = arr[0];
  start(im);
};

let second = document.getElementById("second");
second.onclick = () => {
  let im = arr[1];
  start(im);
};

let third = document.getElementById("third");
third.onclick = () => {
  let im = arr[2];
  start(im);
};

let fourth = document.getElementById("fourth");
fourth.onclick = () => {
  let im = arr[3];
  start(im);
};

let fifth = document.getElementById("fifth");
fifth.onclick = () => {
  let im = arr[4];
  start(im);
};

let user = document.getElementById("user");

user.onclick = () => {
  window.location.href = "./pages/login.html";
};

const city = document.querySelector("#location>span");

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
