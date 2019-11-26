
const ApiService = {
  ListaImoveis: filtro => {

    const requestInfo = {
      method:'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    console.log(filtro);
    return fetch(`http://localhost:5000/imoveismongo?${filtro}` , requestInfo)
    .then(res => ApiService.TrataErros(res))
    .then(data => data.json());
  },
  GetCidade: host => {
    return fetch(`http://localhost:5000/get_cidade/?dominio=${host}`)
    .then(res => ApiService.TrataErros(res) )
    .then(data => data.json());
  },
  TrataErros: res => {
    if ( ! res.ok ){
      console.log('ent');
      throw new Error('erro fetch');
    }
    return res;
  }
}
export default ApiService;
