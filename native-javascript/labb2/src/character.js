
export class Character {
  id = 0
  name = ""
  clas = "" // class, cant use class as name so using clas instead
  level = 0
  inventory = []

  constructor(){
    this.id = Date.now() // the characters id is the date.now timestamp unless mutated otherwise
  }

  /**
   * Sets the name of the character
   * @param {string} newName 
   */
  setName(newName){
    this.name = newName
  }

  /**
   * Sets the class of the character
   * @param {string} newClass
   */
  setClass(newClass){
    this.clas = newClass
  }

  /**
   * Sets the class of the character
   * @param {string} newClass
   */
  setLevel(newLevel){
    this.level = newLevel
  }

  /**
   * Adds an item to the inventory at the end
   * @param {object} item
   */
  addItem(item){
    this.inventory.push(item)
  }

  /**
   * Removes a given character at index
   * @param {number} index
   */
  removeItemAtIndex(index){
    console.log("removing")
    this.inventory.splice(index, 1)
  }

  /**
   * Parses a normal object with the same keys into a valid {Character}
   * @param {object} object 
   * @returns {Character} parsed character
   */
  static parse(object){
    let char = new Character()
    char.id = object.id
    char.setName(object.name)
    char.setClass(object.clas)
    char.setLevel(object.level)
    char.inventory = object.inventory
    return char
  }
}