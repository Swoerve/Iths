
// different document elements that MIGHT be needed
const overlay = document.querySelector("#card-overlay")
const eCard = document.querySelector("#equipment-card")
const eCardName = document.querySelector("#equipment-name")
const eCardIndex = document.querySelector("#equipment-index")

// headers for the api
const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

// request options for the api
const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
}

/**
 * Fetch all the equipment from the dnd5e srd api
 * @returns equipment List
 */
export async function getAllEquipment(){
  let equipment = await fetch("https://www.dnd5eapi.co/api/equipment", requestOptions)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((error) => console.error(error))
  return equipment
}


/**
 * Fetch a specific equipment from the dnd5e srd api
 * @param {string} equipment 
 * @returns equipment object
 */
export async function getSpecificEquipment(equipment){
  let equip = await fetch(`https://www.dnd5eapi.co/api/equipment/${equipment}`)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error))
    
  return equip
}