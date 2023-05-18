// load env variables for tests
require('dotenv').config({ path: '.env' })

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {
        // do nothing
      },
      removeListener: () => {
        // do nothing
      },
    }
  },
})

Object.defineProperty(window, 'location', {
  value: {
    href: '',
    host: 'localhost',
    replace: jest.fn(),
    origin: '',
  },
  writable: true,
})

window.scroll = jest.fn
window.alert = jest.fn
