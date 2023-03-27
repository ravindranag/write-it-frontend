import { PaletteOptions, Palette, PaletteColorOptions } from "@mui/material"
import { CSSProperties } from "react"

declare module '@mui/material/styles' {
	interface Palette {
		white: Palette['primary'],
		disabled: Palette['primary']
	}

	interface PaletteOptions {
		white: PaletteOptions['primary'],
		disabled: Palette['primary']
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
	},
	disabled: {
		main: '#ccc',
		light: '#121212',
		dark: '#121212',
		contrastText: '#ccc'
	}
}

export default paletteOptions