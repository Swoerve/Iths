import Observer from "./observer.js";
import * as utils from "./utils.js"

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

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

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

let characterEquip = new Observer([])
characterEquip.subscribe((newvalue) => {
  updateEquipmentList(newvalue)
})

let equipment = await fetch("https://www.dnd5eapi.co/api/equipment", requestOptions)
  .then((response) => response.json())
  .then((result) => {return result.results})
  .catch((error) => console.error(error));

equipment.forEach(equip => {
  let opt = document.createElement("option")
  opt.value = equip.index
  opt.textContent = equip.name
  equipmentList.appendChild(opt)
});

console.log(equipment)

async function loadEquipment(data){
  let equipment = await fetch(`https://www.dnd5eapi.co/api/equipment/${data.get("equipment")}`)
  .then((response) => response.json())
  .then((result) => {return result})
  .catch((error) => console.error(error));
  console.log(equipment)
  console.log(characterEquip.value)
  console.log("setting equipment into observable")
  characterEquip.value = characterEquip.value.concat([equipment])
  console.log(characterEquip.value)
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