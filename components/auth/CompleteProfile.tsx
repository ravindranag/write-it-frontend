import { Alert, Avatar, Button, CircularProgress, Collapse, IconButton, LinearProgress, Stack, TextField, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"
import { useFormik } from "formik"
import * as yup from 'yup'
import { SyntheticEvent, useState } from "react"
import APIMethods from "@/lib/axios/api"
import useUserSession from "@/lib/store/useUserSession"
import useSignUpStore from "@/lib/store/useSignUpStore"
import { getImageDataURL } from "@/lib/file/fileStream"
import { ArrowBack, Camera, CameraAlt, PersonOutline } from "@mui/icons-material"

const profileValidationSchema = yup.object({
	name: yup.string().required(),
	username: yup.string().required().min(3).max(30).matches(/^[a-z,A-Z][a-z,A-Z,_,0-9]+$/gm, { message: 'Username cannot start with a number, can only contain (a-z), (A-Z), (0-9), and "_"' }),
	bio: yup.string().required(),
	twitter_username: yup.string().required()
})

const CompleteProfile = (): JSX.Element => {
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [setActiveStep, user, profile, setProfile] = useSignUpStore(state => [state.setActiveStep, state.user, state.profile, state.setProfile])

	const formik = useFormik({
		initialValues: {
			name: profile.name,
			username: profile.username,
			bio: profile.bio,
			twitter_username: profile.twitter_username
		},
		onSubmit: async (values) => {
			setProfile(values)
			let data = {
				email: user!.email,
				password: user!.password,
				profile: values
			}
			setIsLoading(v => true)
			console.log(data)
			try {
				await APIMethods.auth.signUp(data)
				setActiveStep(1)
			}
			catch(err: any) {
				console.error(err)
				setError(err.response.data)
			}
			finally {
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
				<Button
					startIcon={
						<ArrowBack />
					}
					onClick={() => {
						setProfile(formik.values)
						setActiveStep(-1)
					}}
				>
					Back
				</Button>
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
					<TextField 
						name='twitter_username'
						label='Twitter Username'
						value={formik.values.twitter_username}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={ (formik.touched.twitter_username && formik.errors.twitter_username) ? true : false }
						helperText={formik.errors.twitter_username}
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