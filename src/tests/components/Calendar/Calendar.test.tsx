import { Calendar } from '@/components/Calendar'
import { mockedBlockedDates } from '@/tests/__mocks__/mockedBlockedDates'
import { render } from '@testing-library/react'

function getBlockedDates() {
  return mockedBlockedDates
}

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    replace: jest.fn(),
    query: { username: 'matheusmartinez' },
  }),
}))

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn().mockReturnValue({
    data: { blockedWeekDays: [0, 3, 4, 5, 6], blockedDates: [9] },
    isLoading: false,
    error: {},
  }),
}))

describe('Home', () => {
  const onDateSelected = jest.fn()

  it('renders homepage unchanged', () => {
    const { container } = render(<Calendar onDateSelected={onDateSelected} />)
    expect(container).toMatchSnapshot()
  })
})
