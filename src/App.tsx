import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import BoardComponent from './components/BoardComponent';
import bgImage from './assets/img/bg.jpg';
import { BoardColumnsProvider } from './contexts/BoardColumnsContext';
import { BoardDataProvider } from './contexts/BoardDataContext';

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
    buttonGrayText: '#44546f',
    buttonGrayHoverBg: '#8d8d8d28',
    // : '',
  },
  boxShadow: 'var(--ds-shadow-raised,0 1px 1px #091e4240,0 0 1px #091e424f)',
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BoardColumnsProvider>
          <BoardDataProvider>
            <StyledApp>
              <BoardComponent />
            </StyledApp>
          </BoardDataProvider>
        </BoardColumnsProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
