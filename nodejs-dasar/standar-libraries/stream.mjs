import fs, { write } from 'fs'

const writer = fs.createWriteStream('target.log')
writer.write('nandang\n')
writer.write('sopyan\n')
writer.end()

const reader = fs.createReadStream('target.log')
reader.addListener('data', (data) => {
    console.info(data.toString())
})