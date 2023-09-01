const host = "https://fit-india.onrender.com";

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");

const city = document.querySelector("#location>span");

let userLocation = localStorage.getItem("userLocation") || null;

if (userLocation) {
	city.innerHTML = userLocation;
} else {
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

						localStorage.setItem(
							"userLocation",
							data[0].name.toUpperCase()
						);
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

form.addEventListener("submit", (e) => {
	e.preventDefault();

	loginCheck();
});

function loginCheck() {
	if (email.value && password.value) {
		login();
	} else {
		alert("Please enter all required fields");
	}
}
async function login() {
	let user = {
		email: email.value,
		password: password.value,
	};
	console.log(user);

	try {
		const response = await fetch(`${host}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		const data = await response.json();
		alert(data.message);
		console.log(data.user);
		localStorage.setItem("userName", data.user.name);
		window.location.href = "../index.html";
	} catch (error) {
		alert("Please enter correct password");
	}
}

// reponsive navbar
let burgur_count = 0;
let hem_burgur = document.getElementById("hem_burgur");
let burgur_menu = document.getElementById("burgur_menu");

hem_burgur.onclick = () => {
	if (burgur_count % 2 == 0) {
		burgur_menu.style.display = "block";
		burgur_count++;
	} else {
		burgur_menu.style.display = "none";
		burgur_count++;
	}
};
