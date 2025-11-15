// servicios/openFoodFactsApi.js
import axios from 'axios';
import { buscarEnProductosLocales, productosColombianosLocales, expandirProductosLocales } from './colombianProductsData';

const BASE_URL = 'https://es.openfoodfacts.org/api/v2'; // USA VERSIÓN EN ESPAÑOL
const BASE_URL_EN = 'https://world.openfoodfacts.org/api/v2';

// Crear productos expandidos de búsqueda
const productosExpandidos = expandirProductosLocales();

// Buscar productos con múltiples intentos
export const buscarProductos = async (query) => {
  try {
    // 1. Buscar primero en datos locales expandidos
    const productosLocales = buscarEnProductosLocales(query);
    if (productosLocales && productosLocales.length > 0) {
      console.log(`✓ Encontrados ${productosLocales.length} productos locales`);
      return productosLocales;
    }

    // 2. Buscar en Open Food Facts en español
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          search_terms: query,
          page_size: 30,
          json: 1,
          fields: 'product_name,brands,nutriments,image_url,code,categories_tags'
        },
        timeout: 3000
      });

      let productos = (response.data.products || []).filter(p => p.product_name);
      if (productos.length > 0) {
        console.log(`✓ Encontrados ${productos.length} productos en Open Food Facts (ES)`);
        return productos.slice(0, 20);
      }
    } catch (err) {
      console.warn('Open Food Facts ES no disponible');
    }

    // 3. Fallback: buscar en Open Food Facts en inglés
    try {
      const response = await axios.get(`${BASE_URL_EN}/search`, {
        params: {
          search_terms: query,
          page_size: 30,
          json: 1,
          fields: 'product_name,brands,nutriments,image_url,code,categories_tags'
        },
        timeout: 3000
      });

      let productos = (response.data.products || []).filter(p => p.product_name);
      if (productos.length > 0) {
        console.log(`✓ Encontrados ${productos.length} productos en Open Food Facts (EN)`);
        return productos.slice(0, 20);
      }
    } catch (err) {
      console.warn('Open Food Facts EN no disponible');
    }

    // 4. Si nada funcionó, devolver todos los productos locales como opción
    console.log('ℹ Usando productos locales como fallback');
    return productosColombianosLocales;

  } catch (error) {
    console.error('Error al buscar productos:', error);
    return productosColombianosLocales;
  }
};

// Alias para compatibilidad
export const buscarProductosColombianosPorTermino = buscarProductos;

// Buscar producto por código de barras
export const buscarPorCodigoBarras = async (barcode) => {
  try {
    // 1. Buscar en productos locales primero
    const productoLocal = productosColombianosLocales.find(p => p.code === barcode);
    if (productoLocal) {
      console.log('✓ Código encontrado en productos locales');
      return productoLocal;
    }

    // 2. Intentar Open Food Facts
    try {
      const response = await axios.get(`${BASE_URL_EN}/product/${barcode}.json`, {
        timeout: 3000
      });
      
      if (response.data.status === 1) {
        console.log('✓ Código encontrado en Open Food Facts');
        return response.data.product;
      }
    } catch (err) {
      console.warn('Código no encontrado en API');
    }

    return null;
  } catch (error) {
    console.error('Error al buscar por código de barras:', error);
    return null;
  }
};

// Buscar productos colombianos
export const buscarProductosColombianos = async () => {
  try {
    console.log('Devolviendo productos colombianos');
    return productosColombianosLocales;
  } catch (error) {
    console.error('Error al buscar productos colombianos:', error);
    return productosColombianosLocales;
  }
};

// Obtener información nutricional
export const obtenerInfoNutricional = (producto) => {
  const nutriments = producto.nutriments || {};
  
  return {
    calorias: nutriments['energy-kcal_100g'] || 0,
    proteinas: nutriments.proteins_100g || 0,
    carbohidratos: nutriments.carbohydrates_100g || 0,
    grasas: nutriments.fat_100g || 0,
    fibra: nutriments.fiber_100g || 0,
    azucares: nutriments.sugars_100g || 0,
    sal: nutriments.salt_100g || 0,
    sodio: nutriments.sodium_100g || 0
  };
};

export default {
  buscarProductos,
  buscarProductosColombianosPorTermino,
  buscarPorCodigoBarras,
  buscarProductosColombianos,
  obtenerInfoNutricional
};