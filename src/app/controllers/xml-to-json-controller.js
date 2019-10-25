const nfe = require('djf-nfe/src');

module.exports = {
  index(req, res){
    return res.json({message: 'xmlToJson is ok'});
  },

  async parse(req, res){

    try {

      const string = req.file.buffer.toString('utf8');

      const nfeObject = nfe(string);
  
      if(!nfeObject.nrItens() || nfeObject.nrItens() < 1){
        return res.status(400).json({message: 'Quantidade de itens invalida'});
      }
  
      var itens = [];
  
      for(var i = 1; i <= nfeObject.nrItens(); i++){ // trata os itens da nfe
  
        let item = nfeObject.item(i);

        let impostos = [];

        let icmsObject = item.imposto().icms(); // trata informacoes do icms do item

        if(icmsObject){
          let icms = {
            cst: icmsObject.cst(),
            baseCalculo: icmsObject.baseCalculo(), 
            porcentagemIcms: icmsObject.porcetagemIcms(), 
            porcentagemIcmsST: icmsObject.porcetagemIcmsST(), 
            valorIcms: icmsObject.valorIcms(), 
            baseCalculoIcmsST: icmsObject.baseCalculoIcmsST(), 
            valorIcmsST: icmsObject.valorIcmsST(), 
            origem: icmsObject.origem(),
            csosn: icmsObject.csosn(), 
            porcentagemMVAST: icmsObject.porcentagemMVAST(), 
            modalidadeBCST: icmsObject.modalidadeBCST(),
            valorFCP: icmsObject.valorFCP(), 
            valorFCPST: icmsObject.valorFCPST(), 
            valorFCPSTRetido: icmsObject.valorFCPSTRetido(), 
            porcentagemFCP: icmsObject.porcentagemFCP(), 
            porcentagemFCPST: icmsObject.porcentagemFCPST(), 
            porcentagemFCPSTRetido: icmsObject.porcentagemFCPSTRetido(), 
            baseCalculoFCP: icmsObject.baseCalculoFCP(), 
            baseCalculoFCPST: icmsObject.baseCalculoFCPST(), 
            baseCalculoFCPSTRetido: icmsObject.baseCalculoFCPSTRetido(), 
          };

          impostos.push({ icms });
         }


        let ipiObject = item.imposto().ipi();

        if(ipiObject){
          let ipi = {
            cst: ipiObject.cst(),
            baseCalculo: ipiObject.baseCalculo(), 
            valorIPI: ipiObject.valorIPI(), 
            porcentagemIPI: ipiObject.porcentagemIPI()
          };

          impostos.push({ ipi });
         }

        let pisObject = item.imposto().pis();

        if(pisObject){
          let pis = {
            cst: pisObject.cst(), 
            baseCalculo: pisObject.baseCalculo(), 
            valorPIS: pisObject.valorPIS(), 
            porcentagemPIS: pisObject.porcentagemPIS() 
          };

          impostos.push({ pis });
        }

        let cofinsObject = item.imposto().cofins();
        if(cofinsObject){
          let cofins = {
            cst: cofinsObject.cst(), 
            baseCaculo: cofinsObject.baseCalculo(), 
            porcentagemCOFINS: cofinsObject.porcentagemCOFINS(), 
            valorCOFINS: cofinsObject.valorCOFINS() 
          };

          impostos.push({ cofins });
        }

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
          impostos: impostos      
        });
      };

      const totalObject = nfeObject.total();
      const totalIcmsObject = nfeObject.totalIcmsNota();
      const totais = {
        baseCalculoIcms: totalObject.baseCalculoIcms(), 
        valorIcms: totalObject.valorIcms(),
        valorIcmsDesonerado: totalObject.valorIcmsDesonerado(), 
        baseCalculoIcmsST: totalObject.baseCalculoIcmsST(), 
        baseCalculoIcmsSTRetido: totalObject.baseCalculoIcmsSTRetido(), 
        valorIcmsST: totalObject.valorIcmsST(), 
        valorIcmsSTRetido: totalObject.valorIcmsSTRetido(), 
        valorProdutos: totalObject.valorProdutos(), 
        valorFrete: totalObject.valorFrete(), 
        valorSeguro: totalObject.valorSeguro(), 
        valorDesconto: totalObject.valorDesconto(), 
        valorII: totalObject.valorII(), 
        valorIPI: totalObject.valorIPI(), 
        valorPIS: totalObject.valorPIS(), 
        valorCOFINS: totalObject.valorCOFINS(),
        valorOutrasDespesas: totalObject.valorOutrasDespesas(), 
        valorNota: totalObject.valorNota(), 
        valorTotalTributos: totalObject.valorTotalTributos()
      };

      const emitente = {
        nome: nfeObject.emitente().nome(), 
        fantasia: nfeObject.emitente().fantasia(),
        email: nfeObject.emitente().email(), 
        cpf: nfeObject.emitente().cpf(),
        cnpj: nfeObject.emitente().cnpj(), 
        inscricaoNacional: nfeObject.emitente().inscricaoNacional(), 
        inscricaoMunicipal: nfeObject.emitente().inscricaoMunicipal(), 
        inscricaoEstadual: nfeObject.emitente().inscricaoEstadual(),
        inscricaoEstadualST: nfeObject.emitente().inscricaoEstadualST(),
        codigoRegimeTributario: nfeObject.emitente().codigoRegimeTributario(), 
      }

      const destinatario = {
        nome: nfeObject.destinatario().nome(),
        fantasia: nfeObject.destinatario().fantasia(), 
        email: nfeObject.destinatario().email(), 
        cpf: nfeObject.destinatario().cpf(), 
        cnpj: nfeObject.destinatario().cnpj(), 
        inscricaoNacional: nfeObject.destinatario().inscricaoNacional(), 
        inscricaoMunicipal: nfeObject.destinatario().inscricaoMunicipal(), 
        inscricaoEstadual: nfeObject.destinatario().inscricaoEstadual(), 
        inscricaoEstadualST: nfeObject.destinatario().inscricaoEstadualST()
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
        operacao: nfeObject.operacao(),
        nome: nfeObject.nome(),
        fantasia: nfeObject.fantasia(),
        emitente: nfeObject.emitente(),
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
        emitente: emitente,
        destinatario: destinatario,
        totais: totais
      }
  
      return res.json(parsed);
      
    } catch (error) {
      return res.status(500).json({message: `Ocorreu um erro ao realizar processar o xml: ${error.toString()}`});
    }

  }

}