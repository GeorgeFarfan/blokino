let validators = {
  createMotion: (
    programNodes,
    matrixLEDSName,
    typeName,
    codeMatrixLEDS,
  ) => {
    programNodes.push({
      name: matrixLEDSName,
      type: typeName ? typeName : '',
      code: codeMatrixLEDS,
    });
  },

  addVariable: (node, programNodes) => {
    node.declarations.forEach((variable) => {
      validators.createMotion(
        programNodes,
        variable.id.name,
        'BLOCK',
        null,
        null,
      );
    });
  },

  motion: (code, programNodes) => {
    programNodes = [];
    code.forEach((node) => {
      // Declaracion de la variable
      if (node.type === 'VariableDeclaration') {
        validators.addVariable(node, programNodes);
      }
    });
    return programNodes;
  },
};

module.exports = validators;
