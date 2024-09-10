import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 3000,
	},
	plugins: [
		sveltekit(),
	],
})
