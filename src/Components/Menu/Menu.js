import React, {Component} from 'react';

class Menu extends Component {

  constructor(){
    super()
    this.state = {
                  itens:[
                          {
                            'titulo':'Vender',
                            'link':'venda',
                            'itens':[
                                      {'link':'apartamento','titulo':'Apartamento'},
                                      {'link':'casa','titulo':'Casa'},
                                      {'link':'terreno','titulo':'Terreno'},
                                    ],

                            },
                          {
                            'titulo':'Alugar',
                            'link':'alugar',
                            'itens':[
                                      {'link':'apartamento','titulo':'Apartamento'},
                                      {'link':'casa','titulo':'Casa'},
                                      {'link':'terreno','titulo':'Terreno'},

                                    ],
                            },
                        ]
                }
  }
  render(){
    this.state.itens.map((item) => {
      console.log(item);
    })
    return(
      <nav>
        <ul>
          <li>
            <a href="#">Imoveis</a>
            <ul>{
                this.state.itens.map((item) => {
                  return(
                    <li>
                      <a href={item.link}>{item.titulo}</a>
                      <ul>
                        {
                          item.itens.map((sub) => {
                            return(
                              <li><a href={`${item.link}-${sub.link}`}>{sub.titulo}</a></li>
                            )
                          })
                        }
                      </ul>
                    </li>
                  )
                })
              }
            </ul>
          </li>
          <li>
            <a href="#">Sobre</a>
          </li>
        </ul>
      </nav>
    )

  }
}
export default Menu;
