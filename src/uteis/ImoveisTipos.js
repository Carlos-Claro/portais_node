const ImoveisTipos = tipo => {
  const tipos =  [
  	{
  		"id" : 1,
  		"nome" : "Apartamento",
  		"busca" : 1,
  		"seo" : 1,
  		"tipo_area" : "c",
  		"link" : "apartamento",
  		"plural" : "Apartamentos",
  		"english" : "Apartment"
  	},
  	{
  		"id" : 2,
  		"nome" : "Casa",
  		"busca" : 1,
  		"seo" : 1,
  		"tipo_area" : "c",
  		"link" : "casa",
  		"plural" : "Casas",
  		"english" : "House"
  	},
  	{
  		"id" : 3,
  		"nome" : "Lote / Terreno",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "t",
  		"link" : "lote_terreno",
  		"plural" : "Lotes e Terrenos",
  		"english" : "Land Lot"
  	},
  	{
  		"id" : 4,
  		"nome" : "Área",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "t",
  		"link" : "area",
  		"plural" : "Áreas",
  		"english" : "Area"
  	},
  	{
  		"id" : 5,
  		"nome" : "Sítio e Chácara",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "t",
  		"link" : "sitio_chacara",
  		"plural" : "Sitios e Chácaras",
  		"english" : "Ranches"
  	},
  	{
  		"id" : 6,
  		"nome" : "Fazenda",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "t",
  		"link" : "fazenda",
  		"plural" : "Fazendas",
  		"english" : "Farm"
  	},
  	{
  		"id" : 8,
  		"nome" : "Loja",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "loja",
  		"plural" : "Lojas",
  		"english" : "Retail"
  	},
  	{
  		"id" : 9,
  		"nome" : "Conjunto Comercial",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "conjunto_comercial",
  		"plural" : "Conjuntos Comerciais",
  		"english" : "Office"
  	},
  	{
  		"id" : 10,
  		"nome" : "Sobrado",
  		"busca" : 1,
  		"seo" : 1,
  		"tipo_area" : "c",
  		"link" : "sobrado",
  		"plural" : "Sobrados",
  		"english" : "Town home"
  	},
  	{
  		"id" : 11,
  		"nome" : "Barracão / Galpão",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "barracao_galpao",
  		"plural" : "Barracões e Galpões",
  		"english" : "Storage"
  	},
  	{
  		"id" : 12,
  		"nome" : "Kitinete",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "kitinete",
  		"plural" : "Kitinetes",
  		"english" : "Studio"
  	},
  	{
  		"id" : 13,
  		"nome" : "Garagem",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "garagem",
  		"plural" : "Garagens",
  		"english" : "Garage"
  	},
  	{
  		"id" : 14,
  		"nome" : "Outro",
  		"busca" : 0,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "outro",
  		"plural" : "Outros",
  		"english" : "Other"
  	},
  	{
  		"id" : 15,
  		"nome" : "Loft",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "loft",
  		"plural" : "Lofts",
  		"english" : "Lofts"
  	},
  	{
  		"id" : 16,
  		"nome" : "Prédio",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "predio",
  		"plural" : "Prédios",
  		"english" : "Building"
  	},
  	{
  		"id" : 17,
  		"nome" : "Hotel",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "hotel",
  		"plural" : "Hoteis",
  		"english" : "Hotels"
  	},
  	{
  		"id" : 18,
  		"nome" : "Motel",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "motel",
  		"plural" : "Moteis",
  		"english" : "Hotels"
  	},
  	{
  		"id" : 19,
  		"nome" : "Haras",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "t",
  		"link" : "haras",
  		"plural" : "Haras",
  		"english" : "HorseFarm"
  	},
  	{
  		"id" : 20,
  		"nome" : "Negócio/ Empresa",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "negocio_empresa",
  		"plural" : "Negócios e Empresas",
  		"english" : "Business"
  	},
  	{
  		"id" : 21,
  		"nome" : "Flat",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "flat",
  		"plural" : "Flats",
  		"english" : "Flat"
  	},
  	{
  		"id" : 22,
  		"nome" : "Ponto Comercial",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "ponto_comercial",
  		"plural" : "Pontos Comerciais",
  		"english" : "Office"
  	},
  	{
  		"id" : 23,
  		"nome" : "Andar",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "andar",
  		"plural" : "Andares",
  		"english" : "Floor"
  	},
  	{
  		"id" : 24,
  		"nome" : "Salão",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "salao",
  		"plural" : "Salões",
  		"english" : "Salon"
  	},
  	{
  		"id" : 25,
  		"nome" : "Pousada",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "pousada",
  		"plural" : "Pousadas",
  		"english" : "Hostel"
  	},
  	{
  		"id" : 26,
  		"nome" : "Quarto",
  		"busca" : 1,
  		"seo" : 0,
  		"tipo_area" : "c",
  		"link" : "quarto",
  		"plural" : "Quartos",
  		"english" : "Bedroom"
  	}
  ];

  if ( tipo !== undefined ){
    return tipos.filter(t => t.link === tipo);
  }else{
    return tipos;
  }

}
export default ImoveisTipos;
