import { Button } from "@mui/material"
import Link from "next/link"
import { MouseEventHandler } from "react"

type Props = {
	onClick: MouseEventHandler<HTMLButtonElement>
	children: any
}

const NavItemButton = ({ onClick, children }: Props): JSX.Element => {
	return (
		<Button
			fullWidth
			onClick={onClick}
			sx={{
				justifyContent: 'start'
			}}
		>
			{children}
		</Button>
	)
}

export default NavItemButton