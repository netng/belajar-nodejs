import { getAllProducts, getProductById } from "../src/database"
import { ProductService } from "../src/product-service"

jest.mock('../src/database.js')


test('mock getProductById(id)', () => {
    getProductById.mockImplementation(() => {
        return {
            id: 1,
            name: 'Product mock'
        }
    })

    expect(ProductService.findById(1)).toEqual(
        {
            id: 1,
            name: 'Product mock'
        }
    )
})


test('mock getAllProducts()', () => {
    const result = [
        {
            id: 1,
            name: 'Product mock'
        },
        {
            id: 2,
            name: 'Product mock'
        }
    ]

    getAllProducts.mockImplementation(() => result)

    expect(ProductService.findAll()).toEqual(result)
})