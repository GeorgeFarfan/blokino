"use strict";

/**
 * @author jorge F
 * @description Este módulo es el principal para el manejo de
 * ejecución de codigo, instalación de dependencias y manejo
 * de dispositivos. Comando para instalar: gort arduino install
 */

let structureUtils = {
    configBoard: function(device) {
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
    program: function(device, code, variable, channel) {
        return (
            this.configBoard(device) +
            "board.on('ready', function () { try {" +
            `${code}`.concat(structureUtils.errorHandler(variable)) +
            "} catch(error){" +
            "process.send(JSON.stringify({type:'Error', description:error.toString()}))" +
            "}});" +
            this.j5Events()
        );
    },
    cleanProgram: function(device, code) {
        return (
            this.configBoard(device) +
            "board.on('ready', function () { try {" +
            `${code}` +
            "} catch(error){" +
            "process.send(JSON.stringify({type:'Error', description:error.toString()}))" +
            "}});" +
            this.j5Events()
        );
    },

    errorHandler: function(variables) {
        console.log("VARIABLES: ", variables);
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
    j5Events: function() {
        return (
            "board.on('error', function(err) {" +
            "process.send(JSON.stringify({ type: 'ErrorJ5', description: err.class}));" +
            "});" +
            "board.on('exit', function(event) {" +
            "log(chalk.black.bgRed.bold('EXIT - Arduino device was disconnected...'));" +
            " });" +
            "board.on('message', function (event) {" +
            "log(chalk.black.bgYellow.bold('MESSAGE - you receive a message: ', event.type, event.class, event.message));" +
            "});" +
            "board.on('info', function (event) {" +
            "log(chalk.black.bgYellow.bold('INFORMATION - you receive a information message: ', event.class, event.message));" +
            "});" +
            "board.on('fail', function(event) {" +
            "log(chalk.black.bgYellow.bold('ERROR - you receive a fail message: ', event.class, event.message));" +
            "});" +
            "board.on('warn', function(event) {" +
            "log(chalk.black.bgYellow.bold('WARNING - you receive a warn message: ', event.class, event.message));" +
            "});" +
            "} catch (error) {process.send(JSON.stringify({ type: 'Error', description: error.toString() }));}"
        );
    }
};
module.exports = structureUtils;
