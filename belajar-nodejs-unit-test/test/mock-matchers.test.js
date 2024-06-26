import { calculate } from "../src/sum"

test('test mock mathcers', () => {
    const callback = jest.fn()

    calculate([10,10,10], callback)
    calculate([10,10,10,10,10], callback)

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(30, 'nandang');
    expect(callback).toHaveBeenCalledWith(50, 'nandang');
})