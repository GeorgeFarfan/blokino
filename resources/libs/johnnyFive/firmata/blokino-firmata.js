"use strict";

/**
 * @author jorge Farfan Coaguila
 * @description Este módulo contiene las funciones para instalar Firmata en las placas Arduino.
 */

const path = require("path"),
    Avrgirl = require("avrgirl-arduino"),
    chalk = require("chalk"),
    log = console.log,
    fs = require("fs"),
    supportedBoards = Avrgirl.listKnownBoards(),
    supportedBoardsString = supportedBoards.join(", ");

const blokinoFirmata = {
    showSupported: () => {
        log(chalk.black.bgYellow.bold("Dispositivos soportados: \n" + supportedBoardsString));
    },
    manageDevice: (board, port) => {
        let options = {
            board: board,
            debug: "--debug",
            port: port
        };
        log(chalk.black.bgYellow.bold("Configurando placa: " + options.board));
        return new Promise((resolve, reject) => {
            blokinoFirmata.flash(options, error => {
                if (error) {
                    return resolve("Error");
                } else {
                    return resolve("Exito");
                }
            });
        });
    },
    flash: (options, callback) => {
        let avrgirl = new Avrgirl(options);
        let avrgirlDir = path.dirname(require.resolve("avrgirl-arduino"));
        let firmataDir = path.resolve(avrgirlDir, "junk", "hex", options.board);
        let firmataPath;
        fs.readdir(firmataDir, (err, files) => {
            if (err) {
                return log(chalk.white.bgRed.bold("Error: \n" + err));
            }
            for (let i = 0, len = files.length; i < len; i++) {
                let filename = files[i];
                if (filename.indexOf("StandardFirmata") > -1) {
                    firmataPath = path.join(firmataDir, filename);
                    break;
                }
            }
            if (typeof firmataPath === "undefined") {
                return log(
                    chalk.white.bgRed.bold(
                        "Error: No se esncontró el Standard Firmata para la placa: " + options.board
                    )
                );
            }
            avrgirl.flash(firmataPath, callback);
        });
    }
};

module.exports = blokinoFirmata;
