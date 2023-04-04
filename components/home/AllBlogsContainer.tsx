import { OutputData } from "@editorjs/editorjs"
import { Stack } from "@mui/material"
import BlogCard from "./BlogCard"

type BlogAuthor = {
	name: string
	twitter_username: string
	username: string
	avatar: string | null
	bio: string | null
}

type Blog = {
	title: string
	slug: string
	description: string
	data: OutputData
	createdAt: string
	updatedAt: string
	author: BlogAuthor
	_count: {
		likedBy: number
	}
}

type Props = {
	allBlogs: Array<Blog>
}

const AllBlogsContainer = ({ allBlogs }: Props): JSX.Element => {
	return (
		<Stack
			width='100%'
			gap='16px'
			padding='32px'
		>
			{ allBlogs.map(b => (
				<BlogCard 
					blog={b}
					key={b.slug}
				/>
			)) }
		</Stack>
	)
}

export default AllBlogsContainer