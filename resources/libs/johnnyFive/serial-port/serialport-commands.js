"use strict";

/**
 * @author jorge F
 * @description Este módulo contiene las funciones relacionadas
 *  con los dispositivos conectados.
 */

const SerialPort = require("serialport"),
    deviceType = "Arduino",
    deviceUSBNanoWin = "wch.cn",
    deviceUSBNano = "1a86";

let serialportFunctions = {
    listDevices: function () {
        let usb_connected = [];
        SerialPort.list()
            .then(ports => {
                ports.forEach(port => {
                    if (
                        port.manufacturer &&
                        port.manufacturer !== "" &&
                        (port.manufacturer.includes(deviceType) ||
                            port.manufacturer.includes(deviceUSBNano)) ||
                        (port.manufacturer.includes(deviceUSBNanoWin))
                    ) {
                        usb_connected.push({
                            type: deviceType,
                            name: "Arduino",
                            port: port.comName
                        });
                    }
                });
            })
            .catch(errors => {
                console.log("Error =>", errors);
            });

        return usb_connected;
    }
};


module.exports = serialportFunctions;