import { Button, Stack, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"

const NextSteps = (): JSX.Element => {
	return (
		<MotionWrapper>
			<Stack
				border='1px solid'
				borderColor='divider'
				borderRadius='8px'
				padding='24px'
				gap='24px'
			>
				<Typography
					variant='h3'
				>
					Publish your writing or read other writer&#39;s work
				</Typography>
				<Stack
					gap='16px'
				>
					<Button
						variant="contained"
						fullWidth
					>
						Write a new article
					</Button>
					<Button
						variant='outlined'
						fullWidth
					>
						Continue reading
					</Button>
				</Stack>
			</Stack>
		</MotionWrapper>
	)
}

export default NextSteps