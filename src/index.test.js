import * as index from './index'
import Hypnos from './hypnos'
import Resource from './resource'

describe('index', () => {
  it('exports all public api', () => {
    expect(index.Hypnos).toBe(Hypnos)
    expect(index.Resource).toBe(Resource)
  })
})
