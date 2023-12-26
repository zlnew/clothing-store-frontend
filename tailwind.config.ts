import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  content: [
    'App.vue',
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue'
  ]
}
