const { collectUMLEnumerations, Enumerations } = require('./enum_declaration.js');
const { Attributes } = require('./attribute_declaration.js');
const { Methods } = require('./method_declaration.js');
class Header {
  constructor() {
    this.name = '';
    this.attributes = [];
    this.operations = [];
    this.enumerations = [];
    this.log = [];
    this.supers = [];
    this.inheritanceDeclaration = [''];
    this.includeDeclaration = [''];
  }

  CollectElements(UMLelement) { 
    this.log.push('>> CollectElements called');
    this.name = UMLelement.name;
    this.attributes = UMLelement.attributes;
    this.operations = UMLelement.operations;
    this.enumerations = collectUMLEnumerations(UMLelement);
    this.supers = UMLelement.getGeneralElements();
  }

  CreateInheritance() {
    this.log.push('>> CreateInheritance called');
    this.inheritanceDeclaration = this.supers.length > 0 ? ': public ' + this.supers[0].name : '';
  }

  CreateIncludes() {
    this.log.push('>> CreateIncludes called');
    this.includeDeclaration = this.supers.length > 0 ? includeDeclaration.push('#include "' + this.supers[0].name + '.h"') : '';
  }

  WriteIncludes() {
    this.log.push('>> writeIncludes called');
    return this.includeDeclaration;
  }

  WriteInheritance() {
    this.log.push('>> writeInheritance called');
    return this.inheritanceDeclaration;
  }

  WriteName() {
    return this.name;
  }

  WriteHeaderGuard() {
    return '_' + this.name.toUpperCase() + '_HPP_';
  }

  WritePublicElements() {
    this.log.push('>> writePublicElements called');
    let publicElements = [];
    publicElements.push(this.WriteElementsOfSameVisibility('public'));
    return publicElements;
  }

  WriteProtectedElements() {
    this.log.push('>> writeProtectedElements called');
    let protectedElements = [];
    protectedElements.push(this.WriteElementsOfSameVisibility('protected'));
    return protectedElements; 
  }

  WritePrivateElements() {
    this.log.push('>> writePrivateElements called');
    let privateElements = [];
    privateElements.push(this.WriteElementsOfSameVisibility('private'));
    return privateElements;
  }

  WriteElementsOfSameVisibility(visibility) {
    this.log.push('>> writeElementsOfSameVisibility called with visibility: ' + visibility);
    let elementDeclarations = [];
    elementDeclarations.push(this.WriteAttributesOfSameVisibility(visibility));
    elementDeclarations.push(this.WriteEnumerationsOfSameVisibility(visibility));
    elementDeclarations.push(this.WriteOperationsOfSameVisibility(visibility));
    this.log.push('>> elementDeclarations: ' + elementDeclarations);
    return elementDeclarations.join('\n\t');
  }

  WriteAttributesOfSameVisibility(visibility) {
    this.log.push('>> writeAttributesOfSameVisibility called with visibility: ' + visibility);
    let attributeDeclarations = [];
    attributeDeclarations.push(Attributes(visibility, this.attributes));
    this.log.push('>> attributeDeclarations: ' + attributeDeclarations);
    return attributeDeclarations;
  }

  WriteOperationsOfSameVisibility(visibility) {
    this.log.push('>> writeOperationsOfSameVisibility called with visibility: ' + visibility);
    let operationDeclarations = [];
    operationDeclarations.push(Methods(visibility, this.operations));
    this.log.push('>> operationDeclarations: ' + operationDeclarations);
    return operationDeclarations;
  }

  WriteEnumerationsOfSameVisibility(visibility) {
    this.log.push('>> writeEnumerationsOfSameVisibility called with visibility: ' + visibility);
    let enumerationDeclarations = [];
    enumerationDeclarations.push(Enumerations(visibility, this.enumerations));
    this.log.push('>> enumerationDeclarations: ' + enumerationDeclarations);
    return enumerationDeclarations;
  }
}

function CodeGenerator(UMLelement) {
  const header = new Header();
  header.log.push('>> CodeGenerator called');
  header.CollectElements(UMLelement);
  header.CreateInheritance();
  header.CreateIncludes();
  return header;
}

exports.CodeGenerator = CodeGenerator;