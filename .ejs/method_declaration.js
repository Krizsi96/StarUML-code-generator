const { getVisibility } = require('E:\\Projects\\UML_code_generator\\.ejs\\get_functions.js')
const { getType } = require('E:\\Projects\\UML_code_generator\\.ejs\\get_functions.js')

/**
 * declare all methods with the same type of visibility
 * @param {string} visibility
 * @return {string array}
 */
function Methods(visibility, methods) {
  let declaration = [];
  methods.forEach((method) => {
    if (getVisibility(method) == visibility)
      declaration.push(declareMethod(method));
  });
  declaration.push('\n\t');
  return declaration.join('\n\t');
}
exports.Methods = Methods;

/**
 * create declaration for method
 * @param {type.Model} method
 * @return {string}
 */
function declareMethod(method) {
  let declaration = [];
  if (method.isAbstract === true) {
    declaration.push('virtual ');
  }
  switch (getType(method)) {
    case 'constructor':
      declaration.push(method.name);
      break;
    case 'destructor':
      declaration.push('~' + method.name);
      break;
    default:
      declaration.push(getType(method) + ' ' + method.name);
      break;
  }
  declaration.push('(');
  declaration.push(declareParameters(method));
  if (method.isAbstract === true)
    declaration.push(') = 0;');
  else
    declaration.push(');');
  return declaration.join('')
}

/**
 * list method parameters for declaration
 * @param {type.Model} method
 * @return {string}
 */
function declareParameters(method) {
  let declaration = [];
  let parameters = method.getNonReturnParameters();
  parameters.forEach((parameter) => {
    if (parameter.type instanceof type.UMLEnumeration) {
      declaration.push(parameter.type.name + ' ' + parameter.name);
    } else {
      declaration.push(parameter.type + ' ' + parameter.name);
    }
  })
  return declaration.join(', ');
}