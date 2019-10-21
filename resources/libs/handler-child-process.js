"use strict";

/**
 * @author jorge Farfan Coaguila
 * @description Este módulo es el principal para el manejo de ejecución de codigo, instalación de dependencias y manejo de dispositivos.
 */

const gortCommand = require("./johnnyFive/firmata/gort/gort-commands"),
    instanceProgram = require("./johnnyFive/instance-program");

let handlerUtils = {
    gortSetup: device => {
        gortCommand.gortSetup(device);
    },
    devices: async callback => {
        return gortCommand.devices(callback);
    },
    execute: code => {
        this.clearData();
        instanceProgram.executeProgram(code);
    },
    clearData: () => {
        instanceProgram.killChilds();
    }
};
module.exports = handlerUtils;
