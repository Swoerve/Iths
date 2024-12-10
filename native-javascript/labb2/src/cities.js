import { binaryToString, stringToBinary } from "./binary.js"


/**
 * Posts data in a stringified binary form
 * @param {any} data an object that will be stringified and binaryfied
 * @param {string} user user to key the saved data with
 */
export async function post(data, user){
  
  let check = await getID(data.id, user)
  console.log(check)
  if(check && check.length > 0){
    patch(data, user, check)
  }else{
    console.log("posting")
    console.log(`data ${data}`)
    console.log("saving to cities with new save")
    let bin = JSON.stringify(data)
    console.log(bin)
    let binData = `CreatorApp${user}|${data.id}|` + stringToBinary(bin)
    fetch('https://avancera.app/cities/', {
    body: `{ "name": "${binData}", "population": 5555 }`,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
    })
    .then(response => response)
    .then(result => {
      console.log(result)
    })
  }
}

/**
 * Fetches data of a user and parses it from stringified binary to an array of objects
 * @param {string} user user to fetch data of
 * @returns {Array} data
 */
export async function get(user = "0"){
  let result = await fetch(`https://avancera.app/cities/?name=CreatorApp${user}|`, {
  headers: {
    'Content-Type': 'application/json'
  }
  })
    .then(response => response.json())
    .then(res => res)
    .catch(err => console.log(err))
  console.log("logging")
  console.log(result)
  let data = []
  result.forEach(item => {
    item = item.name.split("|")[2]
    console.log("splitting")
    console.log(item)
    item = binaryToString(item)
    item = JSON.parse(item)
    data.push(item)
  })
  console.log(data)
  // if(Array.isArray(data)){
  //   data = null
  // } else
  return data
}

/**
 * Fetches the cities id of a specific user data
 * @param {string} id user, specific data local id
 * @param {string} user user to fetch from
 * @returns {Promise<number>} an id number of the cities id of the specific data of user
 */
export async function getID(id, user){
  let result = await fetch(`https://avancera.app/cities/?name=CreatorApp${user}|${id}|`, {
  headers: {
    'Content-Type': 'application/json'
  }
  })
    .then(response => response.json())
    .then(res => res)
    .catch(err => console.log(err))
    console.log("id Result")
    console.log(result)
  if(result.length > 0){
    return result[0].id
  } else {
    return null
  }
}

/**
 * Patches a specific id position in cities with new data for a specific user
 * @param {*} data user data to use in the patch
 * @param {string} user user to patch to
 * @param {number} id cities id of the object to patch
 */
async function patch(data, user, id){
  console.log("patching to cities")
  console.log(data)
  let bin = JSON.stringify(data)
  console.log(bin)
  let binData = `CreatorApp${user}|${data.id}|` + stringToBinary(bin)
  console.log(binData)
  fetch(`https://avancera.app/cities/${id}`, {
  body: `{ "name": "${binData}", "population": 5555 }`,
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'PATCH'
  })
  .then(response => response)
  .then(result => {
    console.log(result)
  })
}