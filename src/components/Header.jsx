import styled from "styled-components"

const Wrapper = styled.header`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  user-select: none;
`
function Header() {
  return (
    <Wrapper>
        <h1>Dactylo</h1>
    </Wrapper>
  )
}

export default Header