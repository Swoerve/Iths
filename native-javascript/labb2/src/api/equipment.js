
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

/**
 * Fetch all the classes from the dnd5e srd api
 * @returns class
 */
export async function getAllClasses(){
  let classes = await fetch("https://www.dnd5eapi.co/api/classes", requestOptions)
  .then((response) => response.json())
  .then((result) => result.results)
  .catch((error) => console.error(error))
  return classes
}

/**
 * Fetch all the races from the dnd5e srd api
 * @returns races
 */
export async function getAllRaces(){
  let races = await fetch("https://www.dnd5eapi.co/api/races", requestOptions)
  .then((response) => response.json())
  .then((result) => result.results)
  .catch((error) => console.error(error))

  return races
}

/**
 * Fetch all the Ability Scores from the dnd5e srd api
 * @returns scores
 */
export async function getAllAbilities(){
  let scores = await fetch("https://www.dnd5eapi.co/api/ability-scores", requestOptions)
  .then((response) => response.json())
  .then((result) => result.results)
  .catch((error) => console.error(error))

  return scores
}