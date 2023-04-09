import useAvatarUrl from "@/lib/hooks/useAvatarlUrl"
import useDrawerStore from "@/lib/store/useDrawerStore"
import useEditorStore from "@/lib/store/useEditorStore"
import useUserSession, { CurrentUser } from "@/lib/store/useUserSession"
import { getImageUrl } from "@/lib/utils/getImageUrl"
import { Add, Logout, Settings } from "@mui/icons-material"
import { AppBar, Avatar, Button, CircularProgress, Divider, IconButton, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { shallow } from 'zustand/shallow'
import NavItemButton from "../common/NavItemButton"
import NavItemLink from "../common/NavItemLink"

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
		<Link
			href='/'
		>
			<Typography
				variant='overline'
			>
				Write It
			</Typography>
		</Link>
	)
}

const UserActions = (): JSX.Element => {
	const [currentUser, setCurrentUser] = useUserSession(state => [state.currentUser, state.setCurrentUser], shallow)
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [togglePostSettings, data] = useEditorStore(state => [state.togglePostSettings, state.data])
	const router = useRouter()

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
		<Stack
			direction='row'
			gap='14px'
		>
			{router.pathname !== '/write' 
				? (<Link
					href='/write'
				>
					<Button
						variant="contained"
						startIcon={
							<Add />
						}
					>
						New Blog
					</Button>
				</Link>)
				: (
					<Button
						variant='contained'
						onClick={() => togglePostSettings()}
						disabled={ data?.blocks === undefined || data.blocks.length === 0 }
					>
						Post
					</Button>
				)	
			}
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
						src={getImageUrl(currentUser?.profile?.avatar)}
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
					elevation: 0,
					sx: {
						'& .MuiList-root': {
							display: 'flex',
							flexDirection: 'column',
							padding: 0
						},
						boxShadow: 'none',
						minWidth: 200
					}
				}}
				transformOrigin={{
					horizontal: 'right',
					vertical: 'top'
				}}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 60
				}}
			>
				<Link
					href='/'
				>
					<Button
						sx={{
							flexDirection: 'column',
							alignItems: 'start'
						}}
						fullWidth
					>
						<Typography
							variant='body1'
						>
							{currentUser?.profile.name}
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'
						>
							@{currentUser?.profile.username}
						</Typography>
					</Button>
				</Link>
				<Divider />
				<NavItemLink
					href='/dashboard'
				>
					Dashboard
				</NavItemLink>
				<NavItemLink
					href='/settings'
				>
					Settings
				</NavItemLink>
				<Divider />
				<NavItemButton
					onClick={handleLogOut}
				>
					Logout
				</NavItemButton>
			</Menu>
		</Stack>
	)
}

const GuestActions = (): JSX.Element => {
	return (
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
	)
}

const Header = (): JSX.Element => {
	const [currentUser, fetchingUser] = useUserSession(state => [state.currentUser, state.fetchingUser])
	const [setHeaderHeight] = useDrawerStore(state => [state.setHeaderHeight])
	const headerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		console.log(headerRef.current?.clientHeight)
		setHeaderHeight(headerRef.current?.clientHeight)
	}, [])

	return (
		<AppBar
			ref={headerRef}
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
				{ fetchingUser && <CircularProgress size={24} /> }
				{ !fetchingUser && (
					currentUser
						? <UserActions />
						: <GuestActions />
				) }
			</Stack>
		</AppBar>
	)
}

export default Header