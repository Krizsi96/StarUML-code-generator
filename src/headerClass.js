const myAttribute = require('./attributeClass.js');
const myOperation = require('./operationClass.js');
const myEnumeration = require('./enumerationClass.js');

class Header {
    constructor(UMLClass) {
        this.name = UMLClass.name;
        this.attributes = CollectUMLAttributes(UMLClass);
        this.operations = CollectUMLOperations(UMLClass);
        this.log = [];
    }
}

module.exports = {
    Header: Header
};

/**
 * collect attributes from UMLClass
 * @param {UMLClass} UMLelement
 * @returns {Attribute[]} array of attributes
 */
function CollectUMLAttributes(UMLelement) {
    let attributes = [];
    if (UMLelement.attributes != undefined) {
        UMLelement.attributes.forEach(sourceAttribute => {
            attributes.push(new myAttribute.Attribute(sourceAttribute));
        });
    }
    return attributes;
}

/**
 * collect operations from UMLClass
 * @param {UMLClass} UMLelement
 * @returns {Operation[]} array of operations
 */
function CollectUMLOperations(UMLelement) {
    let operations = [];
    if (UMLelement.operations != undefined) {
        UMLelement.operations.forEach(sourceOperation => {
            operations.push(new myOperation.Operation(sourceOperation));
        });
    }
    return operations;
}

/**
 * collect enumerations from UMLClass
 * @param {UMLClass} UMLelement
 * @returns {Enumeration[]} array of enumerations
 */
// TODO: implement test cases for this function
function collectUMLEnumerations(UMLelement) {
    let enumerations = [];
    if (UMLelement.ownedElements != undefined) {
        UMLelement.ownedElements.forEach((elementUnderCheck) => {
            if (elementUnderCheck instanceof type.UMLEnumeration) {
                enumerations.push(elementUnderCheck);
            }
        })
    }
    return enumerations;
}