const myHeader = require('./headerClass.js');
const fs = require('fs');

function CodeGenerator(UMLelement) {
  const header = new myHeader.Header(UMLelement);
  header.log.push('>> CodeGenerator called');
  CreateLogFolder();
  header.CreateInheritance();
  header.CreateIncludes();
  return header;
}
exports.CodeGenerator = CodeGenerator;

const logFolderPath = '/home/krizsi90/Documents/Projects/UML_code_generator/.log/';

function CreateLogFile(header) {
  const json = JSON.stringify(header.log);
  fs.writeFileSync(logFolderPath + header.name + '_code_generation_log.json', json);
}
exports.CreateLogFile = CreateLogFile;

function CreateLogFolder() {
  if (!fs.existsSync(logFolderPath))
    fs.mkdirSync(logFolderPath);
}

function CollectUMLInterfaceRealizations(UMLelement) {
  let interfaceRealizations = []; 
  UMLelement.ownedElements.forEach((elementUnderCheck) => {
    if (elementUnderCheck instanceof type.UMLInterfaceRealization) 
      interfaceRealizations.push(elementUnderCheck.target.name);
  });
  return interfaceRealizations;
}

function CollectUMLDependencies(UMLelement) {
  let dependencies = [];
  UMLelement.ownedElements.forEach((elementUnderCheck) => {
    if (elementUnderCheck instanceof type.UMLDependency && !(elementUnderCheck instanceof type.UMLInterfaceRealization)) 
      dependencies.push(elementUnderCheck);
  });
  return dependencies;
}

function CollectUMLAssociations(UMLelement) {
  let associations = [];
  UMLelement.ownedElements.forEach((elementUnderCheck) => {
    if (elementUnderCheck instanceof type.UMLAssociation) 
      associations.push(elementUnderCheck.end1.reference.name);
  });
  return associations;
}