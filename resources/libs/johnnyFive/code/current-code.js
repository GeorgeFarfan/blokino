"use strict";
const jc = require("json-cycle"),
    chalk = require("chalk"),
    log = console.log;
let five = require("johnny-five");
try {
    let board = new five.Board({ port: "/dev/ttyUSB0", repl: false, debug: false });
    board.on("ready", () => {
        try {
            let NOTAS, SENSOR, brazo_izquierdo, brazo_derecho, ZUMBADOR;
            /**
             * Describe esta función...
             */
            function Detectar_movimientos() {
                SENSOR.on("data", function() {
                    let cm = Math.round(this.cm);
                    if (cm > 0 && cm < 12) {
                        brazo_derecho.custom.code.state = "sweep-to-from";
                        brazo_derecho.custom.code.positions.to = 90;
                        brazo_derecho.custom.code.positions.from = 180;
                        brazo_derecho.sweep({
                            range: [90, 180],
                            interval: 500
                        });
                        brazo_izquierdo.custom.code.state = "sweep-to-from";
                        brazo_izquierdo.custom.code.positions.to = 90;
                        brazo_izquierdo.custom.code.positions.from = 180;
                        brazo_izquierdo.sweep({
                            range: [90, 180],
                            interval: 500
                        });
                        ZUMBADOR.custom.code.status = "playing";
                        ZUMBADOR.custom.code.notes = NOTAS;
                        ZUMBADOR.play({
                            song: NOTAS,
                            tempo: 0
                        });
                    }
                    if (cm > 12 && cm < 20) {
                        brazo_derecho.custom.code.state = "stopped";
                        brazo_derecho.stop();
                        brazo_izquierdo.custom.code.state = "stopped";
                        brazo_izquierdo.stop();
                    }
                });
            }
            NOTAS = [["A", "1", "1"], ["C", "3", "2"], ["E", "5", "3"]];
            brazo_izquierdo = new five.Servo({
                pin: 13,
                custom: {
                    type: "SERVOMOTOR",
                    code: {
                        state: "",
                        position: 0,
                        positions: {
                            to: 0,
                            from: 0
                        }
                    }
                }
            });
            brazo_derecho = new five.Servo({
                pin: 12,
                custom: {
                    type: "SERVOMOTOR",
                    code: {
                        state: "",
                        position: 0,
                        positions: {
                            to: 0,
                            from: 0
                        }
                    }
                }
            });
            ZUMBADOR = new five.Piezo({
                pin: 2,
                custom: {
                    type: "BUZZER",
                    code: {
                        state: "",
                        notes: "",
                        tempo: "",
                        grade: ""
                    }
                }
            });
            SENSOR = new five.Proximity({
                controller: "GP2Y0A21YK",
                pin: "A0",
                freq: 1000
            });
            Detectar_movimientos();
            process.send(
                JSON.stringify({
                    type: "Exito",
                    description: "El programa se ejecutó correctamente",
                    code: jc.decycle()
                })
            );
        } catch (error) {
            process.send(JSON.stringify({ type: "Error", description: error.toString() }));
        }
    });
    board.on("error", err => {
        process.send(JSON.stringify({ type: "ErrorJ5", description: err.class }));
    });
    board.on("exit", event => {
        log(chalk.black.bgRed.bold("EXIT - Arduino device was disconnected..."));
    });
    board.on("message", event => {
        log(
            chalk.black.bgYellow.bold(
                "MESSAGE - you receive a message: ",
                event.type,
                event.class,
                event.message
            )
        );
    });
    board.on("info", event => {
        log(
            chalk.black.bgYellow.bold(
                "INFORMATION - you receive a information message: ",
                event.class,
                event.message
            )
        );
    });
    board.on("fail", event => {
        log(
            chalk.black.bgYellow.bold(
                "ERROR - you receive a fail message: ",
                event.class,
                event.message
            )
        );
    });
    board.on("warn", event => {
        log(
            chalk.black.bgYellow.bold(
                "WARNING - you receive a warn message: ",
                event.class,
                event.message
            )
        );
    });
} catch (error) {
    process.send(JSON.stringify({ type: "Error", description: error.toString() }));
}
