'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyUSB0', repl: false, debug: false});board.on('ready', () => { try {let brazo_izquierdo, JOYSTICK, brazo_derecho, pie_derecho, pierna_derecha, pie_izquierdo, pierna_izquierda;
/**
 * Describe esta función...
 */
function Detectar_movimientos() {
    JOYSTICK.on('change', function() {
        let x = Math.round(this.x);
        let y = Math.round(this.y);
        if (x == 0 && y == 1) {
            pierna_derecha.custom.code.state = "sweep-to-from";
            pierna_derecha.custom.code.positions.to = 90;
            pierna_derecha.custom.code.positions.from = 180;
            pierna_derecha.sweep({
                range: [90, 180],
                interval: 1000
            });
            pie_derecho.custom.code.state = "sweep-to-from";
            pie_derecho.custom.code.positions.to = 70;
            pie_derecho.custom.code.positions.from = 100;
            pie_derecho.sweep({
                range: [70, 100],
                interval: 1000
            });
        }
        if (x == 0 && y == -1) {
            pierna_izquierda.custom.code.state = "sweep-to-from";
            pierna_izquierda.custom.code.positions.to = 0;
            pierna_izquierda.custom.code.positions.from = 90;
            pierna_izquierda.sweep({
                range: [0, 90],
                interval: 1000
            });
            pie_izquierdo.custom.code.state = "sweep-to-from";
            pie_izquierdo.custom.code.positions.to = 90;
            pie_izquierdo.custom.code.positions.from = 130;
            pie_izquierdo.sweep({
                range: [90, 130],
                interval: 1000
            });
        }
        if (x == 1 && y == 0) {
            pierna_izquierda.custom.code.state = "stopped";
            pierna_izquierda.stop();
            pierna_derecha.custom.code.state = "stopped";
            pierna_derecha.stop();
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
pie_derecho = (new five.Servo({
    pin: 11,
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
pie_izquierdo = (new five.Servo({
    pin: 8,
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
pierna_derecha = (new five.Servo({
    pin: 6,
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
pierna_izquierda = (new five.Servo({
    pin: 4,
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
Detectar_movimientos();
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', (err) => {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', (event) => {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message',  (event) => {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info',  (event) => {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', (event) => {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', (event) => {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}