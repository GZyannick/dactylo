import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-content: flex-start;
    flex-wrap: wrap;
    max-width: 960px;
    max-height: 150px;
    overflow: hidden;
    margin: 0.37rem;
    user-select: none;
`
const Word = styled.div`
    display: block;
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin: 0.37rem 0;
`
const Letter = styled.span`
    margin: 0.1rem;
    color: ${
        ({status}) => {
            if(status === null) return `#C6ACE7;`
            return (status) ? `#5C899C` : `#BB7287;`
        }
    }
`

function WordContainer({wordList, handleCLick}) {
  return (
    <Wrapper onClick={handleCLick}>
         { 
            wordList?.map(({letters}, index) => {
                return(
                    <Word key={`word-${index}`} >
                        {letters?.map(({char, status, active}, index) => (
                            <Letter key={`letter-${index}`} active={active} status={status}>{(char !== ' ') ? char : '␣'}</Letter>
                        ))}
                    </Word>
                )
            })
        }
        <Word key={`word-space`} >
            <Letter key={`letter-space`} active={null} status={null}>␣</Letter>
        </Word>
    </Wrapper>
  )
}

export default WordContainer