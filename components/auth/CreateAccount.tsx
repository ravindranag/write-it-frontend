import { Alert, Button, CircularProgress, Collapse, IconButton, Stack, TextField, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import APIMethods from "@/lib/axios/api"
import useUserSession from "@/lib/store/useUserSession"
import useSignUpStore from "@/lib/store/useSignUpStore"

declare module "@mui/material/CircularProgress" {
	interface CircularProgressPropsColorOverrides {
		white: true
	}
}

const validationSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required()
})

const CreateAccount = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [setAccessToken] = useUserSession(state => [state.setAccessToken])
	const [setActiveStep] = useSignUpStore(state => [state.setActiveStep])

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (values) => {
			console.log('create account', values)
			setIsLoading(v => true)
			try {
				const res = await APIMethods.auth.signUp(values)
				const { accessToken } = res.data
				localStorage.setItem('accessToken', accessToken)
				setAccessToken(accessToken)
				setActiveStep(1)
				setError(v => '')
			} catch(err: any) {
				setError(err.response.data.message)
			} finally {
				setIsLoading(v => false)
			}
		},
		validationSchema: validationSchema
	})

	const togglePasswordVisibility = () => {
		setShowPassword(v => !v)
	}

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
					Get onboard!
				</Typography>
				<Collapse
					in={error ? true : false}
				>
					<Alert
						severity="error"
					>
						{error}
					</Alert>
				</Collapse>
				<Stack
					gap='16px'
				>
					<TextField 
						name='email'
						label='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={ (formik.touched.email && formik.errors.email) ? true : false }
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
				<Button
					variant="contained"
					onClick={() => formik.handleSubmit()}
					fullWidth
					disabled={isLoading}
				>
					{ isLoading ? <CircularProgress color='white' size={25} /> : 'Next' }
				</Button>
			</Stack>
		</MotionWrapper>
	)
}

export default CreateAccount