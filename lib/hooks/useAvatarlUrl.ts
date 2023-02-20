import { useState } from "react";
import { CurrentUser } from "../store/useUserSession";
import { string } from "yup";

const cdn_url = process.env.NEXT_PUBLIC_CDN_URL

const useAvatarUrl = (user: CurrentUser | undefined) => {
	const [avatarSrc, setAvatarSrc] = useState<string | undefined>()

	if(user && user.profile && user.profile.avatar) {
		setAvatarSrc(v => `${cdn_url}/${user.profile.avatar}`)
	}

	return {
		avatarSrc
	}
}

export default useAvatarUrl