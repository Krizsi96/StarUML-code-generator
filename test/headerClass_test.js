const assert = require('assert');
const myHeader = require('../src/headerClass.js');

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

TestUMLClassWithAttribute = {
    _type: "UMLClass",
    name: "testUMLClassWithAttribute",
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

TestUMLClassWithOperation = {
    _type: "UMLClass",
    name: "testUMLClassWithOperation",
    operations: [
        {
            _type: "UMLOperation",
            name: "testUMLOperation",
            visibility: type.UMLModelElement.VK_PUBLIC,
            getReturnParameter: function () { return this.parameters[0];},
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



describe('Header Handling Tests', function () {
    describe('When the constructor is called with "TestUMLClassWithAttribute"', function (){
        it('should construct header with name: ' + TestUMLClassWithAttribute.name, function () {
            const testHeader = new myHeader.Header(TestUMLClassWithAttribute);
            assert.equal(testHeader.name, TestUMLClassWithAttribute.name);
        });
        it('should construct header with the right attribute names', function () { 
            const testHeader = new myHeader.Header(TestUMLClassWithAttribute);
            assert.equal(testHeader.attributes.length, 2);
            assert.equal(testHeader.attributes[0].name, 'testUMLAttribute');
            assert.equal(testHeader.attributes[1].name, 'Serial_');
        });
        it('should construct header with the right attribute types', function () {
            const testHeader = new myHeader.Header(TestUMLClassWithAttribute);
            assert.equal(testHeader.attributes.length, 2);
            assert.equal(testHeader.attributes[0].type, 'string');
            assert.equal(testHeader.attributes[1].type, 'SerialInterface*');
        });
        it('should construct header with the right attribute visibilities', function () {
            const testHeader = new myHeader.Header(TestUMLClassWithAttribute);
            assert.equal(testHeader.attributes.length, 2);
            assert.equal(testHeader.attributes[0].visibility, 'public');
            assert.equal(testHeader.attributes[1].visibility, 'public');
        });
    });
    describe('When the constructor is called with "TestUMLClassWithOperation"', function (){
        it('should construct header with name: ' + TestUMLClassWithOperation.name, function () {
            const testHeader = new myHeader.Header(TestUMLClassWithOperation);
            assert.equal(testHeader.name, TestUMLClassWithOperation.name);
        });
        it('should construct header with the right operation names', function () {
            const testHeader = new myHeader.Header(TestUMLClassWithOperation);
            assert.equal(testHeader.operations.length, 1);
            assert.equal(testHeader.operations[0].name, 'testUMLOperation');
        });
        it('should construct header with the right operation return types', function () {
            const testHeader = new myHeader.Header(TestUMLClassWithOperation);
            assert.equal(testHeader.operations.length, 1);
            assert.equal(testHeader.operations[0].returnType, 'void');
        });
        it('should construct header with the right operation visibilities', function () {
            const testHeader = new myHeader.Header(TestUMLClassWithOperation);
            assert.equal(testHeader.operations.length, 1);
            assert.equal(testHeader.operations[0].visibility, 'public');
        });
        it('should construct header with the right operation parameter names', function () {
            const testHeader = new myHeader.Header(TestUMLClassWithOperation);
            assert.equal(testHeader.operations.length, 1);
            assert.equal(testHeader.operations[0].parameters.length, 1);
            assert.equal(testHeader.operations[0].parameters[0].name, 'testUMLParameter');
        });
        it('should construct header with the right operation parameter types', function () {
            const testHeader = new myHeader.Header(TestUMLClassWithOperation);
            assert.equal(testHeader.operations.length, 1);
            assert.equal(testHeader.operations[0].parameters.length, 1);
            assert.equal(testHeader.operations[0].parameters[0].type, 'string');
        });
    });
});
