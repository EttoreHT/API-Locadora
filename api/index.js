const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

app.use(bodyParser.json());

app.use((requisicao, resposta, proximo) => {
  let formatoRequisitado = requisicao.header('Accept')

  if(formatoRequisitado === '*/*') {
    formatoRequisitado = 'application/json'
  }

  if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
    resposta.sendStatus(406)
    resposta.end()
    return
  }

  resposta.setHeader('Content-type', formatoRequisitado)
  proximo()
})

const roteador = require('./rotas/filmes');
app.use('/api/filmes', roteador);

app.use((erro, requisicao, resposta, proximo) => {
  let status = 500
  
  if (erro instanceof NaoEncontrado) {
    status = 404
  } 

  if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos){
    status = 400
  }

  if(erro instanceof ValorNaoSuportado) {
    status = 406
  }

  const serializador = new SerializadorErro(
    resposta.getHeader('Content-type')
  )
  resposta.status(status)
  resposta.send(
    serializador.serializar({
      messagem: erro.message,
      id: erro.idErro
    })
  )
})

app.listen(config.get("api.porta"), () => {
  console.log('Api rodando na porta 4000');
})