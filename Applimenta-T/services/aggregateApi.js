// servicios/aggregateApi.js
import { obtenerTodosLosProductos, productosColombianosLocales } from './colombianProductsData';
import { buscarAlimentos, analizarReceta } from './edamamApi';
import openFoodFactsApi from './openFoodFactsApi';

// Utilidad para elegir aleatorio
const sample = (arr, n = 1) => {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
};

// Normalizar producto local a formato estándar del app
const mapLocalProduct = (p) => ({
  id: p.id || p.code || null,
  product_name: p.product_name || p.nombre || 'Producto colombiano',
  brands: p.brands || p.marca || '',
  nutriments: p.nutriments || p.nutrientes || {},
  image_url: p.image_url || p.imagen || null,
  code: p.code || null,
  categories_tags: p.categories_tags || p.categorias || [],
  countries_tags: p.countries_tags || [],
  description: p.description || p.descripcion || ''
});

// Generar un plan diario simple (desayuno, almuerzo, cena)
const generarPlanDia = (productos) => {
  // Elegir 1-2 items para desayuno, 2-3 para almuerzo, 1-2 para cena
  const desayuno = sample(productos, 2).map(mapLocalProduct);
  const almuerzo = sample(productos, 3).map(mapLocalProduct);
  const cena = sample(productos, 2).map(mapLocalProduct);

  // Calcular totales usando obtenerInfoNutricional
  const sumarNutricion = (lista) => {
    const totals = { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 };
    lista.forEach((item) => {
      const info = openFoodFactsApi.obtenerInfoNutricional(item) || {};
      totals.calorias += info.calorias || 0;
      totals.proteinas += info.proteinas || 0;
      totals.carbohidratos += info.carbohidratos || 0;
      totals.grasas += info.grasas || 0;
    });
    // Redondear
    totals.calorias = Math.round(totals.calorias);
    totals.proteinas = Math.round(totals.proteinas * 10) / 10;
    totals.carbohidratos = Math.round(totals.carbohidratos * 10) / 10;
    totals.grasas = Math.round(totals.grasas * 10) / 10;
    return totals;
  };

  const nutricion = {
    desayuno: sumarNutricion(desayuno),
    almuerzo: sumarNutricion(almuerzo),
    cena: sumarNutricion(cena),
  };

  return { desayuno, almuerzo, cena, nutricion };
};

// Generar planes para 7 días
const generarPlanSemanal = (productos) => {
  const semana = [];
  for (let d = 0; d < 7; d++) {
    semana.push(generarPlanDia(productos));
  }
  return semana;
};

// Obtener recetas para términos típicos colombianos (consulta Edamam)
const obtenerRecetasTipicas = async () => {
  const platos = ['arepa', 'bandeja paisa', 'sancocho', 'ajiaco', 'empanada', 'tamales', 'arroz con pollo'];
  const recetas = [];

  for (const plato of platos) {
    try {
      const results = await buscarAlimentos(plato);
      if (Array.isArray(results) && results.length > 0) {
        // Tomar 2 ejemplos por plato
        const ejemplos = results.slice(0, 2).map(r => {
          const food = r.food || r;
          return {
            title: food.label || plato,
            source: 'Edamam',
            ingredients: food.ingredientLines || [],
            nutrients: food.nutrients || {},
            raw: food
          };
        });
        recetas.push({ plato, ejemplos });
      }
    } catch (err) {
      // Ignorar errores por plato
      recetas.push({ plato, ejemplos: [] });
    }
  }

  return recetas;
};

// Obtener comidas típicas desde productos locales (tags 'colombiano')
const obtenerComidasTipicas = () => {
  const todos = obtenerTodosLosProductos();
  const tipicas = (Array.isArray(todos) ? todos : []).filter(p => {
    const cats = (p.categories_tags || p.categorias || []).map(c => String(c).toLowerCase());
    return cats.some(c => c.includes('colombiano') || c.includes('arepa') || c.includes('plátano') || c.includes('frijol') || c.includes('maíz'));
  }).map(mapLocalProduct);

  // Si no se encuentran, devolver una selección de productosColombianosLocales
  if (tipicas.length === 0) {
    return productosColombianosLocales.slice(0, 10).map(mapLocalProduct);
  }

  return tipicas;
};

// Endpoint principal: devolver todo agregado
export const obtenerTodoColombiano = async () => {
  try {
    const productos = (Array.isArray(obtenerTodosLosProductos()) ? obtenerTodosLosProductos() : productosColombianosLocales).map(mapLocalProduct);

    const recetas = await obtenerRecetasTipicas();
    const comidasTipicas = obtenerComidasTipicas();
    const planesSemanal = generarPlanSemanal(productos);

    return {
      productos,
      recetas,
      comidasTipicas,
      planesSemanal
    };
  } catch (error) {
    console.error('Error en obtenerTodoColombiano:', error);
    // Fallback seguro
    const productos = productosColombianosLocales.map(mapLocalProduct);
    return {
      productos,
      recetas: [],
      comidasTipicas: productos.slice(0, 10),
      planesSemanal: generarPlanSemanal(productos)
    };
  }
};

export default {
  obtenerTodoColombiano,
  obtenerRecetasTipicas,
  obtenerComidasTipicas,
  generarPlanSemanal
};
