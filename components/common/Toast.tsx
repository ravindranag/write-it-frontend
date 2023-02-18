import { Close } from "@mui/icons-material"
import { IconButton, Snackbar, SvgIconTypeMap, SvgIconProps } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type ToastProps = {
	message: string
	setMessage: Dispatch<SetStateAction<string>>
}

const Toast = ({
	message,
	setMessage
}: ToastProps): JSX.Element => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if(message) setOpen(v => true)
	}, [message])

	const handleClose = (e: any, reason: string) => {
		if(reason === 'clickaway') return
		setOpen(v => false)
		setMessage(v => '')
	}

	const actions = (
		<>
			<IconButton
				onClick={(e) => handleClose(e, 'close')}
			>
				<Close sx={{ color: '#fff' }} />
			</IconButton>
		</>
	)

	return (
		<Snackbar 
			open={open}
			message={message}
			autoHideDuration={5000}
			onClose={handleClose}
			action={actions}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center'
			}}
		/>
	)
}

export default Toast