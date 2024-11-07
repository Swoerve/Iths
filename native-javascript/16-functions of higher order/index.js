function call(func) {
    func()
}

function ff() {
    return 'Hello World!'
}

function f() {
    return ff
}

function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i])
    }
}

function find(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i]) === true) {
            return arr[i]
        }
    }
}

function filter(arr, func) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i]) === true) {
            newArr.push(arr[i])
        }

    }
    return newArr
}
