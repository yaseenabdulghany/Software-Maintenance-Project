import { gradeName, validate } from '../../src/components/StudentForm'
import { getInitials, getStudentName } from '../../src/components/StudentCard'
import { getVisibleStudents, studentName } from '../../src/pages/Students'

describe('project unit helpers', () => {
  test('covers numbers, strings, arrays, and objects with simple edge cases', () => {
    const students = [
      { id: '1', name_en: 'Omar Hassan', age: 10, grade: 4, status: 'Active' },
      { id: '2', name_en: 'Aisha Khan', age: 14, grade: 8, status: 'Active' },
    ]

    expect(gradeName(8)).toBe('Grade 8')

    expect(getInitials('Sara Ibrahim')).toBe('SI')
    expect(getInitials('')).toBe('?')

    expect(getVisibleStudents(students, 'aisha', '', 'name-asc')).toEqual([students[1]])
    expect(() => getVisibleStudents(null, '', '', 'name-asc')).toThrow(
      'students must be an array',
    )

    expect(
      validate({
        name_en: 'Aisha Khan',
        age: '14',
        grade: '8',
        status: 'Active',
      }),
    ).toEqual({})

    expect(
      validate({
        name_en: 'A1b',
        age: '40',
        grade: '',
        status: 'Active',
      }),
    ).toEqual({
      name_en: 'Name can only contain English letters',
      age: 'Age must be between 5 and 25',
      grade: 'Please select a grade',
    })
    expect(getStudentName({})).toBe('Unnamed Student')
    expect(studentName(null)).toBe('')
  })
})
