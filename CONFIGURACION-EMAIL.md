# 📧 Configuración de Notificaciones por Email

## 🎯 **¿Qué hace?**

Envía emails automáticos cuando:
- ✅ Usuario se registra → **Email de bienvenida**
- ✅ Usuario aplica a empleo → **Notificación al empleador**  
- ✅ Verificación de cuenta → **Código de verificación**

---

## 🚀 **Opción 1: EmailJS (Recomendado - Gratis)**

### **Paso 1: Crear cuenta**
1. Ir a [EmailJS.com](https://www.emailjs.com)
2. Crear cuenta gratuita
3. Confirmar email

### **Paso 2: Configurar servicio de email**
1. **Add Service** → Elegir **Gmail** (más fácil)
2. Conectar tu cuenta Gmail
3. Copiar el **Service ID** (ej: `service_xxxxxx`)

### **Paso 3: Crear plantillas**
1. **Add Template** → Usar estas plantillas:

#### 📩 **Template Bienvenida** (ID: `template_welcome`)
```html
Asunto: 🎉 ¡Bienvenido a JobFinder!

Hola {{to_name}},

¡Gracias por unirte a JobFinder! Tu cuenta como {{user_type}} ha sido creada el {{registration_date}}.

🚀 Próximos pasos:
- Completa tu perfil
- Explora oportunidades  
- Configura alertas

[Ir al Dashboard]({{dashboard_url}})

Saludos,
El equipo de {{company_name}}
```

#### 🔐 **Template Verificación** (ID: `template_verification`)
```html
Asunto: 🔐 Verifica tu cuenta - JobFinder

Hola {{to_name}},

Tu código de verificación: {{verification_code}}

[Verificar Cuenta]({{verification_url}})

El equipo de {{company_name}}
```

### **Paso 4: Obtener claves**
1. **Account** → **API Keys** → Copiar **Public Key**
2. **Templates** → Copiar **Template IDs**
3. **Services** → Copiar **Service ID**

### **Paso 5: Configurar en código**
Editar `email-service.js`:

```javascript
// Reemplazar estas líneas:
this.emailjsPublicKey = 'tu_public_key_real';
this.serviceId = 'service_xxxxxx';  
this.templateId = 'template_welcome';
```

---

## ✅ **Probar configuración**

### **En consola del navegador:**
```javascript
// Probar email de bienvenida
emailService.sendWelcomeEmail({
    name: 'Juan Pérez',
    email: 'tu_email@gmail.com',
    userType: 'candidate'
});
```

### **Registrar usuario real:**
1. Ir a página de registro
2. Crear cuenta nueva
3. ¡Deberías recibir email automáticamente!

---

## 🎯 **Estado Actual**

### **✅ YA IMPLEMENTADO:**
- 📧 Servicio de email (`email-service.js`)
- 🔗 Integrado con registro de usuarios
- 🎨 Plantillas HTML listas (`email-templates.html`)
- 📱 Notificaciones visuales
- 🔄 Fallback a simulación si no está configurado

### **⚙️ SOLO FALTA:**
1. Crear cuenta EmailJS (2 minutos)
2. Configurar Gmail (1 minuto)  
3. Copiar plantillas (3 minutos)
4. Pegar claves en código (1 minuto)

**Total: ~7 minutos de configuración**

---

## 🌟 **Funcionalidades Incluidas**

### **📧 Emails automáticos:**
- **Registro** → Email de bienvenida
- **Aplicación** → Notificación al empleador
- **Verificación** → Código por email

### **🎨 Notificaciones visuales:**
- ✅ Email enviado exitosamente
- ⚠️ Error en envío (pero no interrumpe el registro)
- 💡 Configuración pendiente

### **🔄 Sistema híbrido:**
- **Con EmailJS** → Emails reales
- **Sin EmailJS** → Simulación local + notificación

---

## 🛠️ **Alternativas (Avanzadas)**

### **Opción 2: Nodemailer + SMTP**
```javascript
// Para usar con JSON Server (Opción 3 de BD)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'tu_email@gmail.com',
    pass: 'tu_app_password'
  }
});
```

### **Opción 3: Firebase Functions**
```javascript
// Para Firebase real (Opción 1 de BD)
const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

exports.sendWelcomeEmail = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    // Enviar email con SendGrid
  });
```

---

## 🔍 **Solución de Problemas**

### **❌ Email no llega:**
1. Verificar spam/promociones
2. Revisar claves en `email-service.js`
3. Comprobar consola del navegador
4. Verificar plantillas en EmailJS

### **❌ Error de CORS:**
```javascript
// Agregar en EmailJS dashboard:
// Allowed Origins: tu_dominio.com, localhost
```

### **❌ Plantilla no encontrada:**
```javascript
// Verificar que el Template ID coincida exactamente
this.templateId = 'template_welcome'; // ← Debe coincidir con EmailJS
```

---

## 📋 **Checklist Final**

- [ ] Cuenta EmailJS creada
- [ ] Servicio Gmail conectado  
- [ ] 3 plantillas creadas
- [ ] Claves copiadas en código
- [ ] Prueba desde consola exitosa
- [ ] Registro real funciona
- [ ] Email recibido en bandeja

---

¡Una vez configurado, **TODOS** los usuarios nuevos recibirán emails automáticamente! 🎉 