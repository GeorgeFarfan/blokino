"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene las Keys del KEYPAD.
 */

let keypadFunctions = {
    config: () => {
        return `
            {
                controller:'MPR121_KEYPAD',
                keys: 
                    [["*", "0", "#"], ["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"]],
                sensitivity:0.25,
                custom:{type:'KEYPAD'}
            }
        `;
    }
};

module.exports = keypadFunctions;
