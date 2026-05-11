export function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    </svg>
  )
}

export function getStudentName(student) {
  return student.name_en || student.name || 'Unnamed Student'
}

function gradeName(grade) {
  return `Grade ${grade}`
}

export default function StudentCard({ student, onView, onEdit, onDelete }) {
  const displayName = getStudentName(student)

  return (
    <article className="card hover:border-primary dark:hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-lg flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-accent dark:bg-accent-dark text-white flex items-center justify-center font-semibold flex-shrink-0">
          {getInitials(displayName)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-content dark:text-content-dark truncate">
            {displayName}
          </h3>
          <p className="text-sm text-content-muted dark:text-content-muted-dark">
            Age {student.age} &middot; {gradeName(student.grade)}
          </p>
          <div className="mt-2">
            <span className={student.status === 'Active' ? 'badge-active' : 'badge-inactive'}>
              {student.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 mt-4 pt-4 border-t border-edge dark:border-edge-dark">
        <button type="button" onClick={() => onView(student)} className="icon-btn" aria-label={`View ${displayName}`} title="View">
          <EyeIcon />
        </button>
        <button type="button" onClick={() => onEdit(student)} className="icon-btn" aria-label={`Edit ${displayName}`} title="Edit">
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={() => onDelete(student)}
          className="icon-btn hover:!text-red-600 hover:!bg-red-50 dark:hover:!bg-red-900/30"
          aria-label={`Delete ${displayName}`}
          title="Delete"
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  )
}
