import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../components/DashboardCard'
import { useStudents } from '../context/StudentContext'

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8v8M14 8v8" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

export default function Dashboard() {
  const { students } = useStudents()
  const navigate = useNavigate()

  const stats = useMemo(() => {
    const total = students.length
    const active = students.filter((s) => s.status === 'Active').length
    const inactive = students.filter((s) => s.status === 'Inactive').length
    const grades = new Set(students.map((s) => s.grade)).size
    return { total, active, inactive, grades }
  }, [students])

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold text-content dark:text-content-dark">
          Student Management Dashboard
        </h1>
        <p className="text-content-muted dark:text-content-muted-dark mt-2">
          Overview of your school's student records.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Students" value={stats.total} icon={<UsersIcon />} />
        <DashboardCard title="Active Students" value={stats.active} icon={<CheckIcon />} />
        <DashboardCard title="Inactive Students" value={stats.inactive} icon={<PauseIcon />} />
        <DashboardCard title="Total Grades" value={stats.grades} icon={<BookIcon />} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" onClick={() => navigate('/students')} className="btn-primary sm:px-8">
          View All Students
        </button>
        <button type="button" onClick={() => navigate('/add-student')} className="btn-secondary sm:px-8">
          Add New Student
        </button>
      </div>
    </section>
  )
}
