import process from 'process'

process.addListener('exit', function(exitCode) {
    console.info(`process exit with code ${exitCode}`)
})

console.info(process.version)
console.table(process.argv)

process.exit(1)

console.info('ini tidak akan dikseskusi kaerna sudah di exit diatas')