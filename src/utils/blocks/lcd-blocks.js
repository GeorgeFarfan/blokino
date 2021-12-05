'use strict';

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene la configuracion del bloque LCD.
 */

const url_documentation = 'http://blokino-platform.com/get_started',
  lcdFunctions = {
    block: (Blockly) => {
      Blockly.Blocks['lcd_create_two_rows'] = {
        init: function () {
          this.appendDummyInput()
            .appendField(
              new Blockly.FieldImage(
                '../../images/blocks/display-lcd.png',
                40,
                40,
                '*',
              ),
            )
            .appendField('Crear Consola de Mensajes de 2 filas');
          this.setInputsInline(true);
          this.setOutput(true);
          this.setColour(75);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_create_four_rows'] = {
        init: function () {
          this.appendDummyInput()
            .appendField(
              new Blockly.FieldImage(
                '../../images/blocks/display-lcd.png',
                40,
                40,
                '*',
              ),
            )
            .appendField('Crear Consola de Mensajes de 4 filas');
          this.setInputsInline(true);
          this.setOutput(true);
          this.setColour(90);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_two_rows_no_scroll'] = {
        init: function () {
          this.appendDummyInput().appendField('Escribir un mensaje');
          this.appendDummyInput()
            .appendField('En una consola de 2 Filas')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_console',
            );
          this.appendValueInput('msg_first_row')
            .setCheck('String')
            .appendField('Mensaje de la primer fila');
          this.appendValueInput('msg_second_row')
            .setCheck('String')
            .appendField('Mensaje de la segunda fila');
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(75);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_two_rows_switch'] = {
        init: function () {
          this.appendDummyInput().appendField(
            'Escribir un Mensaje segun la fila',
          );
          this.appendDummyInput()
            .appendField('En una consola de 2 filas')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_lcd',
            );
          this.appendDummyInput()
            .appendField('Posicion')
            .appendField(
              new Blockly.FieldDropdown([
                ['Arriba', 'first'],
                ['Abajo', 'second'],
              ]),
              'current_row',
            );
          this.appendValueInput('message')
            .setCheck('String')
            .appendField('Mensaje a mostrarse en la consola');
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(75);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };

      Blockly.Blocks['lcd_four_rows_switch'] = {
        init: function () {
          this.appendDummyInput().appendField(
            'Escribir un Mensaje segun la fila',
          );
          this.appendDummyInput()
            .appendField('En una consola de 4 filas')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_lcd',
            );
          this.appendDummyInput()
            .appendField('Posicion')
            .appendField(
              new Blockly.FieldDropdown([
                ['Primer fila', 'first'],
                ['Segunda fila', 'second'],
                ['Tercer fila', 'third'],
                ['Cuarta fila', 'fourth'],
              ]),
              'current_row',
            );
          this.appendValueInput('message')
            .setCheck('String')
            .appendField('Mensaje a mostrarse en la consola');
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(90);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_two_rows_scroll'] = {
        init: function () {
          this.appendDummyInput().appendField(
            'Escribir un Mensaje con Desplazamiento',
          );
          this.appendDummyInput()
            .appendField('En una consola de 2 filas')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_lcd',
            );
          this.appendDummyInput()
            .appendField('Velocidad en la que se ven los mensajes')
            .appendField(
              new Blockly.FieldDropdown([
                ['Lento', 'low'],
                ['Despacio', 'medium'],
                ['Rapido', 'fast'],
              ]),
              'current_velocity',
            );
          this.appendValueInput('first_message')
            .setCheck('String')
            .appendField('Mensaje de la primer fila');
          this.appendValueInput('second_message')
            .setCheck('String')
            .appendField('Mensaje de la segunda fila');
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(75);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_four_rows_scroll'] = {
        init: function () {
          this.appendDummyInput().appendField(
            'Escribir un Mensaje con Desplazamiento',
          );
          this.appendDummyInput()
            .appendField('En una consola de 4 filas')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_lcd',
            );
          this.appendDummyInput()
            .appendField('Velocidad en la que se ven los mensajes')
            .appendField(
              new Blockly.FieldDropdown([
                ['Lento', 'low'],
                ['Despacio', 'medium'],
                ['Rapido', 'fast'],
              ]),
              'current_velocity',
            );
          this.appendValueInput('first_message')
            .setCheck('String')
            .appendField('Mensaje de la primer fila');
          this.appendValueInput('second_message')
            .setCheck('String')
            .appendField('Mensaje de la segunda fila');
          this.appendValueInput('third_message')
            .setCheck('String')
            .appendField('Mensaje de la tercer fila');
          this.appendValueInput('fourth_message')
            .setCheck('String')
            .appendField('Mensaje de la cuarta fila');
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(90);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_four_rows_no_scroll'] = {
        init: function () {
          this.appendDummyInput().appendField('Escribir un mensaje');
          this.appendDummyInput()
            .appendField('En una consola de 4 filas')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_display',
            );
          this.appendValueInput('first_message')
            .setCheck(null)
            .appendField('Mensaje de la primer fila');
          this.appendValueInput('second_message')
            .setCheck(null)
            .appendField('Mensaje de la segunda fila');
          this.appendValueInput('third_message')
            .setCheck(null)
            .appendField('Mensaje de la tercer fila');
          this.appendValueInput('fourth_message')
            .setCheck(null)
            .appendField('Mensaje de la cuarta fila');
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(90);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_clean'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Limpiar Consola')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_lcd',
            );
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(60);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_off'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Apagar consola')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_lcd',
            );
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(60);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };
      Blockly.Blocks['lcd_on'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Encender Consola')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'current_lcd',
            );
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(60);
          this.setTooltip('');
          this.setHelpUrl(url_documentation);
        },
      };

      Blockly.Blocks['lcd_character'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Caracter')
            .appendField(
              new Blockly.FieldDropdown([
                ['1', '1'],
                ['2', '2'],
                ['3', '3'],
                ['4', '4'],
                ['5', '5'],
                ['6', '6'],
                ['7', '7'],
                ['8', '8'],
                ['9', '9'],
                ['10', '10'],
                ['11', '11'],
                ['12', '12'],
                ['13', '13'],
                ['14', '14'],
                ['15', '15'],
                ['16', '16'],
                ['17', '17'],
                ['18', '18'],
                ['19', '19'],

                ['Circulo', 'circle'],
                ['Circulo con un punto', 'cdot'],
                ['Dona', 'donut'],

                ['Pelota', 'ball'],
                ['Cuadrado', 'square'],
                ['Cuadrado con punto', 'sdot'],

                ['Cuadrado lleno', 'fbox'],
                ['Cuadrado chico', 'sbox'],
                ['Cuadrado chico lleno', 'sfbox'],

                ['Flecha derecha', 'arrowright'],
                ['Flecha izquierda', 'arrowleft'],

                ['Euro', 'euro'],
                ['Centavo', 'cent'],

                ['Altavoz', 'speaker'],
                ['Sonido', 'sound'],

                ['X', 'x'],
                ['Objetivo', 'target'],

                ['Puntero derecha', 'pointerright'],
                ['Puntero arriba', 'pointerup'],
                ['Puntero izquierda', 'pointerleft'],
                ['Puntero abajo', 'pointerdown'],

                ['Flecha arriba derecha', 'arrowne'],
                ['Flecha arriba izquierda', 'arrownw'],
                ['Flecha abajo izquierda', 'arrowsw'],
                ['Flecha abajo derecha', 'arrowse'],

                ['Campana', 'bell'],
                ['Sonrisa', 'smile'],
                ['Nota', 'note'],
                ['Reloj', 'clock'],

                ['Corazon', 'heart'],
                ['Pato', 'duck'],
                ['Checkeado', 'check'],
                ['Hombre parado', 'runningb'],

                ['Hombre corriendo', 'runninga'],
              ]),
              'character',
            );
          this.setInputsInline(false);
          this.setOutput(true, null);
          this.setColour(60);
          this.setTooltip('');
          this.setHelpUrl('');
        },
      };

      Blockly.Blocks['use_character'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Agregar el caracter ')
            .appendField(
              new Blockly.FieldDropdown([
                ['1', ':1:'],
                ['2', ':2:'],
                ['3', ':3:'],
                ['4', ':4:'],
                ['5', ':5:'],
                ['6', ':6:'],
                ['7', ':7:'],
                ['8', ':8:'],
                ['9', ':9:'],
                ['10', ':10:'],
                ['11', ':11:'],
                ['12', ':12:'],
                ['13', ':13:'],
                ['14', ':14:'],
                ['15', ':15:'],
                ['16', ':16:'],
                ['17', ':17:'],
                ['18', ':18:'],
                ['19', ':19:'],
                ['Circulo', ':circle:'],
                ['Circulo con un punto', ':cdot:'],
                ['Dona', ':donut:'],
                ['Pelota', ':ball:'],
                ['Cuadrado', ':square:'],
                ['Cuadrado con punto', ':sdot:'],
                ['Cuadrado lleno', ':fbox:'],
                ['Cuadrado chico', ':sbox:'],
                ['Cuadrado chico lleno', ':sfbox:'],
                ['Flecha derecha', ':arrowright:'],
                ['Flecha izquierda', ':arrowleft:'],
                ['Euro', ':euro:'],
                ['Centavo', ':cent:'],
                ['Altavoz', ':speaker:'],
                ['Sonido', ':sound:'],
                ['X', ':x:'],
                ['Objetivo', ':target:'],
                ['Puntero derecha', ':pointerright:'],
                ['Puntero arriba', ':pointerup:'],
                ['Puntero izquierda', ':pointerleft:'],
                ['Puntero abajo', ':pointerdown:'],
                ['Flecha arriba derecha', ':arrowne:'],
                ['Flecha arriba izquierda', ':arrownw:'],
                ['Flecha abajo izquierda', ':arrowsw:'],
                ['Flecha abajo derecha', ':arrowse:'],
                ['Campana', ':bell:'],
                ['Sonrisa', ':smile:'],
                ['Nota', ':note:'],
                ['Reloj', ':clock:'],
                ['Corazon', ':heart:'],
                ['Pato', ':duck:'],
                ['Checkeado', ':check:'],
                ['Hombre parado', ':runningb:'],
                ['Hombre corriendo', ':runninga:'],
              ]),
              'character',
            );
          this.setInputsInline(false);
          this.setOutput(true, null);
          this.setColour(60);
          this.setTooltip('');
          this.setHelpUrl('');
        },
      };

      Blockly.Blocks['lcd_load_character'] = {
        init: function () {
          this.appendDummyInput()
            .appendField('Asignar a la ')
            .appendField(
              new Blockly.FieldVariable('CONSOLA_DE_MENSAJES'),
              'lcd',
            );
          this.appendValueInput('character')
            .setCheck(null)
            .appendField('el caracter');
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(60);
          this.setTooltip('');
          this.setHelpUrl('');
        },
      };

      Blockly.Blocks['lcd_composite_characters'] = {
        init: function () {
          this.appendValueInput('characters')
            .setCheck('Array')
            .appendField('Conjunto de caracteres');
          this.setOutput(true, null);
          this.setColour(30);
          this.setTooltip('');
          this.setHelpUrl('');
        },
      };
    },
    code: (Blockly) => {
      Blockly.JavaScript['lcd_create_two_rows'] = (block) => {
        let code = `new five.LCD(
                    { controller:'PCF8574A',
                      custom:{
                        type: 'LCD',
                        scroll: false,
                        messages: {
                            first_row:'',
                            second_row:''
                        }
                     }
                })`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript['lcd_create_four_rows'] = (block) => {
        let code = `new five.LCD(
                                { controller:'PCF8574',
                                  custom:{ 
                                      type:'LCD',
                                      scroll: false,
                                      messages:{
                                          first_row:'',
                                          second_row:''
                                      }
                                  }
                                })`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript['lcd_two_rows_switch'] = (block) => {
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_lcd'),
          Blockly.Variables.NAME_TYPE,
        );
        let row = block.getFieldValue('current_row');
        let message = Blockly.JavaScript.valueToCode(
          block,
          'message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `
                    switch('${row}'){
                        case 'first':
                            ${lcd}.cursor(0,0).print(${message});
                            break;
                        case 'second':
                            ${lcd}.cursor(1,0).print(${message});
                            break;
                    };
                `;
        return code;
      };

      Blockly.JavaScript['lcd_four_rows_switch'] = (block) => {
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_lcd'),
          Blockly.Variables.NAME_TYPE,
        );
        let row = block.getFieldValue('current_row');
        let message = Blockly.JavaScript.valueToCode(
          block,
          'message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `
                    switch('${row}'){
                        case 'first': 
                            ${lcd}.cursor(0,0).print(${message}.substr(0, 20));
                            break; 
                        case 'second': 
                            ${lcd}.cursor(1,0).print(${message}.substr(0, 20));
                            break; 
                        case 'third': 
                            ${lcd}.cursor(2,0).print(${message}.substr(0, 20));
                            break; 
                        case 'fourth': 
                            ${lcd}.cursor(3,0).print(${message}.substr(0, 20));
                            break;
                    }; 
                `;
        return code;
      };

      Blockly.JavaScript['lcd_clean'] = (block) => {
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_lcd'),
          Blockly.Variables.NAME_TYPE,
        );
        let code = `${lcd}.clear();`;
        return code;
      };

      Blockly.JavaScript['lcd_off'] = (block) => {
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_lcd'),
          Blockly.Variables.NAME_TYPE,
        );
        let code = `${lcd}.off();`;
        return code;
      };

      Blockly.JavaScript['lcd_on'] = (block) => {
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_lcd'),
          Blockly.Variables.NAME_TYPE,
        );
        let code = `${lcd}.on();`;
        return code;
      };

      Blockly.JavaScript['lcd_two_rows_scroll'] = (block) => {
        let current_velocity = block.getFieldValue(
          'current_velocity',
        );
        let time = 0;
        switch (current_velocity) {
          case 'low':
            time = 2000;
            break;
          case 'medium':
            time = 1500;
            break;
          case 'fast':
            time = 1000;
            break;
        }
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_lcd'),
          Blockly.Variables.NAME_TYPE,
        );
        let first_message = Blockly.JavaScript.valueToCode(
          block,
          'first_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let second_message = Blockly.JavaScript.valueToCode(
          block,
          'second_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );

        let code =
          `scrollMessage(${first_message},${second_message});` +
          `function scrollMessage(){
                            let phases = [];
                            phases.push(${first_message});
                            phases.push(${second_message});
                            ${lcd}.custom.scroll = true;
                            ${lcd}.cursor(0, 0).print(${first_message}.substr(0, 20));
                            ${lcd}.custom.messages.first_row = ${first_message};
                            ${lcd}.cursor(1, 0).print(${second_message}.substr(0, 20));
                            ${lcd}.custom.messages.second_row = ${second_message};
                            setInterval(()=>{
                                ${lcd}.clear();
                                if(${first_message}.length>20){
                                    ${lcd}.cursor(0, 0).print(scroll('first'))
                                }else{
                                    ${lcd}.cursor(0,0).print(${first_message});
                                };
                                if(${second_message}.length>20){
                                    ${lcd}.cursor(1, 0).print(scroll('second'))
                                }else{
                                    ${lcd}.cursor(1,0).print(${second_message})
                                };
                            },${time});
                            
                            function scroll(row){ 
                                let phase ='';
                                let letter ='';
                                switch(row){
                                    case 'first': 
                                        letter = phases[0].substr(0, 1);
                                        phases[0] = (phases[0] + letter).substr(1, (phases[0] + letter).length);
                                        phase = phases[0];
                                        phase.slice(0, 1);
                                    break;
                                    case 'second': 
                                        letter = phases[1].substr(0, 1);
                                        phases[1] = (phases[1] + letter).substr(1, (phases[1] + letter).length);
                                        phase = phases[1];
                                        phase.slice(0, 1);
                                    break;
                                }
                                return phase.substr(0,20)}
                            }; `;

        return code;
      };

      Blockly.JavaScript['lcd_four_rows_scroll'] = (block) => {
        let velocity_type = block.getFieldValue('current_velocity');
        let velocity = 0;
        switch (velocity_type) {
          case 'low':
            velocity = 2000;
            break;
          case 'medium':
            velocity = 1500;
            break;
          case 'fast':
            velocity = 1000;
            break;
        }
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_lcd'),
          Blockly.Variables.NAME_TYPE,
        );
        let first_message = Blockly.JavaScript.valueToCode(
          block,
          'first_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let second_message = Blockly.JavaScript.valueToCode(
          block,
          'second_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let third_message = Blockly.JavaScript.valueToCode(
          block,
          'third_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let fourth_message = Blockly.JavaScript.valueToCode(
          block,
          'fourth_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );

        let code = `
                    let phases = [];
                    phases.push(${first_message});
                    phases.push(${second_message});
                    phases.push(${third_message});
                    phases.push(${fourth_message}); 
                    ${lcd}.custom.scroll = true;
                    ${lcd}.cursor(0,0).print(${first_message}.substr(0,20));
                    ${lcd}.cursor(1,0).print(${second_message}.substr(0,20)); 
                    ${lcd}.cursor(2,0).print(${third_message}.substr(0,20)); 
                    ${lcd}.cursor(3,0).print(${fourth_message}.substr(0,20)); 
                    setInterval(() => { 
                            ${lcd}.clear();
                            if(${first_message}.length>20){
                                ${lcd}.cursor(0,0).print(scroll('first'))
                            }else{
                                ${lcd}.cursor(0,0).print(${first_message})
                            }; 
                            if(${second_message}.length>20){ 
                                ${lcd}.cursor(1,0).print(scroll('second'))
                            }else{ 
                                ${lcd}.cursor(1,0).print(${second_message})
                            }; 
                            if(${third_message}.length>20){ 
                                ${lcd}.cursor(2,0).print(scroll('third'))
                            }else{ 
                                ${lcd}.cursor(2,0).print(${third_message})
                            }; 
                            if(${fourth_message}.length>20){ 
                                ${lcd}.cursor(3,0).print(scroll('fourth'))
                            }else{ 
                                ${lcd}.cursor(3,0).print(${fourth_message})
                            }
                        },${velocity});
                     
                    function scroll(row){ 
                        let phase ='';
                        let letter =''; 
                        switch(row){ 
                            case 'first': 
                                letter = phases[0].substr(0,1);
                                phases[0] = (phases[0] + letter).substr(1,(phases[0] + letter).length);
                                phase = phases[0];
                                phase.slice(0,1);
                            break; 
                            case 'second': 
                                letter = phases[1].substr(0,1);
                                phases[1] = (phases[1] + letter).substr(1,(phases[1] + letter).length);
                                phase = phases[1];
                                phase.slice(0,1);
                            break; 
                            case 'third': 
                                letter = phases[2].substr(0,1);
                                phases[2] = (phases[2] + letter).substr(1,(phases[2] + letter).length);
                                phase = phases[2];
                                phase.slice(0,1);
                            break; 
                            case 'fourth': 
                                letter = phases[3].substr(0,1);
                                phases[3] = (phases[3] + letter).substr(1,(phases[3] + letter).length);
                                phase = phases[3];
                                phase.slice(0,1);
                            break; 
                        } 
                        return phase.substr(0,20)
                    } 
                `;

        return code;
      };

      Blockly.JavaScript['lcd_two_rows_no_scroll'] = (block) => {
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_console'),
          Blockly.Variables.NAME_TYPE,
        );
        let first_message = Blockly.JavaScript.valueToCode(
          block,
          'msg_first_row',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let second_message = Blockly.JavaScript.valueToCode(
          block,
          'msg_second_row',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `
                        ${lcd}.cursor(0,0).print(${first_message});
                        ${lcd}.custom.messages.first_row=${first_message};
                        ${lcd}.cursor(1,0).print(${second_message});
                        ${lcd}.custom.messages.second_row=${second_message};
                        `;
        return code;
      };

      Blockly.JavaScript['lcd_four_rows_no_scroll'] = (block) => {
        let lcd = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('current_display'),
          Blockly.Variables.NAME_TYPE,
        );
        let first_message = Blockly.JavaScript.valueToCode(
          block,
          'first_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let second_message = Blockly.JavaScript.valueToCode(
          block,
          'second_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let third_message = Blockly.JavaScript.valueToCode(
          block,
          'third_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let fourth_message = Blockly.JavaScript.valueToCode(
          block,
          'fourth_message',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `
                    ${lcd}.cursor(0,0).print(${first_message}.substr(0,20));
                    ${lcd}.cursor(1,0).print(${second_message}.substr(0,20));
                    ${lcd}.cursor(2,0).print(${third_message}.substr(0,20));
                    ${lcd}.cursor(3,0).print(${fourth_message}.substr(0,20));
                    `;
        return code;
      };
      Blockly.JavaScript['lcd_character'] = function (block) {
        let character = block.getFieldValue('character');
        let code = `"${character}"`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript['use_character'] = function (block) {
        let character = block.getFieldValue('character');
        let code = `"${character}"`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript['lcd_load_character'] = function (block) {
        let LCD = Blockly.JavaScript.variableDB_.getName(
          block.getFieldValue('lcd'),
          Blockly.Variables.NAME_TYPE,
        );
        let character = Blockly.JavaScript.valueToCode(
          block,
          'character',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `${LCD}.useChar${character};\n`;
        return code;
      };
      Blockly.JavaScript['lcd_composite_characters'] = function (
        block,
      ) {
        let characters = Blockly.JavaScript.valueToCode(
          block,
          'characters',
          Blockly.JavaScript.ORDER_ATOMIC,
        );
        let code = `${characters}.toString().replace(/\,/g, " ")`;
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
    },
  };

module.exports = lcdFunctions;
