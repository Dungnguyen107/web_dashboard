const popup = document.getElementById("popup");

const popupTitle = document.getElementById("popup-title");

const popupBody = document.getElementById("popup-body");

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
                Nhiệt độ động cơ hiện đang nằm trong vùng an toàn.
                Hệ thống sẽ cảnh báo nếu vượt quá ngưỡng cấu hình.
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

                <p>Good</p>

                <h3>Explanation</h3>

                <p>

                Chất lượng dầu bôi trơn vẫn nằm trong giới hạn cho phép.

                </p>

            `;

        break;

    }

}

function closePopup(){

    popup.classList.remove("show");

}

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        closePopup();

    }

});