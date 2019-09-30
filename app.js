const express = require('express')
const cors = require('cors')
const logger = require('morgan')
// const favicon = require('serve-favicon')

const PORT = process.env.PORT || 3000

let app = express()

app.use(logger('dev'))
app.use(cors())

app.use(express.static('dist'))

app.listen(PORT, err => {
  if (err) {
    throw err
  }
  console.info('Listening on port ' + PORT + '...')
})
