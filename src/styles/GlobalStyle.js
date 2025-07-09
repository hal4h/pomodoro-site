import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: #1a1a1a;
    color: #ffffff;
    overflow-x: hidden;
    padding-top: 2.5re
  }

  #root {
    min-height: 100vh;
  }

  /* Smooth transitions for background changes */
  body {
    transition: background-image 0.5s ease-in-out;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #2a2a2a;
  }

  ::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #5a5a5a;
  }
`;

export default GlobalStyle;