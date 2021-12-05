'use strict';

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío del Teclado
 */
let menuFunctions = {
  menu: () => {
    return {
      test_1: {
        code: `
                    <xml id="blokino-toolbox">
                        <category name="Bloques" colour="270">
                                <category name="Variables" custom="VARIABLE" colour="210">
                                </category>
                                <sep gap="32"></sep>
                                <category name="Tipos de datos" colour="120">
                                    <category name="Número" colour="210">
                                        <block type="math_number">
                                            <field name="NUM"></field>
                                        </block>
                                    </category>
                                </category>
                                <sep gap="32"></sep>
                                    <category name="Procedimientos" colour="270">
                                        <category name="Crear Procedimiento" colour="270" custom="PROCEDURE">
                                        </category>
                                    </category>
                                <sep gap="32"></sep>
                                <category name="LEDs" colour="20">
                                    <block type="led"></block>
                                    <block type="blink"></block>
                                    <block type="stop_led"></block>
                                </category>
                                <sep gap="32"></sep>
                                <category name="Servomotor" colour="180">
                                    <block type="servo_motor"></block>
                                    <block type="servo_sweep"></block>
                                    <block type="servo_sweep_to"></block>
                                    <block type="servo_stop"></block>
                                </category>
                                <sep gap="32"></sep>
                                <category name="Teclado" colour="345">
                                    <block type="keypad_block"></block>
                                    <block type="keypad_press"></block>
                                    <block type="keypad_press_key"></block>
                                </category>
                                <sep gap="32"></sep>
                        </category>
                    </xml>
                    `,
      },
    };
  },
};

module.exports = menuFunctions;
