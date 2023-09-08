import styled, { ThemeProvider } from 'styled-components';
import BoardComponent from './components/BoardComponent';
import bgImage from './assets/img/bg.jpg';

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
`;

const theme = {
  
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledApp>
          <BoardComponent />
        </StyledApp>
      </ThemeProvider>
    </>
  );
}

export default App;
