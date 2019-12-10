"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el tutorial de Variables y tipo de datos
 */
let menuFunctions = {
    menu: () => {
        return {
            test_1: {
                code: `
                    <xml> 
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>`
            },
            test_2: {
                code: `
                    <xml>
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="210"> 
                            <category name="Número" colour="210">
                                <block type="math_number">
                                    <field name="NUM">123</field>
                                </block>
                                <block type="math_arithmetic">
                                    <value name="A">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <value name="B">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                                <block type="math_random_int">
                                    <value name="FROM">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <value name="TO">
                                        <shadow type="math_number">
                                            <field name="NUM">100</field>
                                        </shadow>
                                    </value>
                                </block>
                            </category> 
                            </category>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>`
            },
            test_3: {
                code: `
                    <xml>
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="210"> 
                            <category name="Texto" colour="210">
                                <block type="text"></block>
                                <block type="text_changeCase">
                                    <value name="TEXT">
                                        <shadow type="text">
                                            <field name="TEXT">abc</field>
                                        </shadow>
                                    </value>
                                </block>
                                <block type="text_trim">
                                    <value name="TEXT">
                                        <shadow type="text">
                                            <field name="TEXT">abc</field>
                                        </shadow>
                                    </value>
                                </block>
                            </category> 
                            </category>
                            <sep gap="32"></sep> 
                        </category>
                    </xml>`
            },
            test_4: {
                code: `
                    <xml>
                        <category name="Bloques" colour="270"> 
                            <category name="Variables" custom="VARIABLE" colour="210"/>
                            <sep gap="32"></sep> 
                            <category name="Tipos de datos" colour="210"> 
                                <category name="Número" colour="210">
                                    <block type="math_number">
                                        <field name="NUM">123</field>
                                    </block>
                                    <block type="math_arithmetic">
                                        <value name="A">
                                            <shadow type="math_number">
                                                <field name="NUM">1</field>
                                            </shadow></value>
                                        <value name="B">
                                            <shadow type="math_number">
                                                <field name="NUM">1</field>
                                            </shadow>
                                        </value>
                                    </block>
                                    <block type="math_random_int">
                                        <value name="FROM">
                                            <shadow type="math_number">
                                                <field name="NUM">1</field>
                                            </shadow>
                                        </value>
                                        <value name="TO">
                                            <shadow type="math_number">
                                                <field name="NUM">100</field>
                                            </shadow>
                                        </value>
                                    </block>
                                </category>
                                <sep gap="32"></sep> 
                                <category name="Texto" colour="210">
                                    <block type="text"></block>
                                    <block type="text_changeCase">
                                        <value name="TEXT">
                                            <shadow type="text">
                                                <field name="TEXT">abc</field>
                                            </shadow>
                                        </value>
                                    </block>
                                    <block type="text_trim">
                                        <value name="TEXT">
                                            <shadow type="text">
                                                <field name="TEXT">abc</field>
                                            </shadow>
                                        </value>
                                    </block>
                                </category>
                                <sep gap="32"></sep> 
                                <category name="Lista" colour="210">
                                    <block type="lists_create_empty"></block>
                                    <block type="lists_create_with"></block>
                                </category>
                                <sep gap="32"></sep> 
                            </category> 
                        </category>
                    </xml>`
            }
        };
    }
};

module.exports = menuFunctions;