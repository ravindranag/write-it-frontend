import CompleteProfile from "@/components/auth/CompleteProfile";
import CreateAccount from "@/components/auth/CreateAccount";
import NextSteps from "@/components/auth/NextSteps";
import Page from "@/components/layout/Page";
import useSignUpStore from "@/lib/store/useSignUpStore";
import { Button, Container, Stack, Step, StepLabel, Stepper } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { NextPage } from "next";
import { useEffect } from "react";

const SignUp: NextPage = () => {
	const [steps, activeStep, setActiveStep] = useSignUpStore(state => [state.steps, state.activeStep, state.setActiveStep])

	return (
		<Page>
			<Stack
				flexGrow={1}
				// justifyContent='center'
			>
				<Container
					component={Stack}
					maxWidth='sm'
					padding='32px'
					gap='40px'
					sx={{
						display: 'flex'
					}}
				>
					<Stepper
						alternativeLabel
					>
						{ steps.map((step, idx) => (
							<Step
								key={step.label}
								completed={activeStep > idx}
								active={activeStep === idx}
							>
								<StepLabel>{ step.label }</StepLabel>
							</Step>
						)) }
					</Stepper>
					<Stack
						width='100%'
						overflow='hidden'
					>
						<AnimatePresence
							initial={false}
							mode='wait'
						>
							{activeStep === 0 && <CreateAccount />}
							{activeStep === 1 && <CompleteProfile />}
							{activeStep === 2 && <NextSteps />}
						</AnimatePresence>
					</Stack>
					{/* <Stack
						gap='8px'
						direction='row'
					>
						<Button
							onClick={() => setActiveStep(-1)}
						>
							Back
						</Button>
						<Button
							onClick={() => setActiveStep(1)}
						>
							Next
						</Button>
					</Stack> */}
				</Container>
			</Stack>
		</Page>
	)
}

export default SignUp