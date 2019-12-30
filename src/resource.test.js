import Resource from './resource.js'

class ModelMock {
  static async create (user) {
    return { id: 2, ...user }
  }

  static async findAll () {
    return [{ id: 1, firstName: 'Achille' }]
  }

  static async find (id) {
    return { id, firstName: 'Achille' }
  }

  static async update (user) {
    return { id: 1, firstName: 'Achille', ...user }
  }

  static async delete (id) {
    return id
  }
}

describe('Resource', () => {
  const resource = new Resource(ModelMock)

  describe('getOne', () => {
    it('returns the requested item', async () => {
      const req = { params: { id: 1 } }
      expect(await resource.getOne(req)).toEqual({ id: 1, firstName: 'Achille' })
    })
  })

  describe('getMany', () => {
    it('returns all items', async () => {
      expect(await resource.getMany()).toEqual([{ id: 1, firstName: 'Achille' }])
    })
  })

  describe('update', () => {
    it('returns the updated item', async () => {
      const req = { body: { id: 1, firstName: 'Achille', weakness: 'heel' } }
      expect(await resource.update(req)).toEqual({ id: 1, firstName: 'Achille', weakness: 'heel' })
    })
  })

  describe('create', () => {
    it('returns the created item', async () => {
      const req = { body: { firstName: 'Hector' } }
      expect(await resource.create(req)).toEqual({ id: 2, firstName: 'Hector' })
    })
  })

  describe('delete', () => {
    it('returns the deleted id', async () => {
      const req = { params: { id: 1 } }
      expect(await resource.delete(req)).toBe(1)
    })
  })
})
