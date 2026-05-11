import { Link, useNavigate, useParams } from 'react-router-dom'
import StudentForm from '../components/StudentForm'
import { useStudents } from '../context/StudentContext'

function studentName(student) {
  return student.name_en || student.name || 'Unnamed Student'
}

export default function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getStudentById, updateStudent } = useStudents()
  const student = getStudentById(id)

  if (!student) {
    return (
      <section className="card max-w-md mx-auto text-center py-12">
        <h1 className="text-2xl font-semibold text-content dark:text-content-dark">Student not found</h1>
        <p className="text-content-muted dark:text-content-muted-dark mt-2">
          We couldn't find that student.
        </p>
        <Link to="/students" className="btn-primary mt-6 inline-flex">
          Back to Students
        </Link>
      </section>
    )
  }

  const handleSubmit = (data) => {
    updateStudent(student.id, data)
    navigate(`/student/${student.id}`)
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-content dark:text-content-dark">Edit Student</h1>
        <p className="text-content-muted dark:text-content-muted-dark mt-1">
          Update {studentName(student)}'s information.
        </p>
      </header>

      <StudentForm
        mode="edit"
        initialData={student}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/student/${student.id}`)}
      />
    </section>
  )
}
