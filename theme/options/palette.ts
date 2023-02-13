import { PaletteOptions, Palette } from "@mui/material"

declare module '@mui/material/styles' {
	interface Palette {
		white: Palette['primary']
	}

	interface PaletteOptions {
		white: PaletteOptions['primary']
	}
}

const paletteOptions: PaletteOptions = {
	white: {
		main: '#ffffff',
		light: '#ffffff',
		dark: '#ffffff',
	}
}

export default paletteOptions