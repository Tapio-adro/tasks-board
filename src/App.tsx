import styled, { ThemeProvider } from 'styled-components';
import BoardComponent from './components/BoardComponent';
import bgImage from './assets/img/bg.jpg';
import { BoardColumnsProvider } from './contexts/BoardColumnsContext';

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
        <BoardColumnsProvider>
          <StyledApp>
            <BoardComponent />
          </StyledApp>
        </BoardColumnsProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
