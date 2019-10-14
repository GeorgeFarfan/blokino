"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este archivo contiene toda la configuracion, que necesita el desafío del MATRIX-LEDS.
 */

let validate_result_code = [[], [], []],
    current_test = "test_1",
    variables = [],
    conditions = {
        test_1: false,
        test_2: false,
        test_3: false
    },
    validator = require("../../utils/validators/matrix-validator"),
    currentCallback = null;

$("#newVariableModal").on("hidden.bs.modal", () => {
    let new_variable = $("#new-variable")
        .val()
        .replace(/\s/g, "");
    if (new_variable === "MATRIX_LEDS") {
        if (!variables.includes(new_variable)) {
            if (utils.allLetters(new_variable)) {
                currentCallback(new_variable);
                variables.push(new_variable);
                $("#new-variable").val("");
            } else {
                utils.setModalError(
                    "",
                    messages.variable(new_variable).error.msg,
                    messages.variable(new_variable).error.btn
                );
            }
        } else {
            utils.setModalError(
                "",
                messages.variable(new_variable).duplicate.msg,
                messages.variable(new_variable).duplicate.btn
            );
        }
    } else {
        if (new_variable.length == 0) {
            utils.setModalError(
                "",
                messages.variable(new_variable).empty.msg,
                messages.variable(new_variable).empty.btn
            );
        } else {
            utils.setModalError(
                "",
                messages.variable(new_variable).incorrect.msg,
                messages.variable(new_variable).incorrect.btn
            );
        }
    }
});

// Modal para eliminar variables.
Blockly.confirm = (object, callback) => {
    currentCallback = callback;
    if (object.type === "delete_variable") {
        variables = variables.filter(var_blocks => var_blocks !== object.variable);
        $("#modal-variable-remove").modal();
        $("#removeVariableTitle").html(`<h2>${object.message}</h2>`);
    }
};

document.getElementById("executeCode").addEventListener("click", function(event) {
    let code = utils.formatExecuteCode(Blockly.JavaScript.workspaceToCode(workspace));
    let device = $("input:radio[name=radios]:checked").val();
    if (device !== undefined) {
        if (current_test == "test_1") {
            let validate_code = utils.esprimaValidation(code);
            if (validate_code !== "Error") {
                validate_result_code = validator.matrix(validate_code.body, validate_result_code);
                let validate_result = validate_result_code.filter(
                    led_filter =>
                        led_filter["type"] === "SCREEN-MATRIX" &&
                        led_filter["name"] === "MATRIX_LEDS"
                );
                if (validate_result.length == 1) {
                    conditions[current_test] = true;
                    utils.openModalWaiting("Verificando el programa ...");
                    ipcRenderer.send("execute", {
                        code: code,
                        device: device,
                        validate_code: {
                            variable: [`MATRIX_LEDS`]
                        },
                        channel: "channel_one"
                    });
                    ipcRenderer.on("channel_one", (event, result_data) => {
                        if (
                            result_data == "ErrorCallBack" ||
                            result_data == "Error" ||
                            result_data == "ErrorJ5"
                        ) {
                            modalChallenges(
                                result_data,
                                current_test,
                                3,
                                conditions.test_1 && conditions.test_2 && conditions.test_3
                            );
                        } else {
                            let data = JSON.parse(result_data);
                            if (
                                data.variables_status.custom.code == "Hola mundo !!!" &&
                                data.variables_status.pins.clock == 4 &&
                                data.variables_status.pins.cs == 3 &&
                                data.variables_status.pins.data == 2
                            ) {
                                modalChallenges(
                                    data.status,
                                    current_test,
                                    3,
                                    conditions.test_1 && conditions.test_2 && conditions.test_3
                                );
                            } else {
                                modalChallenges(
                                    "Error",
                                    current_test,
                                    3,
                                    conditions.test_1 && conditions.test_2 && conditions.test_3
                                );
                            }
                        }
                    });
                } else {
                    utils.setModalError(
                        "",
                        messages.code(1).execute_title.msg,
                        messages.code().btn
                    );
                    log(chalk.white.bgRed.bold(logs_msg.code().dont_work));
                }
            } else {
                modalErrorSyntax(
                    "Error",
                    current_test,
                    3,
                    conditions.test_1 && conditions.test_2 && conditions.test_3
                );
            }
        }
        if (current_test == "test_2") {
            let validate_code = utils.esprimaValidation(code);
            if (validate_code !== "Error") {
                validate_result_code = validator.matrix(validate_code.body, validate_result_code);
                let validate_result = validate_result_code.filter(
                    led_filter =>
                        led_filter["type"] === "SCREEN-MATRIX" &&
                        led_filter["name"] === "MATRIX_LEDS"
                );
                if (validate_result.length == 1) {
                    conditions[current_test] = true;
                    utils.openModalWaiting("Verificando el programa ...");
                    ipcRenderer.send("execute", {
                        code: code,
                        device: device,
                        validate_code: {
                            variable: [`MATRIX_LEDS`]
                        },
                        channel: "channel_two"
                    });
                    ipcRenderer.on("channel_two", (event, result_data) => {
                        if (
                            result_data == "ErrorCallBack" ||
                            result_data == "Error" ||
                            result_data == "ErrorJ5"
                        ) {
                            modalChallenges(
                                result_data,
                                current_test,
                                3,
                                conditions.test_1 && conditions.test_2 && conditions.test_3
                            );
                        } else {
                            let data = JSON.parse(result_data);
                            if (
                                data.variables_status.custom.code == "surprise" &&
                                data.variables_status.pins.clock == 4 &&
                                data.variables_status.pins.cs == 3 &&
                                data.variables_status.pins.data == 2
                            ) {
                                modalChallenges(
                                    data.status,
                                    current_test,
                                    3,
                                    conditions.test_1 && conditions.test_2 && conditions.test_3
                                );
                            } else {
                                modalChallenges(
                                    "Error",
                                    current_test,
                                    3,
                                    conditions.test_1 && conditions.test_2 && conditions.test_3
                                );
                            }
                        }
                    });
                } else {
                    utils.setModalError(
                        "",
                        messages.code(2).execute_title.msg,
                        messages.code().btn
                    );
                    log(chalk.white.bgRed.bold(logs_msg.code().dont_work));
                }
            } else {
                modalErrorSyntax(
                    "Error",
                    current_test,
                    3,
                    conditions.test_1 && conditions.test_2 && conditions.test_3
                );
            }
        }
        if (current_test == "test_3") {
            let validate_code = utils.esprimaValidation(code);
            if (validate_code !== "Error") {
                validate_result_code = validator.matrix(validate_code.body, validate_result_code);
                let validate_result = validate_result_code.filter(
                    led_filter =>
                        led_filter["type"] === "SCREEN-MATRIX" &&
                        led_filter["name"] === "MATRIX_LEDS"
                );
                if (validate_result.length == 1) {
                    conditions[current_test] = true;
                    utils.openModalWaiting("Verificando el programa ...");
                    ipcRenderer.send("execute", {
                        code: code,
                        device: device,
                        validate_code: {
                            variable: [`MATRIX_LEDS`]
                        },
                        channel: "channel_tree"
                    });
                    ipcRenderer.on("channel_tree", (event, result_data) => {
                        if (
                            result_data == "ErrorCallBack" ||
                            result_data == "Error" ||
                            result_data == "ErrorJ5"
                        ) {
                            modalChallenges(
                                result_data,
                                current_test,
                                3,
                                conditions.test_1 && conditions.test_2 && conditions.test_3
                            );
                        } else {
                            let data = JSON.parse(result_data);
                            if (
                                data.variables_status.custom.code.toString() ===
                                    "00000000,01100000,01101000,00001110,00001110,01101000,01100000,00000000" &&
                                data.variables_status.pins.clock == 4 &&
                                data.variables_status.pins.cs == 3 &&
                                data.variables_status.pins.data == 2
                            ) {
                                modalChallenges(
                                    data.status,
                                    current_test,
                                    3,
                                    conditions.test_1 && conditions.test_2 && conditions.test_3
                                );
                            } else {
                                modalChallenges(
                                    "Error",
                                    current_test,
                                    3,
                                    conditions.test_1 && conditions.test_2 && conditions.test_3
                                );
                            }
                        }
                    });
                } else {
                    utils.setModalError(
                        "",
                        messages.code(3).execute_title.msg,
                        messages.code().btn
                    );
                    log(chalk.white.bgRed.bold(logs_msg.code().dont_work));
                }
            } else {
                modalErrorSyntax(
                    "Error",
                    current_test,
                    3,
                    conditions.test_1 && conditions.test_2 && conditions.test_3
                );
            }
        }
    } else {
        log(chalk.black.bgRed.bold(logs_msg.devices().dont_selected));
        utils.setModalError("", messages.devices().not_found.msg, messages.devices().not_found.btn);
    }
});

document.getElementById("openModalExecuteCode").addEventListener("click", function(event) {
    let code = utils.formatExecuteCode(Blockly.JavaScript.workspaceToCode(workspace));
    let result = utils.esprimaValidation(code);
    if (result.body.length == 0) {
        log(chalk.black.bgRed.bold(logs_msg.code().empty));
        utils.setModalError(
            "",
            messages.code().empty_execute.msg,
            messages.code().empty_execute.btn
        );
    } else {
        childProcess.devices(createSetupDevices);
    }
});

$("#openModalExecuteCode").click(() => {
    let code = utils.formatExecuteCode(Blockly.JavaScript.workspaceToCode(workspace));
    let result = utils.esprimaValidation(code);
    if (result !== "Error") {
        if (result.body.length == 0) {
            log(chalk.black.bgRed.bold(logs_msg.code().empty));
            utils.setModalError(
                "",
                messages.code().empty_execute.msg,
                messages.code().empty_execute.btn
            );
        } else {
            childProcess.devices(createSetupDevices);
        }
    } else {
        modalErrorSyntax(
            "Error",
            current_test,
            3,
            conditions.test_1 && conditions.test_2 && conditions.test_3
        );
    }
});

$("#carouselExampleControls").bind("slide.bs.carousel", function(e) {
    if (
        e.relatedTarget.dataset.pos === "test_1" ||
        e.relatedTarget.dataset.pos === "test_2" ||
        e.relatedTarget.dataset.pos === "test_3"
    ) {
        variables = [];
        current_test = e.relatedTarget.dataset.pos;
        clearScene(e.relatedTarget.dataset.pos, "ChallengeMATRIXLEDS");
    }
});
