// Script para la página Acerca de

document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión de usuario
    checkUserSession();
    
    // Animar estadísticas cuando se cargan
    animateStats();
    
    // Configurar animaciones de scroll
    setupScrollAnimations();
});

// Animar las estadísticas contando desde 0
function animateStats() {
    const stats = [
        { id: 'jobsCount', target: 50000, suffix: '+', duration: 2000 },
        { id: 'companiesCount', target: 12000, suffix: '+', duration: 2000 },
        { id: 'usersCount', target: 1.5, suffix: 'M+', duration: 2000 },
        { id: 'hiredCount', target: 200, suffix: 'K+', duration: 2000 }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateCounter(element, stat.target, stat.suffix, stat.duration);
        }
    });
}

// Función para animar contadores
function animateCounter(element, target, suffix, duration) {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const isDecimal = target < 10;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 16);
}

// Configurar animaciones al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll(
        '.value-card, .team-member, .timeline-item, .achievement-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Añadir estilos CSS para las animaciones
const animationStyles = `
<style>
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.value-card.animate-on-scroll {
    transition-delay: 0.1s;
}

.value-card:nth-child(2).animate-on-scroll {
    transition-delay: 0.2s;
}

.value-card:nth-child(3).animate-on-scroll {
    transition-delay: 0.3s;
}

.team-member.animate-on-scroll {
    transition-delay: 0.1s;
}

.team-member:nth-child(2).animate-on-scroll {
    transition-delay: 0.2s;
}

.team-member:nth-child(3).animate-on-scroll {
    transition-delay: 0.3s;
}

.team-member:nth-child(4).animate-on-scroll {
    transition-delay: 0.4s;
}

.timeline-item.animate-on-scroll {
    transition-delay: 0.2s;
}

.timeline-item:nth-child(2).animate-on-scroll {
    transition-delay: 0.3s;
}

.timeline-item:nth-child(3).animate-on-scroll {
    transition-delay: 0.4s;
}

.stat-item {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
}

.stat-item:nth-child(1) { animation-delay: 0.1s; }
.stat-item:nth-child(2) { animation-delay: 0.2s; }
.stat-item:nth-child(3) { animation-delay: 0.3s; }
.stat-item:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.mission-card, .vision-card {
    animation: slideInFromSides 0.8s ease-out forwards;
    opacity: 0;
}

.mission-card {
    animation-delay: 0.2s;
    transform: translateX(-50px);
}

.vision-card {
    animation-delay: 0.4s;
    transform: translateX(50px);
}

@keyframes slideInFromSides {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
`;

// Insertar los estilos en el head
document.head.insertAdjacentHTML('beforeend', animationStyles);

// Función para manejar smooth scroll a secciones
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función logout reutilizada
function logout() {
    // Limpiar sesión
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUser');
    
    // Mostrar mensaje de confirmación
    const confirmLogout = confirm('¿Estás seguro de que quieres cerrar sesión?');
    
    if (confirmLogout) {
        // Resetear UI
        clearUserSession();
        
        // Mostrar mensaje temporal
        showTemporaryMessage('Sesión cerrada correctamente', 'success');
        
        // Redirigir al login después de un tiempo
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

// Función para mostrar mensajes temporales
function showTemporaryMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `temp-message temp-message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 8px;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#bee5eb'};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Limpiar sesión de usuario
function clearUserSession() {
    const loginLink = document.getElementById('loginLink');
    const userMenu = document.getElementById('userMenu');
    
    if (loginLink && userMenu) {
        loginLink.style.display = 'flex';
        userMenu.classList.add('hidden');
        userMenu.style.display = 'none';
    }
} 