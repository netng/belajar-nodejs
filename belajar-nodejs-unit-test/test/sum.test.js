import { sum, sumAll } from '../src/sum'

test('sumAll', () => {
    const numbers = [5, 5, 5]
    expect(sumAll(numbers)).toBe(15)
})

test("test sum function 1", () => {
    const result = sum(1,2)
    
    expect(result).toBe(3)
})

test("test sum function 2", () => {
    const result = sum(1,2)
    
    expect(result).toBe(3)
})

test("test sum function 3", () => {
    const result = sum(1,2)
    
    expect(result).toBe(3)
})



// toEqual biasanya untuk equality dari suatu object (seperti object, array)
test("test person", () => {
    const person = {
        name: 'nandang',
        status: 'merried'
    }
    expect(person).toEqual({name: 'nandang', status: 'merried'})
})

test("test toEqual", () => {
    const person = { id: 1 }
    Object.assign(person, { name: 'nandang' })

    expect(person).toEqual({ id: 1, name: 'nandang' })
})

// toBe biasa digunakan untuk equality selain object,
// seperti string
test("test toBe", () => {
    const name = 'nandang'
    const hello = `hello ${name}`

    expect(hello).toBe('hello nandang')
})

test("truthiness", () => {
    let value = null
    
    expect(value).toBeNull()
    expect(value).toBeDefined()
    expect(value).toBeFalsy()

    value = undefined
    expect(value).toBeUndefined()
    expect(value).toBeFalsy()

    value = 'nandang'
    expect(value).toBeTruthy()
    expect(value).toBeDefined()


})