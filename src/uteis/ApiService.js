/*
http://imoveis.powempresas.com/

endereco: "http://localhost:5000/",
endereco: "http://imoveis.powempresas.com/",
*/
const ApiService = {
  endereco: "http://imoveis.powempresas.com/",
  ListaImoveis: filtro => {

    const requestInfo = {
      method:'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(`${ApiService.endereco}imoveismongo?${filtro}` , requestInfo)
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
    return fetch(`${ApiService.endereco}imoveismongo/${_id}` , requestInfo)
    .then(res => ApiService.TrataErros(res))
    .then(data => data.json());
  },
  GetCidade: host => {
    return fetch(`${ApiService.endereco}get_cidade/?dominio=${host}`)
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
