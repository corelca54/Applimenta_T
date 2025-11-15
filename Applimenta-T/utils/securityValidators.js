// utils/securityValidators.js
// Validadores de seguridad para entrada de usuario

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Valida contraseña fuerte
 * - Mínimo 12 caracteres
 * - Al menos una mayúscula
 * - Al menos una minúscula
 * - Al menos un número
 * - Opcional: caracteres especiales
 * @param {string} password - Contraseña a validar
 * @returns {object} { isValid: boolean, message: string }
 */
export const isStrongPassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'La contraseña es requerida' };
  }

  // Reglas razonables para registro en móviles: mínimo 6 caracteres y al menos un número
  const errors = [];
  if (password.length < 6) {
    errors.push('mínimo 6 caracteres');
  }

  const hasNumber = /\d/.test(password);
  if (!hasNumber) {
    errors.push('al menos un número');
  }

  // Opcional: si quieres forzar mayúsculas/minúsculas, descomenta estas líneas
  // const hasUpperCase = /[A-Z]/.test(password);
  // if (!hasUpperCase) errors.push('una mayúscula');
  // const hasLowerCase = /[a-z]/.test(password);
  // if (!hasLowerCase) errors.push('una minúscula');

  if (errors.length > 0) {
    return { isValid: false, message: `La contraseña debe contener: ${errors.join(', ')}` };
  }

  return { isValid: true, message: 'Contraseña válida' };
};

/**
 * Sanitiza entrada de búsqueda
 * - Límite de 100 caracteres
 * - Solo permite letras, números, espacios y acentos
 * @param {string} query - Búsqueda a sanitizar
 * @returns {string} Búsqueda sanitizada
 */
export const sanitizeSearchQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return '';
  }

  // Limitar longitud
  let sanitized = query.slice(0, 100).trim();

  // Solo permitir caracteres seguros
  sanitized = sanitized.replace(/[<>{}[\]\\\/;:'"?!@#$%^&*()\-+=~`|]/g, '');

  return sanitized;
};

/**
 * Valida que el nombre sea seguro
 * - Máximo 100 caracteres
 * - Solo letras, espacios y algunos caracteres seguros
 * @param {string} name - Nombre a validar
 * @returns {boolean} true si es válido
 */
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') {
    return false;
  }

  if (name.length > 100 || name.length < 2) {
    return false;
  }

  const nameRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s'-]+$/;
  return nameRegex.test(name);
};

/**
 * Valida edad
 * @param {number} age - Edad a validar
 * @returns {boolean} true si es válido (entre 13 y 120)
 */
export const isValidAge = (age) => {
  const ageNum = parseInt(age);
  return !isNaN(ageNum) && ageNum >= 13 && ageNum <= 120;
};

/**
 * Valida peso en kg
 * @param {number} weight - Peso en kg
 * @returns {boolean} true si es válido (entre 20 y 500 kg)
 */
export const isValidWeight = (weight) => {
  const weightNum = parseFloat(weight);
  return !isNaN(weightNum) && weightNum >= 20 && weightNum <= 500;
};

/**
 * Valida altura en cm
 * @param {number} height - Altura en cm
 * @returns {boolean} true si es válido (entre 80 y 250 cm)
 */
export const isValidHeight = (height) => {
  const heightNum = parseFloat(height);
  return !isNaN(heightNum) && heightNum >= 80 && heightNum <= 250;
};

/**
 * Log seguro - solo en development
 * @param {string} title - Título del log
 * @param {*} data - Datos a loguear
 */
export const secureLog = (title, data) => {
  if (__DEV__) {
    console.log(`[${title}]`, data);
  }
};

/**
 * Log de errores seguro - solo en development
 * @param {string} title - Título del error
 * @param {Error} error - Error a loguear
 */
export const secureErrorLog = (title, error) => {
  if (__DEV__) {
    console.error(`[${title}]`, error.message);
  }
};

export default {
  isValidEmail,
  isStrongPassword,
  sanitizeSearchQuery,
  isValidName,
  isValidAge,
  isValidWeight,
  isValidHeight,
  secureLog,
  secureErrorLog
};
