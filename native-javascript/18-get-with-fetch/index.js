// let cities = fetch('https://avancera.app/cities/').then(response => response.json()).then(result => console.log(result))

// console.log(cities)
// let promptedCity = prompt('')
// let city = fetch(`https://avancera.app/cities/${promptedCity}`).then(response => response.json()).then(result => console.log(result))

// let search = prompt('')
// let city = fetch(`https://avancera.app/cities/?name=${search}`).then(response => response.json()).then(result => console.log(result))
let search = prompt('')
let search2 = prompt('')
let city = fetch(`https://avancera.app/cities/?name=${search}&minPopulation=${search2}`).then(response => response.json()).then(result => console.log(result))
