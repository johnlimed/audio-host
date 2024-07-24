import { PaletteColorOptions } from "@mui/material";

declare module '@mui/material/styles' {
  interface CustomPalette {
    turquoise: PaletteColorOptions;
    orange: PaletteColorOptions;
    yellow: PaletteColorOptions;
  }
  interface Palette extends CustomPalette { }
  interface PaletteOptions extends CustomPalette { }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    turquoise: true;
    orange: true;
    yellow: true;
  }
}
