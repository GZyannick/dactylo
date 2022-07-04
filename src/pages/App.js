import Spline from "@splinetool/react-spline";
import styled from "styled-components";
import WriteComponent from '../components/WriteComponent'
import Header from '../components/Header'
const SplineComponent = styled(Spline)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -10;
  
`;

const Wrapper = styled.div`
`

const MadeBy = styled.h4`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem 2rem;
`
const StyledA = styled.a`
  color: #5C899C;
`

// #C6ACE7 text not write
// #5C899C text write
// #BB7287 wrong text

function App() {
  return (
    <Wrapper>
        <SplineComponent scene="https://prod.spline.design/xMFZzbpK0IVkOHVg/scene.splinecode" />
        <Header/>
        <WriteComponent/>
        <MadeBy>Made by <StyledA href="https://twitter.com/GouezYannick" target="_blank">GzYannick</StyledA></MadeBy>
    </Wrapper>
  );
}
export default App;


