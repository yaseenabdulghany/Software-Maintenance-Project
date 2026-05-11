import { jest } from '@jest/globals'
import { navigateAfterDelay } from '../../src/pages/AddStudent'

describe('navigateAfterDelay', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('navigates after a short delay and rejects invalid input', async () => {
    const mockNavigate = jest.fn()
    const navigationPromise = navigateAfterDelay(mockNavigate, '/students', 500)

    jest.advanceTimersByTime(500)

    await expect(navigationPromise).resolves.toBe('/students')
    expect(mockNavigate).toHaveBeenCalledWith('/students')
    await expect(navigateAfterDelay(null, '/students')).rejects.toThrow(
      'navigate must be a function',
    )
  })
})
