import process from 'node:process'

process.report.reportOnFatalError = true
process.report.reportOnSignal = true
process.report.reportOnUncaughtException = true
process.report.filename = 'error-report.json'

function sampleError() {
    throw new Error('Upps')
}

sampleError()