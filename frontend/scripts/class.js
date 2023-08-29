
const main = document.querySelector("article");

let name = localStorage.getItem("userName");
if (name) {
	let n = document.querySelector("#user>span");
	n.innerHTML = name;
}

var allClasses = [];

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
search.addEventListener("change", (e) => {
	main.innerHTML = `<div class="lds-roller">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`;
	let name = e.target.value;
	fetch(`https://fit-india.onrender.com/class/trainerName?n=${name}`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.length > 0) {
				displayClasses(data);
			} else {
				displayError();
			}
		})
		.catch((error) => {
			console.log(error);
		});
});

getAllClasses();
function getAllClasses() {
	fetch(`https://fit-india.onrender.com/class/`)
		.then((response) => response.json())
		.then((data) => {
			console.log(data[0]);
			allClasses = data;
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
		let note = `${cls.classNote}`;
		maxLength = 50;
		if (note.length > maxLength) {
			note = note.substring(0, maxLength) + "...";
		}
		html += `
    <div id="class">
                <img src="${cls.imageUrl}" alt="${cls.className}">
                <h3>${className}</h3>
                <p>${cls.trainerName}</p>
                <p id="note">${note}</p>
                <p>${cls.classTime} ${cls.classDate}</p>
                <p>Fee ${cls.classFee}</p>
                <button onclick="bookNow('${cls._id}')">Book Now</button>
                <button onclick="viewDetails('${cls._id}')">View Details</button>
              </div>
            `;
	});
	main.innerHTML = html;
}

function displayError() {
	main.innerHTML = `<h1 id="error">No <br>Class <br>Available</h1>`;
}

let filters = {};
document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
	checkbox.addEventListener("change", (e) => {
		filters[checkbox.name] = checkbox.checked;
		main.innerHTML = `
        <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
        `;
		applyFilters();
	});
});

function applyFilters() {
	console.log(filters);
	let flag = false;
	for (let key in filters) {
		if (filters[key]) {
			flag = true;
		}
	}
	if (flag) {
		let filterClasses = allClasses.filter((cls) => {
			for (let key in filters) {
				if (filters[key] && cls.classStatus == key) {
					return cls;
				}
			}
		});
		console.log(filterClasses);
		displayClasses(filterClasses);
	} else {
		displayClasses(allClasses);
	}
}

let sort = document.getElementById("sort");

sort.addEventListener("change", (e) => {
	let value = sort.value;
	let data = [...allClasses];
	if (value == "") {
		displayClasses(allClasses);
	} else if (value == "asc") {
		data.sort((a, b) => {
			return a.classFee - b.classFee;
		});
		displayClasses(data);
	} else if (value == "desc") {
		data.sort((a, b) => {
			return b.classFee - a.classFee;
		});
		displayClasses(data);
	} else if (value == "review") {
		for (let i = data.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[data[i], data[j]] = [data[j], data[i]];
		}
		displayClasses(data);
	}
});

function viewDetails(id) {
	let url = "../pages/classPage.html?id=" + id;
	window.open(url);
}

function bookNow(id) {
	let url = "../pages/book.html?id=" + id;
	window.open(url);
}
