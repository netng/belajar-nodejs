import {URL} from 'url'

const nandangweb = new URL('https://nandang.web.id/belajar?search=nodejs')
nandangweb.host = 'nan.com'
nandangweb.searchParams.append('status', 'vip')

console.info(nandangweb.toString())
console.info(nandangweb.href)
console.info(nandangweb.protocol)
console.info(nandangweb.host)
console.info(nandangweb.pathname)
console.info(nandangweb.searchParams)