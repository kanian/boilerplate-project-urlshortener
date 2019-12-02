const dns = require('dns')
const util = require('util')

module.exports = function urlExists(urlString, done) {
  dns.lookup(
    urlString,
    { family: 4, hints: dns.ADDRCONFIG | dns.V4MAPPED },
    done
  )
}
