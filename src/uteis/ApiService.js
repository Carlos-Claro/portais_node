import axios from 'axios';

const ApiService = {
  ListaImoveis: filtro => {
    return axios.get('http://localhost:5000/get_imoveis', filtro)
    .then(res => ApiService.TrataErros(res))
    .then(res => res.data);
  },
  TrataErros: res => {
    if ( res.status !== 200 ){
      throw Error(res.statusText);
    }
    return res;
  }
}
export default ApiService;
