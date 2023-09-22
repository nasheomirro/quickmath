/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			primary: {
				50: '#FAF0FF',
				100: '#F7E5FF',
				200: '#EFCCFF',
				300: '#E7B3FF',
				400: '#DF99FF',
				500: '#D57DFF',
				600: '#BE33FF',
				700: '#9D00E6',
				800: '#690099',
				900: '#34004D',
				950: '#180024'
			},
			surface: {
				50: '#F6F6F9',
				100: '#E9E9F1',
				200: '#D7D7E5',
				300: '#C1C1D7',
				400: '#ACABC9',
				500: '#9796BC',
				600: '#7876A8',
				700: '#5D5B8F',
				800: '#494870',
				900: '#33324E',
				950: '#28283E'
			}
		},
		extend: {}
	},
	plugins: []
};
