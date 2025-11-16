// services/edamamApi.js
import axios from 'axios';

// --- CLAVES PARA LA API DE BASE DE DATOS DE COMIDA ---
// (Estas son las que ya tenías y funcionan para buscar ingredientes)
const FOOD_DB_ID = 'e9a4c934';
const FOOD_DB_KEY = '8fba15a80becf38b2729c3ca63e84d84';
const FOOD_DB_URL = 'https://api.edamam.com/api/food-database/v2/parser';

// --- CLAVES PARA LA API DE BÚSQUEDA DE RECETAS ---
// ¡¡IMPORTANTE!! Debes obtener estas claves en tu dashboard de Edamam.
// Crea una nueva aplicación de tipo "Recipe Search".
const RECIPE_API_ID = '52ae425e'; 
const RECIPE_API_KEY = 'cd5d297ce0043f92dc9a569f51fdf86a';
const RECIPE_SEARCH_URL = 'https://api.edamam.com/api/recipes/v2';

/**
 * Busca ingredientes en la base de datos de Edamam
 * (Esto usa tus llaves actuales)
 */
export const buscarAlimentos = async (query) => {
  if (!query) return [];

  try {
    const response = await axios.get(FOOD_DB_URL, {
      params: {
        app_id: FOOD_DB_ID,
        app_key: FOOD_DB_KEY,
        ingr: query,
        'nutrition-type': 'logging'
      },
      timeout: 8000 // Aumentado el timeout
    });
    
    // Devuelve los 'hints' que contienen la comida y sus nutrientes
    return response.data.hints || [];

  } catch (apiError) {
    console.error('Error en API Edamam (Food DB):', apiError.message);
    return []; // Devuelve vacío si falla
  }
};

/**
 * Busca recetas saludables en la API de Edamam
 * (Esto usa las NUEVAS llaves que debes crear)
 */
export const buscarRecetas = async (query) => {
  // Alerta si no se han puesto las llaves
  if (RECIPE_API_ID === 'TU_ID_DE_RECETAS_AQUI') {
    console.error('¡Falta API Key de Recetas en edamamApi.js!');
    alert('Error: Falta configurar la API de Recetas.');
    return [];
  }

  try {
    const response = await axios.get(RECIPE_SEARCH_URL, {
      params: {
        type: 'public',
        app_id: RECIPE_API_ID,
        app_key: RECIPE_API_KEY,
        q: query,
        health: 'health' // Filtro para recetas saludables
      },
      timeout: 8000
    });

    // Devuelve la lista de recetas
    return response.data.hits || [];

  } catch (apiError) {
    console.error('Error en API Edamam (Recipes):', apiError.message);
    return [];
  }
};

/**
 * Obtener recomendaciones nutricionales diarias (Placeholder)
 * (Mantenemos tu lógica local por ahora)
 */
export const obtenerRecomendacionesDiarias = (edad, genero, nivelActividad) => {
  const recomendaciones = {
    calorias: 2000, proteinas: 50, carbohidratos: 275, grasas: 70,
    fibra: 25, azucares: 50, sodio: 2.3
  };
  if (genero === 'masculino') {
    recomendaciones.calorias = 2500; recomendaciones.proteinas = 56;
  } else if (genero === 'femenino') {
    recomendaciones.calorias = 2000; recomendaciones.proteinas = 46;
  }
  if (nivelActividad === 'bajo') {
    recomendaciones.calorias *= 0.9;
  } else if (nivelActividad === 'alto') {
    recomendaciones.calorias *= 1.2;
  }
  return recomendaciones;
};