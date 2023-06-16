let sarr = [
  "https://www.fitnessfirst.net.in/sites/default/files/styles/style_1200x500/public/club1.jpg?itok=1WNoapWy",
  "https://www.stylist.co.uk/images/app/uploads/2020/07/31161953/how-to-choose-a-weight-gym-1680x880.jpg?w=1680&h=880&fit=max&auto=format%2Ccompress",
  "https://www.lakeshoresf.com/wp-content/uploads/2021/04/Kids-Fitness-Training-Lincoln-Park-Chicago-scaled.jpeg",
];

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
