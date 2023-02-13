import { Components } from "@mui/material"

const componentOptions: Components = {
	MuiButton: {
		defaultProps: {
			disableElevation: true,
			disableRipple: true
		},
		styleOverrides: {
			root: {
				width: 'fit-content'
			}
		}
	},
	MuiAppBar: {
		defaultProps: {
			elevation: 0
		}
	}
}

export default componentOptions