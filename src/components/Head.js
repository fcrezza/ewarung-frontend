import React from 'react'
import {Helmet} from 'react-helmet'

function Head({title, description, meta = []}) {
	const metaDescription = description || 'Manage warung dengan aman dan mudah'
	return (
		<Helmet
			title={title}
			titleTemplate="%s | e-warung"
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: '@fcrezza',
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: 'Anang Fachreza twitter account',
				},
			].concat(meta)}
		/>
	)
}

export default Head
