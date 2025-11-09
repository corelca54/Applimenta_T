// servicios/openFoodFactsApi.js
import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org/api/v2';

// Buscar productos por nombre
export const buscarProductos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: 20,
        fields: 'product_name,brands,nutriments,image_url,code,categories_tags'
      }
    });

    return response.data.products || [];
  } catch (error) {
    console.error('Error al buscar productos:', error);
    throw error;
  }
};

// Buscar producto por código de barras
export const buscarPorCodigoBarras = async (barcode) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${barcode}.json`);
    
    if (response.data.status === 1) {
      return response.data.product;
    }
    return null;
  } catch (error) {
    console.error('Error al buscar por código de barras:', error);
    throw error;
  }
};

// Buscar productos colombianos
export const buscarProductosColombianos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        tagtype_0: 'countries',
        tag_contains_0: 'contains',
        tag_0: 'colombia',
        page_size: 20,
        json: 1,
        fields: 'product_name,brands,nutriments,image_url,code'
      }
    });

    return response.data.products || [];
  } catch (error) {
    console.error('Error al buscar productos colombianos:', error);
    throw error;
  }
};

// Obtener información nutricional del producto
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
  buscarPorCodigoBarras,
  buscarProductosColombianos,
  obtenerInfoNutricional
};