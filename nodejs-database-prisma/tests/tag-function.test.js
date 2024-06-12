const tagFunction = (array, ...args) => {
    console.log(array)
    console.log(args)
}

test('tag function', () => {
    const name = 'nandang'
    const lastName = 'sopyan'
    tagFunction`hello ${name} ${lastName}!, how are you?`
    tagFunction`good bye ${name} ${lastName}!, see you later!`
})

test('tag function sql', () => {
    const name = 'nandang; DROP table users;'
    const age = 30

    tagFunction`SELECT * FROM users WHERE name = ${name} AND age = ${age}`
})