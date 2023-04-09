import Page from "@/components/layout/Page";
import APIMethods from "@/lib/axios/api";
import useReaderStore from "@/lib/store/useReaderStore";
import { OutputData } from "@editorjs/editorjs";
import { CircularProgress, Stack } from "@mui/material";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

type Author = {
	name: string
	username: string
	avatar: string
	bio: string
	twitter_username: string
}

type UserProfile = {
	userProfile: {
		username: string
		avatar: string
	}
}

type Keyword = {
	keyword: {
		name: string
		id: string
	}
}

type Category = {
	name: string
	id: string
}

type Blog = {
	title: string
	slug: string
	description: string
	data: OutputData
	createdAt: string
	updatedAt: string
	author: Author
	likedBy: UserProfile[]
	keywords: Keyword[]
	category: Category
}

const Reader = dynamic(() => import('@/components/editorjs/Reader'), {
	ssr: false
})

const ReadBlog: NextPage = () => {
	const router = useRouter()
	const [data, setData] = useReaderStore(state => [state.data, state.setData])
	const [notFound, setNotFound] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(true)
	const [blog, setBlog] = useState<Blog>()

	useEffect(() => {
		if(!router.isReady) return 
		const slug = router.query.slug!;
		(async () => {
			try {
				setIsLoading(v => true)
				if(!slug) throw Error('Not Found')
				const blog = (await APIMethods.blog.getBySlug(typeof(slug) == 'string' ? slug : slug[0])).data
				setData(blog.data)
				setBlog(blog)
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
				<NextSeo 
					title={blog?.title}
					description={blog?.description}
					additionalMetaTags={[
						{
							name: 'keywords',
							content: blog?.keywords ? blog.keywords.map(k => k.keyword.name).toString() : 'write it'
						}
					]}
				/>
				{ isLoading && <CircularProgress size={32} /> }
				{ (!isLoading && data) && (
					<Reader />
				) }
			</Stack>
		</Page>
	)
}

export default ReadBlog