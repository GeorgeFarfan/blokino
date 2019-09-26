"use strict";

/**
 * @author jorge F
 * @description Este módulo contiene los libs y comandos necesarios para dejar el entorno listo para conectar dispositivos.
 */

const os = require("os"),
    os_name = require("os-name");

let configUtils = {
    infoPc: function() {
        return {
            arch: os.arch(),
            os: os_name(),
            short_name_os: os_name().slice(0, 3)
        };
    },
    settingWindows: function() {},
    arch: function() {
        if (process.platform === "win32" || process.platform === "win64") {
            return process.platform;
        } else {
            return this.infoPc().short_name_os + this.infoPc().arch;
        }
    }
};

module.exports = configUtils;
