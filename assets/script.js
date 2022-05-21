var Api = "6ac18e94972e102fa3ca3a7dc60371b5";
var userInput = document.getElementById("userForm");
//template literals
renderLocal();

function getCurrent(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Api}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var previous = JSON.parse(localStorage.getItem("weatherUser")) || [];
      if (previous.indexOf(cityName) === -1) {
        previous.push(cityName);
        localStorage.setItem("weatherUser", JSON.stringify(previous));
        renderLocal();
      }
      getOneCall(cityName, lat, lon);
    });
}

function getOneCall(cityName, lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${Api}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function renderLocal() {
  var previous = JSON.parse(localStorage.getItem("weatherUser")) || [];
  let element = "Previous Searches";
  for (let i = 0; i < previous.length; i++) {
    element += `<li><button> ${previous[i]}</button></li>`; // element = element + previous[i]
  }
  document.getElementById("side").innerHTML = element;
}

userInput.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityName = document.getElementById("userInput").value;
  getCurrent(cityName);
});
