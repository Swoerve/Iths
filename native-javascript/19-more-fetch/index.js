// let city = prompt('')
// let population = +prompt('')
//
// let request = {
//     name: city,
//     population: population
// }
//
//
// fetch('https://avancera.app/cities/', {
//     body: JSON.stringify(request),
//     headers: {
//         'content-type': 'application/json'
//     },
//     method: 'POST'
// })
///////////
// let id = prompt('')
// let city = prompt('')
// let population = +prompt('')
//
// let request = {
//     id: id,
//     name: city,
//     population: population
// }
//
//
// fetch(`https://avancera.app/cities/${id}`, {
//     body: JSON.stringify(request),
//     headers: {
//         'content-type': 'application/json'
//     },
//     method: 'PUT'
// })
///////////
// let id = prompt('')
//
// fetch(`https://avancera.app/cities/${id}`, {
//     method: 'DELETE'
// })
// ////////
// let id = prompt('')
// let city = prompt('')
// // let population = +prompt('')
//
// let request = {
//     // id: id,
//     name: city,
//     // population: population
// }
//
//
// fetch(`https://avancera.app/cities/${id}`, {
//     body: JSON.stringify(request),
//     headers: {
//         'content-type': 'application/json'
//     },
//     method: 'PATCH'
// })
///////////

let id = prompt('')
let city = prompt('')
let population = +prompt('')

let request = {}
city ? request.name = city : ''
population ? request.population = population : ''


fetch(`https://avancera.app/cities/${id}`, {
    body: JSON.stringify(request),
    headers: {
        'content-type': 'application/json'
    },
    method: 'PATCH'
})
