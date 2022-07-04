import React, {useEffect} from 'react'
import styled from "styled-components"

const CountDownElement = styled.div`
    color: #5C899C;
    font-weight: bold;
    margin: 0.37rem;
    user-select: none;

`

function CountDown({setIsFinished, isStart}) {
    const [countDown, setCountDown] = React.useState(60);

    useEffect(() => {
        if(!isStart) return
        if(countDown === 0) return setIsFinished(true);
        const interval = setInterval(() => {
            setCountDown(countDown - 1);
        }, 1000);
        return () => clearInterval(interval);

    }, [countDown, isStart]);

    return <CountDownElement>{countDown}</CountDownElement>
}

export default CountDown