const assert = require('assert');
const myEnumeration = require('../src/enumerationClass.js');
const testData = require('./testData.js');
const TestUMLEnumeration = testData.TestUMLEnumeration;

describe('Enumeration Tests', function () {
    describe('Constructor Tests', function () {
        it('should construct enumeration with the right name', function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            assert.equal(testEnumeration.name, 'kLogType');
        });
        it('should construct enumeration with the right visibility', function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            assert.equal(testEnumeration.visibility, 'public');
        });
        it('should construct enumeration with the right literals', function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            assert.equal(testEnumeration.literals[0], 'kInfo');
            assert.equal(testEnumeration.literals[1], 'kWarning');
            assert.equal(testEnumeration.literals[2], 'kError');
            assert.equal(testEnumeration.literals[3], 'kDebug');
        });
    });

    describe('getDeclaration Tests', function () {
        it('should return declaration for enumeration', function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            let expectedDeclaration = 'enum ' + TestUMLEnumeration.name + '\n{\n\tkInfo, kWarning, kError, kDebug\n};';
            assert.equal(testEnumeration.getDeclaration(), expectedDeclaration);
        });
    });

    describe('getLog Tests', function () {
        it('should return log for enumeration', function () {
            const testEnumeration = new myEnumeration.Enumeration(TestUMLEnumeration);
            testEnumeration.getDeclaration();
            let expectedLog = '>> Enumeration created: ' + TestUMLEnumeration.name + '\n>> getDeclaration called for enumeration: ' + TestUMLEnumeration.name;
            assert.equal(testEnumeration.getLog(), expectedLog);
        });
    });
});