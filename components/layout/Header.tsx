import { AppBar, Stack, Typography } from "@mui/material"

declare module '@mui/material/AppBar' {
	export interface AppBarPropsColorOverrides {
		white: true
	}
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
				<Typography
					variant='overline'
				>
					WriteIt
				</Typography>
			</Stack>
		</AppBar>
	)
}

export default Header