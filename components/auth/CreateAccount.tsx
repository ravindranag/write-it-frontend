import { Alert, Button, CircularProgress, Collapse, IconButton, Stack, TextField, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import { Check, Visibility, VisibilityOff } from "@mui/icons-material"
import APIMethods from "@/lib/axios/api"
import useUserSession from "@/lib/store/useUserSession"
import useSignUpStore from "@/lib/store/useSignUpStore"
import Toast from "../common/Toast"

declare module "@mui/material/CircularProgress" {
	interface CircularProgressPropsColorOverrides {
		white: true
	}
}

const validationSchema = yup.object({
	email: yup.string().email().required().lowercase().strict(),
	password: yup.string().required(),
	otp: yup.string().optional()
})

const CreateAccount = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [setAccessToken] = useUserSession(state => [state.setAccessToken])
	const [setActiveStep] = useSignUpStore(state => [state.setActiveStep])
	const [isEmailVerified, setIsEmailVerified] = useState(false)
	const [message, setMessage] = useState('')
	const [showOTPField, setShowOTPField] = useState(false)
	const [isVerifying, setIsVerifying] = useState(false)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			otp: ''
		},
		onSubmit: async (values) => {
			console.log('create account', values)
			const { email, otp, password } = values
			if(isEmailVerified) {
				setIsLoading(v => true)
				try {
					const res = await APIMethods.auth.signUp({
						email,
						password
					})
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
			} else {
				setIsLoading(v => true)
				try {
					const res = await APIMethods.otp.generate({
						email
					})
					setMessage(v => res.data.message)
					setShowOTPField(v => true)
				} catch(err: any) {
					setError(err.response.data.message)
				} finally {
					setIsLoading(v => false)
				}

			}
		},
		validationSchema: validationSchema
	})

	const togglePasswordVisibility = () => {
		setShowPassword(v => !v)
	}

	const handleVerifyEmail = async () => {
		const { email, otp} = formik.values
		console.log(email, otp)
		if(!email) {
			formik.setFieldTouched('email')
			return
		}
		if(!otp) {
			formik.setFieldTouched('otp')
			return
		}

		try {
			setIsVerifying(v => true)
			const res = await APIMethods.otp.verify({
				email,
				otp
			})
			setIsEmailVerified(v => true)
		} catch(err) {
			setError('Email not verified')
		} finally {
			setIsVerifying(v => false)
		}
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
				<Toast 
					message={message}
					setMessage={setMessage}
				/>
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
					<Collapse
						in={showOTPField}
					>
						<TextField
							name='otp'
							label='OTP'
							value={formik.values.otp}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={ (formik.touched.otp && formik.errors.otp) ? true : false }
							helperText={formik.errors.otp}
							required
							fullWidth
							InputProps={{
								endAdornment: isEmailVerified ?
								(
									<Check />
								) : (
									<Button
										variant="text"
										onClick={() => handleVerifyEmail()}
									>
										{ isVerifying ? <CircularProgress size={14} /> : 'Verify'}
									</Button>
								)
							}}
						/>
					</Collapse>
				</Stack>
				<Button
					variant="contained"
					onClick={() => formik.handleSubmit()}
					fullWidth
					disabled={isLoading}
				>
					{ isLoading ? <CircularProgress color='white' size={25} /> : (isEmailVerified ? 'Next' : 'Verify Email') }
				</Button>
			</Stack>
		</MotionWrapper>
	)
}

export default CreateAccount