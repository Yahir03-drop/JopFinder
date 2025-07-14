# JobFinder 💼

Una aplicación web moderna para buscar empleos, desarrollada con HTML, CSS y JavaScript vanilla.

## 🚀 Características

- **Sistema de Suscripciones con Stripe**: Monetización completa con planes Premium y Empresa
- **Dashboard de Usuario**: Panel completo para gestionar cuenta y suscripciones
- **Sistema de Login Atractivo**: Página de login moderna con animaciones y efectos visuales
- **Autenticación de Usuario**: Login con validación y manejo de sesiones
- **Búsqueda inteligente**: Busca empleos por título, empresa, descripción o habilidades
- **Filtros avanzados**: Filtra por categoría, experiencia y tipo de empleo
- **Búsqueda por ubicación**: Encuentra empleos en ciudades específicas
- **Interfaz responsive**: Funciona perfectamente en desktop, tablet y móvil
- **Modales informativos**: Ve detalles completos de cada empleo
- **Diseño moderno**: Interfaz atractiva con gradientes y animaciones suaves
- **Gestión de Favoritos**: Guarda empleos favoritos (requiere login)
- **Aplicaciones Mejoradas**: Sistema de aplicación a empleos con seguimiento
- **Analytics y Estadísticas**: Seguimiento de aplicaciones y vistas de perfil

## 📋 Funcionalidades

### Página Principal
- Hero section con buscador principal
- Navegación suave entre secciones
- Diseño atractivo con gradientes

### Sistema de Búsqueda
- Búsqueda en tiempo real
- Filtros por categoría (Tecnología, Marketing, Diseño, etc.)
- Filtros por experiencia (Junior, Semi-senior, Senior)
- Filtros por tipo de empleo (Tiempo completo, Remoto, Freelance)
- Búsqueda por ubicación

### Lista de Empleos
- Tarjetas de empleo con información esencial
- Paginación con "Cargar más empleos"
- Contador de resultados
- Tags de habilidades
- Información de salario, ubicación y tipo

### Modal de Detalles
- Descripción completa del puesto
- Lista de requisitos
- Información de la empresa
- Botones para aplicar y guardar empleo

### Sistema de Login y Registro
- **Página de login moderna** con diseño glassmorphism
- **Sistema de registro completo** con validaciones avanzadas
- **Animaciones flotantes** en el fondo
- **Validación en tiempo real** de formularios
- **Indicador de fuerza de contraseña** visual
- **Verificación de emails duplicados** automática
- **Login/Registro social** simulado (Google, LinkedIn)
- **Gestión de sesiones** con localStorage y sessionStorage
- **Credenciales de prueba** incluidas para testing
- **Efectos de loading** y mensajes de feedback
- **Responsive design** optimizado para móviles
- **Términos y condiciones** y política de privacidad

### Gestión de Usuarios
- **Menú de usuario** integrado en el header
- **Perfil de usuario** con información básica
- **Sistema de favoritos** para guardar empleos
- **Logout seguro** con confirmación
- **Estado de sesión** persistente

### Sistema de Suscripciones
- **Integración con Stripe** para pagos seguros
- **Planes flexibles**: Premium (€9.99/mes) y Empresa (€99/mes)
- **Facturación mensual/anual** con descuentos
- **Gestión completa** de suscripciones desde el dashboard
- **Funciones premium** desbloqueadas automáticamente
- **Cancelación y pausa** de suscripciones
- **Historial de pagos** y facturas

### Dashboard Completo
- **Estadísticas de uso** en tiempo real
- **Gestión de suscripción** con opciones avanzadas
- **Empleos guardados** con acciones rápidas
- **Aplicaciones recientes** con estados de seguimiento
- **Configuración de cuenta** centralizada
- **Accesos rápidos** a funciones principales
- **Exportación de datos** personal

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: 
  - Flexbox y Grid para layouts
  - Variables CSS para consistencia
  - Animaciones y transiciones
  - Responsive design con media queries
- **JavaScript ES6+**:
  - Manipulación del DOM
  - Event listeners
  - Filtrado y búsqueda de datos
  - Gestión de modales

## 🎨 Características de Diseño

- **Paleta de colores moderna**: Gradientes púrpura y azul
- **Tipografía legible**: Segoe UI como fuente principal
- **Iconos**: Font Awesome para iconografía consistente
- **Efectos hover**: Animaciones suaves al interactuar
- **Responsive**: Adaptable a todos los tamaños de pantalla

## 📱 Responsividad

La aplicación se adapta perfectamente a:
- **Desktop**: Diseño en grid con múltiples columnas
- **Tablet**: Layout adaptado con menos columnas
- **Móvil**: Diseño de una columna con navegación optimizada

## 🚀 Cómo usar

1. **Clonar o descargar** los archivos del proyecto
2. **Abrir** `index.html` en tu navegador web
3. **Explorar** las funcionalidades:
   - Usa el buscador principal para encontrar empleos
   - Aplica filtros para refinar tu búsqueda
   - Haz clic en cualquier empleo para ver detalles completos
   - Haz clic en "Iniciar Sesión" para acceder al sistema de login
   - Una vez logueado, puedes aplicar y guardar empleos
   - Haz clic en "Regístrate aquí" para crear una cuenta nueva

## 📝 Sistema de Registro

El sistema de registro incluye validaciones avanzadas y funcionalidades modernas:

### Validaciones en Tiempo Real
- **Nombre completo**: Mínimo 2 caracteres, solo letras y espacios
- **Email**: Validación de formato y verificación de disponibilidad
- **Teléfono**: Campo opcional con formato validado
- **Contraseña**: Indicador visual de fuerza con 4 niveles
- **Confirmación**: Verificación automática de coincidencia

### Indicador de Fuerza de Contraseña
- 🔴 **Muy débil**: Menos de 8 caracteres o pocos criterios
- 🟡 **Débil**: Cumple algunos criterios básicos
- 🟢 **Buena**: Incluye mayúsculas, minúsculas y números
- 💚 **Fuerte**: Incluye caracteres especiales y todos los criterios

### Funcionalidades Adicionales
- ✅ **Auto-login** después del registro exitoso
- 📧 **Verificación de email duplicado** en tiempo real
- 🔒 **Toggle de visibilidad** para contraseñas
- 📱 **Registro social** con Google y LinkedIn
- 📋 **Términos y condiciones** y política de privacidad
- 💌 **Suscripción opcional** a newsletter

## 🔐 Credenciales de Prueba

Para probar el sistema de login, puedes usar estas credenciales:

### Usuario Administrador
- **Email**: `admin@jobfinder.com`
- **Contraseña**: `admin123`

### Usuario Demo
- **Email**: `demo@demo.com`
- **Contraseña**: `demo123`

### Usuario Ejemplo
- **Email**: `usuario@ejemplo.com`
- **Contraseña**: `usuario123`

<!-- Tooltip de credenciales removido por seguridad -->

## 📁 Estructura del Proyecto

```
JobFinder/
├── index.html              # Página principal con sistema de usuarios
├── login.html              # Página de login y registro
├── pricing.html            # Página de planes y precios
├── dashboard.html          # Dashboard de usuario
├── styles.css              # Estilos de la aplicación principal
├── login-styles.css        # Estilos específicos del login
├── pricing-styles.css      # Estilos de la página de precios
├── dashboard-styles.css    # Estilos del dashboard
├── script.js               # Lógica principal de JavaScript
├── login-script.js         # Lógica del sistema de login
├── pricing-script.js       # Lógica de suscripciones y Stripe
├── dashboard-script.js     # Lógica del dashboard
└── README.md               # Documentación completa
```

## 🔧 Personalización

### Agregar Nuevos Empleos
Edita el array `jobsData` en `script.js`:

```javascript
{
    id: 9,
    title: "Tu nuevo empleo",
    company: "Tu empresa",
    location: "Tu ciudad",
    type: "tiempo-completo",
    experience: "mid",
    category: "tecnologia",
    salary: "€XX,XXX - €XX,XXX",
    description: "Descripción del empleo...",
    requirements: ["Requisito 1", "Requisito 2"],
    tags: ["Tag1", "Tag2"],
    posted: "Hace X días",
    featured: false
}
```

### Modificar Estilos
- **Colores**: Edita las variables CSS en `styles.css`
- **Fuentes**: Cambia la font-family en el selector `body`
- **Layouts**: Modifica las propiedades de Grid y Flexbox

## ✨ Características del Login

### Diseño Visual
- **Gradientes modernos** que mantienen la coherencia con JobFinder
- **Efectos glassmorphism** con transparencias y blur
- **Animaciones flotantes** con formas geométricas en el fondo
- **Transiciones suaves** en todos los elementos interactivos
- **Diseño split-screen** con información y formulario

### Funcionalidades Técnicas
- **Validación en tiempo real** de email y contraseña
- **Toggle de visibilidad** para contraseñas
- **Remember me** con persistencia en localStorage
- **Loading states** con spinners animados
- **Mensajes de error/éxito** con animaciones
- **Auto-logout** por seguridad
- **Prevención de sesiones duplicadas**

### Experiencia de Usuario
- **Credenciales pre-cargadas** para testing rápido
- **Transiciones suaves** entre login y registro
- **Panel de información dinámico** que se actualiza según el contexto
- **Login/Registro social simulado** (Google, LinkedIn)
- **Responsive design** optimizado para móviles
- **Interface limpia** sin distracciones
- **Feedback visual** en todos los estados
- **Validación instantánea** con iconos de estado
- **Mensajes contextuales** de error y éxito

## 💳 Configuración de Stripe

Para activar los pagos reales, sigue estos pasos:

### 1. Crear Cuenta en Stripe
1. Ve a [stripe.com](https://stripe.com) y crea una cuenta
2. Completa la verificación de tu empresa
3. Obtén tus claves API (Publishable Key y Secret Key)

### 2. Configurar las Claves
En `pricing-script.js`, reemplaza la clave de prueba:
```javascript
// Reemplazar con tu clave pública real
const stripe = Stripe('pk_live_tu_clave_publica_aqui');
```

### 3. Crear Productos en Stripe
1. En el dashboard de Stripe, ve a "Products"
2. Crea productos para:
   - **JobFinder Premium**: €9.99/mes y €95.88/año
   - **JobFinder Empresa**: €99/mes y €950.40/año
3. Copia los Price IDs y actualízalos en `PLANS` en `pricing-script.js`

### 4. Configurar Webhooks
Para manejar eventos de Stripe (pagos exitosos, cancelaciones):
1. Configura un endpoint webhook en tu servidor
2. Maneja eventos como `checkout.session.completed`
3. Actualiza el estado de suscripción en tu base de datos

### 5. Backend Requerido
Para producción necesitarás:
- Servidor backend (Node.js, Python, PHP, etc.)
- Base de datos para usuarios y suscripciones
- Endpoints para crear sesiones de checkout
- Manejo de webhooks de Stripe

## 💰 Potencial de Monetización

### Ingresos Proyectados
- **100 usuarios Premium** × €9.99 = €999/mes
- **20 empresas** × €99 = €1,980/mes
- **Total**: €2,979/mes (€35,748/año)

### Estrategias Adicionales
- **Empleos destacados**: €50-200 por publicación
- **Publicidad**: Google AdSense, banners
- **Marketing de afiliados**: Cursos, libros, herramientas
- **Servicios premium**: Revisión de CV, coaching

## 🌟 Funcionalidades Futuras

- Integración con APIs reales de empleos
- Backend con base de datos real
- Aplicación móvil nativa
- Sistema de notificaciones push
- Matching con IA
- Video entrevistas integradas
- Análisis de mercado laboral
- API para terceros

## 📧 Contacto

Si tienes preguntas o sugerencias sobre la aplicación, no dudes en contactar.

---

**¡Encuentra tu trabajo ideal con JobFinder! 🎯** 