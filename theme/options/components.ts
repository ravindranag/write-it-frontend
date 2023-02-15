import { Components } from "@mui/material"

const componentOptions: Components = {
	MuiButton: {
		defaultProps: {
			disableElevation: true,
			disableRipple: true
		},
		styleOverrides: {
			root: {
				width: 'fit-content',
				padding: '10px 20px'
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