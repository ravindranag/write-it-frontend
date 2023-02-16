import SadFace from "@/components/dicebear/SadFace";
import { Stack, Typography } from "@mui/material";
import { NextPage } from "next";

const PageNotfound: NextPage = () => {
	return (
		<Stack
			padding='32px'
			gap='16px'
		>
			<SadFace />
			<Typography
				variant='h1'
			>
				404
			</Typography>
			<Typography>
				Oop&#39;s! The page you&#39;re looking for has been deleted or moved to another location
			</Typography>
		</Stack>
	)
}

export default PageNotfound