'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyACM0', repl: false, debug: false});board.on('ready', () => { try {let ZUMBADOR;
/**
 * Describe esta función...
 */
function HacerSonar() {
    ZUMBADOR.custom.code.status = 'play with sound';
    ZUMBADOR.custom.code.notes = 'mario-2';
    ZUMBADOR.play({
        song: [
            ['C5', 1 / 4],
            [null, 5 / 4],
            ['G4', 1 / 4],
            [null, 5 / 4],
            ['E4', 1 / 4],
            [null, 5 / 4],
            ['E4', 1 / 4],
            [null, 1 / 4],
            ['B4', 1 / 4],
            [null, 3 / 4],
            ['A#4', 1 / 4],
            [null, 1 / 4],
            ['E4', 1 / 4],
            [null, 3 / 4],
            ['G4', 1 / 4],
            [null, 1 / 4],
            ['E5', 1 / 4],
            [null, 3 / 4],
            ['G5', 1 / 4],
            [null, 1 / 4],
            ['A5', 1 / 4],
            [null, 3 / 4],
            ['F5', 1 / 4],
            [null, 1 / 4],
            ['G5', 1 / 4],
            [null, 3 / 4],
            ['E5', 1 / 4],
            [null, 3 / 4],
            ['C5', 1 / 4],
            [null, 1 / 4],
            ['D5', 1 / 4],
            [null, 1 / 4],
            ['B4', 1 / 4],
            [null, 3 / 4]
        ],
        tempo: 200
    });
}
ZUMBADOR = (new five.Piezo({
    pin: 7,
    custom: {
        type: 'BUZZER',
        code: {
            state: '',
            notes: '',
            tempo: '',
            grade: ''
        }
    }
}));
HacerSonar();
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', (err) => {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', (event) => {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message',  (event) => {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info',  (event) => {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', (event) => {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', (event) => {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}