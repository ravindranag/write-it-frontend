import { useEffect, useState } from "react"
import APIMethods from "../axios/api"

type MetaDataObject = {
	id: string
	name: string
	description: string | null
}

type MetaData = {
	keyword: MetaDataObject[]
	category: MetaDataObject[]
}



export const useFetchKeywordsAndCategories = () => {
	const [metadata, setData] = useState<MetaData>({
		keyword: [],
		category: []
	})
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		(async () => {
			setIsLoading(true)
			try {
				const keyword = (await APIMethods.keyword.getAllKeywords()).data
				const category = (await APIMethods.category.getAllCategories()).data
				setData({
					keyword,
					category
				})
			} catch(err: any) {
				setError(err.message)
			} finally {
				setIsLoading(false)
			}
		})()
	}, [])

	return {
		metadata,
		error,
		isLoading
	}
}