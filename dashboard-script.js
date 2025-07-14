// ===== DASHBOARD SCRIPT =====

// Variables globales
let currentUser = null;
let userSubscription = null;
let userStats = {
    applications: 0,
    savedJobs: 0,
    profileViews: 0
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// Inicializar dashboard
function initializeDashboard() {
    // Verificar autenticación
    if (!checkAuthentication()) {
        return;
    }
    
    // Cargar datos del usuario
    loadUserData();
    
    // Inicializar secciones
    loadSubscriptionInfo();
    loadUserStats();
    loadSavedJobs();
    loadRecentApplications();
    
    // Configurar event listeners
    setupDashboardListeners();
}

// Verificar autenticación
function checkAuthentication() {
    const userData = sessionStorage.getItem('currentUser');
    if (!userData) {
        alert('Debes iniciar sesión para acceder al dashboard.');
        window.location.href = 'login.html';
        return false;
    }
    
    try {
        currentUser = JSON.parse(userData);
        return true;
    } catch (error) {
        console.error('Error al parsear datos del usuario:', error);
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
        return false;
    }
}

// Cargar datos del usuario
function loadUserData() {
    // Mostrar nombre del usuario
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) {
        userNameDisplay.textContent = currentUser.name || currentUser.email.split('@')[0];
    }
    
    // Cargar suscripción
    const savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '{}');
    userSubscription = savedSubscriptions[currentUser.email];
    
    // Cargar estadísticas
    const savedStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    userStats = savedStats[currentUser.email] || userStats;
}

// ===== GESTIÓN DE SUSCRIPCIONES =====

// Cargar información de suscripción
function loadSubscriptionInfo() {
    const subscriptionContent = document.getElementById('subscriptionContent');
    if (!subscriptionContent) return;
    
    if (userSubscription && userSubscription.status === 'active') {
        // Usuario con suscripción activa
        const endDate = new Date(userSubscription.endDate);
        const now = new Date();
        
        if (endDate > now) {
            showActiveSubscription(subscriptionContent);
        } else {
            // Suscripción expirada
            expireUserSubscription();
            showFreeSubscription(subscriptionContent);
        }
    } else {
        // Usuario sin suscripción (plan gratuito)
        showFreeSubscription(subscriptionContent);
    }
}

// Mostrar suscripción activa
function showActiveSubscription(container) {
    const endDate = new Date(userSubscription.endDate).toLocaleDateString('es-ES');
    const planName = userSubscription.plan === 'premium' ? 'Premium' : 'Empresa';
    const billingType = userSubscription.billing === 'yearly' ? 'Anual' : 'Mensual';
    
    container.innerHTML = `
        <div class="subscription-info">
            <div class="subscription-details">
                <h3><i class="fas fa-crown"></i> Plan ${planName}</h3>
                <p>Facturación ${billingType} - €${userSubscription.amount}/${userSubscription.billing === 'yearly' ? 'año' : 'mes'}</p>
                <div class="subscription-status">
                    <span class="status-badge">Activa</span>
                    <span>Renovación: ${endDate}</span>
                </div>
            </div>
            <div class="subscription-actions">
                <button class="subscription-btn" onclick="changePlan()">
                    <i class="fas fa-exchange-alt"></i>
                    Cambiar Plan
                </button>
                <button class="subscription-btn primary" onclick="manageSubscription()">
                    <i class="fas fa-cog"></i>
                    Gestionar
                </button>
            </div>
        </div>
        
        <div class="subscription-benefits">
            <h4>Beneficios incluidos:</h4>
            <div class="benefits-grid">
                ${getBenefitsHTML(userSubscription.plan)}
            </div>
        </div>
    `;
}

// Mostrar plan gratuito
function showFreeSubscription(container) {
    container.innerHTML = `
        <div class="free-plan-info">
            <h3>Plan Gratuito</h3>
            <p>Estás usando la versión gratuita de JobFinder. Actualiza para acceder a funciones premium.</p>
            
            <div class="free-limitations">
                <div class="limitation-item">
                    <i class="fas fa-info-circle"></i>
                    <span>Máximo 5 aplicaciones por mes</span>
                </div>
                <div class="limitation-item">
                    <i class="fas fa-info-circle"></i>
                    <span>Acceso limitado a empleos exclusivos</span>
                </div>
                <div class="limitation-item">
                    <i class="fas fa-info-circle"></i>
                    <span>Anuncios en la plataforma</span>
                </div>
            </div>
            
            <button class="upgrade-btn" onclick="upgradePlan()">
                <i class="fas fa-arrow-up"></i>
                Actualizar a Premium
            </button>
        </div>
    `;
}

