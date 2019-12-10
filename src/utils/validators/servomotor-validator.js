let validators = {
    createServomotor: (programNodes, servomotorName, typeName, servomotorCode) => {
        programNodes.push({
            name: servomotorName,
            type: typeName ? typeName : "",
            code: servomotorCode
        });
    },
    addVariable: (node, programNodes) => {
        node.declarations.forEach(variable => {
            validators.createServomotor(programNodes, variable.id.name, "SERVOMOTOR", null, null);
        });
    },
    servomotor: (code, programNodes) => {
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
