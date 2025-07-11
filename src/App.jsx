import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './components/Auth/AuthProvider';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import MainLayout from './components/Layout/MainLayout';
import ActiveMusicPlayer from './components/BackgroundSelector/ActiveMusicPlayer';
import UserMenu from './components/Auth/UserMenu';
import { Analytics } from "@vercel/analytics/react"


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <AppProvider>
          <UserMenu />
          <MainLayout />
          <ActiveMusicPlayer />
          <Analytics/>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;