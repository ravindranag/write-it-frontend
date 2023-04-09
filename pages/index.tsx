import { NextPage } from "next";
import { Button, Stack, Typography } from '@mui/material'
import Page from "@/components/layout/Page";
import Link from "next/link";
import { useEffect, useState } from "react";
import APIMethods from "@/lib/axios/api";
import { OutputData } from "@editorjs/editorjs";
import BlogCard from "@/components/home/BlogCard";
import useToastStore from "@/lib/store/useToastStore";
import AllBlogsContainer from "@/components/home/AllBlogsContainer";
import RecommendationDrawer from "@/components/home/RecommendationDrawer";
import TopBlogsDrawer from "@/components/home/TopBlogsDrawer";

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

const Home: NextPage = () => {
	const [allBlogs, setAllBlogs] = useState<Array<Blog>>([])
	const [setMessage] = useToastStore(state => [state.setMessage])

	useEffect(() => {
		(async () => {	
			try {
				const blogs = (await APIMethods.blog.getLatestBlogs()).data
				console.log(blogs)
				setAllBlogs(blogs)
			}	
			catch(err) {
				setMessage('Cannot fetch blogs')
			}
		})()
	}, [])

	return (
		<Page>
			<Stack
				direction='row'
			>
				<RecommendationDrawer />
				{ allBlogs && <AllBlogsContainer allBlogs={allBlogs} /> }	
				<TopBlogsDrawer />
			</Stack>
		</Page>
	)
}

export default Home