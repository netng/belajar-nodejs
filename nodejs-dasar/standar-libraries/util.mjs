import util from 'util'

const name = 'nandang'

console.info(`halo ${name}`)
console.info(util.format('halo %s', name))

const person = {
    firstName: 'nandang',
    lastName: 'sopyan'
}

console.info(`Person ${JSON.stringify(person)}`)
console.info('Person %j', person)