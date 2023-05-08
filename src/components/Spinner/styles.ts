import { keyframes, styled } from '@ignite-ui/react'

const spinner = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const SpinnerContainer = styled('div', {
  width: '$6',
  height: '$6',
  border: '2px solid #FFF',
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  animation: `${spinner} 1s linear infinite`,
})
