import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material'
import componentOptions from './options/components'
import paletteOptions from './options/palette'
import typographyOptions from './options/typography'

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
		palette: paletteOptions,
		typography: typographyOptions
	}

	const theme = createTheme(themeOptions)

	return responsiveFontSizes(theme)
}

export default useAppTheme