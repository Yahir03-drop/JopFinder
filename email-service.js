// Servicio de Email para JobFinder usando EmailJS
// Envía notificaciones automáticas de registro

class EmailService {
  constructor() {
    // ⚠️ REEMPLAZAR CON TUS CLAVES REALES DE EMAILJS ⚠️
    this.emailjsPublicKey = 'TU_PUBLIC_KEY_AQUI'; // Paso 4: Public Key de EmailJS
    this.serviceId = 'TU_SERVICE_ID_AQUI'; // Paso 4: Service ID de Gmail
    this.templateId = 'template_welcome'; // Paso 3: ID de la plantilla creada
    this.isInitialized = false;
    
    this.initializeEmailJS();
  }

  // Inicializar EmailJS
  async initializeEmailJS() {
    try {
      // Cargar EmailJS SDK si no está cargado
      if (typeof emailjs === 'undefined') {
        await this.loadEmailJS();
      }
      
      // Inicializar con tu public key
      emailjs.init(this.emailjsPublicKey);
      this.isInitialized = true;
      console.log('✅ EmailJS inicializado correctamente');
      
    } catch (error) {
      console.error('❌ Error al inicializar EmailJS:', error);
    }
  }

  // Cargar EmailJS SDK dinámicamente
  loadEmailJS() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Enviar email de bienvenida al registrarse
  async sendWelcomeEmail(userData) {
    try {
      if (!this.isInitialized) {
        await this.initializeEmailJS();
      }

      const templateParams = {
        to_name: userData.name || userData.email.split('@')[0],
        to_email: userData.email,
        user_type: userData.userType === 'employer' ? 'Empleador' : 'Candidato',
        registration_date: new Date().toLocaleDateString('es-MX'),
        login_url: window.location.origin + '/login.html',
        dashboard_url: window.location.origin + '/dashboard.html',
        company_name: 'JobFinder',
        support_email: 'soporte@jobfinder.com',
        logo_url: window.location.origin + '/logo-jf.svg'
      };

      console.log('📧 Enviando email de bienvenida a:', userData.email);
      
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('✅ Email de bienvenida enviado:', response);
      
      // Mostrar notificación al usuario
      this.showEmailNotification('✅ Te hemos enviado un email de bienvenida', 'success');
      
      return { success: true, response };
      
    } catch (error) {
      console.error('❌ Error al enviar email de bienvenida:', error);
      
      // Mostrar notificación de error (opcional)
      this.showEmailNotification('⚠️ No pudimos enviar el email, pero tu cuenta fue creada exitosamente', 'warning');
      
      return { success: false, error: error.message };
    }
  }

  // Enviar email de verificación
  async sendVerificationEmail(userData) {
    try {
      if (!this.isInitialized) {
        await this.initializeEmailJS();
      }

      const verificationCode = Math.random().toString(36).substr(2, 8).toUpperCase();
      
      // Guardar código de verificación temporalmente
      sessionStorage.setItem(`verification_${userData.email}`, verificationCode);

      const templateParams = {
        to_name: userData.name || userData.email.split('@')[0],
        to_email: userData.email,
        verification_code: verificationCode,
        verification_url: `${window.location.origin}/verify.html?code=${verificationCode}&email=${encodeURIComponent(userData.email)}`,
        company_name: 'JobFinder'
      };

      const response = await emailjs.send(
        this.serviceId,
        'template_verification', // Template diferente para verificación
        templateParams
      );

      console.log('✅ Email de verificación enviado:', response);
      return { success: true, verificationCode, response };
      
    } catch (error) {
      console.error('❌ Error al enviar email de verificación:', error);
      return { success: false, error: error.message };
    }
  }

  // Enviar notificación de nueva aplicación a empleador
  async sendApplicationNotification(jobData, applicantData) {
    try {
      if (!this.isInitialized) {
        await this.initializeEmailJS();
      }

      const templateParams = {
        to_name: jobData.companyName || 'Empleador',
        to_email: jobData.contactEmail,
        job_title: jobData.title,
        applicant_name: applicantData.name,
        applicant_email: applicantData.email,
        application_date: new Date().toLocaleDateString('es-MX'),
        dashboard_url: window.location.origin + '/empresarios.html',
        company_name: 'JobFinder'
      };

      const response = await emailjs.send(
        this.serviceId,
        'template_application', // Template para notificaciones de aplicación
        templateParams
      );

      console.log('✅ Notificación de aplicación enviada al empleador');
      return { success: true, response };
      
    } catch (error) {
      console.error('❌ Error al enviar notificación de aplicación:', error);
      return { success: false, error: error.message };
    }
  }

  // Mostrar notificación visual al usuario
  showEmailNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `email-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Agregar estilos si no existen
    this.addNotificationStyles();

    // Agregar al DOM
    document.body.appendChild(notification);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  // Agregar estilos para notificaciones
  addNotificationStyles() {
    if (document.getElementById('emailNotificationStyles')) return;

    const styles = document.createElement('style');
    styles.id = 'emailNotificationStyles';
    styles.textContent = `
      .email-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
      }

      .email-notification.success {
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
      }

      .email-notification.warning {
        background: linear-gradient(135deg, #ffc107, #fd7e14);
        color: #212529;
      }

      .email-notification.info {
        background: linear-gradient(135deg, #17a2b8, #007bff);
        color: white;
      }

      .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .notification-message {
        flex: 1;
        font-weight: 500;
      }

      .notification-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: inherit;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .notification-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @media (max-width: 768px) {
        .email-notification {
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // Verificar configuración
  isConfigured() {
    return this.emailjsPublicKey !== 'TU_PUBLIC_KEY_EMAILJS' && 
           this.serviceId !== 'TU_SERVICE_ID' && 
           this.templateId !== 'TU_TEMPLATE_ID';
  }

  // Mostrar instrucciones de configuración
  showConfigurationInstructions() {
    console.log(`
🔧 CONFIGURACIÓN DE EMAILJS REQUERIDA:

1. Crear cuenta en https://www.emailjs.com
2. Crear un servicio (Gmail, Outlook, etc.)
3. Crear un template con estas variables:
   - {{to_name}} - Nombre del usuario
   - {{to_email}} - Email del usuario
   - {{user_type}} - Tipo de usuario
   - {{registration_date}} - Fecha de registro
   - {{login_url}} - URL de login
   - {{dashboard_url}} - URL del dashboard
   - {{company_name}} - Nombre de la empresa

4. Reemplazar en email-service.js:
   - emailjsPublicKey: 'tu_public_key'
   - serviceId: 'tu_service_id'
   - templateId: 'tu_template_id'

5. Incluir en HTML:
   <script src="email-service.js"></script>
    `);
  }
}

// Crear instancia global
const emailService = new EmailService();

// Verificar configuración al cargar
if (!emailService.isConfigured()) {
  emailService.showConfigurationInstructions();
}

// Exportar para uso global
window.emailService = emailService;

// Para módulos ES6
export default emailService; 