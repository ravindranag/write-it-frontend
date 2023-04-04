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
				marginTop: `${headerHeight}px`,
				height: `calc(100vh - ${headerHeight}px)`,
				'& .MuiPaper-root': {
					width: drawerWidth,
					height: `calc(100vh - ${headerHeight}px)`,
					marginTop: `${headerHeight}px`
				}
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