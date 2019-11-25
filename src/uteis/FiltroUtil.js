import ImoveisTipos from './ImoveisTipos';

const itens = {
              tipo_negocio:[],
              tipos:[],
              bairros:[],
              quartos:[],

              }

const trataParametros = parametros => {
  parametros.map(param => {
    if ( param !== "imoveis"){
      const concat = param.indexOf('+') >= 0 ? param.split('+') : false;
      if ( concat ){
        concat.map(item => verificadorItem(item));
      }else{
        verificadorItem(param);
      }
    }
  });

  return parametros;
}

const verificadorItem = item => {
  const isTipo = ImoveisTipos(item);
  if ( isTipo ){
    itens.tipos.push(item);
    let fechou = true;
  } else if (['venda','locacao','locacao_dia'].filter(t => t === item)) {
    itens.tipo_negocio.push(item);
  }

}

const FiltroUtil = (inicial,data) => {
  if ( inicial ) {
    const itens = trataParametros(data.url.parametros);

  }


}
export default FiltroUtil;
