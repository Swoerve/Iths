
/**
 * Removes all the children of element
 * @param {*} element 
 */
export function removeChildren(element) {
  while(element.lastChild){
    element.removeChild(element.lastChild)
  }
}

/**
 * Takes the current href and edits out the last part to the relativeLink given
 * then changes current href with new one
 * @param {*} relativeLink 
 */
export function movePage(relativeLink){
  let currentLocation = window.location.href
  let splitLocation = currentLocation.split("/")
  splitLocation[splitLocation.length - 1] = relativeLink
  let newLocation = splitLocation.join("/")
  console.log(currentLocation)
  window.location.href = newLocation
}