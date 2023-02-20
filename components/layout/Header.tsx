import useAvatarUrl from "@/lib/hooks/useAvatarlUrl"
import useUserSession, { CurrentUser } from "@/lib/store/useUserSession"
import { Logout, Settings } from "@mui/icons-material"
import { AppBar, Avatar, Button, IconButton, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { shallow } from 'zustand/shallow'

declare module '@mui/material/AppBar' {
	export interface AppBarPropsColorOverrides {
		white: true
	}
}

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL

const getAvatarSrc = (profile: CurrentUser['profile']) => {
	if(profile && profile.avatar) {
		return `${CDN_URL}/${profile.avatar}`
	}
	return ''
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
	const [currentUser, setCurrentUser] = useUserSession(state => [state.currentUser, state.setCurrentUser], shallow)
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [avatarSrc, setAvatarSrc] = useState<string | undefined>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	
	useEffect(() => {
		console.log('user updated')
		if(currentUser) {
			if(currentUser.profile && currentUser.profile.avatar){
				setAvatarSrc(v => `${CDN_URL}/${currentUser.profile.avatar}`)
			}
		}
	}, [currentUser])

	const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget)
	}

	const handleAccountMenuClose = () => {
		setAnchorEl(v => null)
	}

	const handleLogOut = () => {
		localStorage.removeItem('accessItem')
		setCurrentUser(null)
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
							sx={{
								padding: 0
							}}
						>
							<Avatar
								src={avatarSrc}
								alt={`${currentUser?.profile?.name}`}
								sx={{
									border: '1px solid',
									borderColor: 'divider',
									width: 40,
									height: 40
								}}
							/>
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={anchorEl}
						open={anchorEl ? true : false}
						onClose={handleAccountMenuClose}
						PaperProps={{
							variant: 'outlined',
							elevation: 0
						}}
					>
						<MenuItem
							onClick={handleLogOut}
						>
							<ListItemIcon
							>
								<Logout />
							</ListItemIcon>
							<ListItemText>
								Logout
							</ListItemText>
						</MenuItem>
					</Menu>
				</>
			) : (
				<Stack
					direction='row'
					gap='8px'
				>
					<Link
						href='/auth/login'
						passHref
					>
						<Button
							variant='outlined'
						>
							Login
						</Button>
					</Link>
					<Link
						href='/auth/signup'
						passHref
					>
						<Button
							variant='contained'
						>
							Signup
						</Button>
					</Link>
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