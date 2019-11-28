import ImoveisTipos from './ImoveisTipos';

let itens = {
  tipo_negocio:[],
  tipos:[],
  bairros:[],
  quartos:[],
  vagas:[],
  cidade:[],
  area:[],
  preco:[],
}
const equivalentes = {
  tipo_negocio:'tipo_negocio',
  tipos:'imoveis_tipos_link',
  bairros:'bairros_link',
  quartos:'quartos',
  vagas:'garagens',
  cidade:'cidades_link',
  area:'area',
  preco:'valor',
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
    return true;
  });
}

const verificadorItemParametro = item => {
  const isTipo = ImoveisTipos(item);
  if ( isTipo.length > 0 ){
    itens.tipos.push(item);
  } else if ( (['venda','locacao','locacao_dia'].filter(t => t === item)).length > 0) {
    itens.tipo_negocio.push(item);
  } else if (Cidade(item)){
    itens.cidade.push(item)
  } else if (Bairros(item)){
    itens.bairros.push(item)
  }
}

const trataParametrosQuery = parametros => {
  Object.keys(parametros).map((key,value) => {
    if ( itens[key].length === 0 ){
      if ( parametros[key].indexOf(',') ){
        const param = parametros[key].split(',');
        param.map(p => itens[key].push(parseInt(p)))
      }else{
        itens[key].push(parseInt(parametros[key]));
      }
    }else{
      if ( parametros[key].indexOf(',') >= 0 ){
        const param = parametros[key].split(',');
        param.map(p => {
          const temC = itens[key].filter(item => item === p);
          if ( temC.length === 0 ){
            itens[key].push(parseInt(p));
          }
          return true;
        })
      }else{
        if ( itens[key].map(item => item === parametros[key]) ){
        }else{
          itens[key].push(parseInt(parametros[key]));
        }
      }
    }
    return true;
  });
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
    return itens;
  }else{
    let retorno = "";
    let count = 0;
    Object.keys(data).map((chave,value) => {
      if ( data[chave].length > 0 ){
        retorno += count > 0 ? "&" : "";
        retorno += equivalentes[chave];
        retorno += "=";
        retorno += ( typeof data[chave] === 'object' ) ? data[chave].join() : data[chave];
        count++;
      }
      return false;
    });
    return retorno;
  }
}
export default FiltroUtil;
