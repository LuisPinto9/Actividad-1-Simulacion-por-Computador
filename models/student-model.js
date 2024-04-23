const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaStudent = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  Identification: {
    type: Number,
    required: true,
    unique: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  documentType: {
    type: Number,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  celphone: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
//   topic: { 
//     type: Schema.Types.ObjectId,
//     ref: "topic"
//   },
 

});

module.exports = mongoose.model("student", SchemaStudent);