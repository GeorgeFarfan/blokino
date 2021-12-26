'use strict';

/**
 * @author jorge F
 * @description Este módulo contiene las funciones relacionadas
 *  con los dispositivos conectados.
 */

const SerialPort = require('serialport'),
  platform = require('../../config/platform'),
  deviceType = 'Arduino',
  arduinoMacOS = '/dev/tty.usbmodem',
  macOS = 'mac',
  deviceUSBNanoWin = 'wch.cn',
  deviceUSBNano = '1a86';

let serialportFunctions = {
  listDevices: function () {
    let usb_connected = [];
    const OS_ARCH = platform.arch();
    SerialPort.list()
      .then((ports) => {
        if (OS_ARCH.includes(macOS)) {
          ports.forEach((port) => {
            if (
              port.path.includes(deviceType) ||
              port.path.includes(arduinoMacOS)
            ) {
              usb_connected.push({
                type: deviceType,
                name: deviceType,
                port: port.path,
              });
            }
          });
        } else {
          ports.forEach((port) => {
            if (
              (port.manufacturer &&
                port.manufacturer !== '' &&
                (port.manufacturer.includes(deviceType) ||
                  port.manufacturer.includes(deviceUSBNano))) ||
              port.manufacturer.includes(deviceUSBNanoWin)
            ) {
              usb_connected.push({
                type: deviceType,
                name: deviceType,
                port: port.comName ? port.comName : port.path,
              });
            }
          });
        }
      })
      .catch((errors) => {
        console.log('Error =>', errors);
      });

    return usb_connected;
  },
};

module.exports = serialportFunctions;
