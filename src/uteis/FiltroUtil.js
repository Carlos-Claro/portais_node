import ImoveisTipos from './ImoveisTipos';

let itens = {
  tipo_negocio:[],
  tipos:[],
  bairros:[],
  quartos:[],
  vagas:[],
  cidade:[],
  areaMin:[],
  areaMax:[],
  valorMin:[],
  valorMax:[],
  coluna:[],
}
const equivalentes = {
  tipo_negocio:'tipo_negocio',
  tipos:'imoveis_tipos_link',
  bairros:'bairros_link',
  quartos:'quartos',
  vagas:'garagens',
  cidade:'cidades_link',
  areaMin:'area-min',
  areaMax:'area-max',
  valorMin:'valor-min',
  valorMax:'valor-max',
  coluna:'coluna',
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

const Titulo = () => {
  let retorno = 'Imóveis ';
  let url = 'imoveis-';
  if ( itens.tipos.length > 0 ){
    let contadorTipo = 0;
    retorno = "";
    url = "";
    itens.tipos.map(item => {
      retorno += contadorTipo > 0 ? ", " : "";
      url += contadorTipo > 0 ? "+" : "";
      const tipo = ImoveisTipos(item);
      retorno += tipo[0].plural;
      url += tipo[0].link;
      contadorTipo++;
      return false;
    });
    retorno += " ";
    url += "-";
  }
  if ( itens.tipo_negocio.length > 0 ){
    switch (itens.tipo_negocio[0]) {
      case "venda":
        retorno += "à venda ";
        break;
      case "locacao":
        retorno += "para alugar ";
        break;
      case "locacao_dia":
        retorno += "para temporada ";
        break;
      default:
      retorno += "";
        break;
    }
    url += itens.tipo_negocio[0] + "-";
  }
  let bairroUrl = '';
  if ( itens.bairros.length > 0 ){
    let contadorBairro = 0;
    retorno += "no ";
    itens.bairros.map(item => {
      retorno += contadorBairro > 0 ? ", " : "";
      const bairro = Bairros(item);
      retorno += bairro[0].nome.toLowerCase();
      retorno += " "
      contadorBairro++;
      return false;
    });
    bairroUrl = "-";
    bairroUrl += itens.bairros.join('+');

  }
  if ( itens.cidade !== "" ){
    retorno += "em ";
    retorno += cidade.nome;
    retorno += " - ";
    retorno += cidade.uf;
    url += itens.cidade;
  }
  let complementoUrl = [];
  if ( itens.quartos.length > 0 ){
    complementoUrl.push("quartos=" + itens.quartos.join());
    retorno += " ";
    retorno += itens.quartos.join(' ou ') + " quartos "
  }
  if ( itens.vagas.length > 0 ){
    complementoUrl.push("vagas=" + itens.vagas.join());
    retorno += " ";
    retorno += itens.vagas.join(' ou ') + " vagas de garagem "
  }
  let retornoUrl = "/" + url + bairroUrl;
  retornoUrl += (complementoUrl !== "" ? "?"+complementoUrl.join('&') : '');
  return {retorno, retornoUrl};
}

const Bread = () => {
  let retorno = [];
  let complementoTexto = '';
  let complementoLink = '';
  if ( itens.cidade.length > 0 ){
    complementoTexto = ` em ${cidade.nome}`
    complementoLink = `-${cidade.link}`
    retorno.push({titulo:`Imóveis em ${cidade.nome}`,link:`imoveis-${cidade.link}`});
  }
  if (itens.tipo_negocio.length > 0){
    switch (itens.tipo_negocio[0]) {
      case "venda":
        complementoTexto = ` à venda ${complementoTexto}`;
        break;
      case "locacao":
      complementoTexto = ` para alugar ${complementoTexto}`;
        break;
      case "locacao_dia":
      complementoTexto = ` para temporada ${complementoTexto}`;
        break;
        default:
    }
    complementoLink = `-${itens.tipo_negocio[0]}${complementoLink}`;
  }
  if ( itens.tipos.length > 0 ){
    const tipos = itens.tipos.map(item => {
                                          const i = ImoveisTipos(item);
                                          return {titulo:`${i[0].plural} ${complementoTexto}`,link:`${i[0].link}${complementoLink}`}
                                            });
    var a;
    for (a = 0; a < tipos.length; a++){
      retorno.push(tipos[a]);
    }
  }
  return retorno;
}

const FiltroUtil = (inicial,data) => {
  if ( inicial ) {
    switch (inicial) {
      case true:
        Bairros(data.bairros);
        Cidade(data.cidade);
        trataParametrosUrl(data.url.parametros);
        trataParametrosQuery(data.url.query);
        if ( itens.cidade.length === 0 ){
          itens.cidade.push(data.cidade.link);
        }
        if ( itens.coluna.length === 0 ){
          itens.coluna.push('ordem');
        }
        return itens;
        case 'atualiza':
        itens = data.filtro;
        break;
        case 'titulo':
        return Titulo();
        case 'breadcrumbs':
        return Bread();
      default:

    }
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
