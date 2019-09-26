"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los menus para el desafío de los LEDs
 */
let programBase = {
    application: () => {
        return {
            program: `
                <xml xmlns="http://www.w3.org/1999/xhtml">
                    <block type="program" id="blokino-app" movable="false" x="110" y="270">
                        <field name="current_name">Nombre del programa ...</field>
                    </block>
                </xml>
                `
        };
    }
};

module.exports = programBase;
