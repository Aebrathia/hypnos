/*
https://marmelab.com/react-admin/DataProviders.html
getList GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]&filter={title:'bar'}
getOne GET http://my.api.url/posts/123
getMany GET http://my.api.url/posts?filter={id:[123,456,789]}
getManyReference GET http://my.api.url/posts?filter={author_id:345}
create POST http://my.api.url/posts/123
update PUT http://my.api.url/posts/123
updateMany Multiple calls to PUT http://my.api.url/posts/123
delete DELETE http://my.api.url/posts/123
deteleMany Multiple calls to DELETE http://my.api.url/posts/123
*/

class Resource {
  constructor (Model) {
    this.Model = Model
  }

  getOne = async (req, res) => {
    return this.Model.find(req.params.id)
  }

  getMany = async (req, res) => {
    return this.Model.findAll()
  }

  update = async (req, res) => {
    return this.Model.update(req.body)
  }

  create = async (req, res) => {
    return this.Model.create(req.body)
  }

  delete = async (req, res) => {
    return this.Model.delete(req.params.id)
  }
}

export default Resource
