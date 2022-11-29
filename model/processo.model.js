import { Schema, model } from 'mongoose';

const processoSchema = new Schema({
  documentName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    trim: true,
    required: false,
    maxlength: 200,
  },
  dateInit: {
    type: String,
    required: false,
  },
  comments: {
    type: Array,
    trim: true,
    required: false,
  },
  dateEnd: {
    type: String,
    required: false,
  },
  setor: {
    type: String,
    trim: true,
    length: 3,
  },
});
export default processoSchema;
