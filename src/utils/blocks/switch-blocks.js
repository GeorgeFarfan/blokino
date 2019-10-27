"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque SWITCH.
 */

let url_documentation = "http://167.99.3.232/documentation",
    switchFunctions = {
        block: Blockly => {
            Blockly.Blocks["switch_new_block"] = {
                init: function() {
                    this.appendValueInput("switch_pin")
                        .appendField(
                            new Blockly.FieldImage("../../images/blocks/switch.png", 40, 40, "*")
                        )
                        .setCheck("Number")
                        .appendField("Crear INTERRUPTOR");
                    this.setInputsInline(true);
                    this.setOutput(true, null);
                    this.setColour(330);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
            Blockly.Blocks["switch_open"] = {
                init: function() {
                    this.appendStatementInput("code_switch_open")
                        .setCheck(null)
                        .appendField("Abrir Interruptor")
                        .appendField(new Blockly.FieldVariable("INTERRUPTOR"), "current_switch");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(330);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };

            Blockly.Blocks["switch_close"] = {
                init: function() {
                    this.appendStatementInput("code_switch_close")
                        .setCheck(null)
                        .appendField("Cerrar Interruptor")
                        .appendField(new Blockly.FieldVariable("INTERRUPTOR"), "current_switch");
                    this.setPreviousStatement(true, null);
                    this.setNextStatement(true, null);
                    this.setColour(330);
                    this.setTooltip("");
                    this.setHelpUrl(url_documentation);
                }
            };
        },
        code: Blockly => {
            Blockly.JavaScript["switch_new_block"] = block => {
                let pin = Blockly.JavaScript.valueToCode(
                    block,
                    "switch_pin",
                    Blockly.JavaScript.ORDER_ATOMIC
                );
                let code = `
                        new five.Switch(
                            {
                                pin:${pin},
                                custom:{
                                    type:'SWITCH'
                                }
                            }
                        )`;
                return [code, Blockly.JavaScript.ORDER_NONE];
            };
            Blockly.JavaScript["switch_open"] = block => {
                let current_switch = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_switch"),
                    Blockly.Variables.NAME_TYPE
                );
                let switch_code = Blockly.JavaScript.statementToCode(block, "code_switch_open");
                let code = `
                        ${current_switch}.on('open',function(){
                            ${switch_code}
                        })
                        `;
                return code;
            };

            Blockly.JavaScript["switch_close"] = block => {
                let current_switch = Blockly.JavaScript.variableDB_.getName(
                    block.getFieldValue("current_switch"),
                    Blockly.Variables.NAME_TYPE
                );
                let swtch_code = Blockly.JavaScript.statementToCode(block, "code_switch_close");
                let code = `
                            ${current_switch}.on('close',function(){
                                ${swtch_code}
                            })`;
                return code;
            };
        }
    };

module.exports = switchFunctions;
