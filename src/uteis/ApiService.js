
const ApiService = {
  ListaImoveis: filtro => {

    const requestInfo = {
      method:'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(`http://imoveis.powempresas.com/imoveismongo?${filtro}` , requestInfo)
    .then(res => ApiService.TrataErros(res))
    .then(data => data.json());
  },
  Imovel: _id => {

    const requestInfo = {
      method:'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(`http://imoveis.powempresas.com/imoveismongo/${_id}` , requestInfo)
    .then(res => ApiService.TrataErros(res))
    .then(data => data.json());
  },
  GetCidade: host => {
    return fetch(`http://imoveis.powempresas.com/get_cidade/?dominio=${host}`)
    .then(res => ApiService.TrataErros(res) )
    .then(data => data.json());
  },
  TrataErros: res => {
    if ( ! res.ok ){
      throw new Error('erro fetch');
    }
    return res;
  }
}
export default ApiService;
