import { Button, Stack, TextField, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"
import { useFormik } from "formik"
import * as yup from 'yup'

const profileValidationSchema = yup.object({
	name: yup.string().required(),
	username: yup.string().required().min(3),
	bio: yup.string().optional()
})

const CompleteProfile = (): JSX.Element => {
	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			bio: ''
		},
		onSubmit: (values) => {
			console.log(values)
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

export default CompleteProfile