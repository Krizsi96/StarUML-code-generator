const assert = require('assert');
const chai = require("chai");
const expect = chai.expect;

const myHeader = require('../src/headerClass.js');
const exp = require('constants');

const VK_PUBLIC = 'public';
const VK_PROTECTED = 'protected';
const VK_PRIVATE = 'private';

type = {
    UMLModelElement: [
        VK_PUBLIC,
        VK_PROTECTED,
        VK_PRIVATE
    ]
}
describe('Given there is no header class created', function () {
    describe('When the constructor is called with "EmptyClass', function () {
        const EmptyClass = { name: "TestUMLClass" };
        const testHeader = new myHeader.Header(EmptyClass);
        it('should construct header with the right name', function () {
            expect(testHeader.name).to.be.equal(EmptyClass.name);
        });
    });

    describe('When the constructor is called with "ClassWithAttributes"', function () {
        const ClassWithAttributes = {
            _type: "UMLClass",
            name: "ClassWithAttributes",
            attributes: [
                {
                    _type: "UMLAttribute",
                    name: "testUMLAttribute",
                    visibility: type.UMLModelElement.VK_PUBLIC,
                    type: "string"
                },
                {
                    _type: "UMLAttribute",
                    name: "Serial_",
                    visibility: type.UMLModelElement.VK_PUBLIC,
                    type: "SerialInterface*"
                }
            ],
        }
        const testHeader = new myHeader.Header(ClassWithAttributes);
        it('should construct header with the right amount of attributes', function () {
            expect(testHeader.attributes.length).to.be.equal(2);
        });
        it('should construct header with the right attribute names', function () {
            expect(testHeader.attributes[0].name).to.be.equal('testUMLAttribute');
            expect(testHeader.attributes[1].name).to.be.equal('Serial_');
        });
        it('should construct header with the right attribute types', function () {
            expect(testHeader.attributes[0].type).to.be.equal('string');
            expect(testHeader.attributes[1].type).to.be.equal('SerialInterface*');
        });
        it('should construct header with the right attribute visibilities', function () {
            expect(testHeader.attributes[0].visibility).to.be.equal('public');
            expect(testHeader.attributes[1].visibility).to.be.equal('public');
        });
    });

    describe('When the constructor is called with "ClassWithOperations"', function () {
        ClassWithOperations = {
            _type: "UMLClass",
            name: "ClassWithOperations",
            operations: [
                {
                    _type: "UMLOperation",
                    name: "testUMLOperation",
                    visibility: type.UMLModelElement.VK_PUBLIC,
                    getReturnParameter: function () { return this.parameters[0]; },
                    getNonReturnParameters: function () { return this.parameters.slice(1); },
                    parameters: [
                        {
                            _type: "UMLParameter",
                            name: "testReturnUMLParameter",
                            type: "void",
                            direction: "return"
                        },
                        {
                            _type: "UMLParameter",
                            name: "testUMLParameter",
                            type: "string",
                        }
                    ]
                }
            ]
        }
        const testHeader = new myHeader.Header(ClassWithOperations);
        it('should construct header with the right amount of operations', function () {
            expect(testHeader.operations.length).to.be.equal(1);
        });
        it('should construct header with the right operation names', function () {
            expect(testHeader.operations[0].name).to.be.equal('testUMLOperation');
        });
        it('should construct header with the right operation return types', function () {
            expect(testHeader.operations[0].returnType).to.be.equal('void');
        });
        it('should construct header with the right operation visibilities', function () {
            expect(testHeader.operations[0].visibility).to.be.equal('public');
        });
        it('should construct header with the right amount of operation parameters', function () {
            expect(testHeader.operations[0].parameters.length).to.be.equal(1);
        });
        it('should construct header with the right operation parameter names', function () {
            expect(testHeader.operations[0].parameters[0].name).to.be.equal('testUMLParameter');
        });
        it('should construct header with the right operation parameter types', function () {
            expect(testHeader.operations[0].parameters[0].type).to.be.equal('string');
        });
    });
    describe('When the constructor is called with "ClassWithEnumerations"', function () {
        ClassWithEnumerations = {
            _type: "UMLClass",
            name: "ClassWithEnumerations",
            ownedElements: [
                {
                    _type: "UMLEnumeration",
                    name: "testEnumeration",
                    visibility: type.UMLModelElement.VK_PUBLIC,
                    literals: [
                        {
                            _type: "UMLEnumerationLiteral",
                            name: "testEnumerationLiteral"
                        },
                        {
                            _type: "UMLEnumerationLiteral",
                            name: "testEnumerationLiteral2"
                        }
                    ]
                }
            ]
        }
        const testHeader = new myHeader.Header(ClassWithEnumerations);
        it('should construct header with the right amount of enumerations', function () {
            expect(testHeader.enumerations.length).to.be.equal(1);
        });
        it('should construct header with the right enumeration names', function () {
            expect(testHeader.enumerations[0].name).to.be.equal('testEnumeration');
        });
        it('should construct header with the right enumeration literal amount', function () {
            expect(testHeader.enumerations[0].literals.length).to.be.equal(2);
        });
        it('should construct header with the right enumeration literal names', function () {
            expect(testHeader.enumerations[0].literals[0]).to.be.equal('testEnumerationLiteral');
            expect(testHeader.enumerations[0].literals[1]).to.be.equal('testEnumerationLiteral2');
        });
        it('should construct header with the right enumeration visibility', function () {
            expect(testHeader.enumerations[0].visibility).to.be.equal('public');
        })
    });
});
