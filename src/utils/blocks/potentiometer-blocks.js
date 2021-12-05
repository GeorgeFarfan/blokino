'use strict';

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque POTENCIOMETRO.
 */

const url_documentation = 'http://blokino-platform.com/get_started',
  potentiometerFunctions = {
    block: (Blockly) => {
      Blockly.Blocks['potentiometer'] = {
        init: function () {
          this.appendValueInput('potentiometer_pin')
            .appendField(
              new Blockly.FieldImage(
                '../../images/blocks/potentiometer.png',
                40,
                40,
                '*',
              ),
            )
            .setCheck('String')
            .appendField('Crear Potenciometro');
          this.setInputsInline(true);
          this.setOutput(true, null);
          this.setColour(240);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['potentiometer_blink'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Girar')
            .appendField(
              new Blockly.FieldVariable('POTENCIOMETRO'),
              'current_potentiometer',
            )
            .appendField('ajustar velocidad de Parpadeo del Led')
            .appendField(
              new Blockly.FieldVariable('LED'),
              'current_led',
            );
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(240);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['potentiometer_brightness'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Girar ')
            .appendField(
              new Blockly.FieldVariable('POTENCIOMETRO'),
              'current_potentiometer',
            );
          this.appendDummyInput()
            .appendField(' Ajustar Brillo del Led')
            .appendField(
              new Blockly.FieldVariable('LED'),
              'current_led',
            );
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['potentiometer_brightness_list'] = {
        init: function () {
          this.appendValueInput('current_list_leds')
            .setCheck('Array')
            .appendField('Girar ')
            .appendField(
              new Blockly.FieldVariable('POTENCIOMETRO'),
              'current_potentiometer',
            )
            .appendField('ajustar brillo de los Leds');
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(210);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['potentiometer_blink_list'] = {
        init: function () {
          this.appendValueInput('current_list_leds')
            .setCheck('Array')
            .appendField('Girar ')
            .appendField(
              new Blockly.FieldVariable('POTENCIOMETRO'),
              'current_potentiometer',
            )
            .appendField('ajustar parpadeo de los Leds');
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(210);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['potentiometer_servo_movement'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Girar')
            .appendField(
              new Blockly.FieldVariable('POTENCIOMETRO'),
              'current_potentiometer',
            );
          this.appendDummyInput()
            .appendField(' Mover Servomotor ')
            .appendField(
              new Blockly.FieldVariable('SERVOMOTOR'),
              'current_servo',
            );
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(210);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['potentiometer_servo_list_mov'] = {
        init: function () {
          this.appendValueInput('current_list_servos')
            .setCheck('Array')
            .appendField('Girar ')
            .appendField(
              new Blockly.FieldVariable('POTENCIOMETRO'),
              'current_potentiometer',
            )
            .appendField('servos');
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(210);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
    },
    code: (Blockly) => {
      Blockly.JavaScript['potentiometer'] = (block) => {
        let pin = Blockly.JavaScript.valueToCode(
          block,
          'potentiometer_pin',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `
                        new five.Sensor({
                            pin:${pin},
                            freq: 250,
                            custom:{
                                type: 'POTENTIOMETER',
                                pin:${pin}
                            }
                        })
                `;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };

      Blockly.JavaScript['potentiometer_blink'] = (block) => {
        let potentiometer = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_potentiometer'),
          Blockly.Variables.NAME_TYPE,
        );
        let led = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_led'),
          Blockly.Variables.NAME_TYPE,
        );
        let code = `
                    spinBlink(${led}); 
                    function spinBlink(${led}){
                        let old_data;
                        ${potentiometer}.on('data',function(){
                            if(this.value !== old_data){
                                old_data = this.value;
                                ${led}.blink(this.value)
                            }
                        })
                    }
                    `;
        return code;
      };
      Blockly.JavaScript['potentiometer_brightness'] = (block) => {
        let potentiometer = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_potentiometer'),
          Blockly.Variables.NAME_TYPE,
        );
        let led = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_led'),
          Blockly.Variables.NAME_TYPE,
        );
        let code = `
                    let old_data;
                    ${potentiometer}.on('data',function(){
                        if(this.value / 10 !== old_data){
                            old_data = this.value / 10;
                            ${led}.brightness(this.value / 10)
                        }
                    })
                `;
        return code;
      };
      Blockly.JavaScript['potentiometer_brightness_list'] = (
        block,
      ) => {
        let potentiometer = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_potentiometer'),
          Blockly.Variables.NAME_TYPE,
        );
        let leds = Blockly.JavaScript.valueToCode(
          block,
          'current_list_leds',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `
                        let old_data;
                        ${potentiometer}.on('data',function(){
                            if(this.value / 10 !== old_data){
                                old_data = this.value / 10;
                                ${leds}.forEach(currentLed =>{
                                    currentLed.brightness(this.value / 10)
                                })
                            }
                        })
                    `;
        return code;
      };
      Blockly.JavaScript['potentiometer_blink_list'] = (block) => {
        let potentiometer = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_potentiometer'),
          Blockly.Variables.NAME_TYPE,
        );
        let leds = Blockly.JavaScript.valueToCode(
          block,
          'current_list_leds',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `
                let old_data;
                ${potentiometer}.on('data',function(){
                    if(this.value ===0 && this.value < 20){ 
                        ${leds}.forEach(currentLed =>{
                            currentLed.stop();
                            currentLed.off()
                        })
                    } else{
                        if(this.value / 3 !== old_data){
                            old_data = this.value / 3;
                            ${leds}.forEach(currentLed =>{
                                currentLed.blink(this.value / 3)
                            })
                        }
                    }
                })`;
        return code;
      };
      Blockly.JavaScript['potentiometer_servo_movement'] = (
        block,
      ) => {
        let potentiometer = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_potentiometer'),
          Blockly.Variables.NAME_TYPE,
        );
        let servo = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_servo'),
          Blockly.Variables.NAME_TYPE,
        );
        let code = `
                    ${servo}.to(0);
                    ${potentiometer}.on('data', function(){
                        ${servo}.to(Math.round(this.value / 5))
                    })`;
        return code;
      };
      Blockly.JavaScript['potentiometer_servo_list_mov'] = (
        block,
      ) => {
        let potentiometer = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_potentiometer'),
          Blockly.Variables.NAME_TYPE,
        );
        let servos = Blockly.JavaScript.valueToCode(
          block,
          'current_list_servos',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `
                   ${servos}.forEach(currentServo =>{
                       currentServo.to(0)
                    });
                    ${potentiometer}.on('data',function(){
                        ${servos}.forEach(currentServo =>{
                            currentServo.to(Math.round(this.value / 5))
                        }) 
                    })
                   `;
        return code;
      };
    },
  };

module.exports = potentiometerFunctions;
