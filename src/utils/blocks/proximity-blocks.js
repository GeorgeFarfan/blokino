"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque SENSOR-PROXIMIDAD.
 */

let url_documentation = "http://167.99.3.232/documentation",
    proximityFunctions = {
        block: Blockly => {
            Blockly.Blocks["proximity_block"] = {
                init: function() {
                    this.appendValueInput("sensor_prox_pin")
                        .appendField(
                            new Blockly.FieldImage(
                                "../../images/blocks/sensor-proximity.png",
                                40,
                                40,
                                "*"
                            )
                        )
                        .setCheck("String")
                        .appendField("Crear Sensor de Proximidad");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(150);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["proximity_block_with_freq"] = {
                init: function() {
                    this.appendValueInput("sensor_prox_pin")
                        .setCheck("String")
                        .appendField("Crear Sensor de proximidad");
                    this.appendValueInput("frecuency")
                        .setCheck("Number")
                        .appendField("Tiempo")
                        .appendField(
                            new Blockly.FieldDropdown([
                                ["milisegundos", "miliseconds"],
                                ["segundos", "seconds"]
                            ]),
                            "current_time"
                        )
                        .appendField("Frecuencia");
                    this.setInputsInline(true);
                    this.setOutput(true);
                    this.setColour(150);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["proximity_capture_distances"] = {
                init: function() {
                    this.appendStatementInput("code_capture_distances")
                        .setCheck(null)
                        .appendField("Capturar distancia")
                        .appendField(
                            new Blockly.FieldVariable("sensor_proximidad"),
                            "current_sensor_proximity"
                        );
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["proximity_capture_very_close"] = {
                init: function() {
                    this.appendStatementInput("code_capture_very_close")
                        .setCheck(null)
                        .appendField("Muy Cerca");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["proximity_capture_near"] = {
                init: function() {
                    this.appendStatementInput("code_capture_near")
                        .setCheck(null)
                        .appendField("Cerca");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["proximity_capture_far"] = {
                init: function() {
                    this.appendStatementInput("code_capture_far")
                        .setCheck(null)
                        .appendField("Lejos");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["proximity_capture_far_away"] = {
                init: function() {
                    this.appendStatementInput("code_capture_far_away")
                        .setCheck(null)
                        .appendField("Muy Lejos");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(150);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["proximity_block"] = block => {
                let pin = Blockly.JavaScript.valueToCode(
                    block,
                    "sensor_prox_pin",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `
                        new five.Proximity(
                            {controller:'GP2Y0A21YK',
                            pin:${pin},
                            freq:1000,
                            custom:{
                                type:'SENSOR-PROXIMITY',
                                pin: ${pin}
                            }
                        })
                `;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };

            Blockly.JavaScript["proximity_block_with_freq"] = block => {
                let pin = Blockly.JavaScript.valueToCode(
                    block,
                    "sensor_prox_pin",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let time = 0;
                let dropdown_time_period = block.getFieldValue("current_time");
                let number_time = Blockly.JavaScript.valueToCode(
                    block,
                    "frecuency",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                switch (dropdown_time_period) {
                    case "miliseconds":
                        time = number_time * 100;
                        break;
                    case "seconds":
                        time = number_time * 1000;
                        break;
                    case "minutes":
                        time = number_time * 60000;
                        break;
                }

                let code = `new five.Proximity({
                    controller:'GP2Y0A21YK',
                    pin:${pin},
                    freq:${time}
                })`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };

            Blockly.JavaScript["proximity_capture_distances"] = block => {
                let sensor_proximity = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_sensor_proximity"),
                    Blockly.Variables.NAME_TYPE
                );
                let proximity_code = Blockly.JavaScript.statementToCode(
                    block,
                    "code_capture_distances"
                );
                let code =
                    `${sensor_proximity}.on('data',function(){ 
                        let cm = Math.round(this.cm);` +
                    `${proximity_code}
                })`;
                return code;
            };
            Blockly.JavaScript["proximity_capture_very_close"] = block => {
                let proximity_code = Blockly.JavaScript.statementToCode(
                    block,
                    "code_capture_very_close"
                );
                let code = `if(cm > 0 && cm < 12){
                    ${proximity_code}
                }`;
                return code;
            };

            Blockly.JavaScript["proximity_capture_near"] = block => {
                let proximity_code = Blockly.JavaScript.statementToCode(block, "code_capture_near");
                let code = `if(cm > 12 && cm < 20){
                    ${proximity_code}
                }`;
                return code;
            };
            Blockly.JavaScript["proximity_capture_far"] = block => {
                let proximity_code = Blockly.JavaScript.statementToCode(block, "code_capture_far");
                let code = `if(cm > 20 && cm < 35){
                    ${proximity_code}
                }`;
                return code;
            };
            Blockly.JavaScript["proximity_capture_far_away"] = block => {
                let proximity_code = Blockly.JavaScript.statementToCode(
                    block,
                    "code_capture_far_away"
                );
                let code = `if(cm > 35 && cm < 70){
                    ${proximity_code}
                }`;
                return code;
            };
        }
    };

module.exports = proximityFunctions;
