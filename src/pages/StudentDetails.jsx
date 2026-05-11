import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import { useStudents } from '../context/StudentContext'

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function InfoRow({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-edge dark:border-edge-dark last:border-0">
      <span className="text-sm font-medium text-content-muted dark:text-content-muted-dark">{label}</span>
      <span className="text-content dark:text-content-dark">{children}</span>
    </div>
  )
}

function studentName(student) {
  return student.name_en || student.name || 'Unnamed Student'
}

function gradeName(grade) {
  return `Grade ${grade}`
}

export default function StudentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getStudentById, deleteStudent } = useStudents()
  const student = getStudentById(id)
  const [confirmOpen, setConfirmOpen] = useState(false)

  if (!student) {
    return (
      <section className="card max-w-md mx-auto text-center py-12">
        <h1 className="text-2xl font-semibold text-content dark:text-content-dark">Student not found</h1>
        <p className="text-content-muted dark:text-content-muted-dark mt-2">
          The student you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/students" className="btn-primary mt-6 inline-flex">
          <ArrowLeftIcon />
          Back to Students
        </Link>
      </section>
    )
  }

  const displayName = studentName(student)

  const handleConfirmDelete = () => {
    deleteStudent(student.id)
    setConfirmOpen(false)
    navigate('/students')
  }

  return (
    <section className="space-y-6 max-w-3xl mx-auto">
      <Link
        to="/students"
        className="inline-flex items-center gap-2 text-sm font-medium text-content-muted dark:text-content-muted-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
      >
        <ArrowLeftIcon />
        Back to Students
      </Link>

      <div className="card flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-24 h-24 rounded-full bg-accent dark:bg-accent-dark text-white flex items-center justify-center text-3xl font-semibold flex-shrink-0">
          {getInitials(displayName)}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-content dark:text-content-dark">{displayName}</h1>
          <div className="mt-3">
            <span className={student.status === 'Active' ? 'badge-active' : 'badge-inactive'}>
              {student.status}
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-content dark:text-content-dark mb-2">Information</h2>
        <InfoRow label="ID">
          <span className="font-mono text-xs">{student.id}</span>
        </InfoRow>
        <InfoRow label="Name">{student.name_en || student.name || '-'}</InfoRow>
        <InfoRow label="Age">{student.age}</InfoRow>
        <InfoRow label="Grade">{gradeName(student.grade)}</InfoRow>
        <InfoRow label="Status">{student.status}</InfoRow>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-content dark:text-content-dark mb-2">Notes</h2>
        <p className="text-content-muted dark:text-content-muted-dark text-sm">
          No notes available yet.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => navigate(`/edit-student/${student.id}`)}
          className="btn-primary sm:px-8"
        >
          Edit Student
        </button>
        <button type="button" onClick={() => setConfirmOpen(true)} className="btn-danger sm:px-8">
          Delete Student
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete student?"
        message={`Are you sure you want to delete ${displayName}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </section>
  )
}
