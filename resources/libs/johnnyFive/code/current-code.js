'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'COM9', repl: false, debug: false});board.on('ready', () => { try {let brazo_izquierdo, JOYSTICK, brazo_derecho;
/**
 * Describe esta función...
 */
function Detectar_movimientos() {
    JOYSTICK.on('change', function() {
        let x = Math.round(this.x);
        let y = Math.round(this.y);
        if (x == 0 && y == 1) {
            brazo_derecho.custom.code.state = "sweep-to-from";
            brazo_derecho.custom.code.positions.to = 90;
            brazo_derecho.custom.code.positions.from = 180;
            brazo_derecho.sweep({
                range: [90, 180],
                interval: 1000
            });
            process.send(JSON.stringify({
                type: 'blokino-message',
                message_type: 'warning',
                message: 'Se esta moviendo el brazo derecho'
            }));
        }
        if (x == 0 && y == -1) {
            brazo_izquierdo.custom.code.state = "sweep-to-from";
            brazo_izquierdo.custom.code.positions.to = 0;
            brazo_izquierdo.custom.code.positions.from = 180;
            brazo_izquierdo.sweep({
                range: [0, 180],
                interval: 500
            });
            process.send(JSON.stringify({
                type: 'blokino-message',
                message_type: 'warning',
                message: 'Se esta moviendo el brazo izquierdo'
            }));
        };
    })
}
brazo_izquierdo = (new five.Servo({
    pin: 13,
    custom: {
        type: 'SERVOMOTOR',
        code: {
            state: '',
            position: 0,
            positions: {
                to: 0,
                from: 0
            }
        }
    }
}));
brazo_derecho = (new five.Servo({
    pin: 12,
    custom: {
        type: 'SERVOMOTOR',
        code: {
            state: '',
            position: 0,
            positions: {
                to: 0,
                from: 0
            }
        }
    }
}));
JOYSTICK = (new five.Joystick({
    pins: ['A1', 'A2'],
    custom: {
        type: 'JOYSTICK',
        pos_x: 'A1',
        pos_y: 'A2'
    }
}));
process.send(JSON.stringify({
    type: 'blokino-message',
    message_type: 'info',
    message: 'Prepando al M14'
}));
Detectar_movimientos();
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', (err) => {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', (event) => {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message',  (event) => {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info',  (event) => {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', (event) => {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', (event) => {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}