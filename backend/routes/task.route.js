const express = require('express');
const app = express();
const taskRoute = express.Router();

let TaskModel = require('../model/Task');

// Add Task 
taskRoute.route('/create-task').post((req, res, next) => {
  TaskModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all tasks
taskRoute.route('/').get((req, res) => {
  TaskModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get a task
taskRoute.route('/get-task/:id').get((req, res) => {
  TaskModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update a task
taskRoute.route('/update-task/:id').put((req, res, next) => {
  TaskModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Task aggiornata correttamente!')
    }
  })
})

// Delete task
taskRoute.route('/delete-task/:id').delete((req, res, next) => {
  TaskModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = taskRoute;