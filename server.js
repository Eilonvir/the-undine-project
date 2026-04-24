// server.js - Express server for Undine.03
// Serves static files from the public folder on port 3000
const express = require('express')


const app = express()

app.use(express.static('public'))


app.listen(3000, () => {
  console.log('woop can we move now')
})