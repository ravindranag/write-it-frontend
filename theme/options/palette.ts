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
	},
	primary: {
		main: '#000000',
		contrastText: '#ffffff'
	}
}

export default paletteOptions