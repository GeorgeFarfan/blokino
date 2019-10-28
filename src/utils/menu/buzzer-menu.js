"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío de los Zumbadores
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
                                <block type="math_number">
                                    <field name="NUM"></field>
                                </block>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE"></category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Zumbador" colour="345">
                                <block type="buzzer"></block>
                                <block type="buzzer_play_with_sound"></block>
                            </category>
                            <sep gap="32"></sep>
                        </category>
                    </xml>
                    `
            },
            test_2: {
                code: `
                    <xml id="blokino-toolbox">
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="210">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block>
                                </category>
                                <sep gap="32"></sep>
                                <category name="Lista" colour="255">
                                    <block type="lists_create_with"></block>
                                </category>
                                <sep gap="32"></sep>
                            </category> 
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE">
                                </category>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Parlante" colour="345">
                                <block type="buzzer"/>
                                <block type="buzzer_new_note"/>
                                <block type="buzzer_new_note_mute"/>
                                <block type="buzzer_play_with_notes"/>
                            </category> 
                        </category>
                    </xml>`
            }
        };
    }
};

module.exports = menuFunctions;
