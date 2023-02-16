import useSignUpStore from "@/lib/store/useSignUpStore"
import { Stack } from "@mui/material"
import { motion } from "framer-motion"
import { IChildren } from "types"

const variants = {
	hidden: {
		x: 600,
		opacity: 0,
	},
	enter: {
		x: 0,
		opacity: 1,
		zIndex: 1
	},
	exit: {
		x: -600,
		opacity: 0,
	}
}

const MotionWrapper = ({ children }: IChildren): JSX.Element => {

	return (
		<Stack
			component={motion.div}
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			flexGrow={1}
			sx={{
				width: '100%',
			}}
			transition={{
				stiffness: 500
			}}
		>
			{ children }
		</Stack>
	)
}

export default MotionWrapper