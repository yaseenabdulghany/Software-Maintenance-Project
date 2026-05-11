import { act, renderHook } from '@testing-library/react'
import { StudentProvider, useStudents } from '../../src/context/StudentContext'

function Wrapper({ children }) {
  return <StudentProvider>{children}</StudentProvider>
}

describe('StudentContext integration', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem('students_schema_version', JSON.stringify(2))
  })

  test('adds, updates, and removes a student through the context workflow', () => {
    const { result } = renderHook(() => useStudents(), { wrapper: Wrapper })

    let createdStudent

    act(() => {
      createdStudent = result.current.addStudent({
        name_en: 'Integration Student',
        age: 13,
        grade: 7,
        status: 'Active',
      })
    })

    act(() => {
      result.current.updateStudent(createdStudent.id, { status: 'Inactive' })
    })

    expect(result.current.getStudentById(createdStudent.id)).toMatchObject({
      id: createdStudent.id,
      name_en: 'Integration Student',
      status: 'Inactive',
    })

    act(() => {
      result.current.deleteStudent(createdStudent.id)
    })

    expect(result.current.getStudentById(createdStudent.id)).toBeUndefined()
  })
})
