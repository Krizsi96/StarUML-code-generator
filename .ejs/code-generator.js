const { collectUMLEnumerations } = require('./enum_declaration.js');
class Header {
  constructor() {
    this.name = '';
    this.attributes = [];
    this.methods = [];
    this.enumerations = [];
    this.log = [];
    this.supers = [];
    this.inheritanceDeclaration = [''];
    this.includeDeclaration = [''];
  }

  CollectElements(UMLelement) { 
    this.log.push('CollectElements called');
    this.name = UMLelement.name;
    this.attributes = UMLelement.attributes;
    this.methods = UMLelement.methods;
    this.enumerations = collectUMLEnumerations(UMLelement);
    this.supers = UMLelement.getGeneralElements();
  }

  CreateInheritance() {
    this.log.push('CreateInheritance called');
    this.inheritanceDeclaration = this.supers.length > 0 ? ': public ' + this.supers[0].name : '';
  }

  CreateIncludes() {
    this.log.push('CreateIncludes called');
    this.includeDeclaration = this.supers.length > 0 ? includeDeclaration.push('#include "' + this.supers[0].name + '.h"') : '';
  }

  WriteIncludes() {
    this.log.push('writeIncludes called');
    return this.includeDeclaration;
  }

  WriteInheritance() {
    this.log.push('writeInheritance called');
    return this.inheritanceDeclaration;
  }

  WriteName() {
    return this.name;
  }

  WriteHeaderGuard() {
    return '_' + this.name.toUpperCase() + '_HPP_';
  }
}

function CodeGenerator(UMLelement) {
  const header = new Header();
  header.log.push('CodeGenerator called');
  header.CollectElements(UMLelement);
  header.CreateInheritance();
  header.CreateIncludes();
  return header;
}

exports.CodeGenerator = CodeGenerator;