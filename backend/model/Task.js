const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
  task_name: {
    type: String
  },
  task_data: {
    type: String
  }
}, {
  collection: 'tasks'
})

module.exports = mongoose.model('Task', Task)