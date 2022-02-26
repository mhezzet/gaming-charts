import { useCallback, useEffect, useMemo, useState } from 'react'
import { Table } from './Table'

const SERVER_URL = 'http://localhost:8080'

export const App = () => {
  const [playTimeGenre, setPlayTimeGenre] = useState('')
  const [playTimePlatform, setPlayTimePlatform] = useState('')
  const [numberOfPlayersGenre, setNumberOfPlayersGenre] = useState('')
  const [numberOfPlayersPlatform, setNumberOfPlayersPlatform] = useState('')
  const [gamesByPlayTime, setGamesByPlayTime] = useState(null)
  const [gamesByNumberOfPlayers, setGamesByNumberOfPlayers] = useState(null)

  const playTimeQueryParams = useMemo(
    () =>
      new URLSearchParams({
        ...(playTimeGenre && { genre: playTimeGenre }),
        ...(playTimePlatform && { platform: playTimePlatform }),
      }).toString(),
    [playTimeGenre, playTimePlatform]
  )

  const numberOfPlayersQueryParams = useMemo(
    () =>
      new URLSearchParams({
        ...(numberOfPlayersGenre && { genre: numberOfPlayersGenre }),
        ...(numberOfPlayersPlatform && { platform: numberOfPlayersPlatform }),
      }).toString(),
    [numberOfPlayersGenre, numberOfPlayersPlatform]
  )

  const getGamesByPlayTime = useCallback(
    () =>
      fetch(`${SERVER_URL}/select_top_by_playtime?${playTimeQueryParams}`)
        .then(res => res.json())
        .then(setGamesByPlayTime),
    [playTimeQueryParams]
  )

  const getGamesByNumberOfPlayers = useCallback(
    () =>
      fetch(`${SERVER_URL}/select_top_by_players?${numberOfPlayersQueryParams}`)
        .then(res => res.json())
        .then(setGamesByNumberOfPlayers),
    [numberOfPlayersQueryParams]
  )

  useEffect(() => {
    getGamesByPlayTime()
  }, [getGamesByPlayTime])

  useEffect(() => {
    getGamesByNumberOfPlayers()
  }, [getGamesByNumberOfPlayers])

  return (
    <div className='container'>
      <Table
        title='Top games by playtime'
        data={gamesByPlayTime}
        headers={[
          { name: 'Game', field: 'game' },
          { name: 'Platforms', field: 'platforms' },
          { name: 'Genre', field: 'genre' },
          { name: 'Total play time', field: 'playTime' },
        ]}
        onPlatformChange={setPlayTimePlatform}
        onGenreChange={setPlayTimeGenre}
      />
      <Table
        title='Top games by number of players'
        data={gamesByNumberOfPlayers}
        headers={[
          { name: 'Game', field: 'game' },
          { name: 'Platforms', field: 'platforms' },
          { name: 'Genre', field: 'genre' },
          { name: 'Number of players', field: 'playersNumber' },
        ]}
        onPlatformChange={setNumberOfPlayersPlatform}
        onGenreChange={setNumberOfPlayersGenre}
      />
    </div>
  )
}
