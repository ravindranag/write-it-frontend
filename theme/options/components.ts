import { Components, Theme, ButtonProps, CSSInterpolation } from "@mui/material"

type Props = {
	ownerState: ButtonProps
	theme: Theme
}

const componentOptions: Components = {
	MuiButton: {
		defaultProps: {
			disableElevation: true,
			disableRipple: true
		},
		styleOverrides: {
			root: ({ ownerState, theme }: any) => ({
				width: ownerState.fullWidth ? '100%' : 'fit-content',
				padding: '10px 16px',
				'&.Mui-disabled': {
					backgroundColor: theme.palette.disabled.main
				}
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