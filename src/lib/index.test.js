import { capitalize } from './index.js'

describe('capitalize', () => {
  it('Capitalizes the first letter and ignores the rest', () => {
    expect(capitalize('zeus')).toBe('Zeus')
  })
})
