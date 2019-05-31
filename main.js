var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
var compression = require('compression')
var topicRouter = require('./routes/topic')
var indexRouter = require('./routes/index')
var helmet = require('helmet')
var app = express()
var port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())
app.use(helmet())

app.get('*', function (req, res, next) {
  fs.readdir('./data', function (error, filelist) {
    req.list = filelist
    next()
  })
})

// route, routing
app.use('/', indexRouter)
app.use('/topic', topicRouter)

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that.')
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('someting wrong.')
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
