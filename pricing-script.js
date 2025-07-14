// ===== CONFIGURACIÓN DE STRIPE =====
// En producción, usar la clave pública real de Stripe
const stripe = Stripe('pk_test_51234567890abcdef...'); // Reemplazar con tu clave pública de Stripe

// Configuración de planes - PRECIOS EN PESOS MEXICANOS
const PLANS = {
    premium: {
        monthly: {
            priceId: 'price_premium_monthly_mx', // ID del precio en Stripe
            amount: 249,
            currency: 'MXN',
            period: 'mes'
        },
        yearly: {
            priceId: 'price_premium_yearly_mx',
            amount: 199,
            currency: 'MXN',
            period: 'año',
            save: 600
        }
    },
    enterprise: {
        monthly: {
            priceId: 'price_enterprise_monthly_mx',
            amount: 2499,
            currency: 'MXN',
            period: 'mes'
        },
        yearly: {
            priceId: 'price_enterprise_yearly_mx',
            amount: 1999,
            currency: 'MXN',
            period: 'año',
            save: 6000
        }
    }
};

// Variables globales
let currentBillingType = 'monthly';
let selectedPlan = null;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializePricing();
    checkUserSubscription();
});

// Hacer selectPlan disponible globalmente
window.selectPlan = function(planType) {
    console.log('selectPlan global llamado con:', planType);
    
    // Verificar si el usuario está logueado
    let currentUser = sessionStorage.getItem('currentUser');
    console.log('Usuario actual:', currentUser ? 'Logueado' : 'No logueado');
    
    if (!currentUser) {
        // Para demo, crear usuario temporal
        const tempUser = {
            email: 'demo@jobfinder.com',
            name: 'Usuario Demo',
            isLoggedIn: true
        };
        sessionStorage.setItem('currentUser', JSON.stringify(tempUser));
        currentUser = JSON.stringify(tempUser);
        console.log('Usuario temporal creado para demo');
    }
    
    // Verificar que el plan existe
    if (!PLANS[planType] || !PLANS[planType][currentBillingType]) {
        console.error('Plan no encontrado:', planType, currentBillingType);
        alert('Plan no disponible. Por favor, inténtalo de nuevo.');
        return;
    }
    
    selectedPlan = {
        type: planType,
        billing: currentBillingType,
        config: PLANS[planType][currentBillingType]
    };
    
    console.log('Plan seleccionado:', selectedPlan);
    
    // Proceder directamente con la simulación de pago
    showPaymentSimulation();
};

// Inicializar página de precios
function initializePricing() {
    // Configurar event listeners
    setupEventListeners();
    
    // Actualizar precios según el billing
    updatePricing();
    
    // Verificar sesión de usuario
    checkUserSession();
    
    // Asegurar que los botones funcionen
    setupPlanButtons();
}

