'use strict';

/**
 * @author jorge F
 * @description Este modulo contiene el manejo los child process.
 */

const fs = require('fs'),
  structure = require('./j5/j5-structure'),
  path = require('path'),
  jc = require('json-cycle'),
  path_current_program = '/code/current-code.js';

let nodes = [];
let instance_utils = {
  executeProgram: (code, device, emitMessage, variable, channel) => {
    let file_name = path.join(__dirname, '/code/current-code.js');
    let program_code = structure.program(
      device,
      code,
      variable,
      channel,
    );
    let codeJ5 = structure.programJ5(device, code);
    // Creo la instancia en un child process
    fs.writeFile(file_name, program_code, (error) => {
      if (!error) {
        let child = require('child_process').fork(
          require.resolve(path.join(__dirname, path_current_program)),
          {},
        );
        nodes.push(child);
        child.on('message', (message) => {
          let validation = JSON.parse(message);
          console.log('Validacion => ', validation);
          switch (validation.type) {
            case 'ErrorJ5':
              emitMessage.sender.send(channel, 'ErrorJ5');
              break;
            case 'Error':
              switch (validation.description) {
                case 'RangeError: Maximum call stack size exceeded':
                  emitMessage.sender.send(channel, 'ErrorCallBack');
                  break;
                default:
                  emitMessage.sender.send(channel, 'Error');
                  break;
              }
              break;
            case 'Exito':
              emitMessage.sender.send(
                channel,
                JSON.stringify({
                  status: 'Exito',
                  variables_status: jc.decycle(validation.code),
                  code: codeJ5,
                }),
              );
              break;
            case 'blokino-message':
              emitMessage.sender.send(
                'channel_messages',
                JSON.stringify({
                  type: 'message',
                  message: validation.message,
                  message_type: validation.message_type,
                }),
              );
              break;
          }
        });
      }
    });
  },
  cleanProgram: (code, device, emitMessage) => {
    let file_name = path.join(__dirname, '/code/current-code.js');
    let program_code = structure.program(device, code, ['']);
    // Creo la instancia en un child process
    fs.writeFile(file_name, program_code, (error) => {
      if (!error) {
        let child = require('child_process').fork(
          require.resolve(path.join(__dirname, path_current_program)),
          {},
        );
        nodes.push(child);
        child.on('message', (message) => {
          emitMessage.sender.send('resultClean', '');
        });
      }
    });
  },
  killnodes: () => {
    nodes.map((child) => {
      child.kill();
    });
    // Se eliminaron todos los child-process que esten instanciados.
    nodes = [];
  },
};

module.exports = instance_utils;
