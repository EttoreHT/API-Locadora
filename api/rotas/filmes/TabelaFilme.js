const Modelo = require('./ModeloTabelaFilme')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
  lista() {
    return Modelo.findAll({ raw: true })
  },

  inserir(filme) {
    return Modelo.create(filme)
  },

  async pegarPorId(id) {
    const encontrado = await Modelo.findOne({
      where: {
        id: id
      }
    })

    if (!encontrado) {
      throw new NaoEncontrado()
    }

    return encontrado
  },

  atualizar(id, dadosParaAtualizar) {
    return Modelo.update(
      dadosParaAtualizar,
      {
        where: { id: id }
      }
    )
  },

  remover(id) {
    return Modelo.destroy({
      where: {
        id: id
      }
    })
  }
}