import { jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import SearchBar from '../../src/components/SearchBar'

describe('SearchBar', () => {
  test('uses jest.fn with the input change handler', () => {
    const handleChange = jest.fn()

    render(<SearchBar value="" onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText('Search students by name'), {
      target: { value: 'Omar' },
    })

    expect(handleChange).toHaveBeenCalledWith('Omar')
  })
})
