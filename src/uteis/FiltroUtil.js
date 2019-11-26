import ImoveisTipos from './ImoveisTipos';

let itens = {
  tipo_negocio:[],
  tipos:[],
  bairros:[],
  quartos:[],
  vagas:[],
  cidade:[]
}
const equivalentes = {
  tipo_negocio:'tipo_negocio',
  tipos:'tipos_link',
  bairros:'bairros_link',
  quartos:'quartos',
  vagas:'vagas',
  cidade:'cidade_link'
};
let bairros = [];
const Bairros = data => {
  if ( typeof data === 'object' ){
    bairros = data.itens;
  }else {
    return bairros.filter(item => item.link === data );
  }
}

let cidade = [];
const Cidade = data => {
  if ( typeof data === 'object' ){
    cidade = data
  }else {
    return cidade.link === data ;
  }
}

const trataParametrosUrl = parametros => {
  parametros.map(param => {
    if ( param !== "imoveis" && param !== ""){
      const concat = param.indexOf('+') >= 0 ? param.split('+') : false;
      if ( concat ){
        concat.map(item => verificadorItemParametro(item));
      }else{
        verificadorItemParametro(param);
      }
    }
  });
}

const trataParametrosQuery = parametros => {
  Object.keys(parametros).map((key,value) => {
    if ( itens[key].length === 0 ){
      if ( parametros[key].indexOf(',') ){
        const param = parametros[key].split(',');
        param.map(p => itens[key].push(p))
      }else{
        itens[key].push(parametros[key]);
      }
    }else{
      if ( parametros[key].indexOf(',') >= 0 ){
        const param = parametros[key].split(',');
        param.map(p => {
          const temC = itens[key].filter(item => item === p);
          if ( temC.length === 0 ){
            itens[key].push(p);
          }
        })
      }else{
        if ( itens[key].map(item => item === parametros[key]) ){
        }else{
          itens[key].push(parametros[key]);
        }
      }
    }
  });
}

const verificadorItemParametro = item => {
  const isTipo = ImoveisTipos(item);
  if ( isTipo.length > 0 ){
    itens.tipos.push(item);
    let fechou = true;
  } else if ( (['venda','locacao','locacao_dia'].filter(t => t === item)).length > 0) {
    itens.tipo_negocio.push(item);
  } else if (Cidade(item)){
    itens.cidade.push(item)
  } else if (Bairros(item)){
    itens.bairros.push(item)
  }
}

const FiltroUtil = (inicial,data) => {
  if ( inicial ) {
    Bairros(data.bairros);
    Cidade(data.cidade);
    trataParametrosUrl(data.url.parametros);
    trataParametrosQuery(data.url.query);
    if ( itens.cidade.length === 0 ){
      itens.cidade.push(data.cidade.link);
    }
    console.log(itens);
    return itens;
  }else{
    let retorno = "";
    let count = 0;
    Object.keys(data).map((chave,value) => {
      console.log(chave,value,data[chave]);
      if ( data[chave].length > 0 ){
        retorno += count > 0 ? "&" : "";
        retorno += equivalentes[chave];
        retorno += "=";
        retorno += ( typeof data[chave] === 'array' ) ? data[chave].join() : data[chave];
        count++;
      }
    })
    console.log(retorno);
    return retorno;
  }


}
export default FiltroUtil;
