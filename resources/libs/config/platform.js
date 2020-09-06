"use strict";

/**
 * @author jorge Farfan Coaguila
 * @description Con este módulo se obtiene información de la plataforma, donde este instalado Blokino.
 */

const os = require("os"),
    os_name = require("os-name");

const configUtils = {
    infoOS: () => {
        return {
            arch: os.arch(),
            os: os_name(),
            short_name_os: os_name().slice(0, 3)
        };
    },
    arch: () => {
        if (process.platform === "win32" || process.platform === "win64") {
            return process.platform;
        } else {
            return configUtils.infoOS().short_name_os + configUtils.infoOS().arch;
        }
    }
};

module.exports = configUtils;
