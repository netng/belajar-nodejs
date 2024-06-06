import { sumAll } from "../src/sum"

describe('when call sumAll([5,5,5])', () => {
    it('should return 15', () => {
        const numbers = [5,5,5]
        expect(sumAll(numbers)).toBe(15)
    })
})