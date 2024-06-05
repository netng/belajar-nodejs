function samplePromise() {
    return Promise.resolve("nandang")
}

const name = await samplePromise()
console.info(name)