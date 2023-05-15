const { getVisibility } = require('E:\\Projects\\UML_code_generator\\.ejs\\get_functions.js')
const { getType } = require('E:\\Projects\\UML_code_generator\\.ejs\\get_functions.js')

/**
 * list method parameters for declaration
 * @param {type.Model} method
 * @return {string}
 */
function declareParameters(method) {
  let declaration = [];
  let parameters = method.getNonReturnParameters();
  for (i = 0; i < parameters.length; i++) {
    if (parameters[i].type instanceof type.UMLEnumeration) {
      declaration.push(parameters[i].type.name + ' ' + parameters[i].name);
    } else {
      declaration.push(parameters[i].type + ' ' + parameters[i].name);
    }
  }
  return declaration.join(', ');
}

/**
 * create declaration for method
 * @param {type.Model} method
 * @return {string}
 */
function declareMethod(method) {
  let declaration = [];
  if (getType(method) === 'constructor') {
    declaration.push(method.name);
  } else {
    declaration.push(getType(method) + ' ' + method.name);
  }

  declaration.push('(');
  declaration.push(declareParameters(method));
  declaration.push(');');

  return declaration.join('')
}

/**
 * declare all methods with the same type of visibility
 * @param {string} visibility
 * @return {string array}
 */
function Methods(visibility, methods) {
  let declaration = [];
  let declaration_index = 0;

  methods.forEach((method, index, array) => {
    if (getVisibility(method) == visibility) {
      declaration[declaration_index] = declareMethod(method);
      declaration_index++;
    }
  });
  declaration.push('\n\t');

  return declaration.join('\n\t');
}

exports.Methods = Methods;