test('array', () => {
    const names = ['nandang', 'sopyan']
    expect(names).toContain('sopyan')
    expect(names).toEqual(['nandang', 'sopyan'])

    const persons = [
        { id: 1, name: 'nandang' },
        { id: 2, name: 'sopyan' },
    ]

    expect(persons).toContainEqual({id:2, name: 'sopyan'})
    expect(persons).toEqual([{id: 1, name: 'nandang'}, {id: 2, name: 'sopyan'}])
})