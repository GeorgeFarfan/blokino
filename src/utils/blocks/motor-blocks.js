"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque MOTOR.
 */

const url_documentation = "http://blokino-platform.com/get_started",
  motorFunctions = {
    block: (Blockly) => {
      Blockly.Blocks["motor_new"] = {
        init: function () {
          this.appendValueInput("pin")
            .appendField(
              new Blockly.FieldImage(
                "../../images/blocks/motor.png",
                40,
                40,
                "*"
              )
            )
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Crear Motor");
          this.setInputsInline(true);
          this.setOutput(true);
          this.setColour(225);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["motor_spin"] = {
        init: function () {
          this.appendDummyInput()
            .appendField("Girar ")
            .appendField(new Blockly.FieldVariable("MOTOR"), "current_motor")
            .appendField("Velocidad")
            .appendField(new Blockly.FieldNumber(1, 1, 255), "velocity");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(225);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["motor_spin_code"] = {
        init: function () {
          this.appendStatementInput("code_spin_motor")
            .setCheck(null)
            .appendField("Mientras gira el ")
            .appendField(new Blockly.FieldVariable("MOTOR"), "current_motor")
            .appendField(" ejecutar");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(225);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["motor_stop"] = {
        init: function () {
          this.appendDummyInput()
            .appendField("Detener")
            .appendField(new Blockly.FieldVariable("MOTOR"), "current_motor");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(225);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["motor_stop_code"] = {
        init: function () {
          this.appendStatementInput("code_stop")
            .setCheck(null)
            .appendField("Mientras se detiene el")
            .appendField(new Blockly.FieldVariable("MOTOR"), "current_motor")
            .appendField(" ejecutar");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(225);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["motor_spin_verify"] = {
        init: function () {
          this.appendDummyInput()
            .appendField("Verificar si esta girando")
            .appendField(new Blockly.FieldVariable("MOTOR"), "current_motor");
          this.setOutput(true, null);
          this.setColour(225);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
    },
    code: (Blockly) => {
      Blockly.JavaScript["motor_new"] = (block) => {
        let pin = Blockly.JavaScript.valueToCode(
          block,
          "pin",
          Blockly.JavaScript.ORDER_ATOMIC
        );
        let code = `
                        new five.Motor(
                            {
                                pin:${pin},
                                custom:{
                                    type:'MOTORS',
                                    code:''
                                }
                            }
                        )`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript["motor_spin"] = (block) => {
        let motor = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue("current_motor"),
          Blockly.Variables.NAME_TYPE
        );
        let velocity = block.getFieldValue("velocity");
        let code = `${motor}.start(${velocity})`;
        return code;
      };
      Blockly.JavaScript["motor_spin_code"] = (block) => {
        let motor = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue("current_motor"),
          Blockly.Variables.NAME_TYPE
        );
        let motor_code = Blockly.JavaScript.statementToCode(
          block,
          "code_spin_motor"
        );
        let code = `${motor}.on('start',function(){${motor_code}})`;
        return code;
      };
      Blockly.JavaScript["motor_stop"] = (block) => {
        let motor = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue("current_motor"),
          Blockly.Variables.NAME_TYPE
        );
        let code = `${motor}.stop()`;
        return code;
      };
      Blockly.JavaScript["motor_stop_code"] = (block) => {
        let motor = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue("current_motor"),
          Blockly.Variables.NAME_TYPE
        );
        let motor_code = Blockly.JavaScript.statementToCode(block, "code_stop");
        let code = `${motor}.on('stop',function(){${motor_code}})`;

        return code;
      };
      Blockly.JavaScript["motor_spin_verify"] = (block) => {
        let motor = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue("current_motor"),
          Blockly.Variables.NAME_TYPE
        );
        let code = `${motor}.isOn`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
    },
  };

module.exports = motorFunctions;
