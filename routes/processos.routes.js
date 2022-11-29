import express from 'express';

const processoRoute = express.Router();
//

// bancoDados
const bancoDados = [];
// lab - rotas
//------------------------------------------
//------------------------------------------
// -- iteração 01
//------------------------------------------
//------------------------------------------

// postar - criar novo
processoRoute.post('/create', (req, res) => {
  const form = req.body;
  console.log(form, '<--request-body'); //req.body=> corpo da reqisição
  bancoDados.push(form);
  return res.status(201).json(bancoDados);
});
// ---------------------------------------
// GET
processoRoute.get('/all', (req, res) => {
  console.log('retornando todos o BD');

  return res.status(200).json(bancoDados);
  //return res.status(200).json({msg: "bemVindo"});
});
//------------------------------------------
//delete
processoRoute.delete('/delete/:id', (req, res) => {
  console.log('dentro do delete----------------');
  console.log(req.params);
  const { id } = req.params;
  console.log(id, 'id descontruido');

  const deleteById = bancoDados.find((user) => {
    user.id === id;
  });
  console.log(deleteById, 'deleteByID');
  const index = bancoDados.indexOf(deleteById);

  bancoDados.splice(index, 1);

  return res.status(200).json();
});
//------------------------------------------
//------------------------------------------
// -- iteração 02 - TREINANDO ROTAS
//------------------------------------------
//------------------------------------------
//Acessar um processo pelo ID GET /process/:id
processoRoute.get('/process/:id', (req, res) => {
  console.log('dentro do /process/:id ---------');
  console.log(req.params);
  const { id } = req.params;
  console.log(id, 'id descontruido');

  const processById = bancoDados.find((processo) => {
    return processo.id === id;
  });
  console.log(processById, 'processByID a retornar GET');
  //
  /* const index = bancoDados.indexOf(processById);
  console.log(index, 'index do get'); */

  return res.status(200).json(processById);
});
//
//Editar processo PUT /edit/:id
processoRoute.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const processById = bancoDados.find((processo) => processo.id === id);
  const index = bancoDados.indexOf(processById);
  bancoDados[index] = {
    ...processById,
    ...req.body, //por último quem quero substituir
  };
  return res.status(200).json(bancoDados[index]);
});
//
// Adicionar um comentário a array de comentários PUT /addComment/:id
//
processoRoute.put('/addComment/:id', (req, res) => {
  console.log('******** dentro do PUT /addComment/:id *********');
  console.log(req.params);
  console.log(req.body.comment, '<--req.body');
  const { id } = req.params;

  const processById = bancoDados.find((processo) => {
    return processo.id === id;
  });
  processById.comments.push(req.body.comment);
  console.log(processById, 'processByID a retornar GET');
  //
  /* const index = bancoDados.indexOf(processById);
    console.log(index, 'index do get'); */

  return res.status(200).json(processById);
});
//
//Acessar todos processos em andamento GET /status/open
//
processoRoute.get('/status/open', (req, res) => {
  console.log('dentro do /status/open ---------');
  const estado = 'Em andamento';
  const arrProcessById = bancoDados.filter((processo) => {
    return processo.status === estado;
  });
  console.log(arrProcessById, 'arrProcessById a retornar GET em andamento');
  //
  /* const index = bancoDados.indexOf(processById);
    console.log(index, 'index do get'); */

  return res.status(200).json(arrProcessById);
});
//
//Acessar todos processos finalizados GET /status/close
//
processoRoute.get('/status/close', (req, res) => {
  console.log('dentro do /status/open ---------');
  const estado = 'Finalizado';
  const arrProcessById = bancoDados.filter((processo) => {
    return processo.status === estado;
  });
  console.log(arrProcessById, 'arrProcessById a retornar GET em andamento');
  //
  /* const index = bancoDados.indexOf(processById);
      console.log(index, 'index do get'); */

  return res.status(200).json(arrProcessById);
});
//
// bonus
//Rota: "/setor/:nomeSetor"
processoRoute.get('/setor/:nomeSetor', (req, res) => {
  console.log('dentro do /setor/:nomeSetor ---------');
  console.log(req.params);
  const { nomeSetor } = req.params;
  console.log(nomeSetor, ' Setor descontruido');

  const processosBySetor = bancoDados.filter((processo) => {
    return processo.setor === nomeSetor;
  });
  console.log(processosBySetor, 'processosBySetor a retornar GET');
  //
  /* const index = bancoDados.indexOf(processById);
    console.log(index, 'index do get'); */

  return res.status(200).json(processosBySetor);
});
// Rota: "/random"
processoRoute.get('/random', (req, res) => {
  console.log('dentro do "/random" ---------');
  let sorteado = Math.floor(bancoDados.length * Math.random());
  console.log(sorteado, 'sorteado');
  //
  /* const index = bancoDados.indexOf(processById);
      console.log(index, 'index do get'); */

  return res.status(200).json(bancoDados[sorteado]);
});
//------------------------------------------
//------------------------------------------
//listening port
//------------------------------------------
//------------------------------------------
export default processoRoute;
