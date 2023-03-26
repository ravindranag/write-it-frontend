export const getImageUrl = (key: string | undefined | null) => {
	if(!key) {
		return 'broken-image.png'
	}
	return `${process.env.NEXT_PUBLIC_CDN_URL}/${key}`
}