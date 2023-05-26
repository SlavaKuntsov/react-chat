/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{html,jsx}',
		'./components/**/*.{html,jsx}',
		'./src/**/*.{html,jsx}',
	  ],
	theme: {
		extend: {
			keyframes: {
				wave: {
					'50%': { opacity: .5, transform: 'translateY(-2px)' } ,
				}
			},
		},
	},
	plugins: [],
  }