// c616244f77137d19396f22038316c302
// https://api.openweathermap.org/data/2.5/weather?q=${HERE_PUT_THE_CITY_NAME}&units=metric&appid=${HERE_PUT_YOUR_API_KEY}

const inputValue = document.getElementById("city-name");
const searchIcon = document.querySelector(".search");
const weatherContainer = document.querySelector(".weather-container");
let city;
let key = `c616244f77137d19396f22038316c302`;
// let apiContent;
AddWeatherDetails = (img, deg, text, Humidity, speed) => {
  const Box = document.createElement("div");
  Box.classList = "weather-state";
  Box.innerHTML = `
    <div class="image"><img src="${img}" alt="" /></div>
    <div class="temperature-status">
    <p class="degree">${deg}</p>
    <p class="status-text">${text}</p>
    <div class="weather-info">
    <div class="humidity box">
    <span class="icon"><i class="fa-solid fa-water"></i></span>
    <div class="text">
    <span class="precentage">${Humidity}%</span>
    <span>Humidity</span>
    </div>
    </div>
    <div class="wind-speed box">
    <span class="icon"><i class="fa-solid fa-wind"></i></span>
    <div class="text">
          <span class="precentage">${speed} Km/h</span>
          <span>Wind Speed</span>
          </div>
          </div>
          </div>
          </div>`;
  weatherContainer.appendChild(Box);
};

AddErorrBox = () => {
  const erorrBox = document.createElement("div");
  erorrBox.classList.add("erorr");
  erorrBox.innerHTML = `
              <div class="image"><img src="images/404.png" alt=""></div>
              <p class="warning-text">Oops! invalid location :/</p>
            `;
  weatherContainer.appendChild(erorrBox);
};

async function fetchApi() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    );
    const data = await response.json();
    if (data.cod === 200) {
      let src;
      switch (data.weather[0].main) {
        case "Clear":
          src = "images/clear.png";
          break;
        case "Clouds":
          src = "images/cloud.png";
          break;
        case "Rain":
          src = "images/rain.png";
          break;
        case "Snow":
          src = "images/snow.png";
          break;
        case "Mist":
          src = "images/mist.png";
          break;
      }
      AddWeatherDetails(
        src,
        data.main.temp,
        data.weather[0].main,
        data.main.humidity,
        data.wind.speed
      );
    }
    if (data.cod !== 200) {
      AddErorrBox();
    }
  } catch (error) {
    console.log(error.message);
  }
}

searchIcon.addEventListener("click", () => {
  if (document.querySelector(".erorr")) {
    document.querySelector(".erorr").remove();
  }
  if (document.querySelector(".weather-state")) {
    document.querySelector(".weather-state").remove();
  }
  city = inputValue.value;
  fetchApi();
});
