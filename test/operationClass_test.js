const assert = require('assert');
const myOperation = require('../src/operationClass.js');

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

class UMLEnumeration {
    constructor() {
        this._type = "UMLEnumeration";
        this.name = 'kLogType';
    }
}

UMLOperationTest = {
    _type: "UMLOperation",
    _id: "AAAAAAGH0z3ybAoo5vM=",
    _parent: {
        $ref: "AAAAAAGHfGkeHtiig5w="
    },
    name: "createLog",
    parameters: [
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH0z52KQovPVM=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            type: "void",
            direction: "return"
        },
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH0z69Xwoy8zI=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            name: "log_type",
            type: new UMLEnumeration()
        },
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH00AIlAo1bzE=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            name: "file",
            type: "const char*"
        },
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH00AIlQo2UOc=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            name: "line",
            type: "int"
        },
        {
            _type: "UMLParameter",
            _id: "AAAAAAGH00AIlgo3+5k=",
            _parent: {
                $ref: "AAAAAAGH0z3ybAoo5vM="
            },
            name: "message",
            type: "const char*"
        }
    ],
    visibility: type.UMLModelElement.VK_PUBLIC,
    getReturnParameter: function () {  return this.parameters[0]; },
    getNonReturnParameters: function () { return this.parameters.slice(1); },
};

describe('Operation Tests', function () {
    describe('constructor Tests', function () {
        it('should construct operation with the right name', function () {
            const testOperation = new myOperation.Operation(UMLOperationTest);
            assert.equal(testOperation.name, UMLOperationTest.name);
        });
        it('should construct operation with the right type', function () {
            const testOperation = new myOperation.Operation(UMLOperationTest);
            assert.equal(testOperation.returnType, UMLOperationTest.parameters[0].type);
        });
        it('should construct operation with the right visibility', function () {
            const testOperation = new myOperation.Operation(UMLOperationTest);
            assert.equal(testOperation.visibility, 'public');
        });
        it('should construct operation with the right parameters', function () {
            const testOperation = new myOperation.Operation(UMLOperationTest);
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
            const testOperation = new myOperation.Operation(UMLOperationTest);
            let expectedDeclaration = 'void createLog(kLogType log_type, const char* file, int line, const char* message);';
            assert.equal(testOperation.getDeclaration(), expectedDeclaration);
        });
    });
});