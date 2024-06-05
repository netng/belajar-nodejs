import fs from 'fs'
import zlib from 'zlib'

const source = fs.readFileSync('zlib-compress.mjs.txt')
const result = zlib.gunzipSync(source)

console.info(result.toString())