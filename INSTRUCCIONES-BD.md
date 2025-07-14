# 🗄️ Opciones de Base de Datos para JobFinder

Tienes **3 opciones** para usar una base de datos **sin datos precargados**:

---

## 🔥 **Opción 1: Firebase Real (Recomendado)**

### **¿Qué es?**
Base de datos en la nube de Google con Firestore.

### **Configuración:**
1. **Crear proyecto en Firebase:**
   - Ir a https://console.firebase.google.com
   - Crear nuevo proyecto "JobFinder"
   - Habilitar Firestore Database
   - Habilitar Authentication

2. **Obtener credenciales:**
   ```javascript
   // Reemplazar en firebase-real-config.js
   const firebaseConfig = {
     apiKey: "tu-api-key-real",
     authDomain: "jobfinder-xxxxx.firebaseapp.com",
     projectId: "jobfinder-xxxxx",
     // ... resto de configuración
   };
   ```

3. **Reemplazar archivo:**
   ```bash
   # Renombrar archivo actual
   mv firebase-config.js firebase-config-demo.js
   
   # Usar configuración real
   mv firebase-real-config.js firebase-config.js
   ```

### **Ventajas:**
- ✅ Base de datos real en la nube
- ✅ Autenticación integrada  
- ✅ Escalable automáticamente
- ✅ Tiempo real
- ✅ Respaldos automáticos

### **Desventajas:**
- ❌ Requiere cuenta Google
- ❌ Costos después del plan gratuito

---

## 🗑️ **Opción 2: Base Limpia (Más Fácil)**

### **¿Qué es?**
Usar la simulación actual pero sin datos precargados.

### **Configuración:**
```javascript
// Ya está configurado - solo activar
// El archivo firebase-config.js ya está modificado
```

### **Para limpiar datos existentes:**
```javascript
// Desde la consola del navegador
firebase.clearAllData();
```

### **Reiniciar completamente:**
```javascript
// Limpiar localStorage completamente
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### **Ventajas:**
- ✅ Funciona inmediatamente
- ✅ No requiere configuración extra
- ✅ Base completamente limpia
- ✅ Misma interfaz de la app

### **Desventajas:**
- ❌ Datos se pierden al limpiar navegador
- ❌ Solo funciona localmente

---

## 🌐 **Opción 3: JSON Server (API Real Local)**

### **¿Qué es?**
Servidor local con API REST real usando JSON Server.

### **Configuración:**

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor:**
   ```bash
   npm start
   ```
   El servidor correrá en: http://localhost:3001

3. **Reemplazar configuración:**
   ```html
   <!-- En tus archivos HTML, reemplazar: -->
   <script src="firebase-config.js"></script>
   
   <!-- Por: -->
   <script src="api-client.js"></script>
   ```

4. **Verificar conexión:**
   - Abrir: http://localhost:3001/users
   - Debe mostrar: `[]` (array vacío)

### **Comandos útiles:**
```bash
# Iniciar servidor
npm start

# Limpiar base de datos
npm run clean-db

# Hacer respaldo
npm run backup-db

# Restaurar respaldo
npm run restore-db
```

### **Endpoints disponibles:**
- `GET /users` - Obtener usuarios
- `POST /users` - Crear usuario  
- `GET /jobs` - Obtener empleos
- `POST /jobs` - Crear empleo
- `GET /applications` - Obtener aplicaciones
- `POST /applications` - Crear aplicación

### **Ventajas:**
- ✅ API REST real
- ✅ Base de datos persistente
- ✅ Fácil de respaldar
- ✅ Se puede usar desde múltiples dispositivos
- ✅ Estructura profesional

### **Desventajas:**
- ❌ Requiere Node.js instalado
- ❌ Servidor debe estar corriendo
- ❌ Solo accesible en red local

---

## 🚀 **¿Cuál elegir?**

### **Para desarrollo/pruebas:**
👉 **Opción 2** (Base Limpia) - Más rápida de implementar

### **Para producción simple:**
👉 **Opción 3** (JSON Server) - API real pero local

### **Para producción profesional:**
👉 **Opción 1** (Firebase) - Escalable y en la nube

---

## 🔧 **Implementación Actual**

**Estado:** Opción 2 ya implementada
- ✅ Base de datos limpia sin datos precargados
- ✅ Funciona inmediatamente
- ✅ Compatible con toda la aplicación

**Para probar:**
1. Abrir aplicación
2. Registrar nuevo usuario
3. Publicar empleos
4. Ver que NO hay datos previos

---

## 📊 **Verificar Base Limpia**

```javascript
// Ejecutar en consola del navegador
console.log('Usuarios:', firebase.users.length);        // Debe ser 0
console.log('Empleos:', firebase.jobs.length);          // Debe ser 0  
console.log('Aplicaciones:', firebase.applications.length); // Debe ser 0
```

---

## 🛠️ **Comandos de Limpieza**

### **Limpiar todo (localStorage):**
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### **Limpiar solo datos de la app:**
```javascript
firebase.clearAllData();
```

### **Verificar si está limpia:**
```javascript
firebase.getStats().then(stats => console.log(stats));
```

---

¡Tu base de datos está lista para empezar sin datos precargados! 🎉 