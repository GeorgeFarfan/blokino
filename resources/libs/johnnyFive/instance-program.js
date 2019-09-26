"use strict";

/**
 * @author jorge F
 * @description Este modulo contiene el manejo los child
 * process donde se ejecuta Johnny Five.
 */

const fs = require("fs"),
    structure = require("./structure/program-j5"),
    path = require("path"),
    jc = require("json-cycle"),
    path_current_program = "/code/current-code.js";

let nodes = [];
let instance_utils = {
    executeProgram: function(code, device, emitMessage, variable, channel) {
        let file_name = path.join(__dirname, "/code/current-code.js");
        let program_code = structure.program(device, code, variable, channel);
        // Creo la instancia en un child process
        fs.writeFile(file_name, program_code, error => {
            if (!error) {
                let child = require("child_process").fork(
                    require.resolve(path.join(__dirname, path_current_program)),
                    {}
                );
                nodes.push(child);
                child.on("message", message => {
                    let validation = JSON.parse(message);
                    switch (validation.type) {
                        case "ErrorJ5":
                            emitMessage.sender.send(channel, "ErrorJ5");
                            break;
                        case "Error":
                            switch (validation.description) {
                                case "RangeError: Maximum call stack size exceeded":
                                    emitMessage.sender.send(channel, "ErrorCallBack");
                                    break;
                                default:
                                    emitMessage.sender.send(channel, "Error");
                                    break;
                            }
                            break;
                        case "Exito":
                            emitMessage.sender.send(
                                channel,
                                JSON.stringify({
                                    status: "Exito",
                                    variables_status: jc.decycle(validation.code),
                                    code: program_code
                                })
                            );
                            break;
                    }
                });
            }
        });
    },
    cleanProgram: function(code, device, emitMessage) {
        let file_name = path.join(__dirname, "/code/current-code.js");
        let program_code = structure.program(device, code, [""]);
        // Creo la instancia en un child process
        fs.writeFile(file_name, program_code, error => {
            if (!error) {
                let child = require("child_process").fork(
                    require.resolve(path.join(__dirname, path_current_program)),
                    {}
                );
                nodes.push(child);
                child.on("message", message => {
                    emitMessage.sender.send("resultClean", "");
                });
            }
        });
    },
    killnodes: function() {
        nodes.map(function(child) {
            child.kill();
        });
        // Se eliminaron todos los child-process que esten instanciados.
        nodes = [];
    }
};

module.exports = instance_utils;
