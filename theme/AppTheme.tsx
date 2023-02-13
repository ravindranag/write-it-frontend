import { ThemeProvider } from "@mui/material"
import { IChildren } from "types"
import useAppTheme from "./useAppTheme"

const AppTheme = ({ children }: IChildren) => {
	const theme = useAppTheme()
	
	return (
		<ThemeProvider
			theme={theme}
		>
			{children}
		</ThemeProvider>
	)
}

export default AppTheme