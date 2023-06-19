const city = document.querySelector("#location>span");
const left = document.querySelector("#left");
let classFee = 1000;
let currOffer = "0%";
var offers = {
  FIT50: "50%",
  MASAI20: "20%",
  GET10: "10%",
};

let name = localStorage.getItem("userName");
if (name) {
  let n = document.querySelector("#user>span");
  n.innerHTML = name;
}

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
const id = urlParams.get("id");
console.log(id);
if (id) {
  getClass(id);
} else {
  window.location.href = "../pages/class.html";
}
async function getClass(id) {
  await fetch(`https://weak-teal-lemur-slip.cyclic.app/class/classId/${id}`)
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
  classFee = data.classFee;
  let html = "";
  html += `
    <div>
        <img src="${data.imageUrl}" alt="">
        <div>
          <h1>${data.className}</h1>
        <h3>By ${data.trainerName}</h3>
        </div>
    </div>
    <p>Time: ${data.classTime} ${data.classDate}</p>
    <p><span>Important Note:</span>
    ${data.classNote}</p>
  `;
  document.querySelector(
    "#right>div:nth-child(1)>h1"
  ).innerHTML = `Total Fee : ${classFee}`;
  left.innerHTML = html;
}

const checkboxes = document.querySelectorAll('input[name="paymentMethod"]');
console.log(checkboxes);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    checkboxes.forEach((otherCheckbox) => {
      if (otherCheckbox !== event.target) {
        otherCheckbox.checked = false;
      }
    });
  });
});

let btn = document.querySelector("#code");
btn.addEventListener("click", (event) => {
  console.log(event.target.innerText);
  let span = document.querySelector("#right>div:nth-child(1)>span");
  if (event.target.innerText == "Check") {
    let code = document.querySelector("#codeInput").value;
    let offer = offers[code];
    currOffer = offer;
    console.log(offer);
    if (offer) {
      event.target.textContent = "Apply offer";
      span.innerHTML = `Elegible for ${offer} off in this booking`;
      span.style.backgroundColor = "#30ff1d";
      span.style.visibility = "visible";
    } else {
      span.innerHTML = `Invalid offer code: ${code}`;
      span.style.backgroundColor = "red";
      span.style.visibility = "visible";
    }
  } else {
    // event.target.textContent = "Offer Applied";
    let off = currOffer.split("%");
    console.log(off);
    classFee = +classFee * (+off[0] / 100);
    console.log(classFee);
    document.querySelector(
      "#right>div:nth-child(1)>h1"
    ).innerHTML = `Total Fee : ${classFee}`;
  }
});

$(".input-cart-number").on("keyup change", function () {
  $t = $(this);

  if ($t.val().length > 3) {
    $t.next().focus();
  }

  var card_number = "";
  $(".input-cart-number").each(function () {
    card_number += $(this).val() + " ";
    if ($(this).val().length == 4) {
      $(this).next().focus();
    }
  });

  $(".credit-card-box .number").html(card_number);
});

$("#card-holder").on("keyup change", function () {
  $t = $(this);
  $(".credit-card-box .card-holder div").html($t.val());
});

$("#card-holder").on("keyup change", function () {
  $t = $(this);
  $(".credit-card-box .card-holder div").html($t.val());
});

$("#card-expiration-month, #card-expiration-year").change(function () {
  m = $("#card-expiration-month option").index(
    $("#card-expiration-month option:selected")
  );
  m = m < 10 ? "0" + m : m;
  y = $("#card-expiration-year").val().substr(2, 2);
  $(".card-expiration-date div").html(m + "/" + y);
});

$("#card-ccv")
  .on("focus", function () {
    $(".credit-card-box").addClass("hover");
  })
  .on("blur", function () {
    $(".credit-card-box").removeClass("hover");
  })
  .on("keyup change", function () {
    $(".ccv div").html($(this).val());
  });

/*--------------------
CodePen Tile Preview
--------------------*/
setTimeout(function () {
  $("#card-ccv")
    .focus()
    .delay(1000)
    .queue(function () {
      $(this).blur().dequeue();
    });
}, 500);

let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let flag = true;
  var result = confirm("Are you sure you want to proceed?");
  if (result && flag) {
    alert("You have successfully booked your slot");
    window.location.href = "../index.html";
  } else {
    alert("Please enter all informations");
  }
});
