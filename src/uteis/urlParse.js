import Parse from 'url-parse';
import queryString from 'query-string';

const urlParse = location => {
  const url = Parse();
  url.set('hostname','www.icuritiba.com.br/imoveis')
  url.set('port','80')
  let retorno = {};
  retorno.hostname = url.hostname.replace('www.','').split('/')[0].replace('.com','').replace('.br','');
  retorno.parametros = url.pathname.split('/')[1].split('-');
  retorno.query = queryString.parse(location.search);
  return retorno;
}
export default urlParse;
