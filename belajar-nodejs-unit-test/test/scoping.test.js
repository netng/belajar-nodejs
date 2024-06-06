beforeAll(() => console.log('before all'))
afterAll(() => console.log('after all'))

beforeEach(() => console.log('before each outer'))
afterEach(() => console.log('after each outer'))

test('outer test', () => {
    console.info('outer test')
})

describe('inner', () => {
    beforeEach(() => console.log('before each inner'))
    afterEach(() => console.log('after each inner'))

    test('inner test', () => {
        console.info('inner test')
    })
})