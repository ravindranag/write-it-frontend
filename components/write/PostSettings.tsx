import APIMethods from "@/lib/axios/api"
import { useFetchKeywordsAndCategories } from "@/lib/hooks/useFetch"
import useEditorStore from "@/lib/store/useEditorStore"
import useLoadingStore from "@/lib/store/useLoadingStore"
import { Close } from "@mui/icons-material"
import { AppBar, Dialog, IconButton, Toolbar, Stack, TextField, Typography, Divider, Button, CircularProgress, Slide, Autocomplete } from "@mui/material"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { forwardRef, useEffect, useState } from "react"
import * as yup from 'yup'

type MetaDataObject = {
	id: string
	name: string
	description: string | null
}

const validationSchema = yup.object({
	title: yup.string().required(),
	slug: yup.string().lowercase().strict().matches(/^[a-z][a-z0-9-]*[a-z0-9]$/, 'Slug can only contain [a-z], [0-9], and \'-\'').required(),
	description: yup.string().required(),

})




const PostSettings = () => {
	const [postSettings, setPostSettings, postSettingSOpen, togglePostSettings, data] = useEditorStore(state => [state.postSettings, state.setPostSettings, state.postSettingSOpen, state.togglePostSettings, state.data])
	const [checkingSlug, setCheckingSlug] = useState<boolean>(false)
	const [slugAvailable, setSlugAvailable] = useState<boolean>(false)
	const [loadingMessage, setLoadingMessage] = useLoadingStore(state => [state.loadingMessage, state.setLoadingMessage])
	const router = useRouter()
	const { metadata, error, isLoading } = useFetchKeywordsAndCategories()
	const [keywords, setKeywords] = useState<MetaDataObject[]>([])
	const [category, setCategory] = useState<MetaDataObject>()
	const formik = useFormik({
		initialValues: {
			title: postSettings.title,
			slug: postSettings.slug,
			description: postSettings.description
		},
		onSubmit: async (values) => {
			let blog = {
				...values,
				data: data!,
				keywords,
				categoryId: category?.id
			}
			console.log(blog)
			try {
				setLoadingMessage('Processing')
				await APIMethods.blog.create(blog)
				router.replace(`/read/${values.slug}`)
			}
			catch(err) {
				alert('Blog creation failed')
			}
			finally {
				setLoadingMessage(null)
			}
		},
		validationSchema: validationSchema
	})

	const checkSlug = async () => {
		try {
			setCheckingSlug(v => true)
			await APIMethods.blog.checkSlugAvailability(formik.values.slug)
			setSlugAvailable(v => true)
		}
		catch(err: any) {
			formik.setFieldError('slug', 'Slug already taken')
			setSlugAvailable(v => false)
		}
		finally {
			setCheckingSlug(v => false)
		}
	}

	return (
		<Dialog
			fullScreen
			open={postSettingSOpen}
		>
			<AppBar
				position="relative"
				color='white'
			>
				<Toolbar
					sx={{
						justifyContent: 'space-between'
					}}
				>
					<IconButton
						onClick={() => {
							setPostSettings(formik.values)
							togglePostSettings()
						}}
					>
						<Close />
					</IconButton>
					<Button
						variant='contained'
						onClick={() => formik.handleSubmit()}
					>
						{ loadingMessage ? <CircularProgress size={24} color="white" /> : 'Publish' }
					</Button>
				</Toolbar>
			</AppBar>
			<Stack
				height='100%'
				justifyContent='center'
				alignItems='center'
			>
				<Stack
					padding='24px'
					maxWidth={500}
					width='100%'
					gap='32px'
				>
					<Typography
						variant='h2'
					>
						Post Metadata
					</Typography>
					<Divider />
					<Stack
						gap='32px'
					>
						<TextField
							name='title'
							label='Blog Title'
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={(formik.touched.title && formik.errors.title) ? true : false}
							helperText={formik.errors.title}
						/>
						<TextField
							name='slug'
							label='Slug'
							value={formik.values.slug}
							onChange={formik.handleChange}
							onBlur={(e) => {
								if(!formik.errors.slug) {
									checkSlug()
								}
								formik.handleBlur(e)
							}}
							error={(formik.touched.slug && formik.errors.slug) ? true : false}
							helperText={formik.errors.slug || (slugAvailable && 'Slug available')}
							InputProps={{
								endAdornment: checkingSlug && <CircularProgress size={24} />
							}}
						/>
						<TextField
							name='description'
							label='Blog Description'
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={(formik.touched.description && formik.errors.description) ? true : false}
							helperText={formik.errors.description}
							multiline
							minRows={4}
						/>
						<Autocomplete 
							options={metadata.category}
							getOptionLabel={option => option.name}
							renderInput={(params) => <TextField {...params} label='Category' />}
							onChange={(e, newValue: any) => {
								console.log(newValue)
								setCategory(newValue)
							}}
							loading={isLoading}
						/>
						<Autocomplete
							multiple 
							options={metadata.keyword}
							getOptionLabel={option => option.name}
							renderInput={(params) => <TextField {...params} label='Keywords' />}
							onChange={(e, newValue: any) => {
								console.log(newValue)
								setKeywords(newValue)
							}}
							loading={isLoading}
						/>
					</Stack>
				</Stack>
			</Stack>
		</Dialog>
	)
}

export default PostSettings