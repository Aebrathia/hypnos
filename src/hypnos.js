import path from 'path'
import fastify from 'fastify'
import { capitalize } from './lib/index.js'

// TODO: Pagination
// TODO: Authentication
// TODO: PrivateResource
// TODO: API versioning /api/v2
// Suggestion : subfolder in /api as prefix
// TODO: Override specific paths

class Hypnos {
  constructor () {
    this.app = fastify()
  }

  async createRoutes () {
    const cwd = process.cwd()
    const resources = await import(path.join(cwd, 'api/index.js'))
    const models = await import(path.join(cwd, 'models/index.js'))

    Object.entries(resources).forEach(([name, Resource]) => {
      const resourceName = name.toLowerCase()
      const resource = new Resource(models[capitalize(resourceName)])
      this.app.post(`/api/v1/${resourceName}`, resource.create)
      this.app.get(`/api/v1/${resourceName}`, resource.getMany)
      this.app.get(`/api/v1/${resourceName}/:id`, resource.getOne)
      this.app.put(`/api/v1/${resourceName}/:id`, resource.update)
      this.app.delete(`/api/v1/${resourceName}/:id`, resource.delete)
    })
  }

  async listen (...args) {
    await this.createRoutes()
    return this.app.listen(...args)
  }
}

export default Hypnos
