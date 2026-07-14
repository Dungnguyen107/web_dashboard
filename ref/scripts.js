"use strict";

/*
 * AutoMate overview test
 * Dữ liệu dưới đây chỉ dùng để mô phỏng giao diện.
 */

const state = {
    speed: 51,
    fuel: 68,
    temperature: 65,
    oilCondition: 92,
    faultLevel: 1
};

const elements = {
    popup: document.getElementById("popup"),
    popupTitle: document.getElementById("popup-title"),
    popupBody: document.getElementById("popup-body"),
    closePopupButton: document.getElementById("close-popup"),

    speedValue: document.getElementById("speed-value"),
    fuelValue: document.getElementById("fuel-value"),
    temperatureValue: document.getElementById("temperature-value"),
    oilValue: document.getElementById("oil-value"),

    speedProgress: document.getElementById("speed-progress"),
    fuelProgress: document.getElementById("fuel-progress"),

    speedNeedle: document.getElementById("speed-needle"),
    fuelNeedle: document.getElementById("fuel-needle")
};


/* =========================
   Gauge setup
========================= */

const GAUGE_ARC_LENGTH = 251.33;

function setupGauge(pathElement) {
    if (!pathElement) {
        return;
    }

    pathElement.style.strokeDasharray = String(GAUGE_ARC_LENGTH);
    pathElement.style.strokeDashoffset = String(GAUGE_ARC_LENGTH);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateGauge(options) {
    const {
        value,
        min,
        max,
        progressElement,
        needleElement
    } = options;

    if (!progressElement || !needleElement) {
        return;
    }

    const safeValue = clamp(value, min, max);
    const percentage = (safeValue - min) / (max - min);

    const dashOffset =
        GAUGE_ARC_LENGTH -
        GAUGE_ARC_LENGTH * percentage;

    /*
     * Gauge chạy từ -90 độ đến +90 độ.
     */
    const angle = -90 + percentage * 180;

    progressElement.style.strokeDashoffset =
        String(dashOffset);

    needleElement.style.transform =
        `rotate(${angle}deg)`;
}


/* =========================
   UI rendering
========================= */

function renderDashboard() {
    elements.speedValue.textContent =
        `${state.speed} km/h`;

    elements.fuelValue.textContent =
        `${state.fuel}%`;

    elements.temperatureValue.textContent =
        `${state.temperature}°C`;

    elements.oilValue.textContent =
        state.oilCondition >= 80 ? "Good" : "Check";

    updateGauge({
        value: state.speed,
        min: 0,
        max: 120,
        progressElement: elements.speedProgress,
        needleElement: elements.speedNeedle
    });

    updateGauge({
        value: state.fuel,
        min: 0,
        max: 100,
        progressElement: elements.fuelProgress,
        needleElement: elements.fuelNeedle
    });
}


/* =========================
   Popup
========================= */

const popupContent = {
    speed: {
        title: "Vehicle speed",
        getBody() {
            return `
                <div class="popup-value">
                    ${state.speed} km/h
                </div>

                <h3>Status</h3>
                <p>
                    The vehicle is moving at a normal urban speed.
                </p>

                <h3>Note</h3>
                <p class="popup-note">
                    Speed data is updated automatically for this test page.
                </p>
            `;
        }
    },

    fuel: {
        title: "Fuel level",
        getBody() {
            const estimatedDistance =
                Math.round(state.fuel * 4.1);

            return `
                <div class="popup-value">
                    ${state.fuel}%
                </div>

                <h3>Estimated range</h3>
                <p>
                    About ${estimatedDistance} km remaining.
                </p>

                <h3>Status</h3>
                <p class="popup-note">
                    Fuel level is within the normal range.
                </p>
            `;
        }
    },

    temperature: {
        title: "Engine temperature",
        getBody() {
            return `
                <div class="popup-value">
                    ${state.temperature}°C
                </div>

                <h3>Status</h3>
                <p>
                    Engine temperature is currently normal.
                </p>

                <h3>Safe range</h3>
                <p class="popup-note">
                    The dashboard will display a warning when
                    the configured limit is exceeded.
                </p>
            `;
        }
    },

    oil: {
        title: "Oil condition",
        getBody() {
            return `
                <div class="popup-value">
                    ${state.oilCondition}% — Good
                </div>

                <h3>Status</h3>
                <p>
                    The oil condition remains within the
                    acceptable range.
                </p>

                <h3>Next maintenance</h3>
                <p class="popup-note">
                    Recommended after approximately 1,200 km.
                </p>
            `;
        }
    },

    fault: {
        title: "Fault information",
        getBody() {
            return `
                <div class="popup-value">
                    Level ${state.faultLevel}
                </div>

                <h3>Current condition</h3>
                <p>
                    No active critical faults were detected.
                </p>

                <h3>Driving advice</h3>
                <p class="popup-note">
                    The vehicle is safe to drive. Continue
                    monitoring the dashboard normally.
                </p>
            `;
        }
    }
};

function openPopup(type) {
    const content = popupContent[type];

    if (!content || !elements.popup) {
        return;
    }

    elements.popupTitle.textContent = content.title;
    elements.popupBody.innerHTML = content.getBody();

    elements.popup.classList.add("show");
    elements.popup.setAttribute("aria-hidden", "false");

    elements.closePopupButton.focus();
}

function closePopup() {
    if (!elements.popup) {
        return;
    }

    elements.popup.classList.remove("show");
    elements.popup.setAttribute("aria-hidden", "true");
}


/* =========================
   Test data simulation
========================= */

let speedDirection = 1;
let temperatureDirection = 1;

/*
 * Tốc độ thay đổi nhẹ từ 46 đến 58 km/h.
 * Mục đích là kiểm tra kim và số trên giao diện.
 */
function simulateSpeed() {
    state.speed += speedDirection;

    if (state.speed >= 58 || state.speed <= 46) {
        speedDirection *= -1;
    }

    renderDashboard();
}

/*
 * Nhiệt độ dao động nhẹ từ 64 đến 67 độ C.
 */
function simulateTemperature() {
    state.temperature += temperatureDirection;

    if (
        state.temperature >= 67 ||
        state.temperature <= 64
    ) {
        temperatureDirection *= -1;
    }

    renderDashboard();
}

/*
 * Nhiên liệu giảm chậm.
 * Khi xuống dưới 58% thì đặt lại để demo liên tục.
 */
function simulateFuel() {
    state.fuel -= 1;

    if (state.fuel < 58) {
        state.fuel = 68;
    }

    renderDashboard();
}


/* =========================
   Events
========================= */

document.querySelectorAll("[data-popup]").forEach((button) => {
    button.addEventListener("click", () => {
        openPopup(button.dataset.popup);
    });
});

elements.closePopupButton.addEventListener(
    "click",
    closePopup
);

elements.popup.addEventListener("click", (event) => {
    if (event.target === elements.popup) {
        closePopup();
    }
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        elements.popup.classList.contains("show")
    ) {
        closePopup();
    }
});


/* =========================
   Start
========================= */

setupGauge(elements.speedProgress);
setupGauge(elements.fuelProgress);

renderDashboard();

setInterval(simulateSpeed, 900);
setInterval(simulateTemperature, 1800);
setInterval(simulateFuel, 3500);