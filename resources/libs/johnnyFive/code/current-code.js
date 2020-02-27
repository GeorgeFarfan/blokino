'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyACM0', repl: false, debug: false});board.on('ready', () => { try {let caracteres, LCD;
caracteres = [(":donut:"), (":donut:"), (":donut:")].join('');
LCD = (new five.LCD({
    controller: 'PCF8574A',
    custom: {
        type: 'LCD',
        scroll: false,
        messages: {
            first_row: '',
            second_row: ''
        }
    }
}));
LCD.useChar("donut");
LCD.cursor(0, 0).print('Daleeee amegooo');
LCD.custom.messages.first_row = 'Daleeee amegooo';
LCD.cursor(1, 0).print((caracteres.toString().replace(/,/g, " ")));
LCD.custom.messages.second_row = (caracteres.toString().replace(/,/g, " "));
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', (err) => {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', (event) => {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message',  (event) => {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info',  (event) => {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', (event) => {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', (event) => {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}