// Obtener HTML de beneficios
function getBenefitsHTML(plan) {
    const benefits = {
        premium: [
            'Aplicaciones ilimitadas',
            'Empleos exclusivos',
            'Sin anuncios',
            'Soporte prioritario',
            'Análisis de perfil'
        ],
        enterprise: [
            'Publicar empleos',
            'Analytics detallados',
            'Gestión de candidatos',
            'Branding personalizado',
            'Soporte dedicado'
        ]
    };
    
    return benefits[plan].map(benefit => `
        <div class="benefit-item">
            <i class="fas fa-check"></i>
            <span>${benefit}</span>
        </div>
    `).join('');
}

// ===== ESTADÍSTICAS =====

// Cargar estadísticas del usuario
function loadUserStats() {
    // Simular estadísticas si no existen
    if (!userStats.applications) {
        userStats = generateSimulatedStats();
        saveUserStats();
    }
    
    // Actualizar UI
    updateStatsDisplay();
}

// Generar estadísticas simuladas
function generateSimulatedStats() {
    return {
        applications: Math.floor(Math.random() * 15) + 1,
        savedJobs: Math.floor(Math.random() * 10) + 1,
        profileViews: Math.floor(Math.random() * 50) + 10
    };
}

// Actualizar visualización de estadísticas
function updateStatsDisplay() {
    const elements = {
        applicationsCount: document.getElementById('applicationsCount'),
        savedJobsCount: document.getElementById('savedJobsCount'),
        profileViewsCount: document.getElementById('profileViewsCount')
    };
    
    if (elements.applicationsCount) elements.applicationsCount.textContent = userStats.applications;
    if (elements.savedJobsCount) elements.savedJobsCount.textContent = userStats.savedJobs;
    if (elements.profileViewsCount) elements.profileViewsCount.textContent = userStats.profileViews;
}

// Guardar estadísticas
function saveUserStats() {
    let allStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    allStats[currentUser.email] = userStats;
    localStorage.setItem('userStats', JSON.stringify(allStats));
}

// ===== EMPLEOS GUARDADOS =====

// Cargar empleos guardados
function loadSavedJobs() {
    const savedJobsList = document.getElementById('savedJobsList');
    if (!savedJobsList) return;
    
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    if (savedJobIds.length === 0) {
        showEmptyState(savedJobsList, 'heart', 'No tienes empleos guardados', 'Guarda empleos que te interesen para verlos aquí.', 'Buscar Empleos', 'searchJobs()');
        return;
    }
    
    // Mostrar primeros 3 empleos guardados
    const recentSaved = savedJobIds.slice(0, 3);
    savedJobsList.innerHTML = recentSaved.map(jobId => createSavedJobItem(jobId)).join('');
}

// Crear item de empleo guardado
function createSavedJobItem(jobId) {
    // En una app real, cargarías el empleo de la base de datos
    const job = {
        id: jobId,
        title: `Empleo Guardado ${jobId}`,
        company: 'Empresa Ejemplo',
        location: 'Madrid, España',
        savedDate: 'Hace 2 días'
    };
    
    return `
        <div class="saved-job-item">
            <div class="job-info">
                <h4>${job.title}</h4>
                <p>${job.company} • ${job.location}</p>
                <small>Guardado ${job.savedDate}</small>
            </div>
            <div class="job-actions">
                <button class="job-action-btn" onclick="viewJob(${job.id})" title="Ver empleo">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="job-action-btn remove" onclick="removeSavedJob(${job.id})" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// ===== APLICACIONES RECIENTES =====

// Cargar aplicaciones recientes
function loadRecentApplications() {
    const recentApplications = document.getElementById('recentApplications');
    if (!recentApplications) return;
    
    // Simular aplicaciones recientes
    const applications = generateSimulatedApplications();
    
    if (applications.length === 0) {
        showEmptyState(recentApplications, 'paper-plane', 'No tienes aplicaciones recientes', 'Cuando apliques a empleos, los verás aquí.', 'Buscar Empleos', 'searchJobs()');
        return;
    }
    
    recentApplications.innerHTML = applications.map(app => createApplicationItem(app)).join('');
}

// Generar aplicaciones simuladas
function generateSimulatedApplications() {
    const statuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    const statusTexts = {
        pending: 'Pendiente',
        reviewed: 'Revisada',
        accepted: 'Aceptada',
        rejected: 'Rechazada'
    };
    
    return Array.from({length: 3}, (_, i) => ({
        id: i + 1,
        jobTitle: `Desarrollador ${i === 0 ? 'Frontend' : i === 1 ? 'Backend' : 'Full Stack'}`,
        company: `Empresa ${i + 1}`,
        appliedDate: `Hace ${i + 1} día${i > 0 ? 's' : ''}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        statusText: statusTexts[statuses[Math.floor(Math.random() * statuses.length)]]
    }));
}

