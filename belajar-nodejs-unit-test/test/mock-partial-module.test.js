import { getAllProducts, getProductById } from "../src/database"
import { ProductService } from "../src/product-service"

jest.mock('../src/database.js', () => {
    const originalModule = jest.requireActual('../src/database.js')

    return {
        __esmodule: true,
        ...originalModule,
        getAllProducts: jest.fn()
        
    }

})

test.failing('getProductById', () => {
    getProductById.mockImplementation(() => {
        return {
            id: 1,
            name: 'baju koko'
        }
    })

    expect(ProductService.findById(1)).toEqual({
        id: 1,
        name: 'baji koko'
    })
})

test('getAllProducts', () => {
    const products = [
        {
            id: 1,
            name: 'baju koko'
        },
        {
            id: 2,
            name: 'baju daster'
        }
    ]

    getAllProducts.mockImplementation(() => products)

    expect(ProductService.findAll()).toEqual(products)
})