'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyACM1', repl: false, debug: false});board.on('ready', () => { try {let LCD;
LCD = (new five.LCD({
    controller: 'PCF8574',
    custom: {
        type: 'LCD',
        scroll: false,
        messages: {
            first_row: '',
            second_row: ''
        }
    }
}));
LCD.useChar("duck");
LCD.useChar("heart");
LCD.useChar("square");
let phases = [];
phases.push(':duck::duck::duck:PEpote de la genteee');
phases.push('Mensaje de la segunda fila ...');
phases.push('Mensaje de la tercera fila ...');
phases.push('Mensaje de la cuarta fila ...');
LCD.custom.scroll = true;
LCD.cursor(0, 0).print(':duck::duck::duck:PEpote de la genteee'.substr(0, 20));
LCD.cursor(1, 0).print('Mensaje de la segunda fila ...'.substr(0, 20));
LCD.cursor(2, 0).print('Mensaje de la tercera fila ...'.substr(0, 20));
LCD.cursor(3, 0).print('Mensaje de la cuarta fila ...'.substr(0, 20));
setInterval(() => {
    LCD.clear();
    if (':duck::duck::duck:PEpote de la genteee'.length > 20) {
        LCD.cursor(0, 0).print(scroll('first'))
    } else {
        LCD.cursor(0, 0).print(':duck::duck::duck:PEpote de la genteee')
    };
    if ('Mensaje de la segunda fila ...'.length > 20) {
        LCD.cursor(1, 0).print(scroll('second'))
    } else {
        LCD.cursor(1, 0).print('Mensaje de la segunda fila ...')
    };
    if ('Mensaje de la tercera fila ...'.length > 20) {
        LCD.cursor(2, 0).print(scroll('third'))
    } else {
        LCD.cursor(2, 0).print('Mensaje de la tercera fila ...')
    };
    if ('Mensaje de la cuarta fila ...'.length > 20) {
        LCD.cursor(3, 0).print(scroll('fourth'))
    } else {
        LCD.cursor(3, 0).print('Mensaje de la cuarta fila ...')
    }
}, 2000);

function scroll(row) {
    let phase = '';
    let letter = '';
    switch (row) {
        case 'first':
            letter = phases[0].substr(0, 1);
            phases[0] = (phases[0] + letter).substr(1, (phases[0] + letter).length);
            phase = phases[0];
            phase.slice(0, 1);
            break;
        case 'second':
            letter = phases[1].substr(0, 1);
            phases[1] = (phases[1] + letter).substr(1, (phases[1] + letter).length);
            phase = phases[1];
            phase.slice(0, 1);
            break;
        case 'third':
            letter = phases[2].substr(0, 1);
            phases[2] = (phases[2] + letter).substr(1, (phases[2] + letter).length);
            phase = phases[2];
            phase.slice(0, 1);
            break;
        case 'fourth':
            letter = phases[3].substr(0, 1);
            phases[3] = (phases[3] + letter).substr(1, (phases[3] + letter).length);
            phase = phases[3];
            phase.slice(0, 1);
            break;
    }
    return phase.substr(0, 20)
}
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', (err) => {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', (event) => {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message',  (event) => {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info',  (event) => {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', (event) => {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', (event) => {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}