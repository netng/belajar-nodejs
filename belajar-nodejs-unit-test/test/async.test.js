import { sayHello } from "../src/async"

test('async', async () => {
    const name = await sayHello('nandang')
    expect(name).toBe('hello nandang')
})

test('async matchers', async () => {
    await expect(sayHello('nandang')).resolves.toBe('hello nandang')
    await expect(sayHello('')).rejects.toBe('name is empty')
})