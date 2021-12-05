let validators = {
  createLEDRGB: (programNodes, servomotorName, typeName) => {
    programNodes.push({
      name: servomotorName,
      type: typeName ? typeName : '',
    });
  },
  addVariable: (node, programNodes) => {
    node.declarations.forEach((variable) => {
      validators.createLEDRGB(
        programNodes,
        variable.id.name,
        'LED-RGB',
        null,
        null,
      );
    });
  },
  ledRGB: (code, programNodes) => {
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