// Configurar botones de planes
function setupPlanButtons() {
    console.log('Configurando botones de planes...');
    
    // Buscar botones por onclick
    const premiumBtn = document.querySelector('button[onclick="selectPlan(\'premium\')"]');
    const enterpriseBtn = document.querySelector('button[onclick="selectPlan(\'enterprise\')"]');
    
    console.log('Botón Premium encontrado:', !!premiumBtn);
    console.log('Botón Enterprise encontrado:', !!enterpriseBtn);
    
    // Función auxiliar para manejar clics
    function handlePlanClick(planType) {
        console.log('Manejando clic para plan:', planType);
        selectPlan(planType);
    }
    
    // Asignar eventos manualmente
    if (premiumBtn) {
        premiumBtn.onclick = function(e) {
            e.preventDefault();
            handlePlanClick('premium');
        };
    }
    
    if (enterpriseBtn) {
        enterpriseBtn.onclick = function(e) {
            e.preventDefault();
            handlePlanClick('enterprise');
        };
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Toggle de facturación
    const billingToggle = document.getElementById('billingToggle');
    if (billingToggle) {
        billingToggle.addEventListener('change', toggleBilling);
    }
    
    // FAQs
    setupFAQs();
}

// ===== FUNCIONES DE PRICING =====

// Alternar entre facturación mensual y anual
function toggleBilling() {
    const toggle = document.getElementById('billingToggle');
    currentBillingType = toggle.checked ? 'yearly' : 'monthly';
    updatePricing();
}

// Actualizar precios en la UI
function updatePricing() {
    // Mostrar/ocultar elementos según el tipo de facturación
    const monthlyElements = document.querySelectorAll('.monthly-price, .monthly-period');
    const yearlyElements = document.querySelectorAll('.yearly-price, .yearly-period, .yearly-save');
    
    if (currentBillingType === 'yearly') {
        monthlyElements.forEach(el => el.classList.add('hidden'));
        yearlyElements.forEach(el => el.classList.remove('hidden'));
    } else {
        monthlyElements.forEach(el => el.classList.remove('hidden'));
        yearlyElements.forEach(el => el.classList.add('hidden'));
    }
}

// ===== SELECCIÓN Y PROCESAMIENTO DE PLANES =====

// Función selectPlan eliminada - usando solo la versión global

// Mostrar mensaje de login requerido
function showLoginRequired() {
    console.log('showLoginRequired llamado'); // Debug
    
    // Mostrar notificación más amigable
    const loginMessage = document.createElement('div');
    loginMessage.className = 'login-required-banner';
    loginMessage.innerHTML = `
        <div class="banner-content">
            <i class="fas fa-user-lock"></i>
            <div class="banner-text">
                <h4>¡Inicia sesión para continuar!</h4>
                <p>Necesitas una cuenta para suscribirte a un plan premium</p>
            </div>
            <div class="banner-actions">
                <button onclick="redirectToLogin()" class="login-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    Iniciar Sesión
                </button>
                <button onclick="closeBanner()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    // Agregar estilos dinámicamente
    if (!document.getElementById('loginBannerStyles')) {
        const bannerStyles = document.createElement('style');
        bannerStyles.id = 'loginBannerStyles';
        bannerStyles.textContent = `
            .login-required-banner {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
                z-index: 10000;
                min-width: 400px;
                animation: slideDown 0.3s ease-out;
            }
            
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            
            .banner-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .banner-content i.fas {
                font-size: 2rem;
                color: #ffd700;
            }
            
            .banner-text h4 {
                margin: 0 0 5px 0;
                font-size: 1.1rem;
            }
            
            .banner-text p {
                margin: 0;
                opacity: 0.9;
                font-size: 0.9rem;
            }
            
            .banner-actions {
                display: flex;
                gap: 10px;
                margin-left: auto;
            }
            
            .login-btn, .close-btn {
                padding: 8px 15px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .login-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                backdrop-filter: blur(10px);
            }
            
            .login-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
            
            .close-btn {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                width: 35px;
                height: 35px;
                padding: 0;
                justify-content: center;
            }
            
            .close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            @media (max-width: 480px) {
                .login-required-banner {
                    min-width: 90vw;
                    margin: 0 20px;
                }
                
                .banner-content {
                    flex-direction: column;
                    text-align: center;
                }
                
                .banner-actions {
                    margin-left: 0;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(bannerStyles);
    }
    
    // Insertar el banner en el body
    document.body.appendChild(loginMessage);
    
    // Auto-cerrar después de 8 segundos si no se hace clic
    setTimeout(() => {
        if (document.querySelector('.login-required-banner')) {
            closeBanner();
        }
    }, 8000);
}

// Función para redirigir al login
function redirectToLogin() {
    console.log('Redirigiendo a login...'); // Debug
    closeBanner();
    window.location.href = 'login.html';
}

// Función para cerrar el banner
function closeBanner() {
    const banner = document.querySelector('.login-required-banner');
    if (banner) {
        banner.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => {
            if (banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 300);
    }
}

// Agregar animación de salida
if (!document.getElementById('slideUpAnimation')) {
    const slideUpStyles = document.createElement('style');
    slideUpStyles.id = 'slideUpAnimation';
    slideUpStyles.textContent = `
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        }
    `;
    document.head.appendChild(slideUpStyles);
}

// Iniciar proceso de checkout con Stripe
function initiateCheckout() {
    if (!selectedPlan) return;
    
    showLoading();
    
    // Simular llamada al backend para crear sesión de checkout
    setTimeout(() => {
        createStripeCheckoutSession();
    }, 1000);
}

// Crear sesión de checkout de Stripe
async function createStripeCheckoutSession() {
    try {
        // En una aplicación real, esto sería una llamada a tu backend
        const response = await simulateBackendCall({
            priceId: selectedPlan.config.priceId,
            planType: selectedPlan.type,
            billingType: selectedPlan.billing,
            userId: JSON.parse(sessionStorage.getItem('currentUser')).email
        });
        
        if (response.success) {
            // Redirigir a Stripe Checkout (simulado)
            simulateStripeCheckout(response.sessionId);
        } else {
            hideLoading();
            showPaymentError('Error al crear la sesión de pago. Por favor, inténtalo de nuevo.');
        }
        
    } catch (error) {
        hideLoading();
        showPaymentError('Error de conexión. Por favor, verifica tu conexión e inténtalo de nuevo.');
        console.error('Error en checkout:', error);
    }
}

// Simular llamada al backend
function simulateBackendCall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simular respuesta exitosa del backend
            resolve({
                success: true,
                sessionId: 'cs_test_' + Math.random().toString(36).substr(2, 9),
                checkoutUrl: 'https://checkout.stripe.com/pay/cs_test_...'
            });
        }, 1500);
    });
}

// Simular proceso de Stripe Checkout
function simulateStripeCheckout(sessionId) {
    hideLoading();
    
    // En una aplicación real, redirigirías a Stripe
    // stripe.redirectToCheckout({ sessionId: sessionId });
    
    // Para la demostración, mostraremos un modal de confirmación
    showPaymentSimulation();
}

// Mostrar simulación de pago con interfaz realista (disponible globalmente)
window.showPaymentSimulation = function() {
    const planName = selectedPlan.type === 'premium' ? 'Premium' : 'Empresa';
    const amount = selectedPlan.config.amount;
    const period = selectedPlan.billing === 'monthly' ? 'mensual' : 'anual';
    
    // Crear modal de pago realista
    const paymentModal = document.createElement('div');
    paymentModal.className = 'payment-modal-overlay';
    paymentModal.innerHTML = `
        <div class="payment-modal">
            <div class="payment-header">
                <div class="stripe-branding">
                    <svg width="60" height="25" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#635bff" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-8.78.94c0 .27.06.53.16.73.06.06.13.12.27.15.14.02.35.04.55-.02.06-.02.37-.14.6-.4.18-.21.46-.67.46-1.79v-3.4c-.96-.4-2.05-.23-2.90.24-.36.23-.6.66-.7.95a2.97 2.97 0 0 0-.44 1.54zm2.93-8.2a6.54 6.54 0 0 1 3.64 1.05v3.93c-.42-.01-1.03.05-1.64.45-.61.4-.96 1.02-1.1 1.74-.08.43-.1.9-.06 1.33.1 1.01.84 1.84 1.79 2.23.06.02.16.04.25.04.33 0 .68-.18.93-.48v.97h3.64V5.57h-3.64v.728c-.92-1.08-2.39-1.2-3.81-.91zm-6.4-1.52c0-.3-.25-.56-.55-.56H.09c-.3 0-.55.26-.55.56v18.06c0 .3.25.56.55.56h2.75c.3 0 .55-.26.55-.56V1.91z"/>
                    </svg>
                    <span class="secure-text">🔒 Pago Seguro</span>
                </div>
                <button class="close-modal" onclick="closePaymentModal()">×</button>
            </div>
            
            <div class="payment-content">
                <div class="payment-summary">
                    <h3>Resumen de Compra</h3>
                    <div class="plan-details">
                        <div class="plan-info">
                            <strong>Plan ${planName}</strong>
                            <span class="plan-period">Facturación ${period}</span>
                        </div>
                        <div class="plan-price">$${amount.toLocaleString('es-MX')} MXN</div>
                    </div>
                    ${selectedPlan.billing === 'yearly' ? `
                        <div class="savings-highlight">
                            <i class="fas fa-tag"></i>
                            Ahorras $${selectedPlan.config.save.toLocaleString('es-MX')} MXN al año
                        </div>
                    ` : ''}
                </div>
                
                <div class="payment-form">
                    <h4>Información de Pago</h4>
                    
                    <div class="payment-methods">
                        <div class="method-option active" data-method="card">
                            <i class="fas fa-credit-card"></i>
                            Tarjeta de Crédito/Débito
                        </div>
                        <div class="method-option" data-method="oxxo">
                            <i class="fas fa-store"></i>
                            OXXO Pay
                        </div>
                        <div class="method-option" data-method="transfer">
                            <i class="fas fa-university"></i>
                            Transferencia Bancaria
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Email de facturación</label>
                        <input type="email" value="${JSON.parse(sessionStorage.getItem('currentUser')).email}" readonly>
                    </div>
                    
                    <div class="card-form" id="cardForm">
                        <div class="form-group">
                            <label>Número de tarjeta</label>
                            <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" id="cardNumber">
                            <div class="card-icons">
                                <i class="fab fa-cc-visa"></i>
                                <i class="fab fa-cc-mastercard"></i>
                                <i class="fab fa-cc-amex"></i>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>MM/AA</label>
                                <input type="text" placeholder="12/24" maxlength="5" id="cardExpiry">
                            </div>
                            <div class="form-group">
                                <label>CVV</label>
                                <input type="text" placeholder="123" maxlength="4" id="cardCvv">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Nombre en la tarjeta</label>
                            <input type="text" placeholder="Tu nombre completo" id="cardName">
                        </div>
                    </div>
                    
                    <div class="oxxo-form hidden" id="oxxoForm">
                        <div class="oxxo-info">
                            <i class="fas fa-info-circle"></i>
                            <p>Genera un código de pago para OXXO. Tendrás 3 días para completar el pago.</p>
                        </div>
                    </div>
                    
                    <div class="transfer-form hidden" id="transferForm">
                        <div class="transfer-info">
                            <i class="fas fa-info-circle"></i>
                            <p>Recibirás los datos bancarios por email para realizar la transferencia.</p>
                        </div>
                    </div>
                    
                    <div class="terms">
                        <label class="checkbox-container">
                            <input type="checkbox" id="acceptTerms" checked>
                            <span class="checkmark"></span>
                            Acepto los <a href="#">términos y condiciones</a> y la <a href="#">política de privacidad</a>
                        </label>
                    </div>
                    
                    <button class="pay-button" onclick="processPayment()">
                        <i class="fas fa-lock"></i>
                        Pagar $${amount.toLocaleString('es-MX')} MXN
                    </button>
                    
                    <div class="security-badges">
                        <i class="fas fa-shield-alt"></i>
                        <span>Protegido por SSL y encriptación de 256 bits</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar estilos del modal
    addPaymentModalStyles();
    
    document.body.appendChild(paymentModal);
    
    // Configurar event listeners
    setupPaymentModal();
};

// Procesar pago exitoso
function processSuccessfulPayment() {
    showLoading();
    
    setTimeout(() => {
        // Actualizar suscripción del usuario
        updateUserSubscription();
        
        // Mostrar mensaje de éxito
        showPaymentSuccess();
        
        // Redirigir al dashboard después de 3 segundos
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 3000);
        
    }, 2000);
}

// Actualizar suscripción del usuario
function updateUserSubscription() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Crear objeto de suscripción
    const subscription = {
        plan: selectedPlan.type,
        billing: selectedPlan.billing,
        amount: selectedPlan.config.amount,
        startDate: new Date().toISOString(),
        endDate: getSubscriptionEndDate(),
        status: 'active',
        stripeCustomerId: 'cus_' + Math.random().toString(36).substr(2, 9),
        stripeSubscriptionId: 'sub_' + Math.random().toString(36).substr(2, 9)
    };
    
    // Actualizar usuario con suscripción
    currentUser.subscription = subscription;
    currentUser.isPremium = true;
    
    // Guardar en sessionStorage y localStorage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Guardar también en localStorage para persistencia
    let savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '{}');
    savedSubscriptions[currentUser.email] = subscription;
    localStorage.setItem('userSubscriptions', JSON.stringify(savedSubscriptions));
}

// Calcular fecha de fin de suscripción
function getSubscriptionEndDate() {
    const now = new Date();
    if (selectedPlan.billing === 'yearly') {
        now.setFullYear(now.getFullYear() + 1);
    } else {
        now.setMonth(now.getMonth() + 1);
    }
    return now.toISOString();
}

// ===== VERIFICACIÓN DE SUSCRIPCIONES =====

// Verificar suscripción actual del usuario
function checkUserSubscription() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) return;
    
    const user = JSON.parse(currentUser);
    const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '{}');
    const userSubscription = savedSubscriptions[user.email];
    
    if (userSubscription && userSubscription.status === 'active') {
        // Verificar si la suscripción no ha expirado
        const endDate = new Date(userSubscription.endDate);
        const now = new Date();
        
        if (endDate > now) {
            // Suscripción activa - actualizar UI
            updateUIForSubscribedUser(userSubscription);
        } else {
            // Suscripción expirada
            expireSubscription(user.email);
        }
    }
}

// Actualizar UI para usuario suscrito
function updateUIForSubscribedUser(subscription) {
    const planType = subscription.plan;
    
    // Actualizar botones de planes
    document.querySelectorAll('.plan-button').forEach(button => {
        button.textContent = 'Plan Actual';
        button.disabled = true;
        button.classList.add('current-plan');
    });
    
    // Resaltar plan actual
    const currentPlanCard = document.querySelector(`.${planType}-plan`);
    if (currentPlanCard) {
        currentPlanCard.classList.add('current-user-plan');
        const button = currentPlanCard.querySelector('.plan-button');
        if (button) {
            button.textContent = `Plan Actual - ${subscription.plan}`;
            button.style.background = '#28a745';
        }
    }
    
    // Mostrar información de suscripción
    showSubscriptionInfo(subscription);
}

// Mostrar información de suscripción
function showSubscriptionInfo(subscription) {
    const endDate = new Date(subscription.endDate).toLocaleDateString('es-ES');
    const infoDiv = document.createElement('div');
    infoDiv.className = 'subscription-info';
    infoDiv.innerHTML = `
        <div class="subscription-banner">
            <i class="fas fa-crown"></i>
            <span>Suscripción ${subscription.plan} activa hasta ${endDate}</span>
            <a href="dashboard.html">Gestionar</a>
        </div>
    `;
    
    // Insertar después del hero
    const hero = document.querySelector('.pricing-hero');
    if (hero) {
        hero.insertAdjacentElement('afterend', infoDiv);
    }
}

// Expirar suscripción
function expireSubscription(userEmail) {
    let savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '{}');
    if (savedSubscriptions[userEmail]) {
        savedSubscriptions[userEmail].status = 'expired';
        localStorage.setItem('userSubscriptions', JSON.stringify(savedSubscriptions));
    }
    
    // Actualizar usuario actual
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.email === userEmail) {
        currentUser.isPremium = false;
        delete currentUser.subscription;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// ===== FUNCIONES DE UI =====

// Mostrar/ocultar loading
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Mostrar error de pago
function showPaymentError(message) {
    alert(`❌ Error de Pago\n\n${message}\n\nSi el problema persiste, contacta con soporte.`);
}

// Mostrar éxito de pago
function showPaymentSuccess() {
    hideLoading();
    
    const planName = selectedPlan.type === 'premium' ? 'Premium' : 'Empresa';
    
    alert(`✅ ¡Pago Exitoso!\n\n` +
          `¡Bienvenido al plan ${planName}!\n` +
          `Tu suscripción está ahora activa.\n\n` +
          `Serás redirigido a tu dashboard...`);
}

// ===== FAQ FUNCTIONS =====

// Configurar FAQs
function setupFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => toggleFaq(question));
    });
}

// Alternar FAQ
function toggleFaq(questionElement) {
    const answer = questionElement.nextElementSibling;
    const icon = questionElement.querySelector('i');
    
    // Cerrar otras FAQs abiertas
    document.querySelectorAll('.faq-question.active').forEach(activeQuestion => {
        if (activeQuestion !== questionElement) {
            activeQuestion.classList.remove('active');
            activeQuestion.nextElementSibling.classList.remove('open');
        }
    });
    
    // Alternar la FAQ actual
    questionElement.classList.toggle('active');
    answer.classList.toggle('open');
}

// ===== FUNCIONES DE SESIÓN =====

// Verificar sesión de usuario (reutilizada del script principal)
function checkUserSession() {
    const currentUser = sessionStorage.getItem('currentUser');
    const loginLink = document.getElementById('loginLink');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (currentUser && loginLink && userMenu && userName) {
        try {
            const user = JSON.parse(currentUser);
            
            // Ocultar enlace de login y mostrar menú de usuario
            loginLink.style.display = 'none';
            userMenu.classList.remove('hidden');
            userMenu.style.display = 'block';
            
            // Actualizar nombre del usuario
            userName.textContent = user.name || user.email;
            
            // Hacer el menú clickeable
            const userInfo = userMenu.querySelector('.user-info');
            if (userInfo) {
                userInfo.style.cursor = 'pointer';
                userInfo.addEventListener('click', toggleUserDropdown);
            }
            
        } catch (error) {
            console.error('Error parsing user session:', error);
        }
    }
}

function toggleUserDropdown() {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

function showProfile() {
    window.location.href = 'profile.html';
}

function logout() {
    const confirmLogout = confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (confirmLogout) {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        window.location.href = 'login.html';
    }
}

// ===== ESTILOS ADICIONALES =====

// Agregar estilos CSS dinámicamente
if (!document.getElementById('additionalStyles')) {
    const additionalStyles = document.createElement('style');
    additionalStyles.id = 'additionalStyles';
    additionalStyles.textContent = `
    .subscription-banner {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin: 20px auto;
        max-width: 600px;
        box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
    }
    
    .subscription-banner i {
        font-size: 1.2rem;
        color: #ffd700;
    }
    
    .subscription-banner a {
        color: white;
        text-decoration: underline;
        font-weight: 600;
    }
    
    .subscription-banner a:hover {
        text-decoration: none;
    }
    
    .current-user-plan {
        border-color: #28a745 !important;
        box-shadow: 0 10px 30px rgba(40, 167, 69, 0.2) !important;
    }
    
    .current-plan {
        background: #28a745 !important;
        cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
        .subscription-banner {
            flex-direction: column;
            text-align: center;
            gap: 10px;
        }
    }
`;

    document.head.appendChild(additionalStyles);
}

// Agregar estilos del modal de pago
function addPaymentModalStyles() {
    if (document.getElementById('paymentModalStyles')) return;
    
    const paymentStyles = document.createElement('style');
    paymentStyles.id = 'paymentModalStyles';
    paymentStyles.textContent = `
        .payment-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .payment-modal {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }
        
        .payment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .stripe-branding {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .secure-text {
            color: #28a745;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6c757d;
            padding: 5px;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .close-modal:hover {
            background: #f8f9fa;
            color: #495057;
        }
        
        .payment-content {
            padding: 20px;
        }
        
        .payment-summary {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .payment-summary h3 {
            margin: 0 0 15px 0;
            color: #495057;
        }
        
        .plan-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .plan-info strong {
            display: block;
            color: #212529;
            font-size: 1.1rem;
        }
        
        .plan-period {
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        .plan-price {
            font-size: 1.3rem;
            font-weight: bold;
            color: #667eea;
        }
        
        .savings-highlight {
            margin-top: 10px;
            color: #28a745;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .payment-methods {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .method-option {
            flex: 1;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.85rem;
        }
        
        .method-option:hover {
            border-color: #667eea;
        }
        
        .method-option.active {
            border-color: #667eea;
            background: #f8f9ff;
            color: #667eea;
        }
        
        .method-option i {
            display: block;
            margin-bottom: 5px;
            font-size: 1.2rem;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #495057;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e9ecef;
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .form-group input[readonly] {
            background: #f8f9fa;
            color: #6c757d;
        }
        
        .form-row {
            display: flex;
            gap: 15px;
        }
        
        .form-row .form-group {
            flex: 1;
        }
        
        .card-icons {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            gap: 5px;
        }
        
        .card-icons i {
            font-size: 1.2rem;
            opacity: 0.6;
        }
        
        .form-group {
            position: relative;
        }
        
        .oxxo-info, .transfer-info {
            background: #e7f3ff;
            border: 1px solid #b3d9ff;
            border-radius: 6px;
            padding: 15px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        
        .oxxo-info i, .transfer-info i {
            color: #0066cc;
            margin-top: 2px;
        }
        
        .terms {
            margin: 20px 0;
        }
        
        .checkbox-container {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            cursor: pointer;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .checkbox-container input {
            margin: 0;
            width: auto;
        }
        
        .pay-button {
            width: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .pay-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        .pay-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .security-badges {
            text-align: center;
            margin-top: 15px;
            color: #6c757d;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
        
        .security-badges i {
            color: #28a745;
        }
        
        .hidden {
            display: none !important;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .payment-modal {
                width: 95%;
                margin: 20px;
            }
            
            .payment-methods {
                flex-direction: column;
            }
            
            .form-row {
                flex-direction: column;
                gap: 0;
            }
        }
    `;
    document.head.appendChild(paymentStyles);
}

// Configurar event listeners del modal
function setupPaymentModal() {
    // Formatear número de tarjeta
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
            if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
            e.target.value = formattedValue;
        });
    }
    
    // Formatear fecha de expiración
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Solo números en CVV
    const cardCvv = document.getElementById('cardCvv');
    if (cardCvv) {
        cardCvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Cambio de método de pago
    document.querySelectorAll('.method-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remover active de todos
            document.querySelectorAll('.method-option').forEach(opt => opt.classList.remove('active'));
            
            // Agregar active al seleccionado
            this.classList.add('active');
            
            // Mostrar/ocultar formularios
            const method = this.getAttribute('data-method');
            document.querySelectorAll('.card-form, .oxxo-form, .transfer-form').forEach(form => {
                form.classList.add('hidden');
            });
            
            document.getElementById(method + 'Form').classList.remove('hidden');
        });
    });
}

// Cerrar modal de pago (disponible globalmente)
window.closePaymentModal = function() {
    const modal = document.querySelector('.payment-modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
};

// Procesar pago mejorado (disponible globalmente)
window.processPayment = function() {
    const terms = document.getElementById('acceptTerms');
    if (!terms || !terms.checked) {
        alert('Debes aceptar los términos y condiciones para continuar.');
        return;
    }
    
    const activeMethod = document.querySelector('.method-option.active').getAttribute('data-method');
    
    // Validar campos según el método
    if (activeMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value;
        const cardName = document.getElementById('cardName').value;
        
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
            alert('Por favor ingresa un número de tarjeta válido.');
            return;
        }
        
        if (!cardExpiry || cardExpiry.length < 5) {
            alert('Por favor ingresa una fecha de expiración válida.');
            return;
        }
        
        if (!cardCvv || cardCvv.length < 3) {
            alert('Por favor ingresa un CVV válido.');
            return;
        }
        
        if (!cardName.trim()) {
            alert('Por favor ingresa el nombre del titular de la tarjeta.');
            return;
        }
    }
    
    // Deshabilitar botón y mostrar procesando
    const payButton = document.querySelector('.pay-button');
    payButton.disabled = true;
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    
    // Simular procesamiento
    setTimeout(() => {
        closePaymentModal();
        processSuccessfulPayment();
    }, 3000);
};

// Agregar animación de salida al CSS (si no existe)
if (!document.getElementById('fadeOutAnimation')) {
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.id = 'fadeOutAnimation';
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeOutStyle);
} 