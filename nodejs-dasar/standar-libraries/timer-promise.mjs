import timer from 'timers/promises'

// console.log(new Date())
// const name = await timer.setTimeout(2000, 'nandang')
// console.log(new Date())
// console.log(name)

// for await(const startTime of timer.setInterval(1000, new Date())) {
//     console.info(startTime)
// }


for await(const startTime of timer.setInterval(1000, 'ignored')) {
    console.info(new Date())
}