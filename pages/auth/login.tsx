import LoginForm from "@/components/auth/LoginForm"
import Page from "@/components/layout/Page"
import { Container, Stack, Typography } from "@mui/material"
import { NextPage } from "next"

const Login: NextPage = () => {
	return (
		<Page>
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
		</Page>
	)
}

export default Login