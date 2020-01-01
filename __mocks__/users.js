const users = {
  1: { id: 1, firstName: 'Achille', lastName: 'Peleus' }
}
let id = 2

const Users = {
  create: jest.fn(async ({ firstName, lastName }) => {
    const user = { id, firstName, lastName }
    users[id] = user
    id++
    return user
  }),
  findAll: jest.fn(async () => {
    return Object.values(users)
  }),
  find: jest.fn(async (id) => {
    return users[id]
  }),
  update: jest.fn(async (user) => {
    users[user.id] = { ...users[user.id], ...user }
    return user
  }),
  delete: jest.fn(async (id) => {
    delete users[id]
    return id
  })
}

export default Users
