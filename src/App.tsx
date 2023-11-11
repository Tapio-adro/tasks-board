import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import BoardComponent from './components/BoardComponent';
import bgImage from './assets/img/bg.jpg';
import { BoardColumnsProvider } from './contexts/BoardColumnsContext';
import { BoardDataProvider } from './contexts/BoardDataContext';
import { BoardsProvider } from './contexts/BoardsContext';

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
    titleTextSubtle: '#44546f',
    buttonGreyHoverBg: '#8d8d8d28',
    // : '',
  },
  boxShadow: '0 1px 1px #091e4240,0 0 1px #091e424f',
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BoardsProvider>
          <BoardColumnsProvider>
            <BoardDataProvider>
              <StyledApp>
                <BoardComponent />
              </StyledApp>
            </BoardDataProvider>
          </BoardColumnsProvider>
        </BoardsProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
