test('string', () => {
    const name = 'nandang sopyan'

    expect(name).toBe('nandang sopyan')
    expect(name).toMatch(/pya/) //regex pattern
})