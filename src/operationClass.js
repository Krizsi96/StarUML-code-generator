const { getVisibility } = require('./get_functions.js')

class Operation {
    constructor(UMLOperation) {
        this.name = UMLOperation.name;
        this.returnType = getType(UMLOperation);
        this.visibility = getVisibility(UMLOperation);
        this.log = [];
        this.log.push('>> Operation created: ' + this.name);
    }

    /**
     * create declaration for operation
     * @returns {string} declaration of operation   
     */
    getDeclaration() {
        this.log.push('>> getDeclaration called for operation: ' + this.name);
        return this.returnType + ' ' + this.name + '();';
    }
}

function getType(UMLOperation) {
    let _type = 'not found';
    let return_parameter = UMLOperation.getReturnParameter();
    if (return_parameter === null) {
        if (UMLOperation.stereotype == 'constructor')
            _type = 'constructor';
        else if (UMLOperation.stereotype == 'destructor')
            _type = 'destructor';
    } else {
        _type = return_parameter.type;
    }
    return _type;
}

module.exports = {
    Operation: Operation
};