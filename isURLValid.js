module.exports = function isURLValid(urlString) {
  //http(s)://www.example.com(/more/routes)
  const rex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
  return rex.test(urlString)
}
