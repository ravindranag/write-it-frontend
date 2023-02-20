import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import '@/styles/globals.css'
import { Stack } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import AppTheme from 'theme/AppTheme'
import NextNProgress from 'nextjs-progressbar'
import { useEffect, useLayoutEffect } from 'react'
import APIMethods from '@/lib/axios/api'
import useUserSession from '@/lib/store/useUserSession'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
	const [setCurrentUser] = useUserSession(state => [state.setCurrentUser])
	const router = useRouter()
	
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		
		if(accessToken) {
			APIMethods.auth.verify()
				.then(res => res.data)
				.then(({ currentUser }) => {
					// console.log(user)
					setCurrentUser(currentUser)
				})
				.catch(err => {
					console.log('User logged out. Login to continue')
					localStorage.removeItem('accessToken')
				})
		} else {
			console.log('Guest mode')
		}
	}, [])

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
				overflow='hidden'
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
