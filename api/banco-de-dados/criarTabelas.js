const { log } = require('console');
const ModeloTabela = require('../rotas/filmes/ModeloTabelaFilme');

ModeloTabela
  .sync()
  .then(() => {
    console.log('Tabela filmes criada com sucesso');
  })
  .catch(console.log)