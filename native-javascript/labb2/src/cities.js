import { binaryToString, stringToBinary } from "./binary.js"


/**
 * 
 * @param {String} data 
 */
export async function post(data){
  
  let check = await getID()
  console.log(check)
  if(check && check.length > 0){
    patch(data, check)
  }else{
    console.log("posting")
    console.log(`data ${data}`)
    console.log("saving to cities with new save")
    let bin = JSON.stringify(data)
    console.log(bin)
    let binData = "CreatorApp0|" + stringToBinary(bin)
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

export async function get(query = "0"){
  let result = await fetch(`https://avancera.app/cities/?name=CreatorApp${query}|`, {
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
    item = item.name.split("|")[1]
    console.log("splitting")
    console.log(item)
    item = binaryToString(item)
    item = JSON.parse(item)
    data = item
  })
  console.log(data)
  return data
}

export async function getID(query = "0"){
  let result = await fetch(`https://avancera.app/cities/?name=CreatorApp${query}|`, {
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

async function patch(data, id){
  console.log("patching to cities")
  console.log(data)
  let bin = JSON.stringify(data)
  console.log(bin)
  let binData = "CreatorApp0|" + stringToBinary(bin)
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