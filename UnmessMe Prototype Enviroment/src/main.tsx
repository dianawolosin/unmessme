import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { unmessTheme } from '@unmessme/design-system';
import App from './App';

// UnmessMe fonts: Libre Caslon Text (editorial, Caslon 540 stand-in) + JetBrains Mono (systemic)
import '@fontsource/libre-caslon-text/400.css';
import '@fontsource/libre-caslon-text/700.css';
import '@fontsource/libre-caslon-text/400-italic.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={unmessTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
