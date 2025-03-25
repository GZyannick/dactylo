import styled from "styled-components"
import { useState, useRef, useEffect } from "react"
import words from '../utils/data/words'
import CountDown from "./CountDown"
import Wpm from "./Wpm"
import WordContainer from "./WordContainer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons"


const Wrapper = styled.div`
    width: 100vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TypingTest = styled.div`
    position: relative;
`

const TypingTestInput = styled.input`
    opacity: 0;
`
const WarningFocus = styled.div`
    position: absolute;
    margin: auto;
    margin-top: auto;
    margin-bottom: auto;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.2); // Make sure this color has an opacity of less than 1
    backdrop-filter: blur(6px); 
    transition: all 0.2s ease-in-out;
    pointer-events: auto;
`
const WarningText = styled.h1`
    font-size: 1.2rem;
    color: #5C899C;
`

const Caret = styled.span`
   
`
const RestartButton = styled.button`
    background-color: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    border: none;
    .fa-arrow-rotate-left {
        font-size: 1.2rem;
    }

    &:hover {
        background-color: #5C899C;
        .fa-arrow-rotate-left {
            color: #FFFAF3;
        }
    }

`



function WriteComponent() {
  const [userInput, setUserInput] = useState('')
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [typedEntries, setTypedEntries] = useState(0)
  const [showFocusWarning, setShowFocusWarning] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [letterStatus, setLetterStatus] = useState(true)
  const [wordList, setWordList] = useState([])
  const [errorEntries, setErrorEntries] = useState(0)
  useEffect(() => {
    setWordList(getRandomWords())
    setLoading(false)
  }, [])

  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleOnKeyDown = (e) => {
    // modify the ref children with react props active
    // react modify the children with react props active
    setTypedEntries(prevState => prevState + 1)
    if (!isStart) setIsStart(true)
    if (!wordList[count] || !wordList[count].letters[count2]) {
      setWordList(getRandomWords())
      setCount(0)
      setCount2(0)
      return
    }
    if (e.key === 'Backspace') return

    if (e.key === wordList[count].letters[count2].char) {
      setWordList(prevState => {
        return prevState.map((item, index) => {
          if (index === count) {
            return {
              ...item,
              letters: item.letters.map((letter, index) => {
                if (index === count2) {
                  return {
                    ...letter,
                    status: letterStatus,
                  }
                }
                return letter
              }),
              status: true
            }
          }
          return item
        })
      })

      setLetterStatus(true)
      if (wordList[count].letters[count2]?.char === ' ') {
        setCount2(0)
        setCount(prevState => prevState + 1)
        return
      } else {
        setCount2(prevState => prevState + 1)
      }
    } else {
      setLetterStatus(false)
      setErrorEntries(prevState => prevState + 1)
    }
  }

  const handleClick = () => {
    inputRef.current.focus()
    setShowFocusWarning(false)
  }

  const handleOnBlur = () => {
    setShowFocusWarning(true)
  }

  const handleRestart = () => {
    setIsStart(false)
    setIsFinished(false)
    setUserInput('')
    setCount(0)
    setCount2(0)
    setTypedEntries(0)
    setErrorEntries(0)
    setWordList(getRandomWords())
    inputRef.current.focus()
    setShowFocusWarning(false)
  }

  if (loading) return (
    <Wrapper>
      <div>Loading...</div>
    </Wrapper>
  )
  return (
    <Wrapper>
      <TypingTest>
        {isFinished ? (
          <>
            <Wpm typedEntries={typedEntries} errorEntries={errorEntries}></Wpm>
          </>
        ) : (
          <>
            <CountDown setIsFinished={setIsFinished} isStart={isStart}></CountDown>
            <WordContainer onClick={handleClick} wordList={wordList} />
            {showFocusWarning && <WarningFocus onClick={handleClick}><WarningText>Click to focus</WarningText></WarningFocus>}
            <TypingTestInput type="text" autoComplete="off" autoCapitalize="off" autoCorrect="off" onBlur={handleOnBlur} ref={inputRef} name="typing" value={userInput} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleOnKeyDown(e)} />
          </>
        )}
      </TypingTest>

      <RestartButton onClick={handleRestart}>
        <FontAwesomeIcon icon={faArrowRotateLeft} color="#5C899C" />
      </RestartButton>
    </Wrapper>
  )
}

const getRandomWords = () => {
  const randomWords = []
  for (let i = 0; i < 16; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    const splitWord = randomWord.split('')
    const objectSplit = splitWord.map((letter) => {
      return {
        char: letter,
        status: null,
        active: false,
      }
    })
    const addSpaceToEnd = objectSplit.concat({
      char: ' ',
      status: null,
      active: false,
    })
    randomWords.push({
      letters: (i === 15) ? objectSplit : addSpaceToEnd,
    })
  }
  return randomWords
}

export default WriteComponent
