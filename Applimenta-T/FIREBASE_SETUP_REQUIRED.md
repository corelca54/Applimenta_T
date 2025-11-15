# ⚠️ CONFIGURACIÓN DE FIREBASE REQUERIDA

## Error Actual
```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

**Causa:** La `apiKey` en `config/firebaseConfig.js` no es una clave válida de Firebase. 

---

## Solución: Obtén la Clave Real de Firebase Console

### Paso 1: Accede a Firebase Console
- Ve a: https://console.firebase.google.com
- Inicia sesión con la cuenta que creó el proyecto `applimenta-t`

### Paso 2: Selecciona tu Proyecto
- Busca y selecciona **"applimenta-t"**

### Paso 3: Obtén la Configuración Web
1. Haz clic en el engranaje ⚙️ (Settings) en la esquina superior izquierda
2. Ve a **"Project settings"**
3. Desplázate hasta la sección **"Your apps"**
4. Busca el app web (debería mostrar una etiqueta con `</>` o "Web")
5. Si no hay app web, haz clic en **"Add app"** y elige **"Web"**
6. Copia el objeto de configuración completo:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "applimenta-t.firebaseapp.com",
  projectId: "applimenta-t",
  storageBucket: "applimenta-t.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Paso 4: Actualiza `config/firebaseConfig.js`
- Abre `/workspaces/Applimenta_T/Applimenta-T/config/firebaseConfig.js`
- Reemplaza el objeto `firebaseConfig` completo con los valores reales de Firebase Console
- Guarda el archivo

### Paso 5: Recarga la App
- Abre Expo Go en tu dispositivo
- Presiona "Reload" (o **r** si estás en Terminal)
- Intenta registrarte nuevamente

---

## ¿Qué es una API Key Válida?

Una API Key de Firebase real tiene este formato:
```
AIzaSyD1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

**NO es válida** si es:
- Hexadecimal puro: `1883d5f878c6fbdb950f78400e4e5cb31fdec275` ❌
- Muy corta: `test123` ❌
- Un hash de git ❌

---

## Alternativa: Variables de Entorno (Recomendado)

Para mayor seguridad, crea un archivo `.env` en la raíz del proyecto:

```bash
# /workspaces/Applimenta_T/Applimenta-T/.env
FIREBASE_API_KEY=AIzaSyD1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
FIREBASE_AUTH_DOMAIN=applimenta-t.firebaseapp.com
FIREBASE_PROJECT_ID=applimenta-t
FIREBASE_STORAGE_BUCKET=applimenta-t.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=73895335255
FIREBASE_APP_ID=1:73895335255:web:e7539b87ede47f86b71a12
```

**⚠️ NO subas `.env` a Git** — ya está en `.gitignore`

---

## ¿Sigue sin funcionar?

Si después de reemplazar la API Key sigue mostrando el error:

1. **Verifica restricciones de API Key en Google Cloud:**
   - Ve a: https://console.cloud.google.com/apis/credentials
   - Selecciona tu proyecto `applimenta-t`
   - Haz clic en tu API Key
   - Si hay "Application restrictions", **elimínalas temporalmente** para pruebas (o configúralas para tu app móvil)

2. **Reinicia Metro:**
   ```bash
   cd /workspaces/Applimenta_T/Applimenta-T
   npx expo start --tunnel --clear
   ```

3. **Limpia caché de Expo Go:**
   - En Expo Go: Presiona el menú → "Clear Cache"
   - Escanea el QR nuevamente

---

**Contacta al administrador del proyecto Firebase si no tienes acceso a la consola.**
