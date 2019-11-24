import Parse from 'url-parse';

const urlParse = () => {
  const url = Parse();
  console.log(url.pathname);
  url.set('hostname','www.icuritiba.com.br/imoveis')
  url.set('port','80')
  let retorno = {};
  retorno.hostname = url.hostname.replace('www.','').split('/')[0].replace('.com','').replace('.br','');
  retorno.parametros = url.pathname.split('/')[1].split('-');
  return retorno;
}
export default urlParse;
