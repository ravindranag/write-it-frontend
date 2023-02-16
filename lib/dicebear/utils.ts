import { Style, StyleOptions, createAvatar } from "@dicebear/core";

export const useDataUriSync = <O extends {}>(collection: Style<O>, options: StyleOptions<O>): string => {
	const avatar = createAvatar(collection, options)

	return avatar.toDataUriSync()
}