import Hypnos from './hypnos.js'

// We need to prefix variables used in jest.mock with "mock"
// Otherwise Jest throws "Invalid variable access"
import MockResource from './resource'
import MockUsersModel from '../__mocks__/users.js'
import MockPostsModel from '../__mocks__/posts.js'

jest.mock(`${process.cwd()}/api/index.js`, () => ({
  Users: class Users extends MockResource {},
  Posts: class Posts extends MockResource {}
}), { virtual: true })

jest.mock(`${process.cwd()}/models/index.js`, () => ({
  Users: MockUsersModel,
  Posts: MockPostsModel
}), { virtual: true })

describe('Hypnos', () => {
  const hypnos = new Hypnos()

  beforeAll(async () => {
    await hypnos.createRoutes()
  })

  afterAll(() => {
    hypnos.app.close()
  })

  describe('for each Resource in the /api directory', () => {
    it('creates GET /api/v1/:resource', async () => {
      expect.assertions(2)
      const res1 = await hypnos.app.inject({
        method: 'GET',
        url: '/api/v1/users'
      })
      const res2 = await hypnos.app.inject({
        method: 'GET',
        url: '/api/v1/posts'
      })
      expect(JSON.parse(res1.payload)).toEqual([{ id: 1, firstName: 'Achille', lastName: 'Peleus' }])
      expect(JSON.parse(res2.payload)).toEqual([{ id: 1, title: 'Iliad', description: 'Ancient Greek epic poem' }])
    })

    it('creates GET /api/v1/:resource/:id', async () => {
      expect.assertions(2)
      const res1 = await hypnos.app.inject({
        method: 'GET',
        url: '/api/v1/users/1'
      })
      const res2 = await hypnos.app.inject({
        method: 'GET',
        url: '/api/v1/posts/1'
      })
      expect(JSON.parse(res1.payload)).toEqual({ id: 1, firstName: 'Achille', lastName: 'Peleus' })
      expect(JSON.parse(res2.payload)).toEqual({ id: 1, title: 'Iliad', description: 'Ancient Greek epic poem' })
    })

    it('creates POST /api/v1/:resource', async () => {
      expect.assertions(2)
      const res1 = await hypnos.app.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload: { firstName: 'Hector', lastName: 'Troy' }
      })
      const res2 = await hypnos.app.inject({
        method: 'POST',
        url: '/api/v1/posts',
        payload: { title: 'Odyssey', description: 'Major ancient Greek epic poems' }
      })
      expect(JSON.parse(res1.payload)).toEqual({ id: 2, firstName: 'Hector', lastName: 'Troy' })
      expect(JSON.parse(res2.payload)).toEqual({ id: 2, title: 'Odyssey', description: 'Major ancient Greek epic poems' })
    })
    it('creates PUT /api/v1/:resource/:id', async () => {
      expect.assertions(2)
      const res1 = await hypnos.app.inject({
        method: 'PUT',
        url: '/api/v1/users/1',
        payload: { firstName: 'Achilleus', lastName: 'Peleus' }
      })
      const res2 = await hypnos.app.inject({
        method: 'PUT',
        url: '/api/v1/posts/1',
        payload: { title: 'Trojan War', description: 'Ancient Greek epic poem' }
      })
      expect(JSON.parse(res1.payload)).toEqual({ id: 1, firstName: 'Achilleus', lastName: 'Peleus' })
      expect(JSON.parse(res2.payload)).toEqual({ id: 1, title: 'Trojan War', description: 'Ancient Greek epic poem' })
    })

    it('creates DELETE /api/v1/:resource/:id', async () => {
      expect.assertions(2)
      const res1 = await hypnos.app.inject({
        method: 'DELETE',
        url: '/api/v1/users/1'
      })
      const res2 = await hypnos.app.inject({
        method: 'DELETE',
        url: '/api/v1/posts/1'
      })
      expect(JSON.parse(res1.payload)).toBe(1)
      expect(JSON.parse(res2.payload)).toBe(1)
    })
  })
})
