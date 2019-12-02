'use strict'

var express = require('express')
var mongo = require('mongodb')
var mongoose = require('mongoose')
var cors = require('cors')
const { createAndSaveURL, findURLById } = require('./app')
const urlExists = require('./urlExists')
const isURLValid = require('./isURLValid')
var app = express()

// Basic Configuration
var port = process.env.PORT || 3000

app.use(cors())


app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/shorturl/new', function(req, res) {
  const url = req.query.url
  if (!isURLValid(url)) {
    res.json({ error: 'invalid URL' })
  }
  const result = urlExists(req.query.url, async function(err, address, family) {
    if (err) {
      res.json({ error: 'invalid URL' })
      //res.json(err)
    }
    // url exists
    const shortul = await createAndSaveURL(url)
    res.json(shortul)
  })
})

app.get('/api/shorturl/:short_url', async function(req, res) {
  const url = req.params.short_url
  const { original_url } = await findURLById(url)
  if (original_url instanceof Error) {
    res.json({ error: 'invalid URL' })
  }
  const rex = /^https?:\/\/.*$/
  if (rex.test(original_url)) {
    res.redirect(original_url)
  }
  // Scheme is missing
  res.redirect(`http://${original_url}`)
})

app.listen(port, function() {
  console.log('Node.js listening ...')
})
