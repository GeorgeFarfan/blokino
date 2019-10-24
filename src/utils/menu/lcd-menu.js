"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío de los LEDs
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
                                    <category name="Texto" colour="210">
                                        <block type="text"></block>
                                    </category>
                                </category>
                                <sep gap="32"></sep>
                                <category name="Procedimientos" colour="270">
                                    <category name="Crear Procedimiento" colour="270" custom="PROCEDURE"></category>
                                </category>
                                <sep gap="32"></sep>
                                <category name="Consola de mensajes" colour="75">
                                    <block type="lcd_create_two_rows"></block>
                                    <block type="lcd_two_rows_no_scroll"></block>
                                </category>
                                <sep gap="32"></sep>
                            </category>
                        </xml>
                        `
            },
            test_2: {
                code: `
                    <xml id="toolbox">
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210">
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="120">
                                <category name="Texto" colour="210">
                                    <block type="text"/>
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE">
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="Consola de mensajes" colour="75">
                                <block type="lcd_create_two_rows"></block>
                                <block type="lcd_two_rows_scroll"></block>
                            </category>
                            <sep gap="32"></sep>
                        </category>
                        </xml>
                        `
            },
            test_3: {
                code: `
                    <xml id="toolbox">
                        <category name="Bloques" colour="270"> 
                            <sep gap="32"></sep> 
                            <category name="Variables" custom="VARIABLE" colour="210"></category>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="120">
                                <category name="Texto" colour="210">
                                    <block type="text"/>
                                </category>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Procedimientos" colour="270">
                                <category name="Crear Procedimiento" colour="270" custom="PROCEDURE">
                                </category>
                                <sep gap="32"></sep>
                                <category name="Procedimientos útiles" colour="270">
                                    <block type="timer"></block>
                                </category>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="Consola de mensajes" colour="75">
                                <block type="lcd_create_two_rows"></block>
                                <block type="lcd_two_rows_scroll"></block>
                                <block type="lcd_clean"></block>
                            </category>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>`
            }
        };
    }
};

module.exports = menuFunctions;
