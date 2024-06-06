import { callMe, MyException } from "../src/exception"

test('exception', () => {
    expect(() => callMe('nandang')).toThrow()
    expect(() => callMe('nandang')).toThrow(MyException)
    expect(() => callMe('nandang')).toThrow('Tetot')
    expect(callMe('ujang')).toBe('OK')
})