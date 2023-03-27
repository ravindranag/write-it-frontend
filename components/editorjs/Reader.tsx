import useReaderStore from "@/lib/store/useReaderStore"
import { FC, useEffect } from "react"
import EditorJS, { OutputData } from "@editorjs/editorjs"
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import SimpleImage from '@editorjs/simple-image'

const Reader: FC = (): JSX.Element => {
	const [editor, setEditor, data] = useReaderStore(state => [state.editor, state.setEditor, state.data, state.setData])

	useEffect(() => {
		if(editor) return
		const e = new EditorJS({
			holder: 'reader',
			readOnly: true,
			data: data,
			tools: {
				paragraph: {
					class: Paragraph,
				},
				heading: {
					class: Header,
				},
				image: SimpleImage
			}
		})
		setEditor(e)
	}, [])

	return (
		<div
			id='reader'
		>

		</div>
	)
}

export default Reader