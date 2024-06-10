import { getBalance } from "../src/async"

test('get user balance', async () => {
    const from = jest.fn()
    from.mockResolvedValueOnce(1000)

    await expect(getBalance('nandang', from)).resolves.toEqual(
        {
            name: 'nandang',
            balance: 1000
        }
    )

    expect(from.mock.calls.length).toBe(1)

    expect(from.mock.results[0].value).resolves.toBe(1000)

})

test.failing('mock async rejected', async () => {
    const from = jest.fn()
    from.mockRejectedValueOnce('upps')

    await getBalance('nandang', from)
})

test('mock async function error', async () => {
    const from = jest.fn()
    from.mockRejectedValueOnce('rejected')

    await expect(getBalance('nandang', from)).rejects.toBe('rejected')
})