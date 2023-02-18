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
				padding: '8px 16px',
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
	},
	MuiPaper: {
		styleOverrides: {
			root: ({ ownerState, theme }: any) => ({
				border: '1px solid',
				borderColor: theme.palette.divider,
			})
		}
	}
}

export default componentOptions