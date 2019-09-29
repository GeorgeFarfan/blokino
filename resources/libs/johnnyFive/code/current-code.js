'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyACM1', repl: false, debug: false});board.on('ready', function () { try {let led_1;
led_1 = (new five.Led({
    pin: 10,
    custom: {
        type: 'LED',
        blink: 0
    }
}));
led_1.blink(1000);
led_1.custom.blink = 1000;
process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle()}))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', function(err) {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', function(event) {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message', function (event) {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info', function (event) {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', function(event) {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', function(event) {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}