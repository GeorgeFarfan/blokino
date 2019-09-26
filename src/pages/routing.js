require("popper.js");
require("bootstrap");
let $ = require("jquery"),
    utils = require("../utils/functions");

$("#challenge-leds").click(() => {
    window.location.href = "./beginners/challenge-led.html";
});

$("#challenge-lcd").click(() => {
    window.location.href = "./beginners/challenge-lcd.html";
});

$("#challenge-leds-rgb").click(() => {
    window.location.href = "./beginners/challenge-led-rgb.html";
});

$("#challenge-buttons").click(() => {
    window.location.href = "./beginners/challenge-button.html";
});

$("#challenge-beginner-1").click(() => {
    window.location.href = "./beginners/challenge-number-1.html";
});

$("#challenge-potentiometer").click(() => {
    window.location.href = "./intermediate/challenge-potentiometer.html";
});

$("#challenge-joystick").click(() => {
    window.location.href = "./intermediate/challenge-joystick.html";
});

$("#challenge-buzzer").click(() => {
    window.location.href = "./intermediate/challenge-buzzer.html";
});

$("#challenge-structure-control").click(() => {
    window.location.href = "./intermediate/challenge-structure-control.html";
});

$("#challenge-functions").click(() => {
    window.location.href = "./intermediate/challenge-functions.html";
});

$("#challenge-functions").click(() => {
    window.location.href = "./advanced/challenge-functions.html";
});

$("#challenge-screen-matrix").click(() => {
    window.location.href = "./advanced/challenge-screen-matrix.html";
});

$("#challenge-structure-control").click(() => {
    window.location.href = "./advanced/challenge-structure-control.html";
});
$("#challenge-servo").click(() => {
    window.location.href = "./advanced/challenge-servo.html";
});

$("#challenge-servo").click(() => {
    window.location.href = "./advanced/challenge-servo.html";
});

$("#challenge-keypad").click(() => {
    window.location.href = "./advanced/challenge-keypad.html";
});

$("#challenge-sensor-prox").click(() => {
    window.location.href = "./advanced/challenge-sensor-prox.html";
});

$("#challenge-sensor-movement").click(() => {
    window.location.href = "./advanced/challenge-sensor-mov.html";
});

$("#challenge-expert").click(() => {
    window.location.href = "./expert/expert.html";
});

$("#challenge-motors").click(() => {
    window.location.href = "./advanced/challenge-motors.html";
});

$("#back-button").click(() => {
    window.history.back();
});

$("#open-frietzing").on("click", event => {
    event.preventDefault();
    utils.openURL("frietzing");
});

$("#open-doc").click(event => {
    event.preventDefault();
    utils.openURL("main");
});