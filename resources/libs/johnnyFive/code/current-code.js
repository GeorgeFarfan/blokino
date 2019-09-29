'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyACM1', repl: false, debug: false});board.on('ready', function () { try {let MATRIX_LEDS;

function DibujarFigura() {
    let codes = [({
        position: 0,
        matrix_code: ["00000000", "00011110", "00000100", "00000100", "00000100", "00100100", "00100100", "00111100"]
    }), ({
        position: 4,
        matrix_code: ["00000000", "00111110", "00100010", "00100010", "00100010", "00100010", "00100010", "00111110"]
    }), ({
        position: 3,
        matrix_code: ["00000000", "00111100", "00100100", "00100100", "00111100", "00101000", "00100100", "00100100"]
    }), ({
        position: 2,
        matrix_code: ["00000000", "00111110", "00100000", "00100000", "00100000", "00100110", "00100010", "00111110"]
    }), ({
        position: 1,
        matrix_code: ["00000000", "00111100", "00100000", "00100000", "00111100", "00100000", "00100000", "00111100"]
    })];
    codes.forEach(m_led => {
        MATRIX_LEDS.draw(m_led.position, m_led.matrix_code)
    });
}
MATRIX_LEDS = (new five.Led.Matrix({
    pins: {
        data: 2,
        clock: 4,
        cs: 3,
        custom: {
            type: 'SCREEN-MATRIX',
            code: ''
        }
    },
    devices: 5
}));
DibujarFigura();
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', function(err) {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', function(event) {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message', function (event) {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info', function (event) {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', function(event) {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', function(event) {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}