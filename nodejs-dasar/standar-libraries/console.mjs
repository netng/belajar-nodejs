import { Console } from 'console'
import fs from 'fs'

const file = fs.createWriteStream('application.log')

const log = new Console({
    stdout: file,
    stderr: file
})

log.info('hello log')
log.error('errrorrr')

const person = {
    firstName: 'nandang',
    lastName: 'sopyan'
}

log.table(person)