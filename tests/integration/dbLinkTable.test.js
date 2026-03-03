const request = require('supertest')
const app = require('/src/app')

const db = require('/src/databasePersistence/db')

beforeAll(async () => {
  await db.migrate.latest()
})

afterEach(async () => {
  // clean slate between tests
  await db('links').truncate()
})

afterAll(async () => {
  await db('links').truncate()
  await db.destroy()
})

describe('POST /api/links', () => {
  it('inserts a link and returns 201', async () => {
    const res = await request(app)
      .post('/api/links')
      .send({ title: 'Fb4', link: 'fb.com', tag: 'dev' })
    expect(res.status).toBe(201)
    expect(res.body.title).toBe('Fb4')
    expect(res.body.link).toBe('https://fb.com/')// also tests that URL normalization
  })

  it('rejects a title that is too short', async () => {
    const res = await request(app)
      .post('/api/links')
      .send({ title: 'Hi', link: 'banana.com', tag: 'dev' })

    expect(res.status).toBe(400)
  })

  it('rejects duplicate link', async () => {
    await request(app)
      .post('/api/links')
      .send({ title: 'One', link: 'dup.com' })

    const res = await request(app)
      .post('/api/links')
      .send({ title: 'Two', link: 'dup.com' })

    expect(res.status).toBe(500)
  })

  it('sets vote default to 0', async () => {
  await request(app)
    .post('/api/links')
    .send({ title: 'VoteTest', link: 'vote.com' })

  const row = await db('links').first()
  expect(row.vote).toBe(0)
})
})

describe('GET /api/links', () => {
  it('returns all inserted links', async () => {
    await request(app)
      .post('/api/links')
      .send({ title: 'test3', link: 'test3.com', tag: 'dev' })


    const res = await request(app).get('/api/links')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].title).toBe('test3')
  })
})
