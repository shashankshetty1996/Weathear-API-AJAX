let YOURAPPLICATION = (function(ajax) {
  // Browser Location
  navigator.geolocation.getCurrentPosition(success, error);

  // Based on the type return URL based on position sent
  function getURL(position) {
    if (typeof position === "string") {
      return `http://api.openweathermap.org/data/2.5/weather?q=${position}&appid=ccb7a356a2bf2fa6d99bf8c4ac2b373a&units=metric`;
    } else {
      return `http://api.openweathermap.org/data/2.5/weather?lat=${
        position.coords.latitude
      }&lon=${
        position.coords.longitude
      }&appid=ccb7a356a2bf2fa6d99bf8c4ac2b373a&units=metric`;
    }
  }

  // Display to the screen
  function render(data) {
    let value = {
      name: data.name,
      type: data.weather[0].main,
      temp: data.main.temp,
      pressure: data.main.pressure,
      humidity: data.main.humidity
    };
    console.log(value);

    // Target Elements
    document.querySelector("#title").innerHTML += value.name;
    let list = document.querySelectorAll("#result ul li");
    list[0].innerHTML += value.type;
    list[1].innerHTML += value.temp;
    list[2].innerHTML += value.pressure;
    list[3].innerHTML += value.humidity;
  }

  function success(position) {
    // console.log(arguments);
    let options = {
      url: getURL(position),
      method: "GET",
      callBack: function() {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            console.log(this.responseText);
            document.querySelector("#result").classList.remove("hidden");
            document.querySelector("#input").classList.add("hidden");
            render(JSON.parse(this.responseText));
          } else {
            console.log("Failed to server");
          }
        }
      }
    };
    ajax.callIt(options);
  }

  // IF user doesn't allow Navigator
  function error(err) {
    document.querySelector("#input").classList.remove("hidden");
    document
      .querySelector("#location-form")
      .addEventListener("submit", getLocationByInput);
  }

  // form submit action
  function getLocationByInput(e) {
    e.preventDefault();
    let inputLocation = document.getElementById("location").value;
    success(inputLocation);
  }
})(AJMOD); //dependency injection of Ajax module
