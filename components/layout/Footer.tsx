import { Stack, Typography } from "@mui/material"

const Footer = (): JSX.Element => {
	return (
		<Stack
			padding='12px 24px'
			alignItems='center'
			borderTop='1px solid'
			borderColor='divider'
		>
			<Typography
				variant='overline'
			>
				Ravindra Nag &copy; 2023
			</Typography>
		</Stack>
	)
}

export default Footer
