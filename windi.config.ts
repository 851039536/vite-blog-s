import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
// import plugin from 'windicss/plugin'

export default defineConfig({
  darkMode: 'class', // or 'media'
  preflight: true, // 样式重置
  attributify: false, // 属性模式
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  },
  // 快速创建可复用的组件和工具类。
  shortcuts: {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md cursor-pointer hover:(bg-gray-400 font-medium) bg-white font-light',
    ceShi: {
      color: 'white',
      '@apply': 'py-2 px-4 font-semibold rounded-lg',
      '&:hover': {
        '@apply': 'bg-green-700',
        color: 'black'
      }
    }
  },
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: [
    // plugin(({ addUtilities }) => {
    //   const newUtilities = {
    //     '.skew-10deg': {
    //       transform: 'skewY(-10deg)'
    //     },
    //     '.skew-15deg': {
    //       transform: 'skewY(-15deg)'
    //     }
    //   }
    //   addUtilities(newUtilities)
    // }),
    // plugin(({ addComponents }) => {
    //   const buttons = {
    //     '.btn': {
    //       padding: '.5rem 1rem',
    //       borderRadius: '.25rem',
    //       fontWeight: '600'
    //     },
    //     '.btn-blue': {
    //       backgroundColor: '#3490dc',
    //       color: '#fff',
    //       '&:hover': {
    //         backgroundColor: '#2779bd'
    //       }
    //     },
    //     '.btn-red': {
    //       backgroundColor: '#e3342f',
    //       color: '#fff',
    //       '&:hover': {
    //         backgroundColor: '#cc1f1a'
    //       }
    //     }
    //   }
    //   addComponents(buttons)
    // }),
    // plugin(({ addDynamic, variants }) => {
    //   addDynamic(
    //     'skew',
    //     ({ Utility, Style }) => {
    //       return Utility.handler
    //         .handleStatic(Style('skew'))
    //         .handleNumber(0, 360, 'int', (number) => `skewY(-${number}deg)`)
    //         .createProperty('transform')
    //     },
    //     variants('skew')
    //   )
    // }),
    // eslint-disable-next-line global-require
    // require('windicss/plugin/filters'),
    // // eslint-disable-next-line global-require
    // require('windicss/plugin/forms'),
    // // eslint-disable-next-line global-require
    // require('windicss/plugin/aspect-ratio'),
    // // eslint-disable-next-line global-require
    // require('windicss/plugin/line-clamp'),
    // // eslint-disable-next-line global-require
    // require('windicss/plugin/typography')({
    //   modifiers: ['DEFAULT', 'sm', 'lg', 'red']
    // })
  ]
})
