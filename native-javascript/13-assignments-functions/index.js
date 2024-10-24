// function sum(array) {
//     let result = 0
//     array.forEach((a, _i) => result += a)
//     return result
// }

function average(array) {
    if (array.length) {
        let result = sum(array) / array.length
        return result
    }
    return null
}

function reverse(array) {
    let reversedArray = []
    array.forEach((a, _i) => reversedArray.unshift(a))
    return reversedArray
}

function repeat(toRepeat, iterations) {
    let i = 0
    let result = []
    while (i < iterations) {
        result.push(toRepeat)
        i++
    }
    return result
}

function sum(...args) {
    let result = 0
    for (const n of args) {
        result += n
    }
    return result
}
