import { Button } from "@mui/material"
import Link from "next/link"

type Props = {
	href: string
	children: any
}

const NavItemLink = ({ href, children }: Props): JSX.Element => {
	return (
		<Link
			href={href}
		>
			<Button
				sx={{
					justifyContent: 'start'
				}}
				fullWidth
			>
				{children}
			</Button>
		</Link>
	)
}

export default NavItemLink