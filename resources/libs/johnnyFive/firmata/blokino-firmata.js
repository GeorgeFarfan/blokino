'use strict';

/**
 * @author jorge Farfan Coaguila
 * @description Este módulo contiene las funciones para instalar Firmata en las placas Arduino.
 */

const path = require('path'),
  Avrgirl = require('avrgirl-arduino'),
  chalk = require('chalk'),
  log = console.log,
  fs = require('fs'),
  FIRMATA_LABELS = require('./firmata-labels'),
  supportedBoards = Avrgirl.listKnownBoards(),
  supportedBoardsString = supportedBoards.join(', ');

const blokinoFirmata = {
  showSupported: () => {
    log(
      chalk.black.bgYellow.bold(
        `${FIRMATA_LABELS.KEYS.SUPPORT_DEVICES}${supportedBoardsString}`,
      ),
    );
  },
  manageDevice: (board, port) => {
    let options = {
      board: board,
      debug: '--debug',
      port: port,
    };
    log(
      chalk.black.bgYellow.bold(
        FIRMATA_LABELS.SETUP.SETUP_BOARD + options.board,
      ),
    );
    return new Promise((resolve, reject) => {
      blokinoFirmata.flash(options, (error) => {
        if (error) {
          return resolve(FIRMATA_LABELS.KEYS.ERROR);
        } else {
          return resolve(FIRMATA_LABELS.KEYS.SUCCESS);
        }
      });
    });
  },
  flash: (options, callback) => {
    let avrgirl = new Avrgirl(options);
    const DIR = path.dirname(
      require.resolve(FIRMATA_LABELS.KEYS.AVR_ARDUINO),
    );
    const FIRMATA_DIRECTORY = path.resolve(
      DIR,
      'junk',
      'hex',
      options.board,
    );
    let firmataPath;
    fs.readdir(FIRMATA_DIRECTORY, (err, files) => {
      if (err) {
        return log(chalk.white.bgRed.bold('Error: \n' + err));
      }
      for (let i = 0, len = files.length; i < len; i++) {
        let filename = files[i];
        if (
          filename.indexOf(FIRMATA_LABELS.KEYS.STANDARD_FIRMATA) > -1
        ) {
          firmataPath = path.join(FIRMATA_DIRECTORY, filename);
          break;
        }
      }
      if (typeof firmataPath === 'undefined') {
        return log(
          chalk.white.bgRed.bold(
            `${FIRMATA_LABELS.KEYS.FIRMATA_NOT_FOUND}${options.board}`,
          ),
        );
      }
      avrgirl.flash(firmataPath, callback);
    });
  },
};

module.exports = blokinoFirmata;
