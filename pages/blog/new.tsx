import Page from "@/components/layout/Page";
import useEditorStore from "@/lib/store/useEditorStore";
import { Edit, Visibility } from "@mui/icons-material";
import { Button, Divider, FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/components/editorjs/Editor'), {
	ssr: false
})

const NewBlogPage: NextPage = () => {
	const [readOnly, toggleReadOnly] = useEditorStore(state => [state.readOnly, state.toggleReadOnly])

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
					>
						{ readOnly ? 'Preview' : 'Editing' }
					</Button>
				</Stack>
				<Divider />
				<Editor />
			</Stack>
		</Page>
	)
}

export default NewBlogPage