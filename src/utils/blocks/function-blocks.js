"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque de funciones útiles.
 */

const moment = require("moment");
moment.locale("es");

const url_documentation = "http://blokino-platform.com/get_started",
  functionUtils = {
    block: (Blockly) => {
      Blockly.Blocks["timer"] = {
        init: function () {
          this.appendStatementInput("timer_block")
            .setCheck(null)
            .appendField("Esperar un momento");
          this.appendDummyInput()
            .appendField("Tiempo ")
            .appendField(
              new Blockly.FieldNumber(1, 0, 100),
              "current_value_time"
            );
          this.appendDummyInput()
            .appendField(" ")
            .appendField(
              new Blockly.FieldDropdown([
                ["milisegundos", "miliseconds"],
                ["segundos", "seconds"],
                ["minutos", "minutes"],
              ]),
              "current_time"
            );
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(345);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["interval_time"] = {
        init: function () {
          this.appendStatementInput("code_inteval")
            .setCheck(null)
            .appendField("Ejecutar cada ")
            .appendField(
              new Blockly.FieldNumber(0, 1, 1000, 1),
              "current_value_timer"
            )
            .appendField(
              new Blockly.FieldDropdown([
                ["milisegundos", "miliseconds"],
                ["segundos", "seconds"],
                ["minutos", "minutes"],
              ]),
              "current_timer"
            );
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(345);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["getDay"] = {
        init: function () {
          this.appendDummyInput().appendField("Día actual");
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["getMonth"] = {
        init: function () {
          this.appendDummyInput().appendField("Mes actual");
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["getYear"] = {
        init: function () {
          this.appendDummyInput().appendField("Año actual");
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks["getDate"] = {
        init: function () {
          this.appendDummyInput().appendField("Obtener fecha");
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip("");
          this.setHelpUrl(url_documentation);
        },
      };
    },
    code: (Blockly) => {
      Blockly.JavaScript["timer"] = (block) => {
        let timer_code = Blockly.JavaScript.statementToCode(
          block,
          "timer_block"
        );
        let timer_value = block.getFieldValue("current_value_time");
        let timer_type = block.getFieldValue("current_time");
        let time = 0;
        switch (timer_type) {
          case "miliseconds":
            time = parseInt(timer_value) * 100;
            break;
          case "seconds":
            time = parseInt(timer_value) * 1000;
            break;
          case "minutes":
            time = parseInt(timer_value) * 60000;
            break;
        }
        let code = `setTimeout(() => {${timer_code}},${time});\n`;
        return code;
      };
      Blockly.JavaScript["interval_time"] = (block) => {
        let interval_time = block.getFieldValue("current_value_timer");
        let interval_type = block.getFieldValue("current_timer");
        let interval_code = Blockly.JavaScript.statementToCode(
          block,
          "code_inteval"
        );
        let time = 0;
        switch (interval_type) {
          case "miliseconds":
            time = parseInt(interval_time) * 100;
            break;
          case "seconds":
            time = parseInt(interval_time) * 1000;
            break;
          case "minutes":
            time = parseInt(interval_time) * 60000;
            break;
        }
        let code = `setInterval(function(){${interval_code}},${time});\n`;
        return code;
      };
      Blockly.JavaScript["getDay"] = (block) => {
        let code = `"${moment().format("dddd")}"`;
        return code;
      };
      Blockly.JavaScript["getMonth"] = (block) => {
        let code = `"${moment().format("MMMM")}"`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript["getYear"] = (block) => {
        let code = `"${moment().format("YYYY")}"`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript["getDate"] = (block) => {
        let code = `"${moment().format("MMMM/D/YYYY")}"`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
    },
  };

module.exports = functionUtils;
