// servicios/openFoodFactsApi.js
import axios from 'axios';
import { buscarEnProductosLocales, productosColombianosLocales } from './colombianProductsData';
import { sanitizeSearchQuery, secureLog, secureErrorLog } from '../utils/securityValidators';

const BASE_URL = 'https://es.openfoodfacts.org/api/v2'; // USA VERSIÓN EN ESPAÑOL
const BASE_URL_EN = 'https://world.openfoodfacts.org/api/v2';

// Buscar productos con múltiples intentos - PRIORIZA DATOS LOCALES
export const buscarProductos = async (query) => {
  try {
    // Sanitizar entrada para prevenir inyecciones
    const sanitizedQuery = sanitizeSearchQuery(query);
    
    if (!sanitizedQuery) {
      return productosColombianosLocales;
    }

    // 1. Buscar primero en datos locales - SIEMPRE FUNCIONA
    const productosLocales = buscarEnProductosLocales(sanitizedQuery);
    if (productosLocales && productosLocales.length > 0) {
      secureLog('BúsquedaLocal', `Encontrados ${productosLocales.length} productos para: "${sanitizedQuery}"`);
      return productosLocales;
    }

    // 2. Si no hay resultados locales, buscar en Open Food Facts en español
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          search_terms: sanitizedQuery,
          page_size: 50,
          json: 1,
          fields: 'product_name,brands,nutriments,image_url,code,categories_tags,countries_tags,description'
        },
        timeout: 5000
      });

      let productos = (response.data.products || []).filter(p => p.product_name);
      if (productos.length > 0) {
        secureLog('BúsquedaOFF_ES', `Encontrados ${productos.length} productos en Open Food Facts (Español)`);
        return productos;
      }
    } catch (err) {
      secureErrorLog('OpenFoodFactsES', err);
    }

    // 3. Fallback: buscar en Open Food Facts en inglés
    try {
      const response = await axios.get(`${BASE_URL_EN}/search`, {
        params: {
          search_terms: sanitizedQuery,
          page_size: 50,
          json: 1,
          fields: 'product_name,brands,nutriments,image_url,code,categories_tags,countries_tags,description'
        },
        timeout: 5000
      });

      let productos = (response.data.products || []).filter(p => p.product_name);
      if (productos.length > 0) {
        secureLog('BúsquedaOFF_EN', `Encontrados ${productos.length} productos en Open Food Facts (Inglés)`);
        return productos;
      }
    } catch (err) {
      secureErrorLog('OpenFoodFactsEN', err);
    }

    // 4. Si nada funcionó, devolver todos los productos locales como fallback
    secureLog('Fallback', 'Devolviendo todos los productos locales como fallback');
    return productosColombianosLocales;

  } catch (error) {
    secureErrorLog('BúsquedaProductos', error);
    return productosColombianosLocales;
  }
};

// Alias para compatibilidad con código anterior
export const buscarProductosColombianosPorTermino = buscarProductos;

// Buscar producto por código de barras
export const buscarPorCodigoBarras = async (barcode) => {
  try {
    // Validar que sea un código válido (solo números, máximo 14 caracteres)
    const barcodeRegex = /^\d{8,14}$/;
    if (!barcodeRegex.test(barcode)) {
      secureLog('BarcodeInvalid', `Código de barras inválido: ${barcode}`);
      return null;
    }

    // 1. Buscar en productos locales primero - RÁPIDO Y CONFIABLE
    const productoLocal = productosColombianosLocales.find(p => p.code === barcode);
    if (productoLocal) {
      secureLog('BarcodeLocal', `Código ${barcode} encontrado en productos locales`);
      return productoLocal;
    }

    // 2. Intentar Open Food Facts
    try {
      const response = await axios.get(`${BASE_URL_EN}/product/${barcode}.json`, {
        timeout: 5000
      });
      
      if (response.data.status === 1 && response.data.product) {
        secureLog('BarcodeOFF', `Código ${barcode} encontrado en Open Food Facts`);
        return response.data.product;
      }
    } catch (err) {
      secureErrorLog('OpenFoodFactsBarcode', err);
    }

    secureLog('BarcodeNotFound', `Código ${barcode} no encontrado en ninguna fuente`);
    return null;
  } catch (error) {
    secureErrorLog('BuscaBarcodeError', error);
    return null;
  }
};

// Buscar productos colombianos específicamente
export const buscarProductosColombianos = async () => {
  try {
    secureLog('ProductosColombianos', `Devolviendo ${productosColombianosLocales.length} productos colombianos`);
    return productosColombianosLocales;
  } catch (error) {
    secureErrorLog('BuscaProductosColombianos', error);
    return productosColombianosLocales;
  }
};

// Obtener información nutricional formateada
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