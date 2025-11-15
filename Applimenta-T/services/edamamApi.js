// servicios/edamamApi.js
import axios from 'axios';
import { productosColombianosLocales } from './colombianProductsData';

// Nota: Para usar API real de Edamam, obtén credenciales en https://developer.edamam.com/
// Por ahora usamos datos locales como principal y fallback

// Buscar alimentos (usa datos locales principalmente)
export const buscarAlimentos = async (query) => {
  try {
    // Buscar en productos locales
    const productosLocales = productosColombianosLocales.filter(p => {
      const nombre = (p.product_name || '').toLowerCase();
      const descripcion = (p.description || '').toLowerCase();
      return nombre.includes(query.toLowerCase()) || descripcion.includes(query.toLowerCase());
    });

    if (productosLocales.length > 0) {
      console.log(`Encontrados ${productosLocales.length} alimentos locales`);
      return productosLocales.map(p => ({
        food: {
          label: p.product_name,
          nutrients: p.nutriments
        }
      }));
    }

    // Si no hay locales, intentar API de Edamam
    try {
      const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
        params: {
          app_id: 'e9a4c934',
          app_key: '8fba15a80becf38b2729c3ca63e84d84',
          ingr: query,
          'nutrition-type': 'logging'
        },
        timeout: 5000
      });

      return response.data.hints || [];
    } catch (apiError) {
      console.warn('Edamam API no disponible:', apiError.message);
      return [];
    }
  } catch (error) {
    console.error('Error al buscar alimentos:', error);
    return [];
  }
};

// Analizar información nutricional de recetas (usa datos locales)
export const analizarReceta = async (ingredientes) => {
  try {
    // Calcular totales de los ingredientes basados en datos locales
    let totalCalorias = 0;
    let totalProteinas = 0;
    let totalCarbohidratos = 0;
    let totalGrasas = 0;

    for (const ingrediente of ingredientes) {
      const producto = productosColombianosLocales.find(p =>
        p.product_name.toLowerCase().includes(ingrediente.toLowerCase())
      );

      if (producto && producto.nutriments) {
        totalCalorias += producto.nutriments['energy-kcal_100g'] || 0;
        totalProteinas += producto.nutriments.proteins_100g || 0;
        totalCarbohidratos += producto.nutriments.carbohydrates_100g || 0;
        totalGrasas += producto.nutriments.fat_100g || 0;
      }
    }

    return {
      totalCalorias: Math.round(totalCalorias),
      totalProteinas: Math.round(totalProteinas * 10) / 10,
      totalCarbohidratos: Math.round(totalCarbohidratos * 10) / 10,
      totalGrasas: Math.round(totalGrasas * 10) / 10
    };
  } catch (error) {
    console.error('Error al analizar receta:', error);
    return {
      totalCalorias: 0,
      totalProteinas: 0,
      totalCarbohidratos: 0,
      totalGrasas: 0
    };
  }
};


// Obtener recomendaciones nutricionales diarias (Colombia)
export const obtenerRecomendacionesDiarias = (edad, genero, nivelActividad) => {
  // Valores basados en las guías colombianas de alimentación
  const recomendaciones = {
    calorias: 2000,
    proteinas: 50,
    carbohidratos: 275,
    grasas: 70,
    fibra: 25,
    azucares: 50,
    sodio: 2.3
  };

  // Ajustar según edad y género
  if (genero === 'masculino') {
    recomendaciones.calorias = 2500;
    recomendaciones.proteinas = 56;
  } else if (genero === 'femenino') {
    recomendaciones.calorias = 2000;
    recomendaciones.proteinas = 46;
  }

  // Ajustar según nivel de actividad
  if (nivelActividad === 'bajo') {
    recomendaciones.calorias *= 0.9;
  } else if (nivelActividad === 'alto') {
    recomendaciones.calorias *= 1.2;
  }

  return recomendaciones;
};