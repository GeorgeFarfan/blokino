const path = require("path"),
    Avrgirl = require("avrgirl-arduino"),
    chalk = require("chalk"),
    log = console.log,
    fs = require("fs"),
    helpMsg = `usage:    
                        fir-blo showSupported # list all supported boards
                        fir-blo uno --debug # show debug info 
    `,
    supportedBoards = Avrgirl.listKnownBoards(),
    supportedBoardsString = supportedBoards.join(", ");

let firmataFunctions = {
    showHelp: function () {
        log(chalk.black.bgYellow.bold("Help: " + helpMsg));
    },
    showSupported: function () {
        log(chalk.black.bgYellow.bold("Dispositivos soportados: \n" + supportedBoardsString));
    },
    manageDevice: function (board, port) {
        let options = {
            board: board,
            debug: "--debug",
            port: port
        };
        log(chalk.black.bgYellow.bold("Configurando placa: " + options.board));
        return new Promise((resolve, reject) => {
            firmataFunctions.flash(options, function (error) {
                if (error) {
                    return resolve("Error");
                } else {
                    return resolve("Exito");
                }
            });
        });
    },
    flash: function (options, callback) {
        let avrgirl = new Avrgirl(options);
        let avrgirlDir = path.dirname(require.resolve("avrgirl-arduino"));
        let firmataDir = path.resolve(avrgirlDir, "junk", "hex", options.board);
        let firmataPath;
        fs.readdir(firmataDir, function (err, files) {
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
                        "Error: \n" +
                        "oops! Nose esncontro el Standar Firmata para la placa: " +
                        options.board
                    )
                );
            }
            avrgirl.flash(firmataPath, callback);
        });
    }
};

module.exports = firmataFunctions;