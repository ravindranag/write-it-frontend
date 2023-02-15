import Page from "@/components/layout/Page";
import { Button, Typography, Stack } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";

const Test: NextPage = () => {
	return (
		<Page>
			<div>
				<Typography
					variant="h1"
				>
					Test Page
				</Typography>
				<Link
					href='/'
					passHref
				>
					<Button
						variant='contained'
					>
						Home
					</Button>
				</Link>
				
			</div>
		</Page>
	)
}

export default Test