import { AppBar, Stack, Typography } from "@mui/material"

declare module '@mui/material/AppBar' {
	export interface AppBarPropsColorOverrides {
		white: true
	}
}

const Logo = (): JSX.Element => {
	return (
		<Typography
			variant='overline'
		>
			Write It
		</Typography>
	)
}

const Header = (): JSX.Element => {
	return (
		<AppBar
			position='sticky'
			color='white'
			sx={{
				borderBottom: '1px solid',
				borderColor: 'divider'
			}}
		>
			<Stack
				direction='row'
				padding='12px 24px'
			>
				<Logo />
			</Stack>
		</AppBar>
	)
}

export default Header