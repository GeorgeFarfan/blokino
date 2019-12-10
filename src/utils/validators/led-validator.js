let validators = {
    createLED: (programNodes, ledName, typeName) => {
        programNodes.push({
            name: ledName,
            type: typeName ? typeName : ""
        });
    },

    addVariable: (node, programNodes) => {
        node.declarations.forEach(variable => {
            validators.createLED(programNodes, variable.id.name, "LED", null, null);
        });
    },

    led: (code, programNodes) => {
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
