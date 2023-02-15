import { NextPage } from "next";
import { Button, Stack, Typography } from '@mui/material'
import Page from "@/components/layout/Page";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<Page>
			<Stack>
				<Typography
					
					variant='h1'
				>
					Hello World
				</Typography>
				<Link
					href='/test'
					passHref
				>
					<Button
						color="primary"
						variant="contained"
					>
						Test
					</Button>
				</Link>
			</Stack>
		</Page>
	)
}

export default Home