const { getVisibility } = require('./get_functions.js')

class Operation {
    constructor(UMLOperation) {
        this.name = UMLOperation.name;
        this.returnType = getType(UMLOperation);
        this.visibility = getVisibility(UMLOperation);
        this.isAbstract = UMLOperation.isAbstract;
        this.specification = UMLOperation.specification;
        this.parameters = getParameters(UMLOperation);
        this.log = [];
        this.log.push('>> Operation created: ' + this.name);
    }

    /**
     * create declaration for operation
     * @returns {string} declaration of operation   
     */
    getDeclaration() {
        this.log.push('>> getDeclaration called for operation: ' + this.name);
        let declaration = [];
        if (this.isAbstract === true) {
            declaration.push('virtual ');
        }
        switch (this.returnType) {
            case 'constructor':
                declaration.push(declareConstructor(this));
                break;
            case 'destructor':
                declaration.push(declareDestructor(this));
                break;
            default:
                declaration.push(declareStandardOperation(this));
                break;
        }
        if (this.isAbstract === true)
            declaration.push(' = 0');
        else if (this.specification != undefined) {
            declaration.push(' ' + this.specification);
        }

        declaration.push(';');
        return declaration.join('')
    }

    /**
     * create log of running operation methods
     * @returns {string} log of operation
     */
    getLog() {
        return this.log.join('\n');
    }
}

module.exports = {
    Operation: Operation
};

class Parameter {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

/**
 *  Return type expression
 *  @param {type.Model} UMLOperation
 *  @return {string}
 */
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

/**
 * list method parameters
 * @param {type.Model} UMLOperation
 * @return {Array.<Parameter>}
 */
function getParameters(UMLOperation) {
    let parameters = [];
    let nonReturnParameters = UMLOperation.getNonReturnParameters();
    nonReturnParameters.forEach(sourceParameter => {
        if (typeof sourceParameter.type == 'string') {
            parameters.push(new Parameter(sourceParameter.name, sourceParameter.type));
        } else {
            parameters.push(new Parameter(sourceParameter.name, sourceParameter.type.name));
        }
    });
    return parameters;
}

/**
 * list method parameters for declaration
 * @param {type.Model} UMLOperation
 * @return {string}
 */
function declareParameters(Operation) {
    let declaration = [];
    Operation.parameters.forEach((parameter) => {
        declaration.push(parameter.type + ' ' + parameter.name);
    })
    return declaration.join(', ');
}

/**
 * Declare constructor
 * @param {Operation}   Operation
 * @return {string}
 */
function declareConstructor(Operation) {
    let declaration = [];
    declaration.push(Operation.name);
    declaration.push('(');
    declaration.push(declareParameters(Operation));
    declaration.push(')');
    return declaration.join('');
}

/**
 * Declare destructor
 * @param {Operation}   Operation
 * @return {string}
 */
function declareDestructor(Operation) {
    let declaration = [];
    declaration.push('~');
    declaration.push(Operation.name);
    declaration.push('(');
    declaration.push(declareParameters(Operation));
    declaration.push(')');
    return declaration.join('');
}

/**
 * Declare normal operation
 * @param {Operation}   Operation
 * @return {string}
 */
function declareStandardOperation(Operation) {
    let declaration = [];
    declaration.push(Operation.returnType);
    declaration.push(' ');
    declaration.push(Operation.name);
    declaration.push('(');
    declaration.push(declareParameters(Operation));
    declaration.push(')');
    return declaration.join('');
}