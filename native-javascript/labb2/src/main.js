import { Character } from "./character.js";
import * as cities from "./cities.js";
import * as dnd from "./api/equipment.js";
import * as utils from "./utils.js"
import { loadFromLoSto } from "./session-storage.js";

const logoutButton = document.querySelector("#logout")
const loggedInText = document.querySelector("#characters-div p")

const Form = document.querySelector("#character-form")
const charactersList = document.querySelector("#characters")

// new Character elements
const newCharacterOverlay = document.querySelector("#new-character-overlay")
const newCharacterForm = document.querySelector("#new-character-form")
const characterDelete = document.querySelector("#character-delete")

const classesList = document.querySelector("#class")
const raceList = document.querySelector("#race")
const equipmentList = document.querySelector("#equipment")
const equipmentAdd = document.querySelector("#equipment-add")
const equipmentActualList = document.querySelector("#equipment-list")

const abilityScoreList = document.querySelector("#ability-scores")
const abilityChart = document.querySelector("#ability-chart")

let chart = null

let user = ""


// if no user is logged in then ask to login with a simple username
let loadedUser = loadFromLoSto("user")
if(loadedUser){
  console.log("user in localstorage")
  user = loadedUser
  loggedInText.textContent = "Logged in as: " + user
}

if(!user){
  utils.movePage("index.html")
}

logoutButton.addEventListener("click", (e) => {
  localStorage.removeItem("user")
  utils.movePage("index.html")
})

// eventlistener for adding equipment
equipmentAdd.addEventListener("click", async(e) => {
  let item = equipmentList.value

  let equipment = await dnd.getSpecificEquipment(item)
  
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

characterDelete.addEventListener("click", deleteChar)

// initialize the characters array and the selectedcharacter
let characters = []
let selectedCharacter = 0

// eventlistener for the characters list, if we change then switch character
charactersList.addEventListener("change", async (e) => {
  await switchCharacter()
})

// updates the local character data on form change
Form.addEventListener("change", (e) => {
  let data = new FormData(Form)
  setCharacter(data)
})


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

// load in all the races from dnd api
let races = await dnd.getAllRaces()
// append equipment api list to visual select in form
races.forEach(race => {
  let opt = document.createElement("option")
  opt.value = race.index
  opt.textContent = race.name
  raceList.appendChild(opt)
})

// load in all the races from dnd api
let abilityScores = await dnd.getAllAbilities()
// append equipment api list to visual select in form
abilityScores.forEach(score => {
  let li = document.createElement("li")
  let label = document.createElement("label")
  label.textContent = score.name
  let inp = document.createElement("input")
  inp.type = "number"
  inp.name = "score-" + score.name
  inp.id = "score-" + score.name
  li.appendChild(label)
  li.appendChild(inp)

  abilityScoreList.appendChild(li)
})


// if the user is logged in load its characters else if there arent any 
// already saved characters, put user in creation of a new one
if(user){
  // check if the user has saved characters in cities
  let alreadySaved = await cities.get(user)
  console.log(alreadySaved)
  if(alreadySaved.length > 0){
    // if they do then load them in
    console.log("characters exist in cities")
    //console.log(alreadySaved)
    loadCharacters(alreadySaved)
    
  } else {
    // else create a new empty default one
    console.log("create new")
    listCharacters()
    charactersList.value = "new"
    await switchCharacter()
  }
  listCharacters()
}

/**
 * updates the visual inventory list
 * @param {*} list 
 */
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

/**
 * lists out the characters in the character selector
 */
function listCharacters(){
  utils.removeChildren(charactersList)
  console.log("listing")
  //console.log(characters)
  if(characters.length > 0){
    characters.forEach(char => {
      let opt = document.createElement("option")
      opt.value = char.id
      opt.textContent = char.name
      charactersList.appendChild(opt)
      charactersList.value = characters[selectedCharacter].id
    })
  }
  let opt = document.createElement("option")
  opt.value = "new"
  opt.textContent = "New Character"
  charactersList.appendChild(opt)
}

// switches the character by getting the characters index from its id,
// which solves the problem of having characters with the same name?
/**
 * switches the character by getting the characters index from its id
 */
async function switchCharacter(){
  console.log("switch start")
  //console.log(charactersList.value)
  if(charactersList.value === "new"){ // if we choose the "new", option then initiate a new character creation
    //console.log("Adding character")
    newCharacterOverlay.style.display = "block"
    await waitTillCharacterCreated()
    //console.log("creation done")
    switchCharacter()
  } else{
    //console.log("Switching characters")
    let id = +charactersList.value
    let index = characters.findIndex((char) => {
      return char.id === id
    })
    selectedCharacter = index
    refreshCharacter(characters[selectedCharacter])
  }
  //console.log("selected: " + selectedCharacter)
}

/**
 * creates a new promise where we wait until the user has pressed the button to create a character
 */
async function waitTillCharacterCreated(){
  console.log("starting character creation")
  await new Promise((resolve) => {
    //console.log("promise made")
    //console.log(this)
    function addCharacter(event){
      event.preventDefault()
      let data = new FormData(newCharacterForm)
      let character = new Character()
      character.setName(data.get("new-character-name"))
      character.setClass("barbarian")
      character.setRace("dragonborn")
      //console.log(character)
      characters.push(character)
      //console.log("adding character1")
      //console.log(JSON.stringify(characters))
      listCharacters()
      charactersList.value = character.id
      //console.log("list Value: " + charactersList.value)
      
      newCharacterOverlay.style.display = "none"
      resolve()
      //console.log("resolved")
      newCharacterForm.removeEventListener("submit", addCharacter)
    }
    newCharacterForm.addEventListener("submit", addCharacter)
  })
}

/**
 * deletes a character from the character list and cities if its saved
 */
async function deleteChar(){
  console.log("deleting")
  let check = await cities.getID(characters[selectedCharacter].id, user)
  if(check && check.length > 0){
    cities.del(user, characters[selectedCharacter].id)
  }
  characters.splice(selectedCharacter, 1)
  selectedCharacter = selectedCharacter - 1
  if(selectedCharacter < 0) { selectedCharacter = 0 }
  if(characters.length === 0){
    //console.log("no characters left")
    charactersList.value = "new"
    //console.log(charactersList.value) 
    listCharacters()
    switchCharacter()
    return
  }
  //console.log("Selected: " + selectedCharacter)
  charactersList.value = characters[selectedCharacter].id
  listCharacters()
  switchCharacter()
  //console.log("Selected: " + selectedCharacter)
}

/**
 * basically saves all form data into the character
 * @param {*} data 
 */
function setCharacter(data){
  console.log("setting")
  characters[selectedCharacter].setName(data.get("name"))
  characters[selectedCharacter].setHealth(data.get("health"))
  characters[selectedCharacter].setArmor(data.get("armor"))
  characters[selectedCharacter].setClass(data.get("class"))
  characters[selectedCharacter].setRace(data.get("race"))
  characters[selectedCharacter].setLevel(data.get("level"))
  let newScores = {
    CHA: data.get("score-CHA"),
    CON: data.get("score-CON"),
    DEX: data.get("score-DEX"),
    INT: data.get("score-INT"),
    STR: data.get("score-STR"),
    WIS: data.get("score-WIS")
  }
  characters[selectedCharacter].setScores(newScores)
  console.log(characters)
  displayAbilityChart()
  listCharacters()
}

/**
 * load the oldcharacters into the characters list
 * @param {*} oldCharacters 
 */
async function loadCharacters(oldCharacters){
  console.log("loading")
  oldCharacters.forEach((character) => {
    characters.push(Character.parse(character))
  })
  listCharacters()
  refreshCharacter(characters[selectedCharacter])
  console.log(characters)
}

/**
 * visually refreshes the forms data with the sent in char
 */
function refreshCharacter(){
  console.log("Refreshing")
  //console.log(characters[selectedCharacter])
  Form.name.value = characters[selectedCharacter].name
  Form.health.value = characters[selectedCharacter].health
  Form.armor.value = characters[selectedCharacter].armor

  characters[selectedCharacter].clas ? Form.class.value = characters[selectedCharacter].clas : Form.class.value = "barbarian"
  //console.log(characters[selectedCharacter].race)
  //console.log(Boolean(characters[selectedCharacter].race))
  characters[selectedCharacter].race ? Form.race.value = characters[selectedCharacter].race : Form.race.value = "dragonborn"
  Form.level.value = characters[selectedCharacter].level

  abilityScores.forEach(score => {
    let inp = document.querySelector("#score-" + score.name)
    inp.value = characters[selectedCharacter].scores[score.name]
    //li["score-" + score.name].value = characters[selectedCharacter].scores[score.name]
  })

  updateEquipmentList(characters[selectedCharacter].inventory)
  displayAbilityChart()
}


// ! doesnt save all characters, should it?
/**
 * save selected character to cities api
 */
async function saveCharacter(){
  console.log("saving")
  //characters[selectedCharacter].setName(data.get("name"))
  //characters[selectedCharacter].setClass(data.get("class"))
  //characters[selectedCharacter].setLevel(data.get("level"))

  //console.log(characters[selectedCharacter])
  cities.post(characters[selectedCharacter], user)
}

/**
 * 
 */
function displayAbilityChart(){
  const data = characters[selectedCharacter].scores
  //console.log(Object.keys(data))
  if(chart){
    //console.log("chart before")
    //console.log(chart)
    chart.data.datasets.forEach(ob => {
      ob.data = Object.values(data)
    })
    chart.update();
  }
  if(!chart){
    //console.log("no chart before")
    chart = new Chart(
      abilityChart,
      {
        type: "radar",
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data)
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      }
    )
  }
}