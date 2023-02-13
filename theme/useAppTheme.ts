import { ThemeOptions, createTheme } from '@mui/material'
import componentOptions from './options/components'
import paletteOptions from './options/palette'

const obj = {
	MuiButton: {
		styleOverrides: {
			root: {
				width: 'fit-content'
			}
		}
	}
}

const useAppTheme = () => {
	const themeOptions: ThemeOptions = {
		components: componentOptions,
		palette: paletteOptions
	}

	const theme = createTheme(themeOptions)

	return theme
}

export default useAppTheme