import { createTheme, alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

export const brand = {
  50: '#F0F7FF',
  100: '#CEE5FD',
  200: '#9CCCFC',
  300: '#55A6F6',
  400: '#0A66C2',
  500: '#0959AA',
  600: '#064079',
  700: '#033363',
  800: '#02294F',
  900: '#021F3B',
};

export const gray = {
  50: '#FBFCFE',
  100: '#EAF0F5',
  200: '#D6E2EB',
  300: '#BFCCD9',
  400: '#94A6B8',
  500: '#5B6B7C',
  600: '#4C5967',
  700: '#364049',
  800: '#131B20',
  900: '#090E10',
};

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      // main: '#556cd6',
      main: '#0B0B45',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    turquoise: createColor("#40E0D0"),
    yellow: createColor("#FFD814"),
    orange: createColor("#FFA41C"),
  },
  typography: {
    h1: {
      fontSize: "3rem",
      '@media (min-width:600px)': {
        fontSize: '5rem',
      },
      color: "#0B0B45"
    },
    h2: {
      fontSize: "2rem",
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
      color: "#0B0B45",
    },
    h3: {
      color: "#0B0B45"
    },
    h4: {
      fontSize: "1.5rem",
      '@media (min-wdith:600px)': {
          fontSize: "2.125rem",
      },
      color: "#0B0B45"
    },
    h5: {
      color: "#0B0B45"
    },
    h6: {
      color: "#0B0B45"
    },
    subtitle1: {
      color: "#0B0B45"
    },
    subtitle2: {
      color: "#0B0B45"
    },
    body1: {
      color: "#0B0B45"
    },
    body2: {
      color: "#0B0B45"
    }
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          backgroundColor: gray[50],
          borderRadius: 10,
          border: `1px solid ${alpha(gray[200], 0.8)}`,
          boxShadow: 'none',
          transition: 'background-color, border, 80ms ease',
          ...(ownerState.variant === 'outlined' && {
            background: `linear-gradient(to bottom, #FFF, ${gray[50]})`,
            '&:hover': {
              borderColor: brand[300],
              boxShadow: `0 0 24px ${brand[100]}`,
            },
          }),
          ...(theme.palette.mode === 'dark' && {
            backgroundColor: alpha(gray[800], 0.6),
            border: `1px solid ${alpha(gray[700], 0.3)}`,
            ...(ownerState.variant === 'outlined' && {
              background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(
                gray[800],
                0.5,
              )})`,
              '&:hover': {
                borderColor: brand[700],
                boxShadow: `0 0 24px ${brand[800]}`,
              },
            }),
          }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          alignSelf: 'center',
          py: 1.5,
          px: 0.5,
          background: `linear-gradient(to bottom right, ${brand[50]}, ${brand[100]})`,
          border: '1px solid',
          borderColor: `${alpha(brand[500], 0.3)}`,
          fontWeight: '600',
          '&:hover': {
            backgroundColor: brand[500],
          },
          '&:focus-visible': {
            borderColor: brand[800],
            backgroundColor: brand[200],
          },
          '& .MuiChip-label': {
            color: brand[500],
          },
          '& .MuiChip-icon': {
            color: brand[500],
          },
          ...(theme.palette.mode === 'dark' && {
            background: `linear-gradient(to bottom right, ${brand[700]}, ${brand[900]})`,
            borderColor: `${alpha(brand[500], 0.5)}`,
            '&:hover': {
              backgroundColor: brand[600],
            },
            '&:focus-visible': {
              borderColor: brand[200],
              backgroundColor: brand[600],
            },
            '& .MuiChip-label': {
              color: brand[200],
            },
            '& .MuiChip-icon': {
              color: brand[200],
            },
          }),
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: `${alpha(gray[200], 0.8)}`,
          ...(theme.palette.mode === 'dark' && {
            borderColor: `${alpha(gray[700], 0.4)}`,
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          boxSizing: 'border-box',
          boxShadow: 'none',
          borderRadius: '10px',
          textTransform: 'none',
          '&:active': {
            transform: 'scale(0.98)',
          },
          ...(ownerState.size === 'small' && {
            maxHeight: '32px',
          }),
          ...(ownerState.size === 'medium' && {
            height: '40px',
          }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
            color: brand[50],
            background: brand[500],
            backgroundImage: `linear-gradient(to bottom, ${brand[400]}, ${brand[600]})`,
            boxShadow: `inset 0 1px ${alpha(brand[300], 0.4)}`,
            outline: `1px solid ${brand[700]}`,
            '&:hover': {
              background: brand[400],
              backgroundImage: 'none',
              boxShadow: `0 0 0 1px  ${alpha(brand[300], 0.5)}`,
            },
          }),
          ...(ownerState.variant === 'outlined' && {
            backgroundColor: alpha(brand[300], 0.1),
            borderColor: brand[300],
            color: brand[500],
            '&:hover': {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
          }),
          ...(ownerState.variant === 'text' && {
            color: brand[500],
            '&:hover': {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
          }),
          ...(theme.palette.mode === 'dark' && {
            ...(ownerState.variant === 'outlined' && {
              backgroundColor: alpha(brand[600], 0.1),
              borderColor: brand[700],
              color: brand[300],
              '&:hover': {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
            ...(ownerState.variant === 'text' && {
              color: brand[300],
              '&:hover': {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
          }),
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '99px',
          color: gray[500],
          fontWeight: 500,
          ...(theme.palette.mode === 'dark' && {
            color: gray[300],
          }),
        }),
      },
    },
  }
});

export default theme;