// Crear item de aplicación
function createApplicationItem(application) {
    return `
        <div class="application-item">
            <div class="application-info">
                <h4>${application.jobTitle}</h4>
                <p>${application.company}</p>
                <small>Aplicado ${application.appliedDate}</small>
            </div>
            <div class="application-status status-${application.status}">
                ${application.statusText}
            </div>
        </div>
    `;
}

// ===== FUNCIONES DE UTILIDAD =====

// Mostrar estado vacío
function showEmptyState(container, icon, title, description, buttonText, buttonAction) {
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-${icon}"></i>
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="cta-btn" onclick="${buttonAction}">${buttonText}</button>
        </div>
    `;
}

// ===== ACCIONES DEL DASHBOARD =====

// Actualizar plan
function upgradePlan() {
    window.location.href = 'pricing.html';
}

// Cambiar plan
function changePlan() {
    window.location.href = 'pricing.html';
}

// Gestionar suscripción
function manageSubscription() {
    showSubscriptionModal();
}

// Mostrar modal de gestión de suscripción
function showSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    const modalContent = document.getElementById('subscriptionModalContent');
    
    if (!modal || !modalContent) return;
    
    modalContent.innerHTML = `
        <h2>Gestionar Suscripción</h2>
        <div class="subscription-management">
            <div class="current-plan">
                <h3>Plan Actual: ${userSubscription ? userSubscription.plan : 'Gratuito'}</h3>
                ${userSubscription ? `
                    <p>Próxima facturación: ${new Date(userSubscription.endDate).toLocaleDateString('es-ES')}</p>
                    <p>Importe: €${userSubscription.amount}/${userSubscription.billing === 'yearly' ? 'año' : 'mes'}</p>
                ` : ''}
            </div>
            
            <div class="management-actions">
                <button class="management-btn" onclick="pauseSubscription()">
                    <i class="fas fa-pause"></i>
                    Pausar Suscripción
                </button>
                
                <button class="management-btn" onclick="updatePaymentMethod()">
                    <i class="fas fa-credit-card"></i>
                    Actualizar Pago
                </button>
                
                <button class="management-btn" onclick="downloadInvoices()">
                    <i class="fas fa-download"></i>
                    Descargar Facturas
                </button>
                
                <button class="management-btn danger" onclick="cancelSubscription()">
                    <i class="fas fa-times"></i>
                    Cancelar Suscripción
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Cerrar modal de suscripción
function closeSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Cancelar suscripción
function cancelSubscription() {
    const confirmCancel = confirm(
        '¿Estás seguro de que quieres cancelar tu suscripción?\n\n' +
        'Perderás acceso a las funciones premium al final del período actual.'
    );
    
    if (confirmCancel) {
        // En una app real, esto sería una llamada al backend
        alert('Suscripción cancelada. Mantendrás acceso hasta el final del período actual.');
        
        // Actualizar estado local
        if (userSubscription) {
            userSubscription.status = 'cancelled';
            updateUserSubscriptionStorage();
        }
        
        closeSubscriptionModal();
        loadSubscriptionInfo();
    }
}

// Pausar suscripción
function pauseSubscription() {
    alert('Funcionalidad de pausa de suscripción próximamente disponible.');
}

// Actualizar método de pago
function updatePaymentMethod() {
    alert('Redirigiendo a Stripe para actualizar método de pago...');
}

// Descargar facturas
function downloadInvoices() {
    alert('Descargando historial de facturas...');
}

// ===== ACCIONES DE CONFIGURACIÓN =====

// Editar perfil
function editProfile() {
    const newName = prompt('Nuevo nombre:', currentUser.name || '');
    if (newName && newName.trim()) {
        currentUser.name = newName.trim();
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Actualizar display
        const userNameDisplay = document.getElementById('userNameDisplay');
        if (userNameDisplay) {
            userNameDisplay.textContent = currentUser.name;
        }
        
        alert('Perfil actualizado correctamente.');
    }
}

// Editar notificaciones
function editNotifications() {
    alert('Panel de configuración de notificaciones próximamente disponible.');
}

// Cambiar contraseña
function changePassword() {
    alert('Funcionalidad de cambio de contraseña próximamente disponible.');
}

// Eliminar cuenta
function deleteAccount() {
    const confirmDelete = confirm(
        '⚠️ ADVERTENCIA ⚠️\n\n' +
        'Esta acción eliminará permanentemente tu cuenta y todos tus datos.\n' +
        'Esta acción NO se puede deshacer.\n\n' +
        '¿Estás completamente seguro?'
    );
    
    if (confirmDelete) {
        const finalConfirm = prompt('Escribe "ELIMINAR" para confirmar la eliminación de tu cuenta:');
        
        if (finalConfirm === 'ELIMINAR') {
            // Limpiar datos del usuario
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('rememberedUser');
            
            // Limpiar datos específicos del usuario
            const userEmail = currentUser.email;
            let savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '{}');
            delete savedSubscriptions[userEmail];
            localStorage.setItem('userSubscriptions', JSON.stringify(savedSubscriptions));
            
            alert('Tu cuenta ha sido eliminada. Serás redirigido a la página principal.');
            window.location.href = 'index.html';
        }
    }
}

// ===== ACCESOS RÁPIDOS =====

// Buscar empleos
function searchJobs() {
    window.location.href = 'index.html#jobs';
}

// Actualizar perfil
function updateProfile() {
    window.location.href = 'profile.html';
}

// Ver analytics
function viewAnalytics() {
    alert('Panel de analytics detallado próximamente disponible.');
}

// Exportar datos
function exportData() {
    const userData = {
        profile: currentUser,
        subscription: userSubscription,
        stats: userStats,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `jobfinder-data-${currentUser.email}.json`;
    link.click();
    
    alert('Datos exportados correctamente.');
}

// Ver todos los empleos guardados
function viewAllSavedJobs() {
    alert('Página de empleos guardados próximamente disponible.');
}

// Ver empleo
function viewJob(jobId) {
    alert(`Viendo detalles del empleo ${jobId}`);
}

// Remover empleo guardado
function removeSavedJob(jobId) {
    const confirmRemove = confirm('¿Quieres eliminar este empleo de tus guardados?');
    if (confirmRemove) {
        let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        savedJobs = savedJobs.filter(id => id !== jobId);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        
        // Actualizar estadísticas
        userStats.savedJobs = savedJobs.length;
        saveUserStats();
        
        // Recargar secciones
        loadSavedJobs();
        updateStatsDisplay();
    }
}

// ===== FUNCIONES DE UTILIDAD =====

// Actualizar almacenamiento de suscripción
function updateUserSubscriptionStorage() {
    let savedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '{}');
    savedSubscriptions[currentUser.email] = userSubscription;
    localStorage.setItem('userSubscriptions', JSON.stringify(savedSubscriptions));
}

// Expirar suscripción del usuario
function expireUserSubscription() {
    if (userSubscription) {
        userSubscription.status = 'expired';
        updateUserSubscriptionStorage();
    }
    
    // Actualizar usuario actual
    currentUser.isPremium = false;
    delete currentUser.subscription;
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Configurar event listeners del dashboard
function setupDashboardListeners() {
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('subscriptionModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Función de logout
function logout() {
    const confirmLogout = confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (confirmLogout) {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('rememberedUser');
        window.location.href = 'login.html';
    }
} 