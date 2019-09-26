let validators = {
    createProximity: (programNodes, blockName, typeName) => {
        programNodes.push({
            name: blockName,
            type: typeName ? typeName : ""
        });
    },

    addVariable: (node, programNodes) => {
        node.declarations.forEach(variable => {
            validators.createProximity(programNodes, variable.id.name, "BLOCK", null, null);
        });
    },

    proximity: (code, programNodes) => {
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
