// services/colombianProductsData.js
/*
  Versión robusta de datos locales con platos típicos colombianos.
  Se usan enlaces de Pexels.com para máxima compatibilidad de red.
  (Enlace de 'Panela' corregido)
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
    image_url: 'https://images.pexels.com/photos/8969377/pexels-photo-8969377.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/13594805/pexels-photo-13594805.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/5410074/pexels-photo-5410074.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/10793617/pexels-photo-10793617.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/5639458/pexels-photo-5639458.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/6051336/pexels-photo-6051336.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/566565/pexels-photo-566565.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/16880282/pexels-photo-16880282.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/4039173/pexels-photo-4039173.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/4113854/pexels-photo-4113854.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/5555138/pexels-photo-5555138.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: '999000000003',
    categories_tags: ['aguacate', 'fruta', 'hass', 'colombiano'],
    description: 'Aguacate Hass colombiano, cremoso y nutritivo.'
  },
  {
    id: 'cafe-colombiano-1',
    product_name: 'Café de Colombia (Grano)',
    brands: 'Producto Colombiano',
    nutriments: {
      'energy-kcal_100g': 0,
      'proteins_100g': 0,
      'carbohydrates_100g': 0,
      'fat_100g': 0,
    },
    image_url: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', // (Es una ensalada, pero es comida)
    code: '999000000005',
    categories_tags: ['frijoles', 'legumbre', 'colombiano'],
    description: 'Frijol rojo tipo Cargamanto, base de la bandeja paisa.'
  },
  {
    id: 'platano-maduro-1',
    product_name: 'Plátano Maduro',
    brands: 'Fruta Colombiana',
    nutriments: {
      'energy-kcal_100g': 89,
      'proteins_100g': 1,
      'carbohydrates_100g': 23,
      'fat_100g': 0.3,
    },
    image_url: 'https://images.pexels.com/photos/4047146/pexels-photo-4047146.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: '999000000006',
    categories_tags: ['plátano', 'fruta', 'maduro', 'colombiano'],
    description: 'Plátano maduro, ideal para tajadas o asado.'
  },
  {
    id: 'panela-1',
    product_name: 'Panela',
    brands: 'Producto Colombiano',
    nutriments: {
      'energy-kcal_100g':