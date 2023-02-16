import { useDataUriSync } from "@/lib/dicebear/utils"
import { funEmoji } from '@dicebear/collection'
import Image from "next/image"

const SadFace = () => {
	const dataUri = useDataUriSync(funEmoji, {
		mouth: ['sad']
	})

	return (
		<Image 
			src={dataUri}
			alt='Sad Face'
			width={200}
			height={200}
		/>
	)
}

export default SadFace