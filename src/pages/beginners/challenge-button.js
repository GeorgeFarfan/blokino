"use strict";

/**
 * @author Jorge Farfan
 * @description Este archivo contiene todo lo relacionado al desafío de los botones.
 */

let validate_result_code = [[], [], []],
    current_test = "test_1",
    variables = [],
    deviceChecked = "",
    conditions = {
        test_1: false,
        test_2: false,
        test_3: false
    },
    currentCallback = null,
    validator = require("../../utils/validators/button-validator");

$("#newVariableModal").on("hidden.bs.modal", () => {
    let new_variable = $("#new-variable")
        .val()
        .replace(/\s/g, "");
    if (
        new_variable === "LED" ||
        new_variable === "boton_encender_led" ||
        new_variable === "boton_detener_led" ||
        new_variable === "pulsador_detener_led" ||
        new_variable === "interruptor_led"
    ) {
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

$("#executeCode").click(() => {
    let code = utils.formatExecuteCode(Blockly.JavaScript.workspaceToCode(workspace));
    let device = $("input:radio[name=radios]:checked").val();
    if (device !== undefined) {
        if (current_test == "test_1") {
            let validate_code = utils.esprimaValidation(code);
            if (validate_code !== "Error") {
                validate_result_code = validator.button(validate_code.body, validate_result_code);
                let validate_result = validate_result_code.filter(
                    button_filter =>
                        button_filter["name"] === "LED" ||
                        button_filter["name"] === "boton_encender_led" ||
                        button_filter["name"] === "boton_detener_led"
                );
                if (validate_result.length == 3) {
                    conditions[current_test] = true;
                    utils.openModalWaiting("Verificando el programa ...");
                    ipcRenderer.send("execute", {
                        code: code,
                        device: device,
                        validate_code: {
                            variable: [`LED`, `boton_encender_led`, `boton_detener_led`]
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
                            let result = data.variables_status.filter(
                                led_filter =>
                                    (led_filter["custom"]["type"] === "LED" &&
                                        led_filter["pin"] === 13) ||
                                    (led_filter["custom"]["type"] === "BUTTON" &&
                                        led_filter["pin"] === 2) ||
                                    (led_filter["custom"]["type"] === "BUTTON" &&
                                        led_filter["pin"] === 8)
                            );
                            if (result.length == 3) {
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
                validate_result_code = validator.button(validate_code.body, validate_result_code);
                let validate_result = validate_result_code.filter(
                    button_filter =>
                        button_filter["name"] === "LED" ||
                        button_filter["name"] === "boton_encender_led" ||
                        button_filter["name"] === "pulsador_detener_led"
                );
                if (validate_result.length == 3) {
                    conditions[current_test] = true;
                    utils.openModalWaiting("Verificando el programa ...");
                    ipcRenderer.send("execute", {
                        code: code,
                        device: device,
                        validate_code: {
                            variable: [`LED`, `boton_encender_led`, `pulsador_detener_led`]
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
                            let result = data.variables_status.filter(
                                led_filter =>
                                    (led_filter["custom"]["type"] === "LED" &&
                                        led_filter["pin"] === 13) ||
                                    (led_filter["custom"]["type"] === "BUTTON" &&
                                        led_filter["pin"] === 2) ||
                                    (led_filter["custom"]["type"] === "BUMPER" &&
                                        led_filter["pin"] === 8)
                            );
                            if (result.length == 3) {
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
                validate_result_code = validator.button(validate_code.body, validate_result_code);

                let validate_result = validate_result_code.filter(
                    button_filter =>
                        button_filter["name"] === "LED" ||
                        button_filter["name"] === "interruptor_led"
                );

                if (validate_result.length == 2) {
                    conditions[current_test] = true;
                    utils.openModalWaiting("Verificando el programa ...");
                    ipcRenderer.send("execute", {
                        code: code,
                        device: device,
                        validate_code: {
                            variable: [`LED`, `interruptor_led`]
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
                            let result = data.variables_status.filter(
                                led_filter =>
                                    (led_filter["custom"]["type"] === "LED" &&
                                        led_filter["pin"] === 13) ||
                                    (led_filter["custom"]["type"] === "SWITCH" &&
                                        led_filter["pin"] === 12)
                            );
                            if (result.length == 2) {
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

$("#openModalExecuteCode").click(() => {
    let code = utils.formatExecuteCode(Blockly.JavaScript.workspaceToCode(workspace));
    let result = utils.esprimaValidation(code);
    if (result !== "Error") {
        if (result.body.length == 0) {
            log(chalk.black.bgRed.bold("No hay código para ejecutar ..."));
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
        clearScene(e.relatedTarget.dataset.pos, "ChallengeBUTTON");
    }
});
