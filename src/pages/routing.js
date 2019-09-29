let utils = require("../utils/functions");

document.getElementById("challenge-leds").addEventListener("click",function(event){
    window.location.href = "./beginners/challenge-led.html";
});

document.getElementById("challenge-lcd").addEventListener("click",function(event){
    window.location.href = "./beginners/challenge-lcd.html";
});

document.getElementById("challenge-leds-rgb").addEventListener("click",function(event){
    window.location.href = "./beginners/challenge-led-rgb.html";
});
 
document.getElementById("challenge-buttons").addEventListener("click",function(event){
    window.location.href = "./beginners/challenge-button.html";
});
 
document.getElementById("challenge-potentiometer").addEventListener("click",function(event){
    window.location.href = "./intermediate/challenge-potentiometer.html";
});
  
document.getElementById("challenge-joystick").addEventListener("click",function(event){
    window.location.href = "./intermediate/challenge-joystick.html";
});
  
document.getElementById("challenge-buzzer").addEventListener("click",function(event){
    window.location.href = "./intermediate/challenge-buzzer.html";
});
 
document.getElementById("challenge-motors").addEventListener("click",function(event){
    window.location.href = "./advanced/challenge-motors.html";
});
 
document.getElementById("challenge-screen-matrix").addEventListener("click",function(event){
    window.location.href = "./advanced/challenge-screen-matrix.html";
});
  
document.getElementById("challenge-servo").addEventListener("click",function(event){
    window.location.href = "./advanced/challenge-servo.html";
});
 
document.getElementById("challenge-keypad").addEventListener("click",function(event){
    window.location.href = "./advanced/challenge-keypad.html";
});
  
document.getElementById("challenge-sensor-prox").addEventListener("click",function(event){
    window.location.href = "./advanced/challenge-sensor-prox.html";
});
 
document.getElementById("challenge-sensor-movement").addEventListener("click",function(event){
    window.location.href = "./advanced/challenge-sensor-mov.html";
}); 

document.getElementById("challenge-expert").addEventListener("click",function(event){
    window.location.href = "./expert/expert.html";
}); 

document.getElementById("back-button").addEventListener("click",function(event){
    window.history.back();
}); 

document.getElementById("open-frietzing").addEventListener("click",function(event){
    event.preventDefault();
    utils.openURL("frietzing");
}); 

document.getElementById("open-doc").addEventListener("click",function(event){
    event.preventDefault();
    utils.openURL("main");
}); 
 
