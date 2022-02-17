const { filterGames, sortBy } = require('./utils')

const select_top_by_playtime = ({ dataSet, genre, platform }) =>
  Object.values(
    filterGames({ dataSet, genre, platform }).reduce(
      (games, record) => ({
        ...games,
        [record.game]: games[record.game]
          ? {
              ...games[record.game],
              playTime: games[record.game].playTime + record.playTime,
            }
          : {
              game: record.game,
              genre: record.genre,
              platforms: record.platforms,
              playTime: record.playTime,
            },
      }),
      {}
    )
  ).sort(sortBy('playTime'))

module.exports = { select_top_by_playtime }
