import { Components } from "@mui/material"

const componentOptions: Components = {
	MuiButton: {
		defaultProps: {
			disableElevation: true,
			disableRipple: true
		},
		styleOverrides: {
			root: ({ ownerState, theme }) => ({
				width: ownerState.fullWidth ? '100%' : 'fit-content',
				padding: '10px 16px'
			})
		}
	},
	MuiAppBar: {
		defaultProps: {
			elevation: 0
		}
	}
}

export default componentOptions