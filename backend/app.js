const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = 3001

const User = require('./models/user');
//const DB = "mongodb+srv://shashank:shekhar@cluster0.grpit.mongodb.net/formdata?retryWrites=true&w=majority";

mongoose.connect('mongodb://localhost:27017/studentdata').then(() => {
  console.log('connection sucessfull')
}).catch((err) => console.log(err, 'no connection'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001']
}));
// save data
app.post('/test/form', (req, res) => {
  var new_user = new User(req.body)
  new_user.save(function (err, result) {
    if (err) {
      res.send({
        type: "error",
        msg: "Data not saved"
      })
    }
    else {
      res.send({
        type: "sucess",
        msg: "Data saved"
      })
    }
  })
})
// get data
app.get('/test/form', (req, res) => {
  User.find({}, function (err, result) {
    console.log("result, err", result, err)
    if (!err) {
      res.status(200).send({
        type: "success",
        msg: "Data fetched successfully.",
        data: result
      })
    }
    else {
      res.status(500).send({
        type: "error",
        msg: "Something went wrong."
      })
    }
  })
})

// get data by id
app.get('/test/form/:id', (req, res) => {
  User.find({ _id: req.params.id }, function (err, result) {
    if (!err) {
      res.status(200).send({
        type: "success",
        msg: "Data fetched successfully.",
        data: result
      })
    }
    else {
      res.status(500).send({
        type: "error",
        msg: "Something went wrong."
      })
    }
  })
})

// for delete data
app.delete('/test/form/:id', (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, result) {
    if (!err) {
      res.status(200).send({
        type: "success",
        msg: "Data deleted successfully.",
        data: result
      })
    }
    else {
      res.status(500).send({
        type: "error",
        msg: "Something went wrong."
      })
    }
  })
})
// for update data
app.patch('/test/form/:id', (req, res) => {
  console.log("update----", req.params, req.body)
  //let updateQuery = {
    //name: req.body.name
  //}
  User.findByIdAndUpdate({ _id: req.params.id },{...req.body},{new : true},
    function (err, result) {
      if (!err) {
        res.status(200).send({
          type: "success",
          msg: "Data updated successfully.",
          data: result
        })
      }
      else {
        res.status(500).send({
          type: "error",
          msg: "Something went wrong."
        })
      }
    })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
