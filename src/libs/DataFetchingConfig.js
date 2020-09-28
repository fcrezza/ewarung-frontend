import React from 'react'
import {SWRConfig} from 'swr'

function DataFetchingConfig({children}) {
	return (
		<SWRConfig
			value={{
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
				shouldRetryOnError: false
			}}
		>
			{children}
		</SWRConfig>
	)
}

export default DataFetchingConfig
