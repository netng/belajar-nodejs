import { sayHello } from "../src/async"

it.concurrent('concurrent 1', async () => {
    await expect(sayHello('nandang')).resolves.toBe('hello nandang')
})

it.concurrent('concurrent 2', async () => {
    await expect(sayHello('nandang')).resolves.toBe('hello nandang')
})

it.concurrent('concurrent 3', async () => {
    await expect(sayHello('nandang')).resolves.toBe('hello nandang')
})