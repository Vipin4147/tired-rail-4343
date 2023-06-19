const city = document.querySelector("#location>span");
const parent = document.querySelector("section");

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

function displayForm() {
  let popup = document.getElementById("popup");
  popup.classList.add("openpopup");

  popup.innerHTML = `
    <div >
      <label for="">Thambnail Image Url</label>
      <input type="url" placeholder="Thambnail Image Url" id="imageUrl" value="" required>
      <label for="">Class Name</label>
      <input type="text" placeholder="Class Name" id="className" value="" required>
      <label for="">Trainer Name</label>
      <input type="text" placeholder="Trainer Name" id="trainerName" value="" required>
      <label for="">Discription</label>
      <input type="text" placeholder="Discription" id="classDiscription" value="" required>
      <label for="">Important Note(if any)</label>
      <input type="text" placeholder="Important Note(if any)" id="classNote" value="">
      <label for="">Class Status</label>
      <select name="" id="classStatus">
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Personal">Personal</option>
      </select>
      <label for="">Date & Time</label>
      <div class="flex">
        <input type="date" id="classDate" value=""/>
        <select name="" id="time">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select name="" id="ampm">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <label for=""> Fee</label>
      <input type="number" placeholder=" Fee" id="classFee" value="" required>
      <label for="">Total slot</label>
      <input type="number" placeholder="Total slot" id="totalSlots" value="" required>
      <button id="add" onclick="addClass()">Add Class</button>
    </div>
  <ion-icon name="close-outline" id="cancel" onclick="closePopup()"></ion-icon>
    `;
}

const closePopup = () => {
  document.getElementById("popup").classList.remove("openpopup");
};

let main = document.querySelector("article");

const addClass = () => {
  console.log("addClass");

  const imageUrl = document.getElementById("imageUrl").value;
  const className = document.getElementById("className").value;
  const trainerName = document.getElementById("trainerName").value;
  const classDiscription = document.getElementById("classDiscription").value;
  const classNote = document.getElementById("classNote").value;
  const classStatus = document.getElementById("classStatus").value;
  const classDate = document.getElementById("classDate").value;
  const time = document.getElementById("time").value;
  const ampm = document.getElementById("ampm").value;
  const classTime = `${time}:00 ${ampm}`;
  const classFee = document.getElementById("classFee").value;
  const totalSlots = document.getElementById("totalSlots").value;

  let newClass = {
    imageUrl,
    className,
    trainerName,
    classDiscription,
    classNote,
    classStatus,
    classDate,
    classTime,
    classFee,
    totalSlots,
  };
  try {
    fetch("https://weak-teal-lemur-slip.cyclic.app/class/addClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClass),
    }).then((response) => {
      console.log(response);
      getClasses(name);
      alert("Class successfully added");
      closePopup();
    });
  } catch (error) {
    console.error(error);
  }
};

function displayEditForm(data) {
  let popup = document.getElementById("popup");
  popup.classList.add("openpopup");

  popup.innerHTML = `
    <div >
      <label for="">Thambnail Image Url</label>
      <input type="url" placeholder="Thambnail Image Url" id="imageUrl" value="" required>
      <label for="">Class Name</label>
      <input type="text" placeholder="Class Name" id="className" value="" required>
      <label for="">Trainer Name</label>
      <input type="text" placeholder="Trainer Name" id="trainerName" value="" required>
      <label for="">Discription</label>
      <input type="text" placeholder="Discription" id="classDiscription" value="" required>
      <label for="">Important Note(if any)</label>
      <input type="text" placeholder="Important Note(if any)" id="classNote" value="">
      <label for="">Class Status</label>
      <select name="" id="classStatus">
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Personal">Personal</option>
      </select>
      <label for="">Date & Time</label>
      <div class="flex">
        <input type="date" id="classDate" value=""/>
        <select name="" id="time">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select name="" id="ampm">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <label for=""> Fee</label>
      <input type="number" placeholder=" Fee" id="classFee" value="" required>
      <label for="">Total slot</label>
      <input type="number" placeholder="Total slot" id="totalSlots" value="" required>
      <button id="add" onclick="updateClass()">Save Changes</button>
    </div>
  <ion-icon name="close-outline" id="cancel" onclick="closePopup()"></ion-icon>
    `;
}

function getClasses(name) {
  fetch(`https://weak-teal-lemur-slip.cyclic.app/class/trainerName?n=${name}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      displayClasses(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
let name = "Ashik";
getClasses(name);

function displayClasses(data) {
  document.getElementById("total").innerHTML = data.length;
  let html = "";
  data.forEach((cls) => {
    html += `<div id="class">
    <div id="images">
      <img src="${cls.imageUrl}" alt="" />
    </div>
    <div id="details">
      <h1>${cls.className}</h1>
      <h3>${cls.trainerName}</h3>
      <p>${cls.classNote}</p>
      <p>${cls.classTime} ${cls.classDate}</p>
      <p>Fee ${cls.classFee}</p>
    </div>
    <div id="edit">
      <p class="public">${cls.classStatus}</p>
      <p id="slot">
        ${cls.totalSlots - 1} slot <br />
        left
      </p>
      <button>Edit Class</button>
      <button>Delete Class</button>
    </div>
  </div>`;
  });
  main.innerHTML = html;
}
