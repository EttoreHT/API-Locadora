const roteador = require('express').Router()
const TabelaFilme = require('./TabelaFilme')
const Filme = require('./Filme')
const SerializadorFilme = require('../../Serializador').SerializadorFilme

roteador.get('/', async (requisicao, resposta) => {
  const resultados = await TabelaFilme.lista()
  resposta.status(200)
  const serializador = new SerializadorFilme(
    resposta.getHeader('Content-type')
  )
  resposta.send(
    serializador.serializar(resultados)
  )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
  try {
    const dadosRecebidos = requisicao.body
    const filme = new Filme(dadosRecebidos)
    await filme.criar()
    resposta.status(201)
    const serializador = new SerializadorFilme(
      resposta.getHeader('Content-type')
    )
    resposta.send(
      serializador.serializar(filme)
    )
  } catch (erro) {
    proximo(erro)
  }

})

roteador.get('/:idFilme', async (requisicao, resposta, proximo) => {

  try {
    const id = requisicao.params.idFilme
    const filme = new Filme({
      id: id
    })
    await filme.carregar()
    resposta.status(200)
    const serializador = new SerializadorFilme(
      resposta.getHeader('Content-type'),
      ['ano_de_lancamento', 'dataCriacao', 'dataAtualizacao', 'versao']
    )
    resposta.send(
      serializador.serializar(filme)
    )
  } catch (erro) {
    proximo(erro)
  }
})

roteador.put('/:idFilme', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idFilme
    const dadosRecebidos = requisicao.body
    const dados = Object.assign({}, dadosRecebidos, { id: id })
    const filme = new Filme(dados)
    await filme.atualizar()
    resposta.status(204)
    resposta.end()
  } catch (erro) {
    proximo(erro)
  }
})

roteador.delete('/:idFilme', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idFilme
    const filme = new Filme({ id: id })
    await filme.carregar()
    await filme.remover()
    resposta.status(204)
    resposta.end()
  } catch (erro) {
    proximo(erro)
  }
})

module.exports = roteador