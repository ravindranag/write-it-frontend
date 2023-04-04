import PostSettings from "@/components/write/PostSettings";
import Page from "@/components/layout/Page";
import useEditorStore from "@/lib/store/useEditorStore";
import { Edit, Visibility } from "@mui/icons-material";
import { Button, Divider, FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Editor = dynamic(() => import('@/components/editorjs/Editor'), {
	ssr: false
})

const NewBlogPage: NextPage = () => {
	const [readOnly, toggleReadOnly, data] = useEditorStore(state => [state.readOnly, state.toggleReadOnly, state.data])
	const router = useRouter()
	useEffect(() => {
		console.log(router.pathname)
	}, [])

	return (
		<Page>
			<Stack
				padding='32px'
				gap='32px'
			>
				<Stack
					direction='row'
				>
					<Typography
						variant='h3'
						flexGrow={1}
					>
						Create New Blog
					</Typography>
					<Button
						startIcon={
							readOnly ? <Visibility /> : <Edit />
						}
						onClick={toggleReadOnly}
						disabled={ data?.blocks === undefined || data.blocks.length === 0 }
					>
						{ readOnly ? 'Preview' : 'Editing' }
					</Button>
				</Stack>
				<Divider />
				<Editor />
				<PostSettings />
			</Stack>
		</Page>
	)
}

export default NewBlogPage