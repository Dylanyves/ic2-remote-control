var motorStatus = "{{motorStatus}}";
var modeStatus = "{{modeStatus}}";
var powerStatus = "{{powerStatus}}";

function motorController(dataToSend) {
    fetch("/controller", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "button_data=" + encodeURIComponent(dataToSend),
    })
        .then((response) => response.json())
        .then((data) => {
            motorStatus = data.motorStatus;

            document.getElementById("motorStatus").innerText = "Motors: " + data.motorStatus;

            document.getElementById("onButton").disabled = data.motorStatus === "ON";
            document.getElementById("offButton").disabled = data.motorStatus === "OFF";

            const arrowButtons = document.querySelectorAll('.arrow-button');
            arrowButtons.forEach(button => button.disabled = (data.motorStatus === "OFF" || modeStatus === "AUTO"));
        })
        .catch((error) => {
            console.error("Error sending data to server:", error);
        });
}

function modeController(modeType) {
    fetch("/controller", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "modeStatus=" + encodeURIComponent(modeType),
    })
        .then((response) => response.json())
        .then((data) => {
            modeStatus = data.modeStatus;

            document.getElementById("modeStatus").innerText = "Mode: " + data.modeStatus;

            document.getElementById("manualButton").disabled = data.modeStatus === "MANUAL";
            document.getElementById("autoButton").disabled = data.modeStatus === "AUTO";
            
            const arrowButtons = document.querySelectorAll('.arrow-button');
            arrowButtons.forEach(button => button.disabled = (motorStatus === "OFF" || data.modeStatus === "AUTO"));
        })
        .catch((error) => {
            console.error("Error sending data to server:", error);
        });
}

function powerController(power) {
    fetch("/controller", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "powerStatus=" + encodeURIComponent(power),
    })
        .then((response) => response.json())
        .then((data) => {
            powerStatus = data.powerStatus;

            document.getElementById("powerStatus").innerText = "Power: " + data.powerStatus;

            document.getElementById("lowButton").disabled = data.powerStatus === "LOW";
            document.getElementById("midButton").disabled = data.powerStatus === "MID";
            document.getElementById("highButton").disabled = data.powerStatus === "HIGH";
        })
        .catch((error) => {
            console.error("Error sending data to server:", error);
        });
}

function move(direction) {
    fetch("/controller", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "direction=" + encodeURIComponent(direction),
    }).then((response) => response.json())
}

document.addEventListener('keydown', function (event) {
    if (motorStatus === "OFF" || modeStatus === "AUTO") {
        return;
    }
    switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            move('forward');
            break;
        case 'ArrowDown':
            event.preventDefault();
            move('backward');
            break;
        case 'ArrowLeft':
            event.preventDefault();
            move('left');
            break;
        case 'ArrowRight':
            event.preventDefault();
            move('right');
            break;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var radioButtons = document.querySelectorAll('input.toggle1');
    
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            radioButtons.forEach(function (rb) {
                // Remove 'active' class from all buttons
                rb.parentElement.classList.remove('btn-info');
            });

            // Add 'active' class to the parent of the checked radio button
            if (this.checked) {
                this.parentElement.classList.add('btn-info');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var radioButtons = document.querySelectorAll('input.toggle2');
    
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            radioButtons.forEach(function (rb) {
                // Remove 'active' class from all buttons
                rb.parentElement.classList.remove('btn-info');
            });

            // Add 'active' class to the parent of the checked radio button
            if (this.checked) {
                this.parentElement.classList.add('btn-info');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var radioButtons = document.querySelectorAll('input.toggle3');
    
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            radioButtons.forEach(function (rb) {
                // Remove 'active' class from all buttons
                rb.parentElement.classList.remove('btn-info');
            });

            // Add 'active' class to the parent of the checked radio button
            if (this.checked) {
                this.parentElement.classList.add('btn-info');
            }
        });
    });
});