import { writeToFile } from "belajar-nodejs-npm/write"
import moment from "moment"
import { sayHello, sum } from "belajar-nodejs-npm-library-netng"
import { min, max } from "belajar-nodejs-npm-library-netng/number"

writeToFile('hello.log', 'nandang sopyan')
console.log('hello node')
console.log(moment().format())

sayHello('nandang')
console.info(sum([1,2,3]))

console.info(min(1,2))
console.info(min(5,2))
console.info(max(5,2))
console.info(max(2,2))