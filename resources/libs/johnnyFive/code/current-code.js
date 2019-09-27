'use strict';const jc = require('json-cycle'),chalk = require('chalk'),log = console.log;let five = require('johnny-five');try {let board = new five.Board({ port:'/dev/ttyACM0', repl: false, debug: false});board.on('ready', function () { try {var ledrgb_1, ledrgb_2;ledrgb_1 = (new five.Led.RGB({pins:{red:6,green:5,blue:3},custom:{type:'LED-RGB',blink:0,color:''}}));ledrgb_2 = (new five.Led.RGB({pins:{red:11,green:10,blue:9},custom:{type:'LED-RGB',blink:0,color:''}}));ledrgb_1.color('#FF0000');ledrgb_1.custom.color='#FF0000';ledrgb_2.color('#008000');ledrgb_2.custom.color='#008000';ledrgb_1.blink(100);ledrgb_1.custom.blink=100;ledrgb_2.blink(500);ledrgb_2.custom.blink=500;
            function getDataVariable(){
                let tmp=[];
                [ledrgb_1,ledrgb_2].forEach(function(ele) {
                  tmp.push(jc.decycle(ele));
                });
                return tmp;
            };
            process.send(
                JSON.stringify(
                    {type: 'Exito', 
                     description: 'El programa se ejecutó correctamente', 
                    code: getDataVariable()
                }))} catch(error){process.send(JSON.stringify({type:'Error', description:error.toString()}))}});board.on('error', function(err) {process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));});board.on('exit', function(event) {log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...')); });board.on('message', function (event) {log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));});board.on('info', function (event) {log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));});board.on('fail', function(event) {log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));});board.on('warn', function(event) {log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));});} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}