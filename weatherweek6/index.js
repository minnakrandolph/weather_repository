//toggle for dark/ light mode <i> (for later)

// F° and C° temperatures (apply to
//<h1> span=class"C" and "F")

//1) display current date and time (<h3> inner.HTML)
function formatDate(timestamp) {
    let now = new Date(timestamp);
    let h3 = document.querySelector("h3");
    let date = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let year = now.getFullYear();
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[now.getDay()];
  
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let month = months[now.getMonth()];
    h3.innerHTML = `${day}, ${month} ${date}, ${year}, ${hour}:${minutes}`;
  }
  //formatDate(newDate());
  
  //(2)search bar to display the current city <h4> as
  // <h5> to display the new city
  
  function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    //h5.innerHTML = `${city}`;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function searchCity(city) {
    let apiKey = "2ffdfb8d8d8b00d2858bb969032d4f11";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "2ffdfb8d8d8b00d2858bb969032d4f11";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  //make an api call, display city name and temperature
  //get api key , get the URL
  //we want to allow the user to search any city
  
  //In your project, when a user searches for a city (example: New York),
  // it should display the name of the city on the result page and the current temperature of the city.
  //Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.
  // Bonus point:
  //Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
  //formatDate(newDate());
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  searchCity("New York");