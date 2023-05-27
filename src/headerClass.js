const myAttribute = require('./attributeClass.js');
const myOperation = require('./operationClass.js');
const myEnumeration = require('./enumerationClass.js');

class Header {
    constructor(UMLClass) {
        this.name = UMLClass.name;
        this.attributes = CollectUMLAttributes(UMLClass);
        this.operations = CollectUMLOperations(UMLClass);
        this.enumerations = collectUMLEnumerations(UMLClass);
        this.interfaceRealizations = [];
        this.dependencies = [];
        this.associations = [];
        this.includeDeclaration = [];
        this.inheritanceDeclaration = [];
        this.supers = [];
        this.log = [];
    }

    CreateInheritance() {
        this.log.push('>> CreateInheritance called');
        // this.inheritanceDeclaration = this.supers.length > 0 ? ': public ' + this.supers[0].name : '';
        this.interfaceRealizations.forEach((interfaceRealization) => {
            this.inheritanceDeclaration.push('public ' + interfaceRealization);
        });
    }

    CreateIncludes() {
        this.log.push('>> CreateIncludes called');
        // this.includeDeclaration = this.supers.length > 0 ? includeDeclaration.push('#include "' + this.supers[0].name + '.h"') : '';
        this.interfaceRealizations.forEach((interfaceRealization) => {
            this.includeDeclaration.push('#include "' + interfaceRealization + '.hpp"');
        });

        this.dependencies.forEach((dependency) => {
            if (dependency.target.stereotype == 'standard')
                this.includeDeclaration.push('#include <' + dependency.target.name + '.h>');
            else
                this.includeDeclaration.push('#include "' + dependency.target.name + '.hpp"');
        });

        this.associations.forEach((association) => {
            this.includeDeclaration.push('#include "' + association + '.hpp"');
        });
    }

    WriteIncludes() {
        this.log.push('>> writeIncludes called');
        return this.includeDeclaration.join('\n');
    }

    WriteInheritance() {
        this.log.push('>> writeInheritance called');
        this.inheritanceDeclaration.shift();
        return this.inheritanceDeclaration.join(', ');
    }

    WriteName() {
        let name = this.name;
        if (this.supers.length > 0 || this.interfaceRealizations.length > 0)
            name = name + ' : ';
        return name;
    }

    WriteHeaderGuard() {
        return '_' + this.name.toUpperCase() + '_HPP_';
    }


    WritePublicElements() {
        this.log.push('>> writePublicElements called');
        return this.WriteElementsOfSameVisibility('public');
    }

    WriteProtectedElements() {
        this.log.push('>> writeProtectedElements called');
        return this.WriteElementsOfSameVisibility('protected');
    }

    WritePrivateElements() {
        this.log.push('>> writePrivateElements called');
        return this.WriteElementsOfSameVisibility('private');
    }

    WriteElementsOfSameVisibility(visibility) {
        this.log.push('>> writeElementsOfSameVisibility called with visibility: ' + visibility);
        let elementDeclarations = [];
        let returnValue = '';
        elementDeclarations.push(this.WriteAttributesOfSameVisibility(visibility));
        elementDeclarations.push(this.WriteEnumerationsOfSameVisibility(visibility));
        elementDeclarations.push(this.WriteOperationsOfSameVisibility(visibility));
        this.log.push('>> elementDeclarations: ' + elementDeclarations);
        elementDeclarations.forEach((elementDeclaration) => {
            if (elementDeclaration != '')
                returnValue = returnValue + elementDeclaration + '\n\t';
        });
        return returnValue;
    }

    WriteAttributesOfSameVisibility(visibility) {
        this.log.push('>> writeAttributesOfSameVisibility called with visibility: ' + visibility);
        let attributeDeclarations = [];
        this.attributes.forEach((attribute) => {
            if (attribute.visibility == visibility)
                attributeDeclarations.push(attribute.getDeclaration());
        });
        this.log.push('>> attributeDeclarations: ' + attributeDeclarations);
        return attributeDeclarations.join('\n\t');
    }

    WriteOperationsOfSameVisibility(visibility) {
        this.log.push('>> writeOperationsOfSameVisibility called with visibility: ' + visibility);
        let operationDeclarations = [];
        this.operations.forEach((operation) => {
            if (operation.visibility == visibility)
                operationDeclarations.push(operation.getDeclaration());
        });
        this.log.push('>> operationDeclarations: ' + operationDeclarations);
        return operationDeclarations.join('\n\t');
    }

    WriteEnumerationsOfSameVisibility(visibility) {
        this.log.push('>> writeEnumerationsOfSameVisibility called with visibility: ' + visibility);
        let enumerationDeclarations = [];
        this.enumerations.forEach((enumeration) => {
            if (enumeration.visibility == visibility)
                enumerationDeclarations.push(enumeration.getDeclaration());
        });
        this.log.push('>> enumerationDeclarations: ' + enumerationDeclarations);
        return enumerationDeclarations.join('\n\t');
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
function collectUMLEnumerations(UMLelement) {
    let enumerations = [];
    if (UMLelement.ownedElements != undefined) {
        UMLelement.ownedElements.forEach((elementUnderCheck) => {
            if (isEnumeration(elementUnderCheck)) {
                enumerations.push(new myEnumeration.Enumeration(elementUnderCheck));
            }
        })
    }
    return enumerations;
}

function isEnumeration(elementUnderCheck) {
    return elementUnderCheck instanceof type.UMLEnumeration;
}