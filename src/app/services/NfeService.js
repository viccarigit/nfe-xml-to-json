import nfeParser from 'djf-nfe/src';

class NfeService {
  constructor(payload) {
    if (!payload) {
      throw Error('The xml body is required');
    }

    this.payload = payload;
    this.nfeObject = this.getObjectFrom(payload);
  }

  getObjectFrom(payload) {
    const xmlString = this.payload.buffer.toString('utf8');
    const nfeObject = nfeParser(xmlString);

    return nfeObject;
  }

  async parse() {

    const nfeObject = this.nfeObject;
    var obj = {};

    try {

      obj.principal = await this.getPrincipalFrom(nfeObject);
      obj.emitente = await this.getEmitentefrom(nfeObject);
      obj.destinatario = await this.getDestinatarioFrom(nfeObject);
      obj.itens = await this.getItensFrom(nfeObject);
      obj.totais = await this.getTotaisFrom(nfeObject);
      obj.totaisDosItens = await this.getTotaisDosItensFrom(obj.itens);

    } catch (error) {
      throw Error(error.message);
    }

    return obj;
  }

  getPrincipalFrom(nfeObject) {
    return new Promise((resolve, reject) => {
      if (!nfeObject) {
        reject({ message: 'The xml body is required' });
      }

      const principal = {
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
        inscricaoMunicipal: nfeObject.inscricaoMunicipal(),
        inscricaoEstadual: nfeObject.inscricaoEstadual(),
        inscricaoEstadualST: nfeObject.inscricaoEstadualST(),
        codigoRegimeTributario: nfeObject.codigoRegimeTributario(),
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
        nrItens: nfeObject.nrItens()
      };

      resolve(principal);
    });
  }

  getItensFrom(nfeObject) {
    return new Promise((resolve, reject) => {

      if (!nfeObject) {
        reject({ message: 'The xml body is required' });
      }

      var itens = [];

      for (var i = 1; i <= nfeObject.nrItens(); i++) { // trata os itens da nfe

        let item = nfeObject.item(i);

        let impostos = [];

        let icmsObject = item.imposto().icms(); // trata informacoes do icms do item

        if (icmsObject) {
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

        if (ipiObject) {
          let ipi = {
            cst: ipiObject.cst(),
            baseCalculo: ipiObject.baseCalculo(),
            valorIPI: ipiObject.valorIPI(),
            porcentagemIPI: ipiObject.porcentagemIPI()
          };

          impostos.push({ ipi });
        }

        let pisObject = item.imposto().pis();

        if (pisObject) {
          let pis = {
            cst: pisObject.cst(),
            baseCalculo: pisObject.baseCalculo(),
            valorPIS: pisObject.valorPIS(),
            porcentagemPIS: pisObject.porcentagemPIS()
          };

          impostos.push({ pis });
        }

        let cofinsObject = item.imposto().cofins();
        if (cofinsObject) {
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
      }

      resolve(itens);

    });
  }

  getEmitentefrom(nfeObject) {
    return new Promise((resolve, reject) => {

      if (!nfeObject) {
        reject({ message: 'The xml body is required' });
      }

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

      resolve(emitente);
    });
  }

  getDestinatarioFrom(nfeObject) {
    if (!nfeObject) {
      reject({ message: 'The xml body is required' });
    }

    return new Promise((resolve, reject) => {
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
      resolve(destinatario);
    });
  }

  getTotaisFrom(nfeObject) {
    return new Promise((resolve, reject) => {

      if (!nfeObject) {
        reject({ message: 'The xml body is required' });
      }

      const totalObject = nfeObject.total();

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

      resolve(totais);

    });
  }

  getTotaisDosItensFrom(itens) {
    return new Promise((resolve, reject) => {

      if (!itens || itens.lenght === 0) {
        reject({ message: 'The item list is required' });
      }

      const reducer = (totalizador, valor) => totalizador + Number(valor);

      const impostos = itens.map((item) => {
        return item.impostos;
      });

      var totalBaseIcms = 0;
      var totalBaseIcmsST = 0;
      var totalIcms = 0;
      var totalIcmsST = 0;

      impostos.forEach((imposto) => {
        const icms = imposto.filter((imp) => {
          return imp['icms'];
        });

        if (icms[0]) {
          totalBaseIcms = + Number(icms[0].icms.baseCalculo ? icms[0].icms.baseCalculo : '');
          totalBaseIcmsST = + Number(icms[0].icms.baseCalculoIcmsST ? icms[0].icms.baseCalculoIcmsST : '');
          totalIcms = + Number(icms[0].icms.valorIcms ? icms[0].icms.valorIcms : '');
          totalIcmsST = + Number(icms[0].icms.valorIcmsST ? icms[0].icms.valorIcmsST : '');
        }

      });

      const totaisDosItens = {
        totalBaseIcms,
        totalBaseIcmsST,
        totalIcms,
        totalIcmsST
      };

      resolve(totaisDosItens);
    });
  }
}

export default NfeService;
