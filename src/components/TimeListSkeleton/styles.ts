import { keyframes, styled } from '@ignite-ui/react'

const skeletonLoading = keyframes({
  '0%': {
    backgroundColor: 'hsl(206,1%,15%, 1)',
  },
  '100%': {
    backgroundColor: 'hsl(206,1%,20%, 1)',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
  backgroundRepeat: 'no-repeat',

  '@media(max-width:900px)': {
    gridTemplateColumns: '2fr',
  },
})

export const TimePickerItem = styled('button', {
  backgroundColor: '$gray600',
  border: 0,
  padding: '$5 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',
  animation: `${skeletonLoading} 1s linear infinite alternate`,
})
