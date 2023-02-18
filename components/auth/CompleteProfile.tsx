import { Alert, Avatar, Button, CircularProgress, Collapse, IconButton, LinearProgress, Stack, TextField, Typography } from "@mui/material"
import MotionWrapper from "./MotionWrapper"
import { useFormik } from "formik"
import * as yup from 'yup'
import { SyntheticEvent, useState } from "react"
import APIMethods from "@/lib/axios/api"
import useUserSession from "@/lib/store/useUserSession"
import useSignUpStore from "@/lib/store/useSignUpStore"
import { getImageDataURL } from "@/lib/file/fileStream"
import { Camera, CameraAlt, PersonOutline } from "@mui/icons-material"

const profileValidationSchema = yup.object({
	name: yup.string().required(),
	username: yup.string().required().min(3).max(30).matches(/^[a-z,A-Z][a-z,A-Z,_,0-9]+$/gm, { message: 'Username cannot start with a number, can only contain (a-z), (A-Z), (0-9), and "_"' }),
	bio: yup.string().required()
})

const CompleteProfile = (): JSX.Element => {
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [setCurrentUser] = useUserSession(state => [state.setCurrentUser])
	const [setActiveStep] = useSignUpStore(state => [state.setActiveStep])
	const [avatar, setAvatar] = useState<File>()
	const [avatarSrc, setAvatarSrc] = useState<string>('')
	const [uploadProgress, setUploadProgress] = useState(0)

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
				await APIMethods.auth.createProfile(values)
				if(avatar) {
					await APIMethods.profile.setAvatar({ avatar: avatar }, (e) => {
						const pe: ProgressEvent = e.event
						if(pe.lengthComputable) {
							let p = (pe.loaded / pe.total) * 100
							console.log(p)
							setUploadProgress(p)
						}
					})
				}
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

	const handleAvatarSelect = async (e: any) => {
		const file: File = e.target.files[0]
		if(file.size >= 524288) {
			setError('File exceeds size limit: 512kB')
			return
		}
		setError('')
		setAvatar(file)
		try {
			const res = await getImageDataURL(file)
			console.log(res)
			if(res.url) setAvatarSrc(res.url)
		} catch(err) {
			console.log(err)
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
				<Typography
					variant='h3'
				>
					Help us know you better
				</Typography>
				<Stack
					alignItems='center'
					padding='24px 0'
				>
					<IconButton
						component='label'
						sx={{
							position: 'relative',
							padding: '0px'
						}}
						onChange={handleAvatarSelect}
					>
						<Avatar
							sx={{
								position: 'relative',
								width: 150,
								height: 150,
							}}
							src={avatarSrc}
						>
							<CameraAlt 
								sx={{
									fontSize: '72px'
								}}
							/>
							
						</Avatar>
						<input hidden type="file" accept='.png,.jpg,.jpeg' />
						{(uploadProgress > 0) && (
							<CircularProgress 
								sx={{
									position: 'absolute',
								}}
								size={170}
								thickness={1}
								variant="determinate"
								value={uploadProgress}
							/>
						)}
					</IconButton>
				</Stack>
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