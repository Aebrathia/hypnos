const posts = {
  1: { id: 1, title: 'Iliad', description: 'Ancient Greek epic poem' }
}
let id = 2

const Posts = {
  create: jest.fn(async ({ title, description }) => {
    const post = { id, title, description }
    posts[id] = post
    id++
    return post
  }),
  findAll: jest.fn(async () => {
    return Object.values(posts)
  }),
  find: jest.fn(async (id) => {
    return posts[id]
  }),
  update: jest.fn(async (post) => {
    posts[post.id] = { ...posts[post.id], ...post }
    return post
  }),
  delete: jest.fn(async (id) => {
    delete posts[id]
    return id
  })
}

export default Posts
