'use client';

import type {} from '@mui/lab/themeAugmentation';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const CARD_SPACING = 3;

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    // See how you can customize your theme's palette: https://mui.com/material-ui/customization/palette/
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    // Learn how to globally customize your components: https://mui.com/material-ui/customization/theme-components/
    MuiGrid: {
      // You can customize a component's default properties
      defaultProps: {
        spacing: 2,
      },
    },
    MuiStack: {
      defaultProps: {
        gap: 2,
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiAppBar: {
      // You can also customize component's default styles
      styleOverrides: {
        root: ({ theme }) => ({
          marginBottom: theme.spacing(4),
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: () => ({
          padding: '0!important',
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: () => ({
          // You can customize components having different classes, such as a "clickable" class
          '&.clickable': {
            transition: '0.4s',
            cursor: 'pointer',
            '&:hover': {
              filter: 'brightness(1.25)',
            },
          },
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(CARD_SPACING),
          paddingRight: theme.spacing(CARD_SPACING),
          paddingBottom: 0,
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: '100%',
          padding: theme.spacing(CARD_SPACING),
          // You can even customize nested styles
          '&:last-child': {
            paddingBottom: `${theme.spacing(CARD_SPACING)}!Important`,
          },
        }),
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(CARD_SPACING),
          paddingRight: theme.spacing(CARD_SPACING),
          paddingBottom: theme.spacing(CARD_SPACING),
          justifyContent: 'right',
        }),
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
