const buffer = Buffer.from('nandang sopyan', 'utf-8')
console.info(buffer)
console.info(buffer.toString())

buffer.reverse()
console.info(buffer.toString())

console.info(buffer.toJSON())