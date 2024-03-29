import useDrawerStore from "@/lib/store/useDrawerStore"
import { Drawer, Stack, Typography } from "@mui/material"

const drawerWidth = 250

const DrawerFooter = () => {
	return (
		<Stack
			padding='16px'
		>
			<Typography
				variant='caption'
				color='text.secondary'
			>
				&copy; Ravindra Nag
			</Typography>
		</Stack>
	)
}

const RecommendationDrawer = (): JSX.Element => {
	const [headerHeight] = useDrawerStore(state => [state.headerHeight])

	return (
		<Drawer
			variant='permanent'
			sx={{
				width: drawerWidth,
				height: `calc(100vh - ${headerHeight! + 1}px)`,
				'& .MuiPaper-root': {
					width: drawerWidth,
					height: `calc(100vh - ${headerHeight! + 1}px)`,
					marginTop: `${headerHeight! + 2}px`,
					borderWidth: '0 1px 0 0'
				},
			}}
		>
			<Stack
				padding='16px'
				flexGrow={1}
			>
				<Typography
					variant='h6'
				>
					Trending Keywords
				</Typography>
			</Stack>
			<DrawerFooter />
		</Drawer>
	)
}

export default RecommendationDrawer