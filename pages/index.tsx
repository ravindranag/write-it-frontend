import { NextPage } from "next";
import { Button, Stack, Typography } from '@mui/material'


const Home: NextPage = () => {
	return (
		<>
			<Stack>
				<Typography
					
					variant='h1'
				>
					Hello World
				</Typography>
				<Button
					color="primary"
					variant="contained"
				>
					Hi
				</Button>
			</Stack>
		</>
	)
}

export default Home