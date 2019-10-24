"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío del Motor
 */
let menuFunctions = {
    menu: () => {
        return {
            test_1: {
                code: `
                    <xml id="toolbox">
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
                            <category name="Motores" colour="225">
                                <block type="motor_new">
                                </block>
                                <block type="motor_spin"></block>
                                <block type="motor_stop"></block>
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
                    `
            }
        };
    }
};

module.exports = menuFunctions;
