import * as cities from "./cities.js";
import { getAllEquipment, getSpecificEquipment } from "./equipment.js";
import Observer from "./observer.js";
import * as utils from "./utils.js"

const cardOverlay = document.querySelector("#card-overlay")
cardOverlay.style.display = "none"
const equipForm = document.querySelector("#equipment-form")
const equipmentList = document.querySelector("#equipment")
const equipmentActualList = document.querySelector("#equipment-list")

const infoIndex = document.querySelector("#index")
const infoName = document.querySelector("#name")
const infoTest = document.querySelector("#test")


equipForm.addEventListener("submit", async(e) => {
  e.preventDefault()
  let data = new FormData(equipForm)
  console.log(data)
  await loadEquipment(data)
})

let characterEquip = new Observer([])
characterEquip.subscribe((newvalue) => {
  console.log("Observer ping!")
  updateEquipmentList(newvalue)
  saveToAvancera(newvalue)
  console.log(newvalue)
  console.log(newvalue)
})

let equipment = await getAllEquipment()

let alreadySaved = await cities.get("0")
if(alreadySaved && alreadySaved.length > 0){
  characterEquip.value = characterEquip.value.concat(alreadySaved)
}
console.log("loading")
console.log(equipment)
console.log(characterEquip)
console.log("alreadysavedload")
console.log(alreadySaved)

updateEquipmentList(alreadySaved)

equipment.forEach(equip => {
  let opt = document.createElement("option")
  opt.value = equip.index
  opt.textContent = equip.name
  equipmentList.appendChild(opt)
});


async function loadEquipment(data){
  let equipment = await getSpecificEquipment(data.get("equipment"))
  // console.log(equipment)
  // console.log(characterEquip.value)
  // console.log("setting equipment into observable")
  characterEquip.value = characterEquip.value.concat([equipment])
  // console.log(characterEquip.value)
}

function updateEquipmentList(list){
  utils.removeChildren(equipmentActualList)
  console.log("updateList")
  console.log(list)
  list.forEach(equip => {
    let e = document.createElement("li")
    e.textContent = equip.name
    console.log(equip.name)
    equipmentActualList.appendChild(e)
  })
}

function saveToAvancera(equipment){
  cities.post(equipment)
}