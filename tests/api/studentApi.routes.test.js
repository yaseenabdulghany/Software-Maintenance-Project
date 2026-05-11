import request from 'supertest'
import { createStudentApiApp } from '../../src/api/studentApi'

describe('student API', () => {
  let app

  beforeEach(() => {
    app = createStudentApiApp()
  })

  test('GET /students returns the student list', async () => {
    const response = await request(app).get('/students')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
  })

  test('POST /students creates a new student', async () => {
    const response = await request(app).post('/students').send({
      name_en: 'API Student',
      age: 15,
      grade: 9,
    })

    expect(response.status).toBe(201)
    expect(response.body.name_en).toBe('API Student')
    expect(response.body.status).toBe('Active')

    const invalidResponse = await request(app).post('/students').send({
      name_en: '',
      age: 15,
      grade: 9,
    })

    expect(invalidResponse.status).toBe(400)
  })

  test('PUT /students/:id updates an existing student', async () => {
    const created = await request(app).post('/students').send({
      name_en: 'Before Update',
      age: 16,
      grade: 10,
      status: 'Active',
    })

    const updated = await request(app).put(`/students/${created.body.id}`).send({
      name_en: 'After Update',
      age: 17,
      grade: 11,
      status: 'Inactive',
    })

    expect(updated.status).toBe(200)
    expect(updated.body).toMatchObject({
      id: created.body.id,
      name_en: 'After Update',
      age: 17,
      grade: 11,
      status: 'Inactive',
    })

    const invalidResponse = await request(app).put(`/students/${created.body.id}`).send({
      name_en: '',
      age: 17,
      grade: 11,
    })

    expect(invalidResponse.status).toBe(400)

    const missingResponse = await request(app).put('/students/missing-id').send({
      name_en: 'Missing Student',
      age: 16,
      grade: 10,
      status: 'Active',
    })

    expect(missingResponse.status).toBe(404)
  })

  test('DELETE /students/:id removes an existing student', async () => {
    const created = await request(app).post('/students').send({
      name_en: 'Delete Student',
      age: 12,
      grade: 6,
      status: 'Active',
    })

    const deleted = await request(app).delete(`/students/${created.body.id}`)

    expect(deleted.status).toBe(200)
    expect(deleted.body.id).toBe(created.body.id)

    const missingResponse = await request(app).delete('/students/missing-id')

    expect(missingResponse.status).toBe(404)
  })
})
