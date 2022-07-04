import React from 'react'
import styled from 'styled-components'

const CurrentWpm = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    color: #5C899C;
`

function Wpm({typedEntries, errorEntries}) {
    const wpm = Math.round(typedEntries / 5)
    const netWpm = wpm - errorEntries
  return (
    <CurrentWpm>{wpm} wpm</CurrentWpm>
  )
}

export default Wpm