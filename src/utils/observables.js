"use strict";

/**
 * @author Jorge Farfan Coaguila
 * @description Este modulo contiene los observables de la aplicación
 */

const RXJS = require("rxjs");
let observable, obs_code_program, instances_program;

let observables_functions = {
    createObservable: () => {
        observable = new RXJS.Subject();
    },
    createObsCodeProgram: () => {
        obs_code_program = new RXJS.Subject();
    },
    createInstanceProgram: () => {
        instances_program = new RXJS.Subject();
    },
    getInstanceProgram: () => {
        return instances_program;
    },
    getObservable: () => {
        return observable;
    },
    getObsCodeProgram: () => {
        return obs_code_program;
    },
    resetObservables: () => {
        observable = new RXJS.Subject();
    }
};
module.exports = observables_functions;
