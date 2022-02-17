const { select_top_by_players } = require('../select_top_by_players')
const { data } = require('../games.json')

describe('select_top_by_players', () => {
  it('should aggregate by game and accumulate and sort by number of players', () => {
    const games = select_top_by_players({ dataSet: data })

    expect(games[0].playersNumber).toBe(3)
  })

  it('should return all games with no filter', () => {
    const games = select_top_by_players({ dataSet: data })

    expect(games.length).toBe(11)
  })

  it('should filter by genre', () => {
    const games = select_top_by_players({ dataSet: data, genre: 'RPG' })

    expect(games.length).toBe(3)
    expect(games.every(game => game.genre.includes('RPG'))).toBeTruthy()
  })

  it('should filter by platform', () => {
    const games = select_top_by_players({ dataSet: data, platform: 'PS4' })

    expect(games.length).toBe(5)
    expect(
      games.every(game =>
        game.platforms.some(platform => platform.includes('PS4'))
      )
    ).toBeTruthy()
  })

  it('should filter by both platform and genre', () => {
    const games = select_top_by_players({
      dataSet: data,
      platform: 'PS4',
      genre: 'RPG',
    })

    expect(games.length).toBe(2)

    expect(
      games.every(game =>
        game.platforms.some(platform => platform.includes('PS4'))
      )
    ).toBeTruthy()

    expect(games.every(game => game.genre.includes('RPG'))).toBeTruthy()
  })
})
