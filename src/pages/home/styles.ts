import { styled, Heading, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  marginLeft: 'auto',
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  height: '100vh',

  '@media (max-width:1440px)': {
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media (max-width: 815px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingY: '$8',
  overflow: 'hidden',

  '@media(max-width: 815px)': {
    display: 'none',
  },
})
