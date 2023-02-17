import { Alert, Button, CircularProgress, Collapse, Stack, TextField, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import APIMethods from "@/lib/axios/api"
import useUserSession from "@/lib/store/useUserSession"
import useSignUpStore from "@/lib/store/useSignUpStore"

const profileValidationSchema = yup.object({
	name: yup.string().required(),
	username: yup.string().required().min(3),
	bio: yup.string().required()
})

const CompleteProfile = (): JSX.Element => {
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [setCurrentUser] = useUserSession(state => [state.setCurrentUser])
	const [setActiveStep] = useSignUpStore(state => [state.setActiveStep])

	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			bio: ''
		},
		onSubmit: async (values) => {
			console.log(values)
			setIsLoading(v => true)
			try {
				const res = await APIMethods.auth.createProfile(values)
				const currentUserResponse = await APIMethods.auth.verify()
				setCurrentUser(currentUserResponse.data)
				setActiveStep(1)
				setError(v => '')
			} catch(err: any) {
				setError(err.response.data.message)
			} finally {
				setIsLoading(v => false)
			}
		},
		validationSchema: profileValidationSchema
	})

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
					Help us know you better
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
					gap='20px'
				>
					<TextField 
						name='name'
						label='Name'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={ (formik.touched.name && formik.errors.name) ? true : false }
						helperText={formik.errors.name}
						required
					/>
					<TextField 
						name='username'
						label='Username'
						value={formik.values.username}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={ (formik.touched.username && formik.errors.username) ? true : false }
						helperText={formik.errors.username}
						required
					/>
					<TextField 
						name='bio'
						label='Bio'
						value={formik.values.bio}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={ (formik.touched.bio && formik.errors.bio) ? true : false }
						helperText={formik.errors.bio}
						multiline
						rows={3}
						required
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

export default CompleteProfile