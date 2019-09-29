'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyACM0', repl: false, debug: false});board.on('ready', function () { try {let MATRIX_LEDS, JOYSTICK;

function DibujarFigura() {
    JOYSTICK.on('change', function() {
        let x = Math.round(this.x);
        let y = Math.round(this.y);
        if (x == 0 && y == 1) {
            Arriba();
        }
        if (x == 0 && y == -1) {
            Abajo();
        }
        if (x == 1 && y == 0) {
            MATRIX_LEDS.off();
            MATRIX_LEDS.clear();
        }
        if (x == -1 && y == 0) {
            MATRIX_LEDS.off();
            MATRIX_LEDS.clear();
        };
    })
}

function Arriba() {
    let codes = [({
        position: 0,
        matrix_code: 'A'
    }), ({
        position: 4,
        matrix_code: 'R'
    }), ({
        position: 3,
        matrix_code: 'R'
    }), ({
        position: 2,
        matrix_code: 'I'
    }), ({
        position: 1,
        matrix_code: 'B'
    })];
    codes.forEach(m_led => {
        MATRIX_LEDS.draw(m_led.position, m_led.matrix_code)
    });
}

function Abajo() {
    let codes = [({
        position: 0,
        matrix_code: 'A'
    }), ({
        position: 4,
        matrix_code: 'B'
    }), ({
        position: 3,
        matrix_code: 'A'
    }), ({
        position: 2,
        matrix_code: 'J'
    }), ({
        position: 1,
        matrix_code: 'O'
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
JOYSTICK = (new five.Joystick({
    pins: ['A0', 'A1'],
    custom: {
        type: 'JOYSTICK',
        pos_x: 'A0',
        pos_y: 'A1'
    }
}));
DibujarFigura();
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', function(err) {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', function(event) {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message', function (event) {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info', function (event) {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', function(event) {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', function(event) {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}