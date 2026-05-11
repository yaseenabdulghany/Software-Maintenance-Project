import { useEffect, useMemo, useState } from 'react'
import * as XLSX from 'xlsx'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import SearchBar from '../components/SearchBar'
import StudentCard from '../components/StudentCard'
import StudentCardSkeleton from '../components/StudentCardSkeleton'
import { useStudents } from '../context/StudentContext'

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

function gradeName(grade) {
  return `Grade ${grade}`
}

function statusName(status) {
  return status
}

export function studentName(student) {
  if (!student) return ''
  return student.name_en || student.name || 'Unnamed Student'
}

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'age-asc', label: 'Age (Low-High)' },
  { value: 'age-desc', label: 'Age (High-Low)' },
  { value: 'grade-asc', label: 'Grade (Low-High)' },
  { value: 'grade-desc', label: 'Grade (High-Low)' },
]

export function getVisibleStudents(students, search = '', grade = '', sort = 'name-asc') {
  if (!Array.isArray(students)) {
    throw new TypeError('students must be an array')
  }

  const q = search.trim().toLowerCase()
  const filtered = students.filter((s) => {
    const matchesName =
      !q ||
      (s.name_en || '').toLowerCase().includes(q) ||
      (s.name || '').toLowerCase().includes(q)
    const matchesGrade = !grade || s.grade === Number(grade)
    return matchesName && matchesGrade
  })
  const [key, dir] = sort.split('-')
  const mul = dir === 'asc' ? 1 : -1

  return [...filtered].sort((a, b) => {
    if (key === 'name') {
      const aName = studentName(a)
      const bName = studentName(b)
      return aName.localeCompare(bName) * mul
    }
    if (key === 'age') return (a.age - b.age) * mul
    if (key === 'grade') return ((a.grade || 0) - (b.grade || 0)) * mul
    return 0
  })
}

export default function Students() {
  const { students, deleteStudent } = useStudents()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [grade, setGrade] = useState('')
  const [sort, setSort] = useState('name-asc')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const visible = useMemo(() => {
    return getVisibleStudents(students, search, grade, sort)
  }, [students, search, grade, sort])

  const confirmDelete = () => {
    if (pendingDelete) {
      deleteStudent(pendingDelete.id)
      setPendingDelete(null)
    }
  }

  const handleExport = () => {
    const rows = students.map((s) => ({
      Name: s.name_en || s.name || '',
      Age: s.age,
      Grade: gradeName(s.grade),
      Status: statusName(s.status),
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Students')
    XLSX.writeFile(wb, `students-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-3xl font-semibold text-content dark:text-content-dark">All Students</h1>
        <p className="text-sm text-content-muted dark:text-content-muted-dark">
          {isLoading
            ? 'Loading...'
            : `${visible.length} of ${students.length} student${students.length === 1 ? '' : 's'}`}
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:flex-wrap">
        <SearchBar value={search} onChange={setSearch} />
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="input-field sm:max-w-[180px]"
          aria-label="Filter by grade"
        >
          <option value="">All Grades</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
            <option key={g} value={g}>
              {gradeName(g)}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input-field sm:max-w-[200px]"
          aria-label="Sort students"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
        <div className="flex flex-col sm:flex-row gap-3 sm:ms-auto">
          <button
            type="button"
            onClick={handleExport}
            disabled={students.length === 0}
            className="btn-secondary"
            title="Download all students as Excel sheet"
          >
            <DownloadIcon />
            Export Excel
          </button>
          <Link to="/add-student" className="btn-primary">
            <PlusIcon />
            Add Student
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <StudentCardSkeleton key={i} />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-lg font-medium text-content dark:text-content-dark">No students found</p>
          <p className="text-sm text-content-muted dark:text-content-muted-dark mt-1">
            Try adjusting your search or filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={(s) => navigate(`/student/${s.id}`)}
              onEdit={(s) => navigate(`/edit-student/${s.id}`)}
              onDelete={(s) => setPendingDelete(s)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete student?"
        message={`Are you sure you want to delete ${studentName(pendingDelete)}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </section>
  )
}
