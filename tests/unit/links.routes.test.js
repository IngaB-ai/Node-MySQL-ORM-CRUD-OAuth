const request = require('supertest')
const express = require('express')

jest.mock('/src/services/linkService', () => ({
  normalizeUrl: jest.fn(),
  extractTags: jest.fn()
}))


jest.mock('/src/databasePersistence/models/Link', () => ({
  query: jest.fn()
}))

const Link = require('/src/databasePersistence/models/Link')
const { normalizeUrl, extractTags } = require('/src/services/linkService')


const linksRouter = require('../../src/routes/linksRoutes')

// Minimal app setup mirroring app.js
const setupApp = () => {
  const app = express()
  app.use(express.json())
  require('/src/routes/linksRoutes')(app)
  app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message })
})
  return app
}

describe('GET /api/links', () => {
  it('returns links from database', async () => {
    const fakeLinks =[{ id: 1, title: 'Test Google', link: 'https://google.com', tag: 'search' }]
    Link.query.mockReturnValue({
      select: jest.fn().mockResolvedValue(fakeLinks)
    })

    const app = setupApp()

    const res = await request(app).get('/api/links')

    expect(res.status).toBe(200)
    expect(res.body).toEqual(fakeLinks)
  }),
  it('calls next with error on db failure', async () => {
    Link.query.mockReturnValue({ select: jest.fn().mockRejectedValue(new Error('DB down')) })

    const app = setupApp()

    const res = await request(app).get('/api/links')

    expect(res.status).toBe(500)
  })
})

describe('POST /api/links', () => {
  it('normalizes URL and inserts into db', async () => {
    normalizeUrl.mockReturnValue('https://normalized.com')

    const insertMock = jest.fn().mockResolvedValue({ id: 1 })

    Link.query.mockReturnValue({
      insert: insertMock
    })

    const app = setupApp()

    const res = await request(app)
      .post('/api/links')
      .send({ title: 'Test', link: 'test.com', tag: 'dev' })

    expect(normalizeUrl).toHaveBeenCalledWith('test.com')
    expect(insertMock).toHaveBeenCalledWith({
      title: 'Test',
      link: 'https://normalized.com',
      tag: 'dev'
    })

    expect(res.status).toBe(201)
  })
})

describe('DELETE /api/links/:id', () => {
  it('deletes link by id', async () => {
    const whereMock = jest.fn().mockResolvedValue()

    Link.query.mockReturnValue({
      delete: jest.fn().mockReturnValue({
        where: whereMock
      })
    })

    const app = setupApp()

    const res = await request(app).delete('/api/links/5')

    expect(whereMock).toHaveBeenCalledWith({ id: '5' })
    expect(res.text).toBe('Deleted successfully.')
  })
})