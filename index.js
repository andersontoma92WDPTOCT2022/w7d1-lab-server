// ARQUIVO PRINCIPAL - using ES6
import express from 'express';
import * as dotenv from 'dotenv';
//gerador de id
//import { uuid } from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';
//teste uuid
import processoRoute from './routes/processos.routes.js';
//
console.log('*************************');

let myuuid = uuidv4();
console.log('Your UUID is: ' + myuuid);

console.log('*************************');
// habilitr o servidor a ter variáveis de ambiente
dotenv.config();

// instanciar a variável que vai ficar responsável pelo servidor -> app
const app = express();

//configurar servidor para aceitar enviar receber rquivos json
app.use(express.json());

//
app.use('/processo', processoRoute);

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
