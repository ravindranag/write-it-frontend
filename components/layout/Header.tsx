import useUserSession from "@/lib/store/useUserSession"
import { Settings } from "@mui/icons-material"
import { AppBar, Avatar, Button, IconButton, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material"
import { useState } from "react"

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

const UserActions = (): JSX.Element => {
	const [currentUser] = useUserSession(state => [state.currentUser])
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget)
	}

	const handleAccountMenuClose = () => {
		setAnchorEl(v => null)
	}

	return (
		<Stack>
			{ currentUser ? (
				<>
					<Tooltip
						title='Account settings'
					>
						<IconButton
							onClick={handleAvatarClick}
						>
							<Avatar
								src={`${process.env.NEXT_PUBLIC_CDN_URL}/${currentUser.profile.avatar}`}
								alt={`${currentUser.profile.name}`}
								sx={{
									border: '1px solid',
									borderColor: 'divider'
								}}
							/>
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={anchorEl}
						open={anchorEl ? true : false}
						onClose={handleAccountMenuClose}
						PaperProps={{
							variant: 'outlined'
						}}
					>
						<MenuItem>
							<ListItemIcon>
								<Settings />
							</ListItemIcon>
							<ListItemText>
								Settings
							</ListItemText>
						</MenuItem>
					</Menu>
				</>
			) : (
				<Stack
					direction='row'
					gap='8px'
				>
					<Button
						variant='outlined'
					>
						Login
					</Button>
					<Button
						variant='contained'
					>
						Signup
					</Button>
				</Stack>
			) }
		</Stack>
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
				alignItems='center'
				justifyContent='space-between'
			>
				<Logo />
				<UserActions />
			</Stack>
		</AppBar>
	)
}

export default Header