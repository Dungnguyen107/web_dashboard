const popup = document.getElementById("popup");

const popupTitle = document.getElementById("popup-title");

const popupBody = document.getElementById("popup-body");

const temperatureValue = document.getElementById("temperature-value");
const speedValue = document.getElementById("speed-value");
const fuelValue = document.getElementById("fuel-value");

let temperature = 86;
let temperatureDirection = 1;

let speed = 42;
let speedDirection = 1;

let fuel = 66;

// Temperature: 86 -> 88 -> 86
setInterval(function () {
  temperature += temperatureDirection;

  if (temperature >= 88 || temperature <= 86) {
    temperatureDirection *= -1;
  }

  temperatureValue.textContent = temperature + "°C";
}, 10000);

// Speed: 42 -> 68 -> 20 -> 68 ...
setInterval(function () {
  speed += speedDirection;

  if (speed >= 50 || speed <= 42) {
    speedDirection *= -1;
  }

  speedValue.textContent = speed + " km/h";
}, 1800);

// Fuel: 66 -> 58, then reset to 66
setInterval(function () {
  fuel -= 1;

  if (fuel < 58) {
    fuel = 66;
  }

  fuelValue.textContent = fuel + "%";
}, 13500);

function openPopup(type){

    popup.classList.add("show");

    switch(type){

        case "temperature":

            popupTitle.innerHTML="Engine Temperature";

            popupBody.innerHTML=`

                <h3>Current Value</h3>

                <p>86°C (Normal)</p>

                <h3>Explanation</h3>

                <p>
                    The engine temperature is currently within the safe range.
                    The system will trigger an alert if it exceeds the configured threshold.
                </p>

                <h3>History</h3>

                <ul>

                    <li>08:20 - 84°C</li>

                    <li>08:25 - 85°C</li>

                    <li>08:30 - 86°C</li>

                </ul>

            `;

        break;

        case "speed":

            popupTitle.innerHTML="Vehicle Speed";

            popupBody.innerHTML=`

                <h3>Current Speed</h3>

                <p>42 km/h</p>

                <h3>History</h3>

                <ul>

                    <li>08:20 - 35 km/h</li>

                    <li>08:25 - 38 km/h</li>

                    <li>08:30 - 42 km/h</li>

                </ul>

            `;

        break;

        case "fuel":

            popupTitle.innerHTML="Fuel Level";

            popupBody.innerHTML=`

                <h3>Current Fuel</h3>

                <p>68%</p>

                <p>

                Estimated remaining distance:

                280 km

                </p>

            `;

        break;

        case "oil":

            popupTitle.innerHTML="Oil Condition";

            popupBody.innerHTML=`

                <h3>Status</h3>

                <p>92% - Good</p>

                <h3>Explanation</h3>

                <p>

                The oil condition is still within the acceptable range.

                </p>

            `;

        break;

    }

}

function openVehicleDetails() {
  const popup = document.getElementById("vehiclePopup");
  popup.classList.add("active");
}

function closeVehicleDetails() {
  const popup = document.getElementById("vehiclePopup");
  popup.classList.remove("active");
}

document.addEventListener("click", function (event) {
  const popup = document.getElementById("vehiclePopup");

  if (event.target === popup) {
    closeVehicleDetails();
  }
});

function closePopup(){

    popup.classList.remove("show");

}

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        closePopup();

    }

});