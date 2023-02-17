type ImageDataURL = {
	success: boolean
	url?: string
}

export const getImageDataURL = (file: File) => {
	const reader = new FileReader()
	return new Promise<ImageDataURL>((resolve, reject) => {
		reader.addEventListener('load', () => {
			resolve({
				success: true,
				url: reader.result?.toString()
			})
		}, false)
		reader.addEventListener('error', () => {
			resolve({
				success: false,
				url: ''
			})
		})

		if(file) reader.readAsDataURL(file)
	})
}