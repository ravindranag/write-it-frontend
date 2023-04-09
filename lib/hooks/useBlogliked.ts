import { useEffect, useState } from "react"
import APIMethods from "../axios/api"

const useBlogLiked = (slug: string) => {
	const [liked, setLiked] = useState<boolean>(false)

	useEffect(() => {
		APIMethods.blog.blogLiked(slug)
			.then(liked => setLiked(true))
			.catch(notLiked => setLiked(false))
	}, [])

	return {
		liked,
		setLiked
	}
}

export default useBlogLiked