import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import '@/styles/globals.css'
import { Stack } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import AppTheme from 'theme/AppTheme'
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
	<AppTheme>
		<Stack
			minHeight='100vh'
			justifyContent='space-between'
		>
			<NextNProgress 
				color='black'
			/>
			<Header />
			<Stack
				flexGrow={1}
			>
				<AnimatePresence
					// presenceAffectsLayout
					mode='wait'
					initial={false}
				>
					<Component {...pageProps} />
				</AnimatePresence>
			</Stack>
			<Footer />
		</Stack>
	</AppTheme>
  )
}
