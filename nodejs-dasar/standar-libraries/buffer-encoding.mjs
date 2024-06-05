const buffer = Buffer.from('nandang sopyan', 'utf-8')
console.info(buffer.toString())

console.info(buffer.toString('hex'))
console.info(buffer.toString('base64'))

const bufferBase64 = Buffer.from('bmFuZGFuZyBzb3B5YW4=', 'base64')
console.info(bufferBase64.toString('utf-8'))