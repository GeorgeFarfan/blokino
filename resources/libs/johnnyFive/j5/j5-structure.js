"use strict";

/**
 * @author jorge Farfan
 * @description Este módulo contiene la estructura del programa en J5.
 */

let structureUtils = {
    configBoard: device => {
        return (
            "'use strict';" +
            "const jc = require('json-cycle')," +
            "chalk = require('chalk')," +
            "log = console.log;" +
            "let five = require('johnny-five');" +
            "try {" +
            "let board = new five.Board({ port:'" +
            device +
            "', repl: false, debug: false});"
        );
    },
    program: (device, code, variable, channel) => {
        return (
            structureUtils.configBoard(device) +
            "board.on('ready', () => { try {" +
            `${code}`.concat(structureUtils.errorHandler(variable)) +
            "} catch(error){" +
            "process.send(JSON.stringify({type:'Error', description:error.toString()}))" +
            "}});" +
            structureUtils.j5Events()
        );
    },
    programJ5: (device, code) => {
        return `
            'use strict';
            let five = require("johnny-five");
            let board = new five.Board({ port: '${device}'});
            board.on("ready",  () =>{
                ${code}});
        `;
    },
    cleanProgram: (device, code) => {
        return (
            structureUtils.configBoard(device) +
            "board.on('ready',  () => { try {" +
            `${code}` +
            "} catch(error){" +
            "process.send(JSON.stringify({type:'Error', description:error.toString()}))" +
            "}});" +
            structureUtils.j5Events()
        );
    },

    errorHandler: variables => {
        if (variables.length === 1) {
            return (
                `process.send(JSON.stringify({type:'Exito', description:'El programa se ejecutó correctamente', code: jc.decycle(` +
                variables[0] +
                `)}))`
            );
        } else {
            return `
            function getDataVariable(){
                let tmp=[];
                [${variables}].forEach(function(ele) {
                  tmp.push(jc.decycle(ele));
                });
                return tmp;
            };
            process.send(
                JSON.stringify(
                    {type: 'Exito', 
                     description: 'El programa se ejecutó correctamente', 
                    code: getDataVariable()
                }))`;
        }
    },
    j5Events: () => {
        return (
            "board.on('error', (err) => {" +
            "process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));" +
            "});" +
            "board.on('exit', (event) => {" +
            "log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...'));" +
            " });" +
            "board.on('message',  (event) => {" +
            "log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));" +
            "});" +
            "board.on('info',  (event) => {" +
            "log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));" +
            "});" +
            "board.on('fail', (event) => {" +
            "log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));" +
            "});" +
            "board.on('warn', (event) => {" +
            "log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));" +
            "});" +
            "} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}"
        );
    }
};
module.exports = structureUtils;
