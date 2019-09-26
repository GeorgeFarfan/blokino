let validators = {
    createJoystick: (programNodes, blockName, typeName) => {
        programNodes.push({
            name: blockName,
            type: typeName ? typeName : ""
        });
    },

    addVariable: (node, programNodes) => {
        node.declarations.forEach(variable => {
            validators.createJoystick(programNodes, variable.id.name, "BLOCK", null, null);
        });
    },

    joystick: (code, programNodes) => {
        programNodes = [];
        code.forEach(node => {
            // Declaracion de la variable
            if (node.type === "VariableDeclaration") {
                validators.addVariable(node, programNodes);
            }
        });
        return programNodes;
    }
};

module.exports = validators;
