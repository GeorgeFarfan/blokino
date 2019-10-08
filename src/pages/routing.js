let utils = require("../utils/functions");

document.getElementById("challenge-leds").addEventListener("click", event => {
    window.location.href = "./beginners/challenge-led.html";
});

document.getElementById("challenge-lcd").addEventListener("click", event => {
    window.location.href = "./beginners/challenge-lcd.html";
});

document.getElementById("challenge-leds-rgb").addEventListener("click", event => {
    window.location.href = "./beginners/challenge-led-rgb.html";
});

document.getElementById("challenge-buttons").addEventListener("click", event => {
    window.location.href = "./beginners/challenge-button.html";
});

document.getElementById("challenge-potentiometer").addEventListener("click", event => {
    window.location.href = "./intermediate/challenge-potentiometer.html";
});

document.getElementById("challenge-joystick").addEventListener("click", event => {
    window.location.href = "./intermediate/challenge-joystick.html";
});

document.getElementById("challenge-buzzer").addEventListener("click", event => {
    window.location.href = "./intermediate/challenge-buzzer.html";
});

document.getElementById("challenge-motors").addEventListener("click", event => {
    window.location.href = "./advanced/challenge-motors.html";
});

document.getElementById("challenge-screen-matrix").addEventListener("click", event => {
    window.location.href = "./advanced/challenge-screen-matrix.html";
});

document.getElementById("challenge-servo").addEventListener("click", event => {
    window.location.href = "./advanced/challenge-servo.html";
});

document.getElementById("challenge-keypad").addEventListener("click", event => {
    window.location.href = "./advanced/challenge-keypad.html";
});

document.getElementById("challenge-sensor-prox").addEventListener("click", event => {
    window.location.href = "./advanced/challenge-sensor-prox.html";
});

document.getElementById("challenge-sensor-movement").addEventListener("click", event => {
    window.location.href = "./advanced/challenge-sensor-mov.html";
});

document.getElementById("challenge-expert").addEventListener("click", event => {
    window.location.href = "./expert/expert.html";
});

document.getElementById("back-button").addEventListener("click", event => {
    window.history.back();
});

document.getElementById("open-frietzing").addEventListener("click", event => {
    event.preventDefault();
    utils.openURL("frietzing");
});

document.getElementById("open-doc").addEventListener("click", event => {
    event.preventDefault();
    utils.openURL("main");
});
