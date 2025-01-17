
export class Character {
  id = 0
  name = ""
  health = 20
  armor = 10
  clas = "" // class, cant use class as name so using clas instead
  race = ""
  level = 0
  scores = {
    CHA: 0,
    CON: 0,
    DEX: 0,
    INT: 0,
    STR: 0,
    WIS: 0
  }
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
   * Sets the race of the character
   * @param {string} newRace
   */
  setRace(newRace){
    this.race = newRace
  }

  /**
   * Sets the class of the character
   * @param {string} newClass
   */
  setLevel(newLevel){
    this.level = newLevel
  }

  /**
   * Sets the health of the character
   * @param {number} newHealth
   */
  setHealth(newHealth){
    this.health = newHealth
  }

  /**
   * Sets the armor of the character
   * @param {number} newArmor
   */
  setArmor(newArmor){
    this.armor = newArmor
  }

  /**
   * Sets the scores of the character
   * @param {*} newScores
   */
  setScores(newScores){
    this.scores = newScores
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
    char.setHealth(object.health)
    char.setArmor(object.armor)
    char.setClass(object.clas)
    char.setRace(object.race)
    char.setLevel(object.level)
    char.setScores(object.scores)
    char.inventory = object.inventory
    return char
  }
}