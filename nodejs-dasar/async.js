function samplePromise() {
    return Promise.resolve("nandang")
}

async function run() {
    const name = await samplePromise()
    console.info(name)
}

run()