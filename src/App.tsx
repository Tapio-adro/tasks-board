import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import BoardComponent from './components/BoardComponent';
import bgImage from './assets/img/bg.jpg';
import { BoardColumnsProvider } from './contexts/BoardContext';

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
`;

const theme: DefaultTheme = {
  colors: {
    bgColor: '#f1f2f4',
    titleText: '#172b4d',
    // : '',
  },
  boxShadow: 'var(--ds-shadow-raised,0 1px 1px #091e4240,0 0 1px #091e424f)',
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
