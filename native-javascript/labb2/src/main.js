import { Character } from "./character.js";
import * as cities from "./cities.js";
import * as dnd from "./api/equipment.js";
import * as utils from "./utils.js"


const Form = document.querySelector("#character-form")
const charactersList = document.querySelector("#characters")
// new Character elements
const newCharacterOverlay = document.querySelector("#new-character-overlay")
const newCharacterForm = document.querySelector("#new-character-form")

const classesList = document.querySelector("#class")
const equipmentList = document.querySelector("#equipment")
const equipmentAdd = document.querySelector("#equipment-add")
const equipmentActualList = document.querySelector("#equipment-list")

let user = ""

// TODO make sure the user cant enter an empty username... somehow
// if no user is logged in then ask to login with a simple username
if(!user){
  document.getElementById("overlay").style.display = "block"
  let userForm = document.querySelector("#user-form")
  async function waitTillSignedIn(){
    await new Promise((resolve) => {
      userForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let data = new FormData(userForm)
        user = data.get("user")
        console.log(`${user} signed in`)
        document.getElementById("overlay").style.display = "none"
        resolve()
      })
    })
  }
  await waitTillSignedIn() // this is used to stop the rest of the site to keep loading until we have a user
}

// eventlistener for adding equipment
equipmentAdd.addEventListener("click", async(e) => {
  let item = equipmentList.value
  console.log("before")
  let equipment = await dnd.getSpecificEquipment(item)
  console.log("after")
  characters[selectedCharacter].addItem(equipment)
  updateEquipmentList(characters[selectedCharacter].inventory)
})

// eventlistener for the character form save button
Form.addEventListener("submit", async(e) => {
  e.preventDefault()
  let data = new FormData(Form)
  console.log(data)
  await saveCharacter(data)
})

// initialize the characters array and the selectedcharacter
let characters = []
let selectedCharacter = 0

// eventlistener for the characters list, if we change then switch character
charactersList.addEventListener("change", switchCharacter)

// if the user is logged in (which they should be?)
if(user){
  // check if the user has saved characters in cities
  let alreadySaved = await cities.get(user)
  console.log(alreadySaved)
  if(alreadySaved.length > 0){
    // if they do then load them in
    console.log("character exists saved")
    console.log(alreadySaved)
    loadCharacters(alreadySaved)
    
  } else {
    // else create a new empty default one
    let character = new Character()
    character.setName("Default")
    characters.push(character)
    refreshCharacter()
  }
  listCharacters()
}

// load in all equipment from dnd api
let equipment = await dnd.getAllEquipment()
// append equipment api list to visual select in form
equipment.forEach(equip => {
  let opt = document.createElement("option")
  opt.value = equip.index
  opt.textContent = equip.name
  equipmentList.appendChild(opt)
})

// load in all the classes from dnd api
let classes = await dnd.getAllClasses()
// append equipment api list to visual select in form
classes.forEach(clas => {
  let opt = document.createElement("option")
  opt.value = clas.index
  opt.textContent = clas.name
  classesList.appendChild(opt)
})

// updates the visual inventory list
function updateEquipmentList(list){
  utils.removeChildren(equipmentActualList)

  list.forEach((equip, index) => {
    let e = document.createElement("li")
    let btn = document.createElement("button")
    btn.textContent = "-"
    btn.type = "button"
    btn.addEventListener("click", () => {
      characters[selectedCharacter].removeItemAtIndex(index)
      refreshCharacter()
    })
    e.textContent = equip.name
    e.appendChild(btn)
    console.log(equip.name)
    equipmentActualList.appendChild(e)
  })
}

// lists out the characters in the character selector
function listCharacters(){
  utils.removeChildren(charactersList)
  characters.forEach(char => {
    console.log(char)
    let opt = document.createElement("option")
    opt.value = char.id
    opt.textContent = char.name
    charactersList.appendChild(opt)
  })
  let opt = document.createElement("option")
  opt.value = "new"
  opt.textContent = "New Character"
  charactersList.appendChild(opt)
  charactersList.value = characters[selectedCharacter].id
}

// switches the character by getting the characters index from its id,
// which solves the problem of having characters with the same name?
function switchCharacter(){
  console.log(charactersList)
  if(charactersList.value === "new"){ // if we choose the "new", option then initiate a new character creation
    console.log("Adding character")
    newCharacterOverlay.style.display = "block"
    async function waitTillCharacterCreated(){
      await new Promise((resolve) => {
        newCharacterForm.addEventListener("submit", (e) => {
          e.preventDefault()
          let data = new FormData(newCharacterForm)
          let character = new Character()
          character.setName(data.get("new-character-name"))
          console.log(character)
          characters.push(character)
          console.log(characters)
          listCharacters()
          charactersList.value = character.id
          switchCharacter()
          newCharacterOverlay.style.display = "none"
          resolve()
        })
      })
    }
    waitTillCharacterCreated()
  } else{
    console.log("Switching characters")
    let id = +charactersList.value
    let index = characters.findIndex((char) => {
      return char.id === id
    })
    selectedCharacter = index
  }
  console.log(selectedCharacter)
  refreshCharacter(characters[selectedCharacter])
}

// !empty function?
function addCharacter(){
  
}

// updates the local character data on form change
Form.addEventListener("change", (e) => {
  let data = new FormData(Form)
  setCharacter(data)
})
function setCharacter(data){
  console.log("setting")
  characters[selectedCharacter].setName(data.get("name"))
  characters[selectedCharacter].setClass(data.get("class"))
  characters[selectedCharacter].setLevel(data.get("level"))
  console.log(characters)
  listCharacters()
}

// load the oldcharacters into the characters list
async function loadCharacters(oldCharacters){
  console.log("loading")
  oldCharacters.forEach((character) => {
    characters.push(Character.parse(character))
  })
  listCharacters()
  refreshCharacter(characters[selectedCharacter])
  console.log(characters)
}

// visually refreshes the forms data with the sent in char
function refreshCharacter(){
  //console.log(characters[selectedCharacter])
  Form.name.value = characters[selectedCharacter].name

  characters[selectedCharacter].clas ? Form.class.value = characters[selectedCharacter].clas : Form.class.value = "Barbarian"

  Form.level.value = characters[selectedCharacter].level

  updateEquipmentList(characters[selectedCharacter].inventory)
}

// save selected character to cities api
// ! doesnt save all characters
async function saveCharacter(data){
  //characters[selectedCharacter].setName(data.get("name"))
  //characters[selectedCharacter].setClass(data.get("class"))
  //characters[selectedCharacter].setLevel(data.get("level"))

  console.log(characters[selectedCharacter])
  cities.post(characters[selectedCharacter], user)
}

// function saveToAvancera(equipment){
//   cities.post(equipment)
// }