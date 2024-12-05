
/**
 * Removes all the children of element
 * @param {*} element 
 */
export function removeChildren(element) {
  while(element.lastChild){
    element.removeChild(element.lastChild)
  }
}