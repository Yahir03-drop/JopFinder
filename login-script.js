// JobFinder Login System con Firebase
// Sistema de autenticación mejorado con persistencia real

// Variables globales
let isLoginMode = true;

// Inicialización cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar modo de login por defecto
    const container = document.querySelector('.login-form-container');
    if (container) {
        container.classList.add('login-mode');
    }
    
    // Activar imagen de hero en el panel de información
    const infoPanel = document.querySelector('.info-panel');
    if (infoPanel) {
        infoPanel.classList.add('with-hero-image');
    }
    
    // Esperar a que Firebase esté listo
    if (window.firebaseDemo) {
        setupEventListeners();
        checkExistingSession();
    } else {
        // Reintento si Firebase no está listo
        setTimeout(() => {
            if (window.firebaseDemo) {
                setupEventListeners();
                checkExistingSession();
            }
        }, 500);
    }
});

// Configurar event listeners
function setupEventListeners() {
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Botones sociales
    const googleBtn = document.querySelector('.google-btn');
    const linkedinBtn = document.querySelector('.linkedin-btn');
    
    if (googleBtn) googleBtn.addEventListener('click', () => handleSocialLogin('Google'));
    if (linkedinBtn) linkedinBtn.addEventListener('click', () => handleSocialLogin('LinkedIn'));

    // Validación de contraseña en tiempo real
    const registerPassword = document.getElementById('registerPassword');
    if (registerPassword) {
        registerPassword.addEventListener('input', checkPasswordStrength);
    }

    // Validación de confirmación de contraseña
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', validatePasswordMatch);
    }

    // Validación de email en registro
    const registerEmail = document.getElementById('registerEmail');
    if (registerEmail) {
        registerEmail.addEventListener('blur', validateEmailAvailability);
    }

    // Cerrar loading overlay al hacer clic
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.addEventListener('click', hideLoading);
    }

    // Animaciones de entrada
    setTimeout(() => {
        const loginContainer = document.querySelector('.login-form-container');
        const infoPanel = document.querySelector('.info-panel');
        if (loginContainer) loginContainer.style.animation = 'slideInLeft 0.8s ease-out';
        if (infoPanel) infoPanel.style.animation = 'slideInRight 0.8s ease-out';
    }, 100);
}

// Manejar el envío del formulario de login con Firebase
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validación básica
    if (!validateEmail(email)) {
        showError('Por favor, ingresa un email válido');
        return;
    }

    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Mostrar loading
    showLoading();

    try {
        // Usar Firebase para autenticación
        const result = await window.firebaseDemo.signInWithEmailAndPassword(email, password);
        
        if (result.success) {
            const user = result.user;
            
            // Guardar en recordarme si está marcado
            if (rememberMe) {
                localStorage.setItem('rememberedUser', email);
            }
            
            // Guardar sesión
            sessionStorage.setItem('currentUser', JSON.stringify({
                uid: user.uid,
                name: user.name,
                email: user.email,
                userType: user.userType,
                loginTime: new Date().toISOString()
            }));
            
            showSuccess(`¡Bienvenido de vuelta, ${user.name}!`);
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        } else {
            hideLoading();
            showError(result.error || 'Email o contraseña incorrectos');
        }
    } catch (error) {
        hideLoading();
        console.error('Error en login:', error);
        showError('Error al conectar con el servidor');
    }
}

// Validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar/ocultar contraseña
function togglePassword(inputId = 'password') {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput ? passwordInput.parentElement.querySelector('.toggle-password') : null;
    
    if (passwordInput && toggleIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }
}

// Manejar login social con Firebase
async function handleSocialLogin(provider) {
    showLoading();
    
    try {
        let result;
        
        if (provider === 'Google') {
            result = await window.firebaseDemo.signInWithGoogle();
        } else {
            // Simular LinkedIn (no implementado en Firebase Demo)
            result = {
                success: true,
                user: {
                    uid: 'linkedin_' + Date.now(),
                    name: 'Usuario LinkedIn',
                    email: 'usuario.linkedin@example.com',
                    userType: 'candidate',
                    provider: 'linkedin'
                }
            };
        }
        
        if (result.success) {
            const user = result.user;
            
            sessionStorage.setItem('currentUser', JSON.stringify({
                uid: user.uid,
                name: user.name,
                email: user.email,
                userType: user.userType,
                provider: user.provider,
                loginTime: new Date().toISOString()
            }));
            
            showSuccess(`¡Conectado con ${provider}!`);
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            hideLoading();
            showError(result.error || `Error al conectar con ${provider}`);
        }
    } catch (error) {
        hideLoading();
        console.error(`Error en ${provider} login:`, error);
        showError(`Error al conectar con ${provider}`);
    }
}

// Mostrar loading
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

// Ocultar loading
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Mostrar mensaje de error
function showError(message) {
    // Eliminar mensaje anterior si existe
    removeExistingMessage();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    const form = document.querySelector('.login-form');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
        
        // Animar entrada
        setTimeout(() => errorDiv.classList.add('show'), 10);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.classList.remove('show');
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 5000);
    }
}

// Mostrar mensaje de éxito
function showSuccess(message) {
    removeExistingMessage();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    const form = document.querySelector('.login-form');
    if (form) {
        form.insertBefore(successDiv, form.firstChild);
        setTimeout(() => successDiv.classList.add('show'), 10);
    }
}

// Remover mensajes existentes
function removeExistingMessage() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
}

// Funciones de credenciales removidas por seguridad

// Animación de typing
function animateTyping(inputId, text) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.value = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        input.value += text[i];
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Verificar si el usuario ya está logueado
function checkExistingSession() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        // Usuario ya logueado, redirigir a la página principal
        window.location.href = 'index.html';
    }
    
    // Verificar si hay un usuario recordado
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('email').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
}

// Estilos CSS adicionales para mensajes y tooltip
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .error-message, .success-message {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 0.9rem;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    }
    
    .error-message {
        background: #fee;
        color: #c53030;
        border: 1px solid #fed7d7;
    }
    
    .success-message {
        background: #f0fff4;
        color: #2f855a;
        border: 1px solid #c6f6d5;
    }
    
    .error-message.show, .success-message.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .credentials-info {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        padding: 20px;
        max-width: 300px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    }
    
    .credentials-info.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .credentials-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-weight: 600;
        color: #667eea;
    }
    
    .close-tooltip {
        margin-left: auto;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #999;
    }
    
    .credentials-list p {
        margin: 5px 0;
        font-size: 0.9rem;
    }
    
    .credentials-list hr {
        margin: 10px 0;
        border: none;
        border-top: 1px solid #eee;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @media (max-width: 768px) {
        .credentials-info {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

document.head.appendChild(additionalStyles);

// Verificar sesión al cargar
checkExistingSession();

// ===== FUNCIONES DE REGISTRO =====

// Mostrar formulario de registro
function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const container = document.querySelector('.login-form-container');
    
    if (loginForm && registerForm) {
        loginForm.classList.add('form-transition-out');
        setTimeout(() => {
            loginForm.classList.add('hidden');
            loginForm.classList.remove('form-transition-out');
            registerForm.classList.remove('hidden');
            registerForm.classList.add('show');
            isLoginMode = false;
            
            // Cambiar modo del contenedor para permitir scroll
            if (container) {
                container.classList.remove('login-mode');
                container.classList.add('register-mode');
            }
            
            // Actualizar texto del panel de información
            updateInfoPanel('register');
        }, 300);
    }
}

// Mostrar formulario de login
function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const container = document.querySelector('.login-form-container');
    
    if (loginForm && registerForm) {
        registerForm.classList.add('form-transition-out');
        setTimeout(() => {
            registerForm.classList.add('hidden');
            registerForm.classList.remove('form-transition-out', 'show');
            loginForm.classList.remove('hidden');
            loginForm.classList.add('show');
            isLoginMode = true;
            
            // Cambiar modo del contenedor para centrar el login
            if (container) {
                container.classList.remove('register-mode');
                container.classList.add('login-mode');
            }
            
            // Actualizar texto del panel de información
            updateInfoPanel('login');
        }, 300);
    }
}

// Actualizar panel de información
function updateInfoPanel(mode) {
    const infoContent = document.querySelector('.info-content');
    if (!infoContent) return;
    
    if (mode === 'register') {
        infoContent.innerHTML = `
            <h2>Únete a JobFinder</h2>
            <p>Crea tu cuenta y accede a miles de oportunidades laborales exclusivas.</p>
            
            <div class="features">
                <div class="feature">
                    <i class="fas fa-rocket"></i>
                    <span>Acceso inmediato</span>
                </div>
                <div class="feature">
                    <i class="fas fa-star"></i>
                    <span>Empleos exclusivos</span>
                </div>
                <div class="feature">
                    <i class="fas fa-shield-alt"></i>
                    <span>100% seguro</span>
                </div>
            </div>
        `;
    } else {
        infoContent.innerHTML = `
            <h2>Encuentra tu trabajo ideal</h2>
            <p>Únete a miles de profesionales que ya encontraron su oportunidad perfecta.</p>
            
            <div class="features">
                <div class="feature">
                    <i class="fas fa-search"></i>
                    <span>Búsqueda inteligente</span>
                </div>
                <div class="feature">
                    <i class="fas fa-filter"></i>
                    <span>Filtros avanzados</span>
                </div>
                <div class="feature">
                    <i class="fas fa-bell"></i>
                    <span>Alertas personalizadas</span>
                </div>
            </div>
        `;
    }
}

// Manejar registro de usuario con Firebase
async function handleRegister(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validaciones
    if (!validateRegistrationForm(fullName, email, password, confirmPassword, acceptTerms)) {
        return;
    }
    
    // Verificar si el email ya existe (con Firebase)
    if (isEmailTaken(email)) {
        showError('Este email ya está registrado. Prueba con otro o inicia sesión.');
        return;
    }
    
    showLoading();
    
    try {
        // Preparar datos del usuario
        const userData = {
            name: fullName,
            userType: 'candidate',
            phone: phone,
            newsletter: newsletter
        };
        
        // Crear usuario con Firebase
        const result = await window.firebaseDemo.createUserWithEmailAndPassword(email, password, userData);
        
        if (result.success) {
            const user = result.user;
            
            // Auto-login después del registro
            sessionStorage.setItem('currentUser', JSON.stringify({
                uid: user.uid,
                name: user.name,
                email: user.email,
                userType: user.userType,
                loginTime: new Date().toISOString()
            }));
            
            hideLoading();
            showSuccess(`¡Cuenta creada exitosamente! Bienvenido, ${user.name}. Iniciando sesión...`);
            
            // Redirigir después del auto-login
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
            
        } else {
            hideLoading();
            showError(result.error || 'Error al crear la cuenta');
        }
    } catch (error) {
        hideLoading();
        console.error('Error en registro:', error);
        showError('Error al conectar con el servidor');
    }
}

// Validar formulario de registro
function validateRegistrationForm(fullName, email, password, confirmPassword, acceptTerms) {
    // Limpiar errores previos
    clearValidationErrors();
    
    let isValid = true;
    
    // Validar nombre completo
    if (fullName.length < 2) {
        showFieldError('fullName', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(fullName)) {
        showFieldError('fullName', 'El nombre solo puede contener letras y espacios');
        isValid = false;
    }
    
    // Validar email
    if (!validateEmail(email)) {
        showFieldError('registerEmail', 'Por favor, ingresa un email válido');
        isValid = false;
    }
    
    // Validar contraseña
    const passwordStrength = getPasswordStrength(password);
    if (passwordStrength.score < 2) {
        showFieldError('registerPassword', 'La contraseña es muy débil. ' + passwordStrength.feedback);
        isValid = false;
    }
    
    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
        showFieldError('confirmPassword', 'Las contraseñas no coinciden');
        isValid = false;
    }
    
    // Validar términos
    if (!acceptTerms) {
        showError('Debes aceptar los términos y condiciones para continuar');
        isValid = false;
    }
    
    return isValid;
}

// Verificar si el email ya está registrado (con Firebase)
function isEmailTaken(email) {
    if (!window.firebaseDemo) return false;
    
    const firebaseUsers = window.firebaseDemo.users || [];
    return firebaseUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Validar disponibilidad de email
function validateEmailAvailability() {
    const emailInput = document.getElementById('registerEmail');
    const email = emailInput.value.trim();
    
    if (email && validateEmail(email)) {
        if (isEmailTaken(email)) {
            showFieldError('registerEmail', 'Este email ya está registrado');
            emailInput.classList.add('invalid');
        } else {
            showFieldSuccess('registerEmail', 'Email disponible');
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
        }
    }
}

// Verificar fuerza de contraseña
function checkPasswordStrength() {
    const passwordInput = document.getElementById('registerPassword');
    const password = passwordInput.value;
    const strengthIndicator = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthIndicator.className = 'password-strength';
        strengthText.textContent = 'Ingresa una contraseña';
        return;
    }
    
    const strength = getPasswordStrength(password);
    
    // Actualizar indicador visual
    strengthIndicator.className = `password-strength strength-${strength.level}`;
    strengthText.textContent = strength.text;
    
    // Actualizar clases del input
    if (strength.score >= 2) {
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    } else {
        passwordInput.classList.remove('valid');
        passwordInput.classList.add('invalid');
    }
}

// Obtener fuerza de contraseña
function getPasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    // Longitud
    if (password.length >= 8) score++;
    else feedback.push('al menos 8 caracteres');
    
    // Minúsculas
    if (/[a-z]/.test(password)) score++;
    else feedback.push('una letra minúscula');
    
    // Mayúsculas
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('una letra mayúscula');
    
    // Números
    if (/\d/.test(password)) score++;
    else feedback.push('un número');
    
    // Caracteres especiales
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    else feedback.push('un carácter especial');
    
    const levels = ['weak', 'fair', 'good', 'strong'];
    const texts = [
        'Muy débil',
        'Débil', 
        'Buena',
        'Fuerte'
    ];
    
    const level = levels[Math.min(score, 3)];
    const text = texts[Math.min(score, 3)];
    
    return {
        score,
        level,
        text,
        feedback: feedback.length > 0 ? `Necesita: ${feedback.join(', ')}` : ''
    };
}

// Validar coincidencia de contraseñas
function validatePasswordMatch() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmInput = document.getElementById('confirmPassword');
    
    if (confirmPassword) {
        if (password === confirmPassword) {
            showFieldSuccess('confirmPassword', 'Las contraseñas coinciden');
            confirmInput.classList.remove('invalid');
            confirmInput.classList.add('valid');
        } else {
            showFieldError('confirmPassword', 'Las contraseñas no coinciden');
            confirmInput.classList.remove('valid');
            confirmInput.classList.add('invalid');
        }
    }
}

// Mostrar error en campo específico
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Remover mensaje anterior
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();
    
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>${message}</span>`;
    
    field.parentElement.appendChild(errorDiv);
    field.classList.add('invalid');
    field.classList.remove('valid');
}

// Mostrar éxito en campo específico
function showFieldSuccess(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Remover mensajes anteriores
    const existingMessages = field.parentElement.querySelectorAll('.field-error, .field-success');
    existingMessages.forEach(msg => msg.remove());
    
    // Crear nuevo mensaje de éxito
    const successDiv = document.createElement('div');
    successDiv.className = 'field-success';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
    
    field.parentElement.appendChild(successDiv);
    field.classList.add('valid');
    field.classList.remove('invalid');
}

// Limpiar errores de validación
function clearValidationErrors() {
    const errorMessages = document.querySelectorAll('.field-error, .field-success');
    errorMessages.forEach(msg => msg.remove());
    
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
        input.classList.remove('invalid', 'valid');
    });
}

// Manejar registro social
function handleSocialRegister(provider) {
    showLoading();
    
    setTimeout(() => {
        const socialUser = {
            id: Date.now(),
            email: `usuario@${provider.toLowerCase()}.com`,
            name: `Usuario de ${provider}`,
            provider: provider,
            registeredAt: new Date().toISOString(),
            isVerified: true
        };
        
        // Agregar a usuarios registrados
        registeredUsers.push(socialUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        sessionStorage.setItem('currentUser', JSON.stringify(socialUser));
        showSuccess(`¡Cuenta creada con ${provider}!`);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    }, 1500);
}

// Mostrar términos y condiciones
function showTerms() {
    alert(`Términos y Condiciones de JobFinder

1. Uso del Servicio
- JobFinder es una plataforma de búsqueda de empleo
- Los usuarios deben proporcionar información veraz
- Está prohibido el uso para fines fraudulentos

2. Privacidad
- Respetamos tu privacidad y protegemos tus datos
- No compartimos información personal sin consentimiento
- Puedes eliminar tu cuenta en cualquier momento

3. Responsabilidades
- Los usuarios son responsables de sus aplicaciones
- JobFinder facilita la conexión pero no garantiza empleos
- Las empresas son responsables de sus ofertas

4. Modificaciones
- Nos reservamos el derecho de modificar estos términos
- Los cambios serán notificados a los usuarios

Al crear una cuenta, aceptas estos términos.`);
}

// Mostrar política de privacidad
function showPrivacy() {
    alert(`Política de Privacidad de JobFinder

1. Información que Recopilamos
- Datos de perfil: nombre, email, teléfono
- Preferencias de búsqueda y aplicaciones
- Información de uso de la plataforma

2. Uso de la Información
- Personalizar tu experiencia de búsqueda
- Conectarte con oportunidades relevantes
- Mejorar nuestros servicios
- Comunicaciones sobre empleos (si lo autorizas)

3. Protección de Datos
- Utilizamos encriptación para proteger tu información
- No vendemos tus datos a terceros
- Acceso limitado solo a personal autorizado

4. Tus Derechos
- Acceder a tu información personal
- Corregir datos incorrectos
- Eliminar tu cuenta y datos
- Desactivar comunicaciones promocionales

5. Contacto
- Para consultas sobre privacidad: privacy@jobfinder.com

Última actualización: Enero 2024`);
}

// ===== SISTEMA DE EMAILS =====

// Configuración de EmailJS (NECESITAS CONFIGURAR TU CUENTA)
const EMAILJS_CONFIG = {
    serviceID: 'service_jobfinder', // Tu Service ID de EmailJS
    templateID: 'template_welcome', // Tu Template ID de EmailJS  
    publicKey: 'YOUR_PUBLIC_KEY',   // Tu Public Key de EmailJS
    enabled: false // Cambiar a true cuando tengas configurado EmailJS
};

// Inicializar EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.enabled) {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS inicializado correctamente');
    } else {
        console.log('EmailJS no disponible o deshabilitado - usando simulación');
    }
}

// Enviar email de bienvenida
async function sendWelcomeEmail(user) {
    console.log(`📧 Enviando email de bienvenida a: ${user.email}`);
    
    if (EMAILJS_CONFIG.enabled && typeof emailjs !== 'undefined') {
        // VERSIÓN REAL CON EMAILJS
        try {
            const templateParams = {
                to_email: user.email,
                to_name: user.name,
                from_name: 'JobFinder',
                subject: '¡Bienvenido a JobFinder!',
                message: createWelcomeEmailHTML(user),
                reply_to: 'noreply@jobfinder.com'
            };
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                templateParams
            );
            
            console.log('✅ Email enviado exitosamente:', response);
            showEmailNotification(user.email, 'success');
            
        } catch (error) {
            console.error('❌ Error enviando email:', error);
            showEmailNotification(user.email, 'error');
        }
    } else {
        // VERSIÓN SIMULADA (PARA DEMOSTRACIÓN)
        simulateEmailSending(user);
    }
}

// Simular envío de email (para demostración)
function simulateEmailSending(user) {
    console.log('🎭 Simulando envío de email...');
    
    // Simular tiempo de envío
    setTimeout(() => {
        // Crear un log visual del email enviado
        createEmailLog(user);
        
        // Mostrar notificación de éxito
        showEmailNotification(user.email, 'success');
        
        console.log('✅ Email simulado enviado exitosamente');
    }, 1000);
}

// Crear contenido HTML del email de bienvenida
function createWelcomeEmailHTML(user) {
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Bienvenido a JobFinder</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
                .content { padding: 40px 20px; }
                .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; }
                .btn { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .features { display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0; }
                .feature { flex: 1; min-width: 150px; text-align: center; }
                .feature-icon { font-size: 24px; margin-bottom: 10px; color: #667eea; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>¡Bienvenido a JobFinder!</h1>
                    <p>Tu plataforma de empleo de confianza</p>
                </div>
                
                <div class="content">
                    <h2>Hola ${user.name},</h2>
                    
                    <p>¡Gracias por unirte a JobFinder! Estamos emocionados de tenerte en nuestra comunidad de profesionales.</p>
                    
                    <p><strong>Detalles de tu cuenta:</strong></p>
                    <ul>
                        <li><strong>Email:</strong> ${user.email}</li>
                        <li><strong>Fecha de registro:</strong> ${currentDate}</li>
                        <li><strong>Estado:</strong> Cuenta verificada ✅</li>
                    </ul>
                    
                    <div class="features">
                        <div class="feature">
                            <div class="feature-icon">🔍</div>
                            <h4>Búsqueda Inteligente</h4>
                            <p>Encuentra empleos perfectos para tu perfil</p>
                        </div>
                        <div class="feature">
                            <div class="feature-icon">❤️</div>
                            <h4>Favoritos</h4>
                            <p>Guarda empleos que te interesen</p>
                        </div>
                        <div class="feature">
                            <div class="feature-icon">📊</div>
                            <h4>Dashboard</h4>
                            <p>Gestiona tus aplicaciones</p>
                        </div>
                    </div>
                    
                    <p><strong>¿Qué puedes hacer ahora?</strong></p>
                    <ul>
                        <li>Completa tu perfil profesional</li>
                        <li>Explora miles de empleos disponibles</li>
                        <li>Configura alertas personalizadas</li>
                        <li>Aplica a empleos con un solo clic</li>
                    </ul>
                    
                    <div style="text-align: center;">
                        <a href="https://jobfinder.com" class="btn">Comenzar a buscar empleos</a>
                    </div>
                    
                    <p>Si tienes alguna pregunta, nuestro equipo de soporte está aquí para ayudarte.</p>
                    
                    <p>¡Que tengas mucho éxito en tu búsqueda laboral!</p>
                    
                    <p>Saludos,<br><strong>El equipo de JobFinder</strong></p>
                </div>
                
                <div class="footer">
                    <p>Este email fue enviado a ${user.email}</p>
                    <p>JobFinder - Tu plataforma de empleo de confianza</p>
                    <p>© 2024 JobFinder. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Crear log visual del email (para demostración)
function createEmailLog(user) {
    const emailHTML = createWelcomeEmailHTML(user);
    
    // Guardar en localStorage para poder mostrarlo después
    const emailLog = {
        to: user.email,
        subject: '¡Bienvenido a JobFinder!',
        html: emailHTML,
        timestamp: new Date().toISOString(),
        status: 'sent'
    };
    
    // Guardar en historial de emails
    let emailHistory = JSON.parse(localStorage.getItem('emailHistory') || '[]');
    emailHistory.unshift(emailLog); // Agregar al inicio
    
    // Mantener solo los últimos 50 emails
    if (emailHistory.length > 50) {
        emailHistory = emailHistory.slice(0, 50);
    }
    
    localStorage.setItem('emailHistory', JSON.stringify(emailHistory));
    
    // Mostrar en consola para debugging
    console.log('📧 EMAIL ENVIADO:');
    console.log(`Para: ${user.email}`);
    console.log(`Asunto: ¡Bienvenido a JobFinder!`);
    console.log(`Hora: ${new Date().toLocaleString()}`);
}

// Mostrar notificación de email
function showEmailNotification(email, status) {
    const notification = document.createElement('div');
    notification.className = `email-notification ${status}`;
    
    const icon = status === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    const message = status === 'success' 
        ? `✅ Email de bienvenida enviado a ${email}` 
        : `❌ Error enviando email a ${email}`;
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="close-notification">×</button>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 150px;
        right: 20px;
        background: ${status === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${status === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${status === 'success' ? '#c3e6cb' : '#f5c6cb'};
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Estilos para el botón de cerrar
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: inherit;
        margin-left: 10px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remover después de 8 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 8000);
}

// Función para ver historial de emails (para debugging)
function showEmailHistory() {
    const history = JSON.parse(localStorage.getItem('emailHistory') || '[]');
    
    if (history.length === 0) {
        console.log('📧 No hay emails en el historial');
        return;
    }
    
    console.log(`📧 HISTORIAL DE EMAILS (${history.length} emails):`);
    history.forEach((email, index) => {
        console.log(`${index + 1}. Para: ${email.to} | ${email.subject} | ${new Date(email.timestamp).toLocaleString()}`);
    });
}

// Función para configurar EmailJS (instrucciones)
function setupEmailJS() {
    console.log(`
🔧 CÓMO CONFIGURAR EMAILJS:

1. Ve a https://www.emailjs.com/ y crea una cuenta gratuita
2. Crea un nuevo servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email con estos parámetros:
   - to_email: {{to_email}}
   - to_name: {{to_name}}
   - from_name: {{from_name}}
   - subject: {{subject}}
   - message: {{message}}

4. Obtén tu Service ID, Template ID y Public Key
5. Actualiza EMAILJS_CONFIG en este archivo:
   - serviceID: 'tu_service_id'
   - templateID: 'tu_template_id'  
   - publicKey: 'tu_public_key'
   - enabled: true

6. ¡Listo! Los emails reales se enviarán automáticamente.

Por ahora el sistema funciona en modo simulación.
Puedes ver el historial con: showEmailHistory()
    `);
}

// Inicializar sistema de emails al cargar
document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
    
    // Mostrar instrucciones en consola (solo en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            setupEmailJS();
        }, 2000);
    }
}); 