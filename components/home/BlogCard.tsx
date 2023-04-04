import { getReadingTimeEstimate } from "@/lib/utils/blogUtils"
import { getImageUrl } from "@/lib/utils/getImageUrl"
import { OutputData } from "@editorjs/editorjs"
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import dayjs from "dayjs"
import Link from "next/link"
import { useEffect } from "react"

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
	blog: Blog
}

const BlogCard = ({
	 blog
}: Props): JSX.Element => {
	useEffect(() => {
		console.log(dayjs(blog.createdAt).format('DD MMM'))
	}, [])

	return (
		<Card
			variant='outlined'
		>
			<CardHeader 
				avatar={
					<Avatar 
						src={getImageUrl(blog.author.avatar)}
						alt={blog.author.username}
					/>
				}
				title={blog.author.name}
				subheader={dayjs(blog.createdAt).format('DD MMM')}
			/>
			<CardContent>
				<Link
					href={`/read/${blog.slug}`}
				>
					<Typography
						variant='h4'
					>
						{ blog.title }
					</Typography>
				</Link>
			</CardContent>
			<CardActions
				sx={{
					padding: '16px',
					justifyContent: 'space-between'
				}}
			>
				<Link
					href={`/read/${blog.slug}`}
				>
					<Button
						startIcon={
							<FavoriteBorder sx={{color: red[500]}} />
						}
						size="small"
					>
						<Typography variant='caption' color='textSecondary' >{blog._count.likedBy} Likes</Typography>
					</Button>
				</Link>
				<Typography
					variant='caption'
					color='text.secondary'
				>
					{ getReadingTimeEstimate(blog.data) }
				</Typography>
			</CardActions>
		</Card>
	)
}

export default BlogCard