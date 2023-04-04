import useToastStore from "@/lib/store/useToastStore"
import { Close } from "@mui/icons-material"
import { IconButton, Snackbar, SvgIconTypeMap, SvgIconProps } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const AppToast = (): JSX.Element => {
	const [message, closeToast] = useToastStore(state => [state.message, state.closeToast])

	const actions = (
		<>
			<IconButton
				onClick={(e) => closeToast()}
			>
				<Close sx={{ color: '#fff' }} />
			</IconButton>
		</>
	)

	return (
		<Snackbar 
			open={message ? true: false}
			message={message}
			autoHideDuration={5000}
			action={actions}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center'
			}}
		/>
	)
}

export default AppToast