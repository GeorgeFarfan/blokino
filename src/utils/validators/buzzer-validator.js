let validators = {
    createBuzzer: (programNodes, buzzerName, typeName, codeBuzzer) => {
        programNodes.push({
            name: buzzerName,
            type: typeName ? typeName : "",
            code: codeBuzzer
        });
    },

    addVariable: (node, programNodes) => {
        node.declarations.forEach(variable => {
            validators.createBuzzer(programNodes, variable.id.name, "BUZZER", null, null);
        });
    },

    buzzer: (code, programNodes) => {
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
