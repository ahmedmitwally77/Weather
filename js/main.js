//* Variables
let inputLocation = document.querySelector(".location-input");
let mainBox = document.querySelector(".main-weather");
let secondBoxes = document.querySelectorAll(".second-weather");

let locationName = mainBox.querySelector(".weather-city");
let dayInfo = mainBox.querySelector(".day-info");
let monthInfo = mainBox.querySelector(".month-info");
let icon = mainBox.querySelector(".weather-img");
let temp = mainBox.querySelector(".weather-deg");
let iconStatus = mainBox.querySelector(".weather-status");
let humidity = mainBox.querySelector(".span1 span");
let wind_mph = mainBox.querySelector(".span2 span");
let wind_dir = mainBox.querySelector(".span3 span");

//* functions

async function getData(land) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=fd20b4e079884ff496380228242009&q=${land}&days=3`
  );
  let data = await response.json();
  return data;
}

function fullDataInMain(data) {  
  let date=new Date();
  dayInfo.textContent = date.toLocaleDateString("en-US", { weekday: "long" });
  monthInfo.textContent =`${date.getDate() } ${date.toLocaleDateString("en-US", { month:"long"})}`;  
  locationName.textContent = data.location.name;
  temp.textContent = `${data.current.temp_c}°C`;
  icon.setAttribute("src", `https:${data.current.condition.icon}`);
  iconStatus.textContent = data.current.condition.text;
  humidity.textContent = ` ${data.current.humidity}%`;
  wind_mph.textContent = `${data.current.wind_mph} km/h`;
  if (data.current.wind_dir.includes("N") || data.current.wind_dir == "N") {
    wind_dir.textContent = "North";
  }
  else if (data.current.wind_dir.includes("S") || data.current.wind_dir == "S") {
    wind_dir.textContent = "South";
  }
  else if (data.current.wind_dir.includes("E") || data.current.wind_dir == "E") {
    wind_dir.textContent = "East";
  }
  else if (data.current.wind_dir.includes("W") || data.current.wind_dir == "W") {
    wind_dir.textContent = "West";
  }
}

function fullDataInNextDays(data) {
  let Days = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    secondBoxes[i].querySelector(".weather-date").textContent = new Date(Days[i+1].date).toLocaleDateString("en-US", { weekday: "long" });
    secondBoxes[i].querySelector(".weather-img").setAttribute("src",`https:${Days[i + 1].day.condition.icon}`);
    secondBoxes[i].querySelector(".weather-deg").textContent = `${Days[i + 1].day.maxtemp_c}°C`;
    secondBoxes[i].querySelector(".weather-deg2").textContent = `${Days[i + 1].day.mintemp_c}°C`;
    secondBoxes[i].querySelector(".weather-status").textContent =Days[i + 1].day.condition.text;
  }
}

async function getStart(inp) {
  let data = await getData(inp);
  if(!data.error){
  fullDataInMain(data);
  fullDataInNextDays(data);
  }
}

getStart("cairo"); // default when the page loads

//* events

inputLocation.addEventListener("input", function (e) {
  getStart(e.target.value);
});

inputLocation.addEventListener("click", function (e) {
  getStart(e.target.value);
});



