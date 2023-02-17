import { Button, Stack, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"
import Link from "next/link"

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
					variant="overline"
				>
					What&#39;s next?
				</Typography>
				<Typography
					variant='h3'
				>
					Publish your writing or read other writer&#39;s work
				</Typography>
				<Stack
					gap='16px'
				>
					<Link
						href='/new'
						passHref
					>
						<Button
							variant="contained"
							fullWidth
						>
							Write a new article
						</Button>
					</Link>
					<Link
						href='/'
						passHref
					>
						<Button
							variant='outlined'
							fullWidth
						>
							Continue reading
						</Button>
					</Link>
				</Stack>
			</Stack>
		</MotionWrapper>
	)
}

export default NextSteps