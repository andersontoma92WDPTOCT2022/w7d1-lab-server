import { Schema, model } from 'mongoose';

const processoSchema = new Schema({
  documentName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 60,
    lowercase: true,
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
  comments: [{ type: String }],
  dateEnd: {
    type: String,
    required: false,
  },
  setor: {
    type: String,
    trim: true,
  },
});
//Processo = nome do collection, Copass, vai passar para o minusculo a primeira letra e por um s no final (plural) -> collection 'processos'
const ProcessoModel = model('Processo', processoSchema);

export default ProcessoModel;
