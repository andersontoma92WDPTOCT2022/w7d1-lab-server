import express from 'express';
import ProcessoModel from '../model/processo.model.js';
//
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
processoRoute.post('/create-processo', async (req, res) => {
  try {
    const form = req.body;
    console.log('dentro do create processo');
    console.log(form, '<----req');
    //quer criar um documento dentro da sua collection -> .create()
    const newProcesso = await ProcessoModel.create(form);
    console.log(newProcesso, '<----newProcesso');
    return res.status(201).json(newProcesso);
  } catch (error) {
    console.log(error);
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//GET ALL USERS
processoRoute.get('/all-processos', async (req, res) => {
  try {
    // find vazio -> todas as ocorrencias
    // projections -> defini os campos que vão ser retornados
    // sort() -> ordenada o retorno dos dados
    // limit() -> define quantas ocorrencias serão retornadas
    const processos = await ProcessoModel.find({}, { __v: 0, updatedAt: 0 })
      .sort({
        age: 1,
      })
      .limit(100);

    return res.status(200).json(processos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//GET ONE USER
processoRoute.get('/oneProcesso/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const processo = await ProcessoModel.findById(id);

    if (!processo) {
      return res.status(400).json({ msg: ' processo não encontrado!' });
    }

    return res.status(200).json(processo);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

processoRoute.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProcesso = await ProcessoModel.findByIdAndDelete(id);

    if (!deletedProcesso) {
      return res.status(400).json({ msg: 'Processo não encontrado!' });
    }

    const processos = await ProcessoModel.find();

    return res.status(200).json(processos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

processoRoute.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProcesso = await ProcessoModel.findByIdAndUpdate(
      id,
      { ...req.body },
      //mongoose rodar o validador novamente, nopadrão so roda na criação, e mostrar o novo, senão, mostra o antigo:
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedProcesso);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
//------------------------------------------
//------------------------------------------
//listening port
//------------------------------------------
//------------------------------------------
export default processoRoute;
/* 
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

  //const index = bancoDados.indexOf(processById);
  //console.log(index, 'index do get');

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
  // const index = bancoDados.indexOf(processById);
  //  console.log(index, 'index do get'); 

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
  // const index = bancoDados.indexOf(processById);
    //console.log(index, 'index do get'); 

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
  // const index = bancoDados.indexOf(processById);
   //   console.log(index, 'index do get'); 

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
  // const index = bancoDados.indexOf(processById);
   // console.log(index, 'index do get'); 

  return res.status(200).json(processosBySetor);
});
// Rota: "/random"
processoRoute.get('/random', (req, res) => {
  console.log('dentro do "/random" ---------');
  let sorteado = Math.floor(bancoDados.length * Math.random());
  console.log(sorteado, 'sorteado');
  //
  // const index = bancoDados.indexOf(processById);
  //    console.log(index, 'index do get'); 

  return res.status(200).json(bancoDados[sorteado]);
});
 */
