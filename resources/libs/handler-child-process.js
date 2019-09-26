"use strict";

/**
 * @author jorge F
 * @description Este módulo es el principal para el manejo de
 * ejecución de codigo, instalación de dependencias y manejo
 * de dispositivos. Comando para instalar: gort arduino install
 */

const gortCommand = require("./johnnyFive/firmata/gort/gort-commands"),
    instanceProgram = require("./johnnyFive/instance-program");

let handlerUtils = {
    gortSetup: function(device) {
        gortCommand.gortSetup(device);
    },
    devices: async function(callback) {
        return gortCommand.devices(callback);
    },
    execute: function(code) {
        this.clearData();
        instanceProgram.executeProgram(code);
    },
    clearData: function() {
        instanceProgram.killChilds();
    }
};
module.exports = handlerUtils;
