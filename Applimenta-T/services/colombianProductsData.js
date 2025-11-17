// services/colombianProductsData.js
/*
  Versión robusta de datos locales con platos típicos colombianos.
  Se usan enlaces de 'recetasgratis.net' (ltmcdn.com)
  para asegurar la máxima compatibilidad y relevancia.
  (Sintaxis 100% corregida)
*/
export const productosColombianosLocales = [
  {
    id: 'ajiaco-1',
    product_name: 'Ajiaco Santafereño',
    brands: 'Plato Típico',
    nutriments: {
      'energy-kcal_100g': 91,
      'proteins_100g': 5,
      'carbohydrates_100g': 10,
      'fat_100g': 3,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/7/4/1/ajiaco_santafeponoono_31147_600.jpg',
    code: '999000000021',
    categories_tags: ['sopa', 'pollo', 'papa', 'ajiaco', 'colombiano', 'bogota'],
    description: 'Sopa tradicional de Bogotá con pollo, tres tipos de papa, maíz y guascas.'
  },
  {
    id: 'bandeja-paisa-1',
    product_name: 'Bandeja Paisa',
    brands: 'Plato Típico',
    nutriments: {
      'energy-kcal_100g': 190,
      'proteins_100g': 8,
      'carbohydrates_100g': 15,
      'fat_100g': 11,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/5/0/0/bandeja_paisa_colombiana_31005_600.jpg',
    code: '999000000022',
    categories_tags: ['bandeja paisa', 'frijoles', 'carne', 'colombiano', 'antioquia'],
    description: 'Plato insignia de Antioquia con frijoles, arroz, chicharrón, carne molida, aguacate y huevo.'
  },
  {
    id: 'sancocho-1',
    product_name: 'Sancocho Trifásico',
    brands: 'Plato Típico',
    nutriments: {
      'energy-kcal_100g': 85,
      'proteins_100g': 6,
      'carbohydrates_100g': 9,
      'fat_100g': 2.5,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/1/5/9/sancocho_colombiano_31951_600.jpg',
    code: '999000000023',
    categories_tags: ['sopa', 'carne', 'yuca', 'sancocho', 'colombiano', 'valle'],
    description: 'Sopa robusta con yuca, plátano, papa y tres tipos de carne (res, pollo, cerdo).'
  },
  {
    id: 'arepa-huevo-1',
    product_name: 'Arepa de Huevo',
    brands: 'Plato Típico',
    nutriments: {
      'energy-kcal_100g': 210,
      'proteins_100g': 5,
      'carbohydrates_100g': 28,
      'fat_100g': 8,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/8/5/2/arepas_colombianas_rellenas_de_huevo_frito_72258_600.jpg',
    code: '999000000024',
    categories_tags: ['arepa', 'huevo', 'frito', 'colombiano', 'caribe'],
    description: 'Arepa de maíz frita rellena con un huevo entero, típica de la costa Caribe.'
  },
  {
    id: 'tamal-tolimense-1',
    product_name: 'Tamal Tolimense',
    brands: 'Plato Típico',
    nutriments: {
      'energy-kcal_100g': 140,
      'proteins_100g': 5,
      'carbohydrates_100g': 18,
      'fat_100g': 6,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/2/5/4/tamales_tolimenses_31452_600.jpg',
    code: '999000000025',
    categories_tags: ['tamal', 'maiz', 'pollo', 'cerdo', 'colombiano', 'tolima'],
    description: 'Masa de maíz rellena de pollo, cerdo y verduras, envuelta en hoja de plátano.'
  },
  {
    id: 'lechona-tolimense-1',
    product_name: 'Lechona Tolimense',
    brands: 'Plato Típico',
    nutriments: {
      'energy-kcal_100g': 250,
      'proteins_100g': 15,
      'carbohydrates_100g': 20,
      'fat_100g': 12,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/4/4/1/lechona_tolimense_31144_600.jpg',
    code: '999000000026',
    categories_tags: ['lechona', 'cerdo', 'arroz', 'colombiano', 'tolima'],
    description: 'Cerdo entero relleno de arroz, arveja y carne de cerdo, cocido lentamente.'
  },
  {
    id: 'changua-1',
    product_name: 'Changua',
    brands: 'Plato Típico',
    nutriments: {
      'energy-kcal_100g': 70,
      'proteins_100g': 5,
      'carbohydrates_100g': 4,
      'fat_100g': 3.5,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/5/6/0/changua_colombiana_31065_600.jpg',
    code: '999000000027',
    categories_tags: ['sopa', 'leche', 'huevo', 'changua', 'colombiano', 'bogota'],
    description: 'Caldo de leche y huevo con cilantro y calado, desayuno típico de Bogotá.'
  },
  {
    id: 'patacon-1',
    product_name: 'Patacón Pisao',
    brands: 'Acompañante Típico',
    nutriments: {
      'energy-kcal_100g': 310,
      'proteins_100g': 1.5,
      'carbohydrates_100g': 45,
      'fat_100g': 14,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/1/6/1/patacones_rellenos_colombianos_71161_600.jpg',
    code: '999000000028',
    categories_tags: ['platano', 'frito', 'patacon', 'colombiano'],
    description: 'Plátano verde frito y aplastado, usualmente con hogao o queso.'
  },
  {
    id: 'empanada-1',
    product_name: 'Empanada Colombiana',
    brands: 'Plato Típico',
    nutriments: {
      'energy-kcal_100g': 250,
      'proteins_100g': 4,
      'carbohydrates_100g': 30,
      'fat_100g': 12,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/1/7/8/empanadas_colombianas_31871_600.jpg',
    code: '999000000029',
    categories_tags: ['empanada', 'maiz', 'carne', 'frito', 'colombiano'],
    description: 'Masa de maíz frita rellena de papa y carne, servida con ají.'
  },
  {
    id: 'arroz-coco-1',
    product_name: 'Arroz con Coco',
    brands: 'Acompañante Típico',
    nutriments: {
      'energy-kcal_100g': 180,
      'proteins_100g': 3,
      'carbohydrates_100g': 25,
      'fat_100g': 8,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/4/3/1/arroz_con_coco_colombiano_31134_600.jpg',
    code: '999000000030',
    categories_tags: ['arroz', 'coco', 'colombiano', 'caribe'],
    description: 'Arroz cocido en leche de coco, típico de la costa Caribe.'
  },
  {
    id: 'arepa-maiz-1',
    product_name: 'Arepa de Maíz Blanco',
    brands: 'Producto Colombiano',
    nutriments: {
      'energy-kcal_100g': 180,
      'proteins_100g': 3.5,
      'carbohydrates_100g': 36,
      'fat_100g': 0.8,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/5/7/0/arepas_colombianas_31075_600.jpg',
    code: '999000000001',
    categories_tags: ['arepa', 'maíz', 'colombiano'],
    description: 'Arepa tradicional de maíz blanco, se puede rellenar.'
  },
  {
    id: 'aguacate-hass-1',
    product_name: 'Aguacate Hass',
    brands: 'Fruta Colombiana',
    nutriments: {
      'energy-kcal_100g': 160,
      'proteins_100g': 2,
      'carbohydrates_100g': 9,
      'fat_100g': 15,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/0/1/6/aguacate_relleno_de_atun_y_huevo_74610_600.jpg', // (Imagen de aguacate relleno, pero es aguacate)
    code: '999000000003',
    categories_tags: ['aguacate', 'fruta', 'hass', 'colombiano'],
    description: 'Aguacate Hass colombiano, cremoso y nutritivo.'
  },
  {
    id: 'cafe-colombiano-1',
    product_name: 'Café de Colombia (Tinto)',
    brands: 'Producto Colombiano',
    nutriments: {
      'energy-kcal_100g': 0,
      'proteins_100g': 0,
      'carbohydrates_100g': 0,
      'fat_100g': 0,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/6/2/7/cafe_con_leche_y_canela_72726_600.jpg', // (Taza de cafe)
    code: '999000000002',
    categories_tags: ['café', 'bebida', 'colombiano'],
    description: 'Café 100% arábica suave de las montañas de Colombia.'
  },
  {
    id: 'frijoles-rojos-1',
    product_name: 'Frijoles Rojos Cargamanto',
    brands: 'Grano Colombiano',
    nutriments: {
      'energy-kcal_100g': 132,
      'proteins_100g': 9,
      'carbohydrates_100g': 24,
      'fat_100g': 0.5,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/5/2/2/frijoles_colombianos_31225_600.jpg',
    code: '999000000005',
    categories_tags: ['frijoles', 'legumbre', 'colombiano'],
    description: 'Frijol rojo tipo Cargamanto, base de la bandeja paisa.'
  },
  {
    id: 'platano-maduro-1',
    product_name: 'Plátano Maduro Frito (Tajadas)',
    brands: 'Acompañante Típico',
    nutriments: {
      'energy-kcal_100g': 150, // (Frito)
      'proteins_100g': 1,
      'carbohydrates_100g': 25,
      'fat_100g': 5,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/0/5/3/tajadas_de_platano_maduro_fritas_73350_600.jpg',
    code: '999000000006',
    categories_tags: ['plátano', 'fruta', 'maduro', 'colombiano', 'frito'],
    description: 'Plátano maduro, ideal para tajadas o asado.'
  },
  {
    id: 'panela-1',
    product_name: 'Panela',
    brands: 'Producto Colombiano',
    nutriments: {
      'energy-kcal_100g': 380,
      'proteins_100g': 0,
      'carbohydrates_100g': 95,
      'fat_100g': 0,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/0/1/1/agua_de_panela_con_limon_71110_600.jpg', // (Aguadepanela)
    code: '999000000007',
    categories_tags: ['panela', 'dulce', 'colombiano', 'aguadepanela'],
    description: 'Bloque de jugo de caña de azúcar, para "aguadepanela".'
  },
  {
    id: 'queso-fresco-1',
    product_name: 'Queso Fresco (Campesino)',
    brands: 'Lácteo Colombiano',
    nutriments: {
      'energy-kcal_100g': 264,
      'proteins_100g': 25,
      'carbohydrates_100g': 1.3,
      'fat_100g': 20,
    },
    image_url: 'https://i.imgur.com/G0nJcQc.jpeg', // (Usando una de Imgur que sí es genérica)
    code: '999000000010',
    categories_tags: ['queso', 'lácteo', 'fresco', 'campesino', 'colombiano'],
    description: 'Queso fresco no madurado, suave y bajo en sal.'
  },
  {
    id: 'lulo-1',
    product_name: 'Lulo',
    brands: 'Fruta Colombiana',
    nutriments: {
      'energy-kcal_100g': 25,
      'proteins_100g': 0.7,
      'carbohydrates_100g': 5.6,
      'fat_100g': 0.2,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/8/2/6/jugo_de_lulo_70628_600.jpg',
    code: '999000000031',
    categories_tags: ['lulo', 'fruta', 'jugo', 'colombiano'],
    description: 'Fruta ácida popular para jugos (Lulada).'
  },
  {
    id: 'maracuya-1',
    product_name: 'Maracuyá (Fruta de la Pasión)',
    brands: 'Fruta Colombiana',
    nutriments: {
      'energy-kcal_100g': 97,
      'proteins_100g': 2.2,
      'carbohydrates_100g': 23,
      'fat_100g': 0.7,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/4/6/1/jugo_de_maracuya_70164_600.jpg',
    code: '999000000032',
    categories_tags: ['maracuya', 'fruta', 'jugo', 'colombiano'],
    description: 'Fruta de la pasión, ácida y aromática, para jugos y postres.'
  },
  {
    id: 'uchuva-1',
    product_name: 'Uchuva (Golden Berry)',
    brands: 'Fruta Colombiana',
    nutriments: {
      'energy-kcal_100g': 53,
      'proteins_100g': 1.9,
      'carbohydrates_100g': 11.2,
      'fat_100g': 0.7,
    },
    image_url: 'https://t1.rg.ltmcdn.com/es/posts/8/7/3/mermelada_de_uchuva_70378_600.jpg',
    code: '999000000033',
    categories_tags: ['uchuva', 'fruta', 'colombiano', 'golden berry'],
    description: 'Fruta pequeña, dulce y ácida, envuelta en una cáscara de papel.'
  }
];

// --- FUNCIONES QUE YA TENÍAS ---
// (Estas funciones permiten que tu app use el archivo de arriba)

// Función para buscar en la base de datos local
export const buscarEnProductosLocales = (query) => {
  if (!query || query.trim() === '') {
    return productosColombianosLocales;
  }

  const queryLower = query.toLowerCase();
  
  return productosColombianosLocales.filter(producto => {
    const nombre = (producto.product_name || '').toLowerCase();
    const marca = (producto.brands || '').toLowerCase();
    const categorias = (producto.categories_tags || []).map(c => c.toLowerCase()).join(' ');
    const descripcion = (producto.description || '').toLowerCase();
    
    return nombre.includes(queryLower) || 
           marca.includes(queryLower) ||
           categorias.includes(queryLower) ||
           descripcion.includes(queryLower);
  });
};

// Obtener todos los productos
export const obtenerTodosLosProductos = () => {
  return productosColombianosLocales;
};

export default {
  productosColombianosLocales,
  buscarEnProductosLocales,
  obtenerTodosLosProductos
};