const filterGames = ({ dataSet, genre, platform }) =>
  dataSet.filter(
    game =>
      ((genre && game.genre.toLowerCase().includes(genre?.toLowerCase())) ??
        true) &&
      ((platform &&
        game.platforms
          .map(platform => platform?.toLowerCase())
          .some(currentPlatform =>
            currentPlatform.includes(platform?.toLowerCase())
          )) ??
        true)
  )

const sortBy = attribute => (game1, game2) => {
  if (game1[attribute] > game2[attribute]) {
    return -1
  }
  if (game1[attribute] < game2[attribute]) {
    return 1
  }

  return 0
}

module.exports = { filterGames, sortBy }
