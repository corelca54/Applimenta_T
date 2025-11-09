// servicios/firebaseService.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  where,
  updateDoc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// ========== FAVORITOS ==========

// Agregar producto a favoritos
export const agregarAFavoritos = async (userId, producto) => {
  try {
    const favoritoRef = collection(db, 'favoritos');
    await addDoc(favoritoRef, {
      userId,
      productoId: producto.code || producto.id,
      nombre: producto.product_name || producto.nombre,
      marca: producto.brands || producto.marca,
      imagen: producto.image_url || producto.imagen,
      nutrientes: producto.nutriments || producto.nutrientes,
      fechaAgregado: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error al agregar a favoritos:', error);
    throw error;
  }
};

// Obtener favoritos del usuario
export const obtenerFavoritos = async (userId) => {
  try {
    const favoritosRef = collection(db, 'favoritos');
    const q = query(favoritosRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const favoritos = [];
    querySnapshot.forEach((doc) => {
      favoritos.push({ id: doc.id, ...doc.data() });
    });
    
    return favoritos;
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    throw error;
  }
};

// Eliminar de favoritos
export const eliminarDeFavoritos = async (favoritoId) => {
  try {
    await deleteDoc(doc(db, 'favoritos', favoritoId));
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error);
    throw error;
  }
};

// Verificar si un producto está en favoritos
export const estaEnFavoritos = async (userId, productoId) => {
  try {
    const favoritosRef = collection(db, 'favoritos');
    const q = query(
      favoritosRef, 
      where('userId', '==', userId),
      where('productoId', '==', productoId)
    );
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error al verificar favoritos:', error);
    return false;
  }
};

// ========== PLANES DE ALIMENTACIÓN ==========

// Crear plan de alimentación diario
export const crearPlanAlimentacion = async (userId, plan) => {
  try {
    const planesRef = collection(db, 'planes');
    await addDoc(planesRef, {
      userId,
      fecha: plan.fecha || new Date().toISOString(),
      desayuno: plan.desayuno || [],
      almuerzo: plan.almuerzo || [],
      cena: plan.cena || [],
      meriendas: plan.meriendas || [],
      totalCalorias: plan.totalCalorias || 0,
      totalProteinas: plan.totalProteinas || 0,
      totalCarbohidratos: plan.totalCarbohidratos || 0,
      totalGrasas: plan.totalGrasas || 0,
      completado: false,
      createdAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error al crear plan de alimentación:', error);
    throw error;
  }
};

// Obtener plan de alimentación del día
export const obtenerPlanDelDia = async (userId, fecha) => {
  try {
    const planesRef = collection(db, 'planes');
    const q = query(
      planesRef,
      where('userId', '==', userId),
      where('fecha', '==', fecha)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener plan del día:', error);
    throw error;
  }
};

// Actualizar plan de alimentación
export const actualizarPlan = async (planId, datosActualizados) => {
  try {
    const planRef = doc(db, 'planes', planId);
    await updateDoc(planRef, datosActualizados);
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar plan:', error);
    throw error;
  }
};

// ========== PERFIL DE USUARIO ==========

// Crear o actualizar perfil de usuario
export const guardarPerfilUsuario = async (userId, perfil) => {
  try {
    const perfilRef = doc(db, 'perfiles', userId);
    await setDoc(perfilRef, {
      nombre: perfil.nombre,
      edad: perfil.edad,
      genero: perfil.genero,
      peso: perfil.peso,
      altura: perfil.altura,
      nivelActividad: perfil.nivelActividad,
      objetivoSalud: perfil.objetivoSalud,
      restriccionesAlimentarias: perfil.restriccionesAlimentarias || [],
      actualizadoEl: new Date().toISOString()
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error('Error al guardar perfil:', error);
    throw error;
  }
};

// Obtener perfil de usuario
export const obtenerPerfilUsuario = async (userId) => {
  try {
    const perfilRef = doc(db, 'perfiles', userId);
    const perfilDoc = await getDoc(perfilRef);
    
    if (perfilDoc.exists()) {
      return { id: perfilDoc.id, ...perfilDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error;
  }
};

// ========== HISTORIAL DE CONSUMO ==========

// Registrar consumo de alimento
export const registrarConsumo = async (userId, consumo) => {
  try {
    const historialRef = collection(db, 'historial');
    await addDoc(historialRef, {
      userId,
      productoId: consumo.productoId,
      nombre: consumo.nombre,
      cantidad: consumo.cantidad,
      unidad: consumo.unidad,
      calorias: consumo.calorias,
      comida: consumo.comida, // desayuno, almuerzo, cena, merienda
      fecha: consumo.fecha || new Date().toISOString(),
      timestamp: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error al registrar consumo:', error);
    throw error;
  }
};

// Obtener historial de consumo
export const obtenerHistorial = async (userId, fechaInicio, fechaFin) => {
  try {
    const historialRef = collection(db, 'historial');
    const q = query(
      historialRef,
      where('userId', '==', userId),
      where('fecha', '>=', fechaInicio),
      where('fecha', '<=', fechaFin)
    );
    const querySnapshot = await getDocs(q);
    
    const historial = [];
    querySnapshot.forEach((doc) => {
      historial.push({ id: doc.id, ...doc.data() });
    });
    
    return historial;
  } catch (error) {
    console.error('Error al obtener historial:', error);
    throw error;
  }
};

export default {
  agregarAFavoritos,
  obtenerFavoritos,
  eliminarDeFavoritos,
  estaEnFavoritos,
  crearPlanAlimentacion,
  obtenerPlanDelDia,
  actualizarPlan,
  guardarPerfilUsuario,
  obtenerPerfilUsuario,
  registrarConsumo,
  obtenerHistorial
};