const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.use(express.static('public'))

app.get('/api/ocean', async(req, res) => {
    const response = await fetch('https://api.obis.org/v3/occurrence?depth_min=200&size=20')
    const data = await response.json()
    res.json(data.results)
})

app.listen(3000, () => {
  console.log('woop can we move now')
})