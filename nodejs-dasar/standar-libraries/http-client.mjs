import https from 'https'

const endpoint = 'https://enjib5pptq65e.x.pipedream.net'

const request = https.request(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accpet': 'application/json'
    }
}, (response) => {
    response.on('data', (data) => {
        console.info(`receivde ${data.toString()}`)
    })
})

const body = JSON.stringify({
    firstName: 'nan',
    lastName: 'dang'
})

request.write(body)
request.end()
