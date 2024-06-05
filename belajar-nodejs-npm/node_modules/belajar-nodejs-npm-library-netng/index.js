export function sayHello(name) {
    console.info(`Hello ${name}`)
}

export function sum(numbers) {
    let total = 0
    for (const number of numbers) {
        total += number
    }

    return total
}