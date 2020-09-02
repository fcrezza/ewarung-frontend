import React from 'react'
import useSWR from 'swr'

import axios from 'axios' // for development only
// import axios from 'libs/axios' // for real case

const authContext = React.createContext()

function AuthProvider({children}) {
	const auth = useProvideAuth()

	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function useProvideAuth() {
	// for real case
	// let {data: user, mutate} = useSWR(
	// 	'/user',
	// 	async (url) => {
	// 		const {data} = await axios.get(url, {
	// 			withCredentials: true,
	// 		})

	// 		return data.userData
	// 	},
	// 	{
	// 		revalidateOnFocus: false,
	// 	}
	// )

	// for real case
	let {data: user, mutate} = useSWR(
		'http://localhost:5000/user',
		async (url) => {
			const {data} = await axios.get(url)

			return data.userData
		},
		{
			revalidateOnFocus: false,
		}
	)

	const login = async (formData) => {
		const {
			data: {userData},
		} = await axios.post('/user/login', formData, {
			withCredentials: true,
		})

		mutate(userData, false)
	}

	const signup = async (formData) => {
		await axios.post('/user/signup', formData)
	}

	const logout = async () => {
		await axios.get('/user/logout', {
			withCredentials: true,
		})
		mutate(null, false)
	}

	return {
		user,
		login,
		signup,
		logout,
	}
}

function useAuth() {
	return React.useContext(authContext)
}

export {AuthProvider, useAuth}
