const { Op } = require('sequelize');
const { nomeColuna, defineNomeModel } = require('../utilidades/utilidades');
const db = require('../models');

const tdsLivros = async () => {
  const listaLivros = await db.Livros.findAll();
  const filtroDados = listaLivros.map((el) => el.dataValues);
  return { status: 200, resposta: filtroDados };
};

const teste = (e, string) => {
  return e.dataValues[string]?.dataValues.nome;
}
const arr = [
  'autor',
  'editora',
  'colecao',
  'categoria',
];
const procuraLivro = async (query) => {
  const entradas = Object.entries(query);
  const filtraCampoNome = entradas.filter((valor) => valor[0] !== 'nome');
  // console.log('filtraCampoNome', filtraCampoNome);
  const test = arr.map((e) => {
    let filt = filtraCampoNome.find((el) => el[0] === e);
    let where = filt ? { nome: { [Op.like]: `%${filt[1]}%` } } : {};  
    const retorno = {
      model: db[defineNomeModel(e)],
      as: e,
      where,
      attributes: ['nome'],
    }
    return retorno;
  });
  console.log('test', test);
//   const criaOperadoresParaBuscarLivros = filtraCampoNome.map((operador) => {
//     const model = a
//     return ({
//       model: db[defineNomeModel(operador[0])],
//       as: operador[0],
//       where: { nome: { [Op.like]: `%${operador[1]}%` } },
//       attributes: ['nome'],
//     })
// });
  // console.log('criaOperadoresParaBuscarLivros', criaOperadoresParaBuscarLivros);
  
  const operadorWhere = query.nome ? { nome: { [Op.like]: `%${query.nome}%` } } : {}; 

  // const livros = await db.Livros.findAll({ where: operadorWhere, include: criaOperadoresParaBuscarLivros });
  const livros = await db.Livros.findAll({ where: operadorWhere, include: test });

  // const writersArray = promiseWritersResolved.map(
  //   (writer) => writer[0].dataValues
  // );
  // through sequelize
  const livrosFormatados =  livros.map((e) => {
    // const { id, nome, idAutor, idEditora, idColecao, idCategoria, tenho, lido, nota } = e.dataValues;
    const { idAutor, idEditora, idColecao, idCategoria, ...outros} = e.dataValues;
    const livroEditado = {
     ...outros,
      autor: teste(e, 'autor') || idAutor,
      editora: teste(e, 'editora') || idEditora,
      colecao: teste(e, 'colecao') || idColecao,
      categoria: teste(e, 'categoria') || idCategoria,
    };    
    return livroEditado;
  });
  return { status: 200, resposta: livrosFormatados };
};

const livroPorId = async (id) => {
  const livro = await db.Livros.findByPk(id);
  if (!livro) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  return { status: 200, resposta: livro.dataValues };
};

const atlizLivro = async (id, obj) => {
  const livroValido = await db.Livros.findByPk(id);
  if (!livroValido) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  const [atualizado] = await db.Livros.update({ ...obj }, {
    where: {
      idLivro: id
    }
  });
  if (atualizado) {
    const livro = await livroPorId(id);
    return { status: 200, resposta: livro.resposta };
  }

  return { status: 200, resposta: { mensagem: 'Nenhuma informação para ser atualizada' } };
};

const criaLivro = async (obj) => {
  const { nomeLivro } = obj;
  const livro = await db.Livros.findAll({ where: { nomeLivro } });
  if (livro.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Livro já cadastrado no banco de dados.'}};
  }
  const infoLivroCriado = await db.Livros.create(obj);
  console.log('infoLivrocriado', infoLivroCriado);
  return { status: 201, resposta: infoLivroCriado };
};

const delLivro = async (id) => {
  const livroValido = await db.Livros.findByPk(id);
  if (!livroValido) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  await db.Livros.destroy({ where: { idLivro: id } });
  return { status: 200, resposta: { mensagem: 'Livro deletado com sucesso.' } };
};

const atlizLido = async (id, nota) => {
  const livro = await db.Livros.findByPk(id);
  if (!livro) {
    return { status: 404, resposta: { mensageErro: 'Livro não encontrado.' } };
  }

  const [atualizado] = await db.Livros.update({ lido: 1, nota }, { where : { id_livro: id } });

  if(!atualizado) {
    return { status: 200, resposta: { mensageErro: 'Nada para ser atualizado.' } };
  }

  const livroAtualizado = await db.Livros.findByPk(id);
  return { status: 200, resposta: livroAtualizado.dataValues };};

module.exports = {
  tdsLivros,
  livroPorId,
  procuraLivro,
  atlizLivro,
  atlizLido,
  criaLivro,
  delLivro,
};



// const procuraLivro = async (query) => {
//   console.log('query', query);
//   const entradas = Object.entries(query);
//   const [valoresBusca] = await Promise.all(entradas.map((valor) => {
//     const [key, value] = valor;
//     const coluna = nomeColuna(key);
//     if (coluna === 'nome') {
//       return  value ;
//     }
//     const model = defineNomeModel(coluna);
//     const id = db[model].findAll({ where: { nome: {
//       [Op.like]: `%${value}%`
//     }}
//     });
//     return id;
//   }));
//   console.log('valoresBusca', valoresBusca);
//   // const operadorer = valoresBusca.map((valor, index) => {
//   //   const coluna = nomeColuna(entradas[index][0]);
//   //   if (typeof valor === 'string' || valor === null) {
//   //     return { [coluna]: { [Op.like]: `%${valor}%` } };
//   //   }
//   //   const valorId = valor.dataValues.id;
//   //   return { [coluna]: valorId };
//   // });
//   // console.log('operadorer', operadorer);
  
//   // const livros = await db.Livros.findAll({ where: { 
//   //   [Op.and]: operadorer
//   // }
//   // });
//   // console.log('livros', livros);
//   // if (!livros) {
//   //   return { status: 404, resposta: { mensagem: 'Livros não encontrados.' } };
//   // }
//   // const filtroDados = livros.map((el) => el.dataValues);
//   // return { status: 200, resposta: filtroDados };
//   return { status: 200, resposta: 'oi' };
// };




// ({
  //   model: db[defineNomeModel(operador[0])],
  //   as: operador[0],
  //   where: { nome: { [Op.like]: `%${operador[1]}%` } },
  //   attributes: ['nome'],
  // })