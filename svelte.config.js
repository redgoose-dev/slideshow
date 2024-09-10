import preprocess from 'svelte-preprocess'

const dev = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			'$slideshow': 'src/slideshow',
		},
	},
	compilerOptions: {
		customElement: true,
	},
	onwarn(warning, defaultHandler)
	{
		const ignore = [
			dev && 'unused-export-let',
			'css-unused-selector',
			'a11y-label-has-associated-control',
		].filter(Boolean)
		if (ignore.includes(warning.code))
		{
			// console.warn(`# onwarn: ${warning.code}`)
			return
		}
		defaultHandler(warning)
	},
	preprocess: preprocess({}),
}

export default config
