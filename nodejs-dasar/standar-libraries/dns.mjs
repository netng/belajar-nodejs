import dns from 'dns/promises'

const address = await dns.lookup("nandang.web.id")
console.info(address)