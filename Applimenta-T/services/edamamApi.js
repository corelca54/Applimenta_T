// ...existing code...
import axios from 'axios';

// IMPORTANTE: Obtén tus propias credenciales en https://developer.edamam.com/
const APP_ID = 'TU_APP_ID_AQUI';
const APP_KEY = 'TU_APP_KEY_AQUI';
const BASE_URL = 'https://api.edamam.com/api/nutrition-details';

// Analizar información nutricional de recetas
export const analizarReceta = async (ingredientes) => {
  try {
    const response = await axios.post(`${BASE_URL}`, {
      title: 'Análisis Nutricional',
      ingr: ingredientes
    }, {
      params: {
        app_id: APP_ID,
        app_key: APP_KEY
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al analizar receta:', error);
    throw error;
  }
};

// Buscar alimentos
export const buscarAlimentos = async (query) => {
  try {
    const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
      params: {
        app_id: APP_ID,
        app_key: APP_KEY,
        ingr: query,
        'nutrition-type': 'logging'
      }
    });

    return response.data.hints || [];
  } catch (error) {
    console.error('Error al buscar alimentos:', error);
    throw error;
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

export default {
  analizarReceta,
  buscarAlimentos,
  obtenerRecomendacionesDiarias
};
// ...existing code...