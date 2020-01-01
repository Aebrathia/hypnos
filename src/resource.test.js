import Resource from './resource.js'
import Users from '../__mocks__/users'

describe('Resource', () => {
  const resource = new Resource(Users)

  describe('getOne', () => {
    it('returns the requested item', async () => {
      expect.assertions(2)
      const req = { params: { id: 1 } }
      expect(await resource.getOne(req)).toEqual({ id: 1, firstName: 'Achille', lastName: 'Peleus' })
      expect(Users.find).toHaveBeenCalledWith(1)
    })
  })

  describe('getMany', () => {
    it('returns all items', async () => {
      expect.assertions(2)
      expect(await resource.getMany()).toEqual([{ id: 1, firstName: 'Achille', lastName: 'Peleus' }])
      expect(Users.findAll).toHaveBeenCalledTimes(1)
    })
  })

  describe('update', () => {
    it('returns the updated item', async () => {
      expect.assertions(2)
      const body = { firstName: 'Achilleus', lastName: 'Peleus' }
      const req = { params: { id: 1 }, body }
      expect(await resource.update(req)).toEqual({ id: 1, firstName: 'Achilleus', lastName: 'Peleus' })
      expect(Users.update).toHaveBeenCalledWith({ id: 1, ...body })
    })
  })

  describe('create', () => {
    it('returns the created item', async () => {
      const body = { firstName: 'Hector', lastName: 'Troy' }
      const req = { body }
      expect(await resource.create(req)).toEqual({ id: 2, firstName: 'Hector', lastName: 'Troy' })
      expect(Users.create).toHaveBeenCalledWith(body)
    })
  })

  describe('delete', () => {
    it('returns the deleted id', async () => {
      const req = { params: { id: 1 } }
      expect(await resource.delete(req)).toBe(1)
      expect(Users.delete).toHaveBeenCalledWith(1)
    })
  })
})
