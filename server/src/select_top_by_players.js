const { filterGames, sortBy } = require('./utils')

const select_top_by_players = ({ dataSet, genre, platform }) =>
  Object.values(
    filterGames({ dataSet, genre, platform }).reduce(
      (games, record) => ({
        ...games,
        [record.game]: games[record.game]
          ? {
              ...games[record.game],
              playersNumber: [
                ...games[record.game].playersNumber,
                record.userId,
              ],
            }
          : {
              game: record.game,
              genre: record.genre,
              platforms: record.platforms,
              playersNumber: [record.userId],
            },
      }),
      {}
    )
  )
    .map(game => ({ ...game, playersNumber: game.playersNumber.length }))
    .sort(sortBy('playersNumber'))

module.exports = { select_top_by_players }
