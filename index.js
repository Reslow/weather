window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperatureDescription"
  );
  let temperatureDegree = document.querySelector(".temperatureDegree");
  let locationTimezone = document.querySelector(".locationTimezone");
  let degreeSection = document.querySelector(".degreeSection")
  const  temperatureSpan = document.querySelector('.degreeSection span')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "http://localhost:8080/";
      const api = `${proxy}https://api.darksky.net/forecast/4333d14825003bd0f29332cf101dd30a/${lat},${long}`;

      fetch(api)
        .then(Response => {
          return Response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          //Set DOM Elemets from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //formula for celsius 
          let celsius = (temperature - 32) * (5 / 9);
          //set Icon
          setIcons(icon, document.querySelector(".icon"));
          //change temperature to celcius/farenheit
          degreeSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius)
            } else {
              temperatureSpan.textContent = "F"
              temperatureDegree.textContent = temperature;
            }
          })
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
