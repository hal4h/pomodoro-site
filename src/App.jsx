import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './context/AppContext';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import MainLayout from './components/Layout/MainLayout';
import ActiveMusicPlayer from './components/BackgroundSelector/ActiveMusicPlayer';
import UserMenu from './components/Auth/UserMenu';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppProvider>
        <UserMenu />
        <MainLayout />
        <ActiveMusicPlayer />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;