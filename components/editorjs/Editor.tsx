import useEditorStore from "@/lib/store/useEditorStore"
import EditorJS from "@editorjs/editorjs"
import { useEffect, useRef } from "react"
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import SimpleImage from '@editorjs/simple-image'
import '@fontsource/plus-jakarta-sans'
import '@fontsource/plus-jakarta-sans/800.css'

const Editor = () => {
	const [readOnly, data, setData, editor, setEditor] = useEditorStore(state => [state.readOnly, state.data, state.setData, state.editor, state.setEditor])

	useEffect(() => {
		if(editor) return 
		const e = new EditorJS({
			holder: 'editorjs',
			autofocus: true,
			onReady: () => {
				console.log('Editor is ready')
			},
			readOnly: readOnly,
			onChange: async (api, event) => {
				const data = await api.saver.save()
				setData(data)
			},
			data: data,
			placeholder: 'My new story',
			tools: {
				paragraph: {
					class: Paragraph,
					config: {
						placeholder: 'My new story',
					}
				},
				heading: {
					class: Header,
					inlineToolbar: true
				},
				image: SimpleImage
			}
		})
		setEditor(e)
	}, [])

	return (
		<div id='editorjs' 
			style={{ 
				fontFamily: 'Plus Jakarta Sans',
			}}
		></div>
	)
}

export default Editor