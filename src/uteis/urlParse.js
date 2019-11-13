import Parse from 'url-parse';

const urlParse = () => {
  const url = Parse();
  //url.set('hostname','www.icuritiba.com')
  url.set('hostname','www.icuritiba.com.br/imoveis')
  url.set('port','80')
  console.log(url.toString());
  return url.hostname.replace('www.','').split('/')[0].replace('.com','').replace('.br','');

}
export default urlParse;
