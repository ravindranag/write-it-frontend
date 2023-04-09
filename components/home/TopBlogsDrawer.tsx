import useDrawerStore from "@/lib/store/useDrawerStore"
import { Drawer, Typography, Stack } from "@mui/material"

const drawerWidth = 350

const TopBlogsDrawer = () => {
	const [headerHeight] = useDrawerStore(state => [state.headerHeight])

	return (
		<Drawer
			variant='permanent'
			anchor="right"
			sx={{
				width: drawerWidth,
				height: `calc(100vh - ${headerHeight! + 1}px)`,
				'& .MuiPaper-root': {
					width: drawerWidth,
					height: `calc(100vh - ${headerHeight! + 1}px)`,
					marginTop: `${headerHeight! + 2}px`,
					borderWidth: '0 0 0 1px'
				},
			}}
		>
			<Stack
				padding='16px'
			>
				<Typography
					variant='h6'
				>
					Top Blogs
				</Typography>
			</Stack>
		</Drawer>
	)
}

export default TopBlogsDrawer