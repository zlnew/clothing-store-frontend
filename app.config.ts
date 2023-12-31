export default defineAppConfig({
  ui: {
    chip: {
      base: 'ring-black text-black',
      background: 'bg-yellow-300'
    },
    button: {
      rounded: 'rounded-none',
      color: {
        black: {
          solid: 'transition-colors ring-1 ring-inset ring-black text-yellow-300 bg-black hover:text-black hover:bg-yellow-300 disabled:text-yellow-300'
        },
        yellow: {
          solid: 'transition-colors ring-1 ring-inset ring-black text-black bg-yellow-300 hover:text-yellow-300 hover:bg-black disabled:text-black hover:disabled:text-yellow-300'
        }
      }
    },
    input: {
      rounded: 'rounded-none',
      color: {
        white: {
          outline: 'shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-black focus:ring-2 focus:ring-black'
        }
      }
    },
    select: {
      rounded: 'rounded-none',
      color: {
        white: {
          outline: 'shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-black focus:ring-2 focus:ring-black'
        }
      }
    },
    selectMenu: {
      rounded: 'rounded-none',
      color: {
        white: {
          outline: 'shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-black focus:ring-2 focus:ring-black'
        }
      }
    },
    textarea: {
      rounded: 'rounded-none',
      color: {
        white: {
          outline: 'shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-black focus:ring-2 focus:ring-black'
        }
      }
    },
    notification: {
      rounded: 'rounded-none',
      shadow: 'shadow-none',
      ring: 'ring-black'
    }
  }
})
