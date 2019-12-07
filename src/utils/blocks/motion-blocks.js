"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque MOTION.
 */

let url_documentation = "http://167.99.3.232/get_started",
    motionFunctions = {
        block: Blockly => {
            Blockly.Blocks["motion_sensor_block"] = {
                init: function() {
                    this.appendValueInput("sensor_mov_pin")
                        .appendField(
                            new Blockly.FieldImage(
                                "../../images/blocks/sensor-motion.png",
                                40,
                                40,
                                "*"
                            )
                        )
                        .setCheck("Number")
                        .appendField("Crear Sensor Movimiento");
                    this.setInputsInline(true);
                    this.setOutput(true);
                    this.setColour(90);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["motion_sensor_fire"] = {
                init: function() {
                    this.appendStatementInput("code_motion_sensor")
                        .setCheck(null)
                        .appendField("Se detecto movimiento")
                        .appendField(
                            new Blockly.FieldVariable("SENSOR_MOVIMIENTO"),
                            "current_motion"
                        );
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(90);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["motion_sensor_out_fire"] = {
                init: function() {
                    this.appendStatementInput("code_motion_sensor")
                        .setCheck(null)
                        .appendField("No se detecto movimiento")
                        .appendField(
                            new Blockly.FieldVariable("SENSOR_MOVIMIENTO"),
                            "current_motion"
                        );
                    this.setInputsInline(true);
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(90);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["motion_sensor_block"] = block => {
                let pin = Blockly.JavaScript.valueToCode(
                    block,
                    "sensor_mov_pin",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `
                    new five.Motion(
                        {
                            pin:${pin},
                            custom:{
                                type:'SENSOR-MOTION'
                            }
                        })`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };
            Blockly.JavaScript["motion_sensor_fire"] = block => {
                let motion = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_motion"),
                    Blockly.Variables.NAME_TYPE
                );
                let motion_code = Blockly.JavaScript.statementToCode(block, "code_motion_sensor");
                let code = `
                        ${motion}.on('motionstart',function(){
                            ${motion_code}
                        })`;
                return code;
            };
            Blockly.JavaScript["motion_sensor_out_fire"] = block => {
                let motion = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_motion"),
                    Blockly.Variables.NAME_TYPE
                );
                let motion_code = Blockly.JavaScript.statementToCode(block, "code_motion_sensor");
                let code = `
                    ${motion}.on('motionend',function(){
                        ${motion_code}
                    })`;
                return code;
            };
        }
    };

module.exports = motionFunctions;
