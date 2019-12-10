let validators = {
    createMatrixLEDS: (programNodes, matrixLEDSName, typeName, codeMatrixLEDS) => {
        programNodes.push({
            name: matrixLEDSName,
            type: typeName ? typeName : "",
            code: codeMatrixLEDS
        });
    },

    addVariable: (node, programNodes) => {
        node.declarations.forEach(variable => {
            validators.createMatrixLEDS(
                programNodes,
                variable.id.name,
                "SCREEN-MATRIX",
                null,
                null
            );
        });
    },

    matrix: (code, programNodes) => {
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
