const { getVisibility } = require('E:\\Projects\\UML_code_generator\\.ejs\\get_functions.js')

function collectUMLEnumerations(UMLelement) {
  let enumerations = [];
  UMLelement.ownedElements.forEach((elementUnderCheck) => {
    if (elementUnderCheck instanceof type.UMLEnumeration) {
      enumerations.push(elementUnderCheck);
    }
  })
  return enumerations;
}
exports.collectUMLEnumerations = collectUMLEnumerations;

/**
 * declare all enumerations with the same type of visibility
 * @param {string} visibility
 * @return {string array}
 */
function Enumerations(visibility, enumerations) {
  let declaration = [];
  enumerations.forEach((enumeration) => {
    if (getVisibility(enumeration) == visibility)
      declaration.push(declareEnumeration(enumeration));
  });
  return declaration.join('\n\t');
}
exports.Enumerations = Enumerations;

/**
   * create declaration for enumeration
   * @param {type.Model} enumeration
   * @return {string}
   */
function declareEnumeration(enumeration) {
  let declaration = [];
  declaration.push('enum ' + enumeration.name);
  declaration.push('{');
  declaration.push(declareEnumerationLiterals(enumeration));
  declaration.push('};');
  return declaration.join('\n\t');
}

/**
 * list enumeration literals for declaration
 * @param {type.Model} enumeration
 * @return {string}
 */
function declareEnumerationLiterals(enumeration) {
  let declaration = [];
  let literals = enumeration.literals;
  for (i = 0; i < literals.length; i++) {
    declaration.push(literals[i].name);
  }
  return declaration.join(', ');
}