// ARQUIVO PRINCIPAL - using ES6
import express from 'express';
import * as dotenv from 'dotenv';

// habilitr o servidor a ter variáveis de ambiente
dotenv.config();

// instanciar a variável que vai ficar responsável pelo servidor -> app
const app = express();

//configurar servidor para aceitar enviar receber rquivos json
app.use(express.json());

// bancoDados
const bancoDados = [];
// lab - rotas
//------------------------------------------
// postar - criar novo
app.post('/create', (req, res) => {
  const form = req.body;
  console.log(form, '<--request-body'); //req.body=> corpo da reqisição
  bancoDados.push(form);
  return res.status(201).json(bancoDados);
});
// ---------------------------------------
// GET
app.get('/all', (req, res) => {
  console.log('retornando todos o BD');

  return res.status(200).json(bancoDados);
  //return res.status(200).json({msg: "bemVindo"});
});
//------------------------------------------
//delete
app.delete('/delete/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(id, 'id descontruido');

  const deleteById = bancoDados.find((user) => {
    user.id === id;
  });
  const index = bancoDados.indexOf(deleteById);

  bancoDados.splice(index, 1);

  return res.status(200).json();
});

//listening port
app.listen(process.env.PORT, () => {
  console.log(`app runing at port http://localhost:${process.env.PORT}`);
}); //o site onde vamos deployar será 8080

// - objetos para testes
/* 
{ 
    "id": "e27ab2b1-cb91-4b18-ab90-5895cc9abd29", 
    "documentName": "Licitação Enap - Curso Web Dev", 
  "status": "Em andamento", 
    "details": "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack", 
    "dateInit": "28/11/2022", 
    "comments": ["Processo aberto", "Processo partiu para as partes assinarem", 
  "Processo agora está em análise final", "Processo já tem data final"], 
    "dateEnd": "16/12/2022", 
    "setor": "enap" 
  }, 
  { 
    "id": "ee5999d7-02e9-4b3d-a1ab-f067eef54173", 
    "documentName": "Licitação Compras - Notebooks", 
    "status": "Em andamento", 
    "details": "Processo de licitação para compra de notebooks", 
    "dateInit": "30/11/2022", 
    "comments": ["Processo em aberto e sem previsão de conclusão"], 
    "dateEnd": "", 
    "setor": "tre" 
  }, 
  , 
  { 
    "id": "ee5999d7-02e9-4b3d-a1ab-f067eef54173", 
    "documentName": "Licitação Compras - Ar Condicionado", 
    "status": "Finalizado", 
    "details": "Processo de licitação para compra de ar-condicionado", 
    "dateInit": "15/11/2022", 
    "comments": ["Processo em aberto", "Processo finalizado"], 
    "dateEnd": "25/11/2022", 
    "setor": "trj" 
  } 

   */
