document.addEventListener("DOMContentLoaded", () => {
  let displayCity = document.querySelector("#displayCity");
  let cityName = document.querySelector("#cityName");
  let SubmitButton = document.querySelector("#submit_button");
  let temp = document.querySelector(".temp");
  let feels_like = document.querySelector("#feels_like");
  let humidity = document.querySelector(".humidity");
  let min_temp = document.querySelector("#min_temp");
  let max_temp = document.querySelector("#max_temp");
  let wind_speed = document.querySelector(".wind_speed");
  let wind_degrees = document.querySelector("#wind_degrees");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let rain_update = document.querySelector(".rain_update");
  let Small_temp = document.querySelector(".Small_temp");
  let year = document.querySelector(".year");

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '10bfb57844mshcd9aaaf4650bda5p1794b2jsn4724d2f11313',
      'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
    }
  };

  function checkRain(humidity) {
    if (humidity >= 70) {
      return "<h1>🌧️⛈️</h1> High chance of rain and thunderstorms.";
    } else if (humidity >= 50) {
      return "<h1>🌦️</h1> Moderate chance of rain with some clouds.";
    } else {
      return "<h1>☀️</h1> Clear skies, low chance of rain.";
    }
  }

  function covertingTime(time) {
    const unixTimestamp = time;
    const timestampInMilliseconds = unixTimestamp * 1000;
    const sunriseDate = new Date(timestampInMilliseconds);
    const hours = sunriseDate.getHours();
    const minutes = sunriseDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }


  function update_year() {
    let time = new Date();
    year.innerHTML = time.getFullYear();
  }
  

  update_year();


  const getWeatherMethod = (cityName) => {
    displayCity.innerHTML = cityName;
    fetch(`https://dark-sky.p.rapidapi.com/v1/weather?city=${cityName}`, options)
      .then(response => response.json())
      .then((result) => {
        temp.innerHTML = result.temp;
        Small_temp.innerHTML = result.temp;
        humidity.innerHTML = result.humidity;
        rain_update.innerHTML = checkRain(result.humidity);
        min_temp.innerHTML = result.min_temp;
        wind_degrees.innerHTML = result.wind_degrees;
        max_temp.innerHTML = result.max_temp;
        wind_speed.innerHTML = result.wind_speed;
        sunrise.innerHTML = covertingTime(result.sunrise);
        sunset.innerHTML = covertingTime(result.sunset);

        console.log(humidity.innerHTML);
        console.log(rain_update.innerHTML);
      })
      .catch(err => console.error(err));
  }

  SubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    getWeatherMethod(cityName.value);
  });

  getWeatherMethod("jaipur");
});
