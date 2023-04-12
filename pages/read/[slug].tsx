import Page from "@/components/layout/Page";
import APIMethods from "@/lib/axios/api";
import useBlogLiked from "@/lib/hooks/useBlogliked";
import useReaderStore from "@/lib/store/useReaderStore";
import { getImageUrl } from "@/lib/utils/getImageUrl";
import { OutputData } from "@editorjs/editorjs";
import { Favorite, FavoriteBorder, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { Avatar, Button, Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import PageNotfound from "pages/404";
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
	category: Category,
	_count: {
		likedBy: number
	}
}

const Reader = dynamic(() => import('@/components/editorjs/Reader'), {
	ssr: false
})

type UserActionsProps = {
	blog: Blog
	increaseLikeCount: () => void
	decreaseLikeCount: () => void
}

const UserActions = ({ blog, increaseLikeCount, decreaseLikeCount }: UserActionsProps) => {
	const { liked, setLiked } = useBlogLiked(blog.slug)
	const [ disabled, setDisabled ] = useState<boolean>(false)
	const [likeCount, setLikeCount] = useState<number>(blog._count.likedBy)

	const handleLike = () => {
		setDisabled(true)
		APIMethods.blog.like(blog.slug)
			.then(success => {
				if(liked) setLikeCount(v => v-1)
				else setLikeCount(v => v+1)
				setLiked(v => !v)
			})
			.catch(failed => console.log('like failed'))
			.finally(() => setDisabled(false))
	}

	return (
		<Stack direction='row'>
			<Button
				startIcon={ liked ?
					<Favorite sx={{ color: red[500] }} /> :
					<FavoriteBorderOutlined sx={{color: red[500]}} />
				}
				onClick={handleLike}
				disabled={disabled}
			>
				{ likeCount }
			</Button>
		</Stack>
	)
}

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
	
	const increaseLikeCount = () => {
		if(!blog) return
		let newBlog = blog
		newBlog._count.likedBy = blog._count.likedBy + 1
		setBlog(v => newBlog)
	}

	const decreaseLikeCount = () => {
		if(!blog) return
		let newBlog = blog
		newBlog._count.likedBy = blog._count.likedBy - 1
		setBlog(v => newBlog)
	}

	return (
		<Page>
			<Stack
				padding='32px'
				alignItems='center'
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
				{ notFound && <PageNotfound /> }
				{ (!isLoading && data) && (
					<Stack gap='24px' maxWidth={820} width='100%'>
						{/* <Image 
							src='https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
							alt='Cover Image'
							width={820}
							height={312}
							style={{
								objectFit: 'cover',
								objectPosition: 'center',
								margin: '0 auto',
								width: '100%',
								maxWidth: '820px',
								height: 'auto',
								aspectRatio: '820 / 312'
							}}
						/> */}
						<Stack direction='row' gap='16px' alignItems='center'>
							<Avatar 
								src={getImageUrl(blog?.author.avatar)}
								sx={{
									width: 60,
									height: 60
								}}
							/>
							<Stack>
								<Typography variant='subtitle1'>
									{ blog?.author.name }
								</Typography>
								<Typography variant='caption' color='text.secondary'>
									{`posted on ${dayjs(blog?.createdAt).format('MMM DD')} • updated on ${dayjs(blog?.updatedAt).format('MMM DD')}`}
								</Typography>
							</Stack>
						</Stack>
						<Stack>
							<Typography variant='h3'>{blog?.title}</Typography>
							<Stack direction='row' padding='12px 0' gap='8px'>
								{ blog?.keywords && blog.keywords.map(k => (
									<Chip label={k.keyword.name} onClick={() => {}} key={k.keyword.id}/>
								)) }
							</Stack>
						</Stack>
						<Divider />
						<Reader />
						<Divider />
						{blog && <UserActions blog={blog} increaseLikeCount={increaseLikeCount} decreaseLikeCount={decreaseLikeCount} />}
					</Stack>
				) }
			</Stack>
		</Page>
	)
}

export default ReadBlog