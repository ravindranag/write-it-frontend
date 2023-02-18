import APIMethods from "@/lib/axios/api"
import useUserSession from "@/lib/store/useUserSession"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import { Alert, Button, CircularProgress, Collapse, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import * as yup from 'yup'

const formValidationSchema = yup.object({
	email: yup.string().email().required().lowercase().strict(),
	password: yup.string().required()
})

const LoginForm = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [setAccessToken] = useUserSession(state => [state.setAccessToken])
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async ({ email, password }) => {
			setIsLoading(v => true)
			try {
				const res = await APIMethods.auth.login({
					email,
					password
				})
				console.log(res.data)
				setAccessToken(res.data.accessToken)
				localStorage.setItem('accessToken', res.data.accessToken)
				router.replace('/')
			} catch(err: any) {
				console.log('error while login', err.response.data)
				setError(v => err.response.data.message)
			} finally {
				setIsLoading(v => false)
			}
		},
		validationSchema: formValidationSchema
	})

	const togglePasswordVisibility = () => {
		setShowPassword(v => !v)
	}

	return (
		<Stack
			component='form'
			border='1px solid'
			borderColor='divider'
			borderRadius='8px'
			padding='24px'
			gap='32px'
			onSubmit={(e) => {
				e.preventDefault()
				formik.handleSubmit()
			}}
		>
			<Stack
				alignItems='center'
				gap='8px'
			>
				<Typography
					variant='h3'
				>
					Welcome Back Writer!
				</Typography>
				<Typography
					variant='caption'
				>
					Login to continue
				</Typography>
			</Stack>
			<Collapse
				in={error ? true : false}
			>
				<Alert
					severity="error"
				>
					{ error }
				</Alert>
			</Collapse>
			<Stack
				gap='16px'
			>
				<TextField 
					label='Email'
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={(formik.touched.email && formik.errors.email) ? true : false}
					helperText={formik.errors.email}
					required
				/>
				<TextField 
					label='Password'
					name="password"
					type={ showPassword ? 'text' : 'password' }
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={(formik.touched.password && formik.errors.password) ? true : false}
					helperText={formik.errors.password}
					required
					InputProps={{
						endAdornment: (<IconButton
							onClick={() => togglePasswordVisibility()}
						>
							{ showPassword ? <VisibilityOff /> : <Visibility /> }							
						</IconButton>)
					}}
				/>
			</Stack>
			<Stack
				gap='8px'
				alignItems='center'
			>
				<Button
					variant='contained'
					onClick={() => formik.handleSubmit()}
					type='submit'
					fullWidth
					disabled={isLoading}
				>
					{ isLoading ? <CircularProgress color='white' size={25} /> : 'Login' }
				</Button>
				<Link
					href='/auth/signup'
					passHref
				>
					<Typography
						sx={{
							textDecoration: 'underline'
						}}
						color='GrayText'
					>
						Don&#39;t have an account? Create one
					</Typography>
				</Link>
			</Stack>
		</Stack>
	)
}

export default LoginForm