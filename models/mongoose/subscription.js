const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.objectid
const SubSchema = new Schema({
  userId:
    {
      type: ObjectId, require: true,
      unique: true, index: 1
    },
  url: {type: String,  require: true,}
})
const SubModel = mongoose.model('sub', SubSchema)


async function insert(user) {
  return  SubModel.create(user)
}

async function getOneById(id) {
  return await SubModel.findOne({userId: id})
}

module.exports ={
  insert,getOneById,getOneByName,list
}
