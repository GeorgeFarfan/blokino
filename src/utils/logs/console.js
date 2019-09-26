"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este módulo contiene los mensajes de todo Blokino.
 */

module.exports = {
    variable: variable => {
        return {
            error: {
                msg:
                    "El nombre de la variable es incorrecto. Los nombres válidos estan definidos en las instrucciones.",
                btn: "Volvelo a intentar"
            }
        };
    },
    devices: () => {
        return {
            dont_selected: "No se seleccionó ningún dispositivo ..."
        };
    },
    code: test => {
        return {
            empty: "No hay código para ejecutar ...",
            dont_work: "Este código no cumple con ninguna prueba."
        };
    }
};
