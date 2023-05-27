const assert = require('assert');
const myOperation = require('../src/operationClass.js');
const testData = require('./testData.js');
const TestUMLOperationWithEnumParameter = testData.TestUMLOperationWithEnumParameter;

describe('Operation Tests', function () {
    describe('constructor Tests', function () {
        it('should construct operation with the right name', function () {
            const testOperation = new myOperation.Operation(TestUMLOperationWithEnumParameter);
            assert.equal(testOperation.name, TestUMLOperationWithEnumParameter.name);
        });
        it('should construct operation with the right type', function () {
            const testOperation = new myOperation.Operation(TestUMLOperationWithEnumParameter);
            assert.equal(testOperation.returnType, TestUMLOperationWithEnumParameter.parameters[0].type);
        });
        it('should construct operation with the right visibility', function () {
            const testOperation = new myOperation.Operation(TestUMLOperationWithEnumParameter);
            assert.equal(testOperation.visibility, 'public');
        });
        it('should construct operation with the right parameters', function () {
            const testOperation = new myOperation.Operation(TestUMLOperationWithEnumParameter);
            assert.equal(testOperation.parameters.length, 4);
            assert.equal(testOperation.parameters[0].name, 'log_type');
            assert.equal(testOperation.parameters[0].type, 'kLogType');
            assert.equal(testOperation.parameters[1].name, 'file');
            assert.equal(testOperation.parameters[1].type, 'const char*');
            assert.equal(testOperation.parameters[2].name, 'line');
            assert.equal(testOperation.parameters[2].type, 'int');
            assert.equal(testOperation.parameters[3].name, 'message');
            assert.equal(testOperation.parameters[3].type, 'const char*');
        });
    });

    describe('getDeclaration Tests', function () {
        it('should return declaration for operation', function () {
            const testOperation = new myOperation.Operation(TestUMLOperationWithEnumParameter);
            let expectedDeclaration = 'void createLog(kLogType log_type, const char* file, int line, const char* message);';
            assert.equal(testOperation.getDeclaration(), expectedDeclaration);
        });
    });
});