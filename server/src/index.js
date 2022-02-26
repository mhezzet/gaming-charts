const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { data } = require('./games.json')
const { select_top_by_playtime } = require('./select_top_by_playtime')
const { select_top_by_players } = require('./select_top_by_players')

const app = express()
const PORT = 8080

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/select_top_by_playtime', (req, res) => {
  const genre = req.query.genre
  const platform = req.query.platform

  res.json(select_top_by_playtime({ dataSet: data, genre, platform }))
})

app.get('/select_top_by_players', (req, res) => {
  const genre = req.query.genre
  const platform = req.query.platform

  res.json(select_top_by_players({ dataSet: data, genre, platform }))
})

app.get('/paginated_gamers', (req, res) => {
  const pageNo = parseInt(req.query.pageNo)
  const size = parseInt(req.query.size)

  const games = select_top_by_playtime({ dataSet: data })
  const startIndx = (pageNo - 1) * size
  const endIndex = startIndx + size

  res.json(games.slice(startIndx, endIndex))
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))
