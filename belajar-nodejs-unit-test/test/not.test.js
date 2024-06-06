test('string', () => {
    const name = 'nandang sopyan'

    expect(name).not.toBe('sopyan')
    expect(name).not.toMatch(/ndg/) //regex pattern
})

test("numbers", () => {
    const value = 2 + 2

    expect(value).not.toBeGreaterThan(5)
    expect(value).not.toBeGreaterThanOrEqual(5.3)

    expect(value).not.toBe(5)
    expect(value).not.toEqual(5)
})