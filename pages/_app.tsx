import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import '@/styles/globals.css'
import { Stack } from '@mui/material'
import type { AppProps } from 'next/app'
import AppTheme from 'theme/AppTheme'

export default function App({ Component, pageProps }: AppProps) {
  return (
	<AppTheme>
		<Stack
			minHeight='100vh'
			justifyContent='space-between'
		>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</Stack>
	</AppTheme>
  )
}
