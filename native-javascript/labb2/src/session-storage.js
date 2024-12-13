import { binaryToString, stringToBinary } from "./binary.js"

/**
 * saves data to key in localstorage
 * @param {string} key 
 * @param {*} data 
 */
export function saveToLoSto(key, data){
  console.log("saving to localstorage")
  let bin = JSON.stringify(data)
  let binData = stringToBinary(bin)
  localStorage.setItem(key, binData)
}

/**
 * loads data from key in localstorage
 * @param {string} key 
 * @returns 
 */
export function loadFromLoSto(key){
  console.log("loading from localstorage")
  let data = localStorage.getItem(key)
  if(data){
    let binParsed = binaryToString(data)
    let loadedData = JSON.parse(binParsed)
    return loadedData
  }
  return null
}