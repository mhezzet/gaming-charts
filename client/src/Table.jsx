import throttle from 'lodash/throttle'
import { memo, useMemo, useRef, useState } from 'react'

export const Table = memo(
  ({ title, data, headers, onGenreChange, onPlatformChange }) => {
    const [search, setSearch] = useState('')

    const debouncedPlatformChange = useRef(
      throttle(nextValue => onPlatformChange(nextValue), 350, { leading: true })
    ).current
    const debouncedGenreChange = useRef(
      throttle(nextValue => onGenreChange(nextValue), 350, { leading: true })
    ).current

    const filteredData = useMemo(
      () =>
        data.filter(row =>
          Object.values(row).some(value =>
            value.toString().toLowerCase().includes(search.toLowerCase())
          )
        ),
      [search, data]
    )

    return (
      <div className='table'>
        <h3>{title}</h3>
        <div className='filters'>
          <div>
            <label htmlFor='genre'>genre</label>
            <input
              type='text'
              id='genre'
              onChange={event => debouncedGenreChange(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor='platform'>platform</label>
            <input
              type='text'
              id='platform'
              onChange={event => debouncedPlatformChange(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor='search'>search</label>
            <input
              type='text'
              id='search'
              onChange={event => setSearch(event.target.value)}
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              {headers?.map(header => (
                <th key={header.field}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {headers?.map(header => (
                  <td key={header.field}>
                    {header.field === 'platforms'
                      ? row[header.field].join(', ')
                      : row[header.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)
