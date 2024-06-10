import { sayHello } from "../src/sayHello"

test('sayHello(name)', () => {
    expect(sayHello('nandang')).toBe('hello nandang')
})

test.failing('sayHello(null)', () => {
    sayHello(null)
})