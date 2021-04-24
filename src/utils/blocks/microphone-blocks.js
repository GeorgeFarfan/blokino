"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion de los bloques del MICROFONO.
 */

const url_documentation = "http://blokino-platform.com/documentation",
  microphoneFunctions = {
    block: (Blockly) => {
      Blockly.Blocks["microphone"] = {
        init: function () {
          this.appendDummyInput()
            .appendField("Crear Microfono")
            .appendField(
              new Blockly.FieldDropdown([
                ["A0", "A0"],
                ["A1", "A1"],
                ["A2", "A2"],
                ["A3", "A3"],
                ["A4", "A4"],
                ["A5", "A5"],
                ["A6", "A6"],
                ["A7", "A7"],
                ["A8", "A8"],
                ["A9", "A9"],
                ["A10", "A10"],
                ["A11", "A11"],
                ["A12", "A12"],
                ["A13", "A13"],
                ["A14", "A14"],
                ["A15", "A15"],
              ]),
              "pin_analog"
            );
          this.setOutput(true, null);
          this.setColour(15);
          this.setTooltip("");
          this.setHelpUrl("");
        },
      };
      Blockly.Blocks["microphone_detect"] = {
        init: function () {
          this.appendDummyInput().appendField(
            new Blockly.FieldVariable("MICROFONO"),
            "microphone"
          );
          this.appendStatementInput("active")
            .setCheck(null)
            .appendField("Se detecto sonido");
          this.appendStatementInput("no_active")
            .setCheck(null)
            .appendField("No se detecto nada");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(15);
          this.setTooltip("");
          this.setHelpUrl("");
        },
      };
    },
    code: (Blockly) => {
      Blockly.JavaScript["microphone"] = function (block) {
        let pin_analog = block.getFieldValue("pin_analog");
        let code = `
                    new five.Sensor({
                        pin: "${pin_analog}",
                        freq: 750
                    })
                `;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript["microphone_detect"] = function (block) {
        let microphone = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue("microphone"),
          Blockly.Variables.NAME_TYPE
        );
        let statements_active = Blockly.JavaScript.statementToCode(
          block,
          "active"
        );
        let statements_no_active = Blockly.JavaScript.statementToCode(
          block,
          "no_active"
        );

        let code = `
                ${microphone}.on("data", function() {
                    if(this.value > 9){
                        ${statements_active}
                    }else{
                        ${statements_no_active}
                    }
                });\n`;
        return code;
      };
    },
  };

module.exports = microphoneFunctions;
