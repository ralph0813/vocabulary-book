// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require('tailwindcss/defaultConfig')

const defaultSpacing = defaultConfig.theme.spacing

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        iphone: '375px',
        xs: '500px',
      },
      height: {
        120: '30rem',
        160: '40rem',
      },
      minHeight: {
        ...defaultSpacing,
      },
      colors: {
        brand: {
          light: '#76b3e8',
          DEFAULT: '#64a6d4',
          dark: '#4c91ba',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('@tailwindcss/forms'),
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('@rvxlab/tailwind-plugin-ios-full-height'),
  ],
}
