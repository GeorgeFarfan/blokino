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
                            <category name="Tipos de datos" colour="210">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block>
                                </category>
                            </category>
                            <sep gap="32"></sep>
                            <category name="LEDs" colour="20">
                                <block type="led"></block>
                                <block type="blink"></block>
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
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="210">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block>
                                </category>
                            </category>
                            <sep gap="32"></sep> 
                            <category name="LEDs" colour="20">
                                <block type="led"></block>
                                <block type="blink"></block>
                            </category>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>`
            },
            test_3: {
                code: `
                    <xml id="toolbox">
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"/><sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="210">
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM"></field>
                                    </block></category>
                                </category>
                                <sep gap="32"></sep> 
                                <category name="Procedimientos" colour="100">
                                    <category name="Crear Procedimiento" colour="100" custom="PROCEDURE"/> 
                                </category>
                                <sep gap="32"></sep> 
                                <category name="LEDs" colour="20">
                                    <block type="led"/>
                                    <block type="blink"/>
                                </category>
                                <sep gap="32"></sep> 
                        </category>
                    </xml>`
            }
        };
    }
};

module.exports = menuFunctions;
