import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import { useStudents } from '../context/StudentContext'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function AddStudent() {
  const { addStudent } = useStudents()
  const navigate = useNavigate()
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = (data) => {
    addStudent(data)
    setShowToast(true)
    navigateAfterDelay(navigate, '/students')
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-content dark:text-content-dark">Add a New Student</h1>
        <p className="text-content-muted dark:text-content-muted-dark mt-1">
          Fill out the form below to register a new student.
        </p>
      </header>

      <StudentForm mode="add" onSubmit={handleSubmit} onCancel={() => navigate('/students')} />

      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in"
        >
          <CheckIcon />
          <span className="font-medium">Student added successfully</span>
        </div>
      )}
    </section>
  )
}

export function navigateAfterDelay(navigate, path, delay = 1000) {
  return new Promise((resolve, reject) => {
    if (typeof navigate !== 'function') {
      reject(new TypeError('navigate must be a function'))
      return
    }

    setTimeout(() => {
      navigate(path)
      resolve(path)
    }, delay)
  })
}
