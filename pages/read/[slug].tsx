import Page from "@/components/layout/Page";
import APIMethods from "@/lib/axios/api";
import useReaderStore from "@/lib/store/useReaderStore";
import { CircularProgress, Stack } from "@mui/material";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const Reader = dynamic(() => import('@/components/editorjs/Reader'), {
	ssr: false
})

const ReadBlog: NextPage = () => {
	const router = useRouter()
	const [data, setData] = useReaderStore(state => [state.data, state.setData])
	const [notFound, setNotFound] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		if(!router.isReady) return 
		const slug = router.query.slug!;
		(async () => {
			try {
				setIsLoading(v => true)
				if(!slug) throw Error('Not Found')
				const blog = (await APIMethods.blog.getBySlug(typeof(slug) == 'string' ? slug : slug[0])).data
				setData(blog.data)
			}
			catch(err) {
				setNotFound(v => true)
				router.push('/404')
			}
			finally {
				setIsLoading(v => false)
			}
		})()
	}, [router.isReady])

	return (
		<Page>
			<Stack
				padding='32px'
			>
				{ isLoading && <CircularProgress size={32} /> }
				{ (!isLoading && data) && (
					<Reader />
				) }
			</Stack>
		</Page>
	)
}

export default ReadBlog