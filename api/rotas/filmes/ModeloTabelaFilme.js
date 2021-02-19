const Sequelize = require('sequelize');
const instancia = require('../../banco-de-dados');

const colunas = {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT('medium'),
    allowNull: false
  },
  ano_de_lancamento: {
    type: Sequelize.DATE,
    allowNull: false
  }
}

const opcoes = {
  freezeTableName: true,
  tableName: 'Filmes',
  createdAt: 'dataCriacao',
  updatedAt: 'dataAtualizacao',
  version: 'versao'
}

module.exports = instancia.define('filme', colunas, opcoes)