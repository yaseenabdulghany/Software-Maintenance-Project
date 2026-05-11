import { useMemo, useState } from 'react'

export function gradeName(grade) {
  return `Grade ${grade}`
}

export function validate(values) {
  const errors = {}

  const nameEn = values.name_en.trim()
  if (!nameEn) errors.name_en = 'Name is required'
  else if (nameEn.length < 3) errors.name_en = 'Name must be at least 3 characters'
  else if (!/^[A-Za-z\s''-]+$/.test(nameEn)) errors.name_en = 'Name can only contain English letters'

  if (values.age === '' || values.age === null || values.age === undefined) {
    errors.age = 'Age is required'
  } else {
    const ageNum = Number(values.age)
    if (Number.isNaN(ageNum) || ageNum < 5 || ageNum > 25) {
      errors.age = 'Age must be between 5 and 25'
    }
  }

  if (!values.grade) errors.grade = 'Please select a grade'

  return errors
}

const emptyValues = { name_en: '', age: '', grade: '', status: 'Active' }

export default function StudentForm({ mode = 'add', initialData, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => ({
    ...emptyValues,
    ...(initialData ?? {}),
    name_en: initialData?.name_en ?? initialData?.name ?? '',
    age: initialData?.age ?? '',
    grade: initialData?.grade ?? '',
  }))
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const errors = useMemo(() => validate(values), [values])
  const hasErrors = Object.keys(errors).length > 0

  const showError = (field) => (touched[field] || submitAttempted) && errors[field]

  const setField = (field, value) => setValues((v) => ({ ...v, [field]: value }))
  const markTouched = (field) => setTouched((tt) => ({ ...tt, [field]: true }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitAttempted(true)
    if (hasErrors) return
    onSubmit({
      name_en: values.name_en.trim(),
      age: Number(values.age),
      grade: Number(values.grade),
      status: values.status,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card max-w-lg mx-auto space-y-5">
      <h2 className="text-2xl font-semibold text-content dark:text-content-dark">
        {mode === 'edit' ? 'Edit Student' : 'Add New Student'}
      </h2>

      <div>
        <label htmlFor="name_en" className="block text-sm font-medium mb-1.5 text-content dark:text-content-dark">
          Name
        </label>
        <input
          id="name_en"
          type="text"
          dir="ltr"
          className="input-field"
          value={values.name_en}
          onChange={(e) => setField('name_en', e.target.value)}
          onBlur={() => markTouched('name_en')}
          placeholder="e.g. Jane Doe"
          autoComplete="off"
        />
        {showError('name_en') && <p className="text-red-500 text-sm mt-1">{errors.name_en}</p>}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium mb-1.5 text-content dark:text-content-dark">
          Age
        </label>
        <input
          id="age"
          type="number"
          min={5}
          max={25}
          className="input-field"
          value={values.age}
          onChange={(e) => setField('age', e.target.value)}
          onBlur={() => markTouched('age')}
          placeholder="5 to 25"
        />
        {showError('age') && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="grade" className="block text-sm font-medium mb-1.5 text-content dark:text-content-dark">
          Grade
        </label>
        <select
          id="grade"
          className="input-field"
          value={values.grade}
          onChange={(e) => setField('grade', e.target.value)}
          onBlur={() => markTouched('grade')}
        >
          <option value="">Select a grade</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
            <option key={g} value={g}>
              {gradeName(g)}
            </option>
          ))}
        </select>
        {showError('grade') && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
      </div>

      <div>
        <span className="block text-sm font-medium mb-1.5 text-content dark:text-content-dark">Status</span>
        <div className="inline-flex p-1 rounded-lg bg-surface dark:bg-surface-hover-dark border border-edge dark:border-edge-dark" role="radiogroup" aria-label="Status">
          {['Active', 'Inactive'].map((s) => {
            const selected = values.status === s
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setField('status', s)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  selected
                    ? 'bg-white dark:bg-surface-dark text-primary dark:text-primary-dark shadow-card'
                    : 'text-content-muted dark:text-content-muted-dark hover:text-content dark:hover:text-content-dark'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary sm:flex-1">
          Cancel
        </button>
        <button type="submit" disabled={submitAttempted && hasErrors} className="btn-primary sm:flex-1">
          {mode === 'edit' ? 'Save Changes' : 'Add Student'}
        </button>
      </div>
    </form>
  )
}
