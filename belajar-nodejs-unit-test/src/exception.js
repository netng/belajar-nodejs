export class MyException extends Error {

}

export const callMe = (name) => {
    if (name === 'nandang') {
        throw new MyException('Tetot')
    } else {
        return 'OK'
    }
}