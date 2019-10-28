import nfeParser from 'djf-nfe/src';

class NfeService{
  constructor(payload){
    if(!payload){
      throw Error('The xml body is required');
    }

    this.payload = payload;
  }

  async parse(){

    const xmlString = this.payload.buffer.toString('utf8');
    const nfeObject = nfeParser(xmlString);

    try{
      const obj = await this.getItensFrom(nfeObject);
    }catch(error){
      throw Error(error.message);
    }

    return obj;
  }

  getItensFrom(nfeObject){
    return new Promise((resolve, reject) =>{

      reject({message: 'The xml body is required'});

      if(!nfeObject){
        reject({message: 'The xml body is required'});
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
      }

      resolve(itens);

    });
  }
}

export default NfeService;
