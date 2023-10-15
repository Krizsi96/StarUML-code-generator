const assert = require('assert');
const myAttribute = require('../src/attributeClass.js');
const testData = require('./testData.js');
const TestUMLAttribute = testData.TestUMLAttribute;

describe('Attribute Handling Tests', function () {
    describe('When the constructor is called with "TestUMLAttribute"', function () {
        it('should construct attribute with name: ' + TestUMLAttribute.name, function () {
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            assert.equal(testAttribute.name, TestUMLAttribute.name);
        });
        it('should construct attribute with type: ' + TestUMLAttribute.type, function () {
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            assert.equal(testAttribute.type, TestUMLAttribute.type);
        });
        it('should construct attribute with visibility: public', function () {
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            assert.equal(testAttribute.visibility, 'public');
        });
    });
    describe('When getDeclaration is called on "TestUMLAttribute"', function () {
        it('should return declaration for attribute: ' + TestUMLAttribute.name, function () {
            let expectedDeclaration = TestUMLAttribute.type + ' ' + TestUMLAttribute.name + ';';
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            assert.equal(testAttribute.getDeclaration(), expectedDeclaration);
        });
    });

    describe('When getLog is called after creating and make declaration for "TestUMLAttribute"', function () {
        it('should return log for attribute: ' + TestUMLAttribute.name, function () {
            let expectedLog = '>> Attribute created: ' + TestUMLAttribute.name + '\n>> getDeclaration called for attribute: ' + TestUMLAttribute.name;
            const testAttribute = new myAttribute.Attribute(TestUMLAttribute);
            testAttribute.getDeclaration();
            assert.equal(testAttribute.getLog(), expectedLog);
        });
    });
});