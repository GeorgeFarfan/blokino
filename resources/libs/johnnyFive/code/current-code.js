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
LCD.useChar("note");
LCD.useChar("smile");
LCD.useChar("bell");
LCD.useChar("check");
LCD.cursor(0, 0).print(([(":note:"), (":bell:"), (":smile:")].toString().replace(/,/g, " ")).substr(0, 20));
LCD.cursor(1, 0).print((":note:").substr(0, 20));
LCD.cursor(2, 0).print('en la sala.'.substr(0, 20));
LCD.cursor(3, 0).print('Otra linea'.substr(0, 20));
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', (err) => {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', (event) => {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message',  (event) => {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info',  (event) => {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', (event) => {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', (event) => {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}