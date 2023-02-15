import LoginForm from "@/components/auth/LoginForm"
import { Container, Stack, Typography } from "@mui/material"
import { NextPage } from "next"

const Login: NextPage = () => {
	return (
		<Stack
			flexGrow={1}
			justifyContent='center'
		>
			<Container
				component={Stack}
				maxWidth='sm'
				padding='32px'
				justifyContent='center'				
			>
				<LoginForm />
			</Container>
		</Stack>
	)
}

export default Login