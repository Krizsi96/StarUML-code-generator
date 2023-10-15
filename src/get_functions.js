/**
 * Return visibility
 * @param {type.Model} element
 * @return {string}
 */
function getVisibility(element) {
  switch (element.visibility) {
    case type.UMLModelElement.VK_PUBLIC:
      return 'public';
    case type.UMLModelElement.VK_PROTECTED:
      return 'protected';
    case type.UMLModelElement.VK_PRIVATE:
      return 'private';
    default:
      return null
  }
}
exports.getVisibility = getVisibility;