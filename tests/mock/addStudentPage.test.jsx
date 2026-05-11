import { jest } from '@jest/globals'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AddStudent from '../../src/pages/AddStudent'

const mockAddStudent = jest.fn()
const mockNavigate = jest.fn()

jest.mock('../../src/context/StudentContext', () => ({
  useStudents: () => ({
    addStudent: mockAddStudent,
  }),
}))

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock('../../src/components/StudentForm', () => {
  return function MockStudentForm({ onSubmit, onCancel }) {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            onSubmit({
              name_en: 'Test Student',
              age: 12,
              grade: 6,
              status: 'Active',
            })
          }
        >
          Submit Student
        </button>
        <button type="button" onClick={onCancel}>
          Cancel Student
        </button>
      </div>
    )
  }
})

describe('AddStudent page', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockAddStudent.mockClear()
    mockNavigate.mockClear()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('uses jest.mock with project modules', () => {
    render(<AddStudent />)

    fireEvent.click(screen.getByRole('button', { name: 'Submit Student' }))

    expect(mockAddStudent).toHaveBeenCalledWith({
      name_en: 'Test Student',
      age: 12,
      grade: 6,
      status: 'Active',
    })
    expect(screen.getByRole('status').textContent).toContain('Student added successfully')

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cancel Student' }))

    expect(mockNavigate).toHaveBeenCalledWith('/students')
  })
})