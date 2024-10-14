import React, { useEffect, useState } from 'react';
import { ThemeProvider as Provider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PaletteMode } from '@mui/material';


const ThemeProvider = ({children}: {children: any}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState<PaletteMode | undefined>(
    prefersDarkMode ? 'dark' : 'light'
  );

  useEffect(() => {
    setThemeMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <Provider theme={theme}>
      {children}
    </Provider>
  );
};

export default ThemeProvider;
