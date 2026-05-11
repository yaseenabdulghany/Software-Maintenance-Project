import { createContext, useCallback, useContext, useMemo } from 'react'
import seedStudents from '../data/students.json'
import { useLocalStorage } from '../hooks/useLocalStorage'

// eslint-disable-next-line react-refresh/only-export-components
export const StudentContext = createContext(null)

const SCHEMA_VERSION = 2

;(function migrateIfNeeded() {
  try {
    const raw = window.localStorage.getItem('students_schema_version')
    const version = raw !== null ? JSON.parse(raw) : 0
    if (version < SCHEMA_VERSION) {
      window.localStorage.removeItem('students')
      window.localStorage.setItem('students_schema_version', JSON.stringify(SCHEMA_VERSION))
    }
  } catch {
    // ignore
  }
})()

export function StudentProvider({ children }) {
  const [students, setStudents] = useLocalStorage('students', seedStudents)

  const addStudent = useCallback((student) => {
    const newStudent = { ...student, id: crypto.randomUUID() }
    setStudents((prev) => [...prev, newStudent])
    return newStudent
  }, [setStudents])

  const deleteStudent = useCallback((id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }, [setStudents])

  const updateStudent = useCallback((id, data) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)))
  }, [setStudents])

  const getStudentById = useCallback(
    (id) => students.find((s) => s.id === id),
    [students],
  )

  const value = useMemo(
    () => ({ students, addStudent, deleteStudent, updateStudent, getStudentById }),
    [students, addStudent, deleteStudent, updateStudent, getStudentById],
  )

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStudents() {
  const ctx = useContext(StudentContext)
  if (!ctx) throw new Error('useStudents must be used within a StudentProvider')
  return ctx
}
