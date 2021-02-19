const TabelaFilme = require("./TabelaFilme")
const CampoInvalido = require("../../erros/CampoInvalido")
const DadosNaoFornecidos = require("../../erros/DadosNaoFornecidos")

class Filme {
  constructor({ id, nome, descricao, ano_de_lancamento, dataCriacao, dataAtualizacao, versao }) {
    this.id = id
    this.nome = nome
    this.descricao = descricao
    this.ano_de_lancamento = ano_de_lancamento
    this.dataCriacao = dataCriacao
    this.dataAtualizacao = dataAtualizacao
    this.versao = versao
  }

  async criar() {
    this.validar()
    const resultado = await TabelaFilme.inserir({
      nome: this.nome,
      descricao: this.descricao,
      ano_de_lancamento: this.ano_de_lancamento
    })

    this.id = resultado.id
    this.dataCriacao = resultado.dataCriacao
    this.dataAtualizacao = resultado.dataAtualizacao
    this.versao = resultado.versao
  }

  async carregar() {
    const encontrado = await TabelaFilme.pegarPorId(this.id)
    this.nome = encontrado.nome
    this.descricao = encontrado.descricao
    this.ano_de_lancamento = encontrado.ano_de_lancamento
    this.dataCriacao = encontrado.dataCriacao
    this.dataAtualizacao = encontrado.dataAtualizacao
    this.versao = encontrado.versao
  }

  async atualizar() {
    await TabelaFilme.pegarPorId(this.id)
    const campos = ['nome', 'descricao', 'ano_de_lancamento']
    const dadosParaAtualizar = {}

    campos.forEach((campo) => {
      const valor = this[campo]

      if((typeof valor === 'string' || typeof valor === 'date') && valor.length > 0) {
        dadosParaAtualizar[campo] = valor
      }
    })

    if(Object.keys(dadosParaAtualizar).length === 0){
      throw new DadosNaoFornecidos()
    }

    await TabelaFilme.atualizar(this.id, dadosParaAtualizar)
  }

  remover() {
    return TabelaFilme.remover(this.id)
  }

  validar() {
    const campos = ['nome', 'descricao', 'ano_de_lancamento']

    campos.forEach(campo => {
      const valor = this[campo]

      if(typeof valor !== 'string' || typeof valor !== 'date' || valor.lenght === 0) {
        throw new CampoInvalido(campo)
      }
    })
  }
}

module.exports = Filme