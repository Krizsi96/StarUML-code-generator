const assert = require('assert');
const myEnumeration = require('../src/enumerationClass.js');
const testData = require('./testData.js');
const TestUMLEnumeration = testData.TestUMLEnumeration;

describe('Enumeration Handling Tests', function () {
    describe('When the contructor is called with "TestUMLEnumeration"', function () {
        it('should construct enumeration with name: ' + TestUMLEnumeration.name, function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            assert.equal(testEnumeration.name, 'kLogType');
        });
        it('should construct enumeration with visibility: public', function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            assert.equal(testEnumeration.visibility, 'public');
        });
        it('should construct enumeration with literals', function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            assert.equal(testEnumeration.literals[0], 'kInfo');
            assert.equal(testEnumeration.literals[1], 'kWarning');
            assert.equal(testEnumeration.literals[2], 'kError');
            assert.equal(testEnumeration.literals[3], 'kDebug');
        });
    });

    describe('When getDeclaration is called on "TestUMLEnumeration"', function () {
        it('should return declaration for enumeration: ' + TestUMLEnumeration.name, function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            let expectedDeclaration = 'enum ' + TestUMLEnumeration.name + '\n\t{\n\t\tkInfo, kWarning, kError, kDebug\n\t};';
            assert.equal(testEnumeration.getDeclaration(), expectedDeclaration);
        });
    });

    describe('When getLog is called after creating and make declaration for "TestUMLEnumeration', function () {
        it('should return log for enumeration: ' + TestUMLEnumeration.name, function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            testEnumeration.getDeclaration();
            let expectedLog = '>> Enumeration created: ' + TestUMLEnumeration.name + '\n>> getDeclaration called for enumeration: ' + TestUMLEnumeration.name;
            assert.equal(testEnumeration.getLog(), expectedLog);
        });
    });
});