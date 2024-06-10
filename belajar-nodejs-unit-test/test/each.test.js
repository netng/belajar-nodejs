import { sumAll } from "../src/sum"

// const table = [
//     [
//         [1,1,1,1,1],
//         5
//     ],
//     [
//         [2,2,2],
//         6
//     ]
// ]


const table = [
    {
        numbers: [1,1,1,1,1],
        expected: 5
    },
    {
        numbers: [2,2,2],
        expected: 6
    },
]

// it.each(table)('test sumAll(%s) should result %i', ({ numbers, expected }) => {
//     expect(sumAll(numbers)).toBe(expected)
// })

it.each(table)('test sumAll($numbers) should result $expected', ({ numbers, expected }) => {
    expect(sumAll(numbers)).toBe(expected)
})