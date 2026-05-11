import express from 'express'
import seedStudents from '../data/students.json'

function cloneStudent(student) {
  return { ...student }
}

function createStore() {
  return seedStudents.map(cloneStudent)
}

function isValidStudentPayload(payload) {
  return (
    payload &&
    typeof payload.name_en === 'string' &&
    payload.name_en.trim() !== '' &&
    Number.isFinite(Number(payload.age)) &&
    Number.isFinite(Number(payload.grade))
  )
}

export function createStudentApiApp() {
  const app = express()
  let students = createStore()

  app.use(express.json())

  app.get('/students', (req, res) => {
    res.status(200).json(students)
  })

  app.post('/students', (req, res) => {
    if (!isValidStudentPayload(req.body)) {
      res.status(400).json({ error: 'Invalid student data' })
      return
    }

    const student = {
      id: crypto.randomUUID(),
      name_en: req.body.name_en.trim(),
      age: Number(req.body.age),
      grade: Number(req.body.grade),
      status: req.body.status || 'Active',
    }

    students.push(student)
    res.status(201).json(student)
  })

  app.put('/students/:id', (req, res) => {
    const index = students.findIndex((student) => student.id === req.params.id)

    if (index === -1) {
      res.status(404).json({ error: 'Student not found' })
      return
    }

    if (!isValidStudentPayload(req.body)) {
      res.status(400).json({ error: 'Invalid student data' })
      return
    }

    students[index] = {
      ...students[index],
      name_en: req.body.name_en.trim(),
      age: Number(req.body.age),
      grade: Number(req.body.grade),
      status: req.body.status || students[index].status,
    }

    res.status(200).json(students[index])
  })

  app.delete('/students/:id', (req, res) => {
    const index = students.findIndex((student) => student.id === req.params.id)

    if (index === -1) {
      res.status(404).json({ error: 'Student not found' })
      return
    }

    const [deletedStudent] = students.splice(index, 1)
    res.status(200).json(deletedStudent)
  })

  return app
}
