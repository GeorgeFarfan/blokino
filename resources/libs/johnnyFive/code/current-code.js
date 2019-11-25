'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyACM0', repl: false, debug: false});board.on('ready', () => { try {let leds, led;
/**
 * Describe esta función...
 */
function Parpadear_LEDs() {
    for (let led_index in leds) {
        led = leds[led_index];
        led.blink(300);
        led.custom.blink = 300;
    }
}
leds = [(new five.Led({
    pin: 10,
    custom: {
        type: 'LED',
        blink: 0
    }
})), (new five.Led({
    pin: 11,
    custom: {
        type: 'LED',
        blink: 0
    }
})), (new five.Led({
    pin: 12,
    custom: {
        type: 'LED',
        blink: 0
    }
})), (new five.Led({
    pin: 13,
    custom: {
        type: 'LED',
        blink: 0
    }
}))];
Parpadear_LEDs();
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', (err) => {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', (event) => {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message',  (event) => {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info',  (event) => {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', (event) => {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', (event) => {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}