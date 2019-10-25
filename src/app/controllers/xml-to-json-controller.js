const nfe = require('djf-nfe/src');

module.exports = {
  index(req, res){
    return res.json({message: 'xmlToJson is ok'});
  },

  async parse(req, res){

    const string = req.file.buffer.toString('utf8');

    const nfeObject = nfe(string);

    if(!nfeObject.nrItens() || nfeObject.nrItens() < 1){
      return res.status(400).json({message: 'Quantidade de itens invalida'});
    }

    var itens = [];

    for(var i = 1; i <= nfeObject.nrItens(); i++){

      let item = nfeObject.item(i);

      itens.push({
        codigo: item.codigo(),
        descricao: item.descricao(),
        ean: item.ean(),
        ncm: item.ncm(),
        cest: item.cest(),
        cfop: item.cfop(),
        unidadeComercial: item.unidadeComercial(),
        valorUnitario: item.valorUnitario(),
        unidadeTributavel: item.unidadeTributavel(),
        eanTributavel: item.eanTributavel(),
        quantidadeTributavel: item.quantidadeTributavel(),
        quantidadeComercial: item.quantidadeComercial(), 
        valorUnitarioTributavel: item.valorUnitarioTributavel(),
        valorOutrasDespezas: item.valorOutrasDespesas(), 
        indicadorTotal: item.indicadorTotal(), 
        codigoANP: item.codigoANP(), 
        informacoesProduto: item.informacoesProduto(),           
      });
    }

    const parsed = {
      chave: nfeObject.chave(),
      dataHoraRecebimento: nfeObject.dataHoraRecebimento(),
      protocolo: nfeObject.protocolo(),
      tipoAmbiente: nfeObject.tipoAmbiente(),
      codigoStatusResposta: nfeObject.codigoStatusResposta(),
      dataEmissao: nfeObject.dataEmissao(),
      nrNota: nfeObject.nrNota(),
      naturezaOperacao: nfeObject.naturezaOperacao(),
      tipoOperacao: nfeObject.tipoOperacao(),
      operacao: nfeObject.informacoesNFe().operacao(),
      nome: nfeObject.informacoesNFe().nome(),
      fantasia: nfeObject.informacoesNFe().fantasia(),
      emitente: nfeObject.informacoesNFe().emitente(),
      destinatario: nfeObject.destinatario(),
      uf: nfeObject.uf(),
      cep: nfeObject.cep(),
      endereco: nfeObject.endereco(),
      logradouro: nfeObject.logradouro(),
      numero: nfeObject.numero(),
      bairro: nfeObject.bairro(),
      complemento: nfeObject.complemento(),
      municipio: nfeObject.municipio(),
      codigoMunicipio: nfeObject.codigoMunicipio(),
      pais: nfeObject.pais(),
      codigoPais: nfeObject.codigoPais(),
      telefone: nfeObject.telefone(),
      cnpj: nfeObject.cnpj(),
      email: nfeObject.email(),
      cpf: nfeObject.cpf(),
      inscricaoNacional: nfeObject.inscricaoNacional(),
      inscricaoMunicipal:nfeObject.inscricaoMunicipal(),
      inscricaoEstadual: nfeObject.inscricaoEstadual(),
      inscricaoEstadualST:nfeObject.inscricaoEstadualST(),
      codigoRegimeTributario:nfeObject.codigoRegimeTributario(),
      informacoesProtocolo: nfeObject.informacoesProtocolo(),
      informacoesNFe: nfeObject.informacoesNFe(),
      identificacaoNFe: nfeObject.identificacaoNFe(),
      informacoesComplementares: nfeObject.informacoesComplementares(),
      informacoesFisco: nfeObject.informacoesFisco(),
      nrObservacoes: nfeObject.nrObservacoes(),
      observacao: nfeObject.observacao(),
      texto: nfeObject.texto(),
      campoObservacao: nfeObject.campoObservacao(),
      serie: nfeObject.serie(),
      modelo: nfeObject.modelo(),
      nrItens: nfeObject.nrItens(),
      itens: itens,

    }

    return res.json(parsed);
  }

}