import { Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const validationSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required()
})

const CreateAccount = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: (values) => {
			console.log('create account', values)
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
				<Stack
					gap='16px'
				>
					<TextField 
						name='email'
						label='email'
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
				>
					Next
				</Button>
			</Stack>
		</MotionWrapper>
	)
}

export default CreateAccount