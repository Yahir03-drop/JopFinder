// Variables globales para favoritos
let favoritesJobs = [];
let filteredFavorites = [];
let currentView = 'grid';
let jobToRemove = null;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    checkUserAuthentication();
    
    // Cargar favoritos
    loadFavorites();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Verificar sesión de usuario
    checkUserSession();
});

// Verificar si el usuario está autenticado
function checkUserAuthentication() {
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (!currentUser) {
        // Redirigir al login si no está autenticado
        window.location.href = 'login.html';
        return;
    }
}

// Cargar empleos favoritos
function loadFavorites() {
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    // Obtener los datos completos de los empleos guardados
    favoritesJobs = jobsData.filter(job => savedJobIds.includes(job.id));
    filteredFavorites = [...favoritesJobs];
    
    // Actualizar estadísticas
    updateFavoritesStats();
    
    // Mostrar empleos
    displayFavorites();
}

// Configurar event listeners
function setupEventListeners() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFavoritesFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFavoritesFilters);
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        const confirmModal = document.getElementById('confirmModal');
        const jobModal = document.getElementById('jobModal');
        
        if (event.target === confirmModal) {
            closeConfirmModal();
        }
        
        if (event.target === jobModal) {
            closeJobModal();
        }
    });
}

// Actualizar estadísticas de favoritos
function updateFavoritesStats() {
    const totalFavoritesEl = document.getElementById('totalFavorites');
    const recentFavoritesEl = document.getElementById('recentFavorites');
    
    if (totalFavoritesEl) {
        totalFavoritesEl.textContent = favoritesJobs.length;
    }
    
    if (recentFavoritesEl) {
        // Simular empleos guardados esta semana (en una app real sería basado en fechas reales)
        const recentCount = Math.min(favoritesJobs.length, Math.floor(Math.random() * 3) + 1);
        recentFavoritesEl.textContent = recentCount;
    }
}

// Aplicar filtros y ordenamiento
function applyFavoritesFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    let filtered = [...favoritesJobs];
    
    // Aplicar filtro de categoría
    if (categoryFilter && categoryFilter.value) {
        filtered = filtered.filter(job => job.category === categoryFilter.value);
    }
    
    // Aplicar ordenamiento
    if (sortFilter && sortFilter.value) {
        switch (sortFilter.value) {
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'company':
                filtered.sort((a, b) => a.company.localeCompare(b.company));
                break;
            case 'salary':
                filtered.sort((a, b) => {
                    // Extraer números del salario para comparar
                    const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
                    const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
                    return salaryB - salaryA;
                });
                break;
            case 'recent':
            default:
                // Mantener orden original (más recientes primero)
                break;
        }
    }
    
    filteredFavorites = filtered;
    displayFavorites();
}

// Mostrar empleos favoritos
function displayFavorites() {
    const container = document.getElementById('favoritesContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (!container || !emptyState) return;
    
    if (filteredFavorites.length === 0) {
        container.style.display = 'none';
        emptyState.classList.remove('hidden');
        return;
    }
    
    container.style.display = 'grid';
    emptyState.classList.add('hidden');
    
    // Aplicar clase de vista
    container.className = `favorites-grid ${currentView === 'list' ? 'list-view' : ''}`;
    
    container.innerHTML = filteredFavorites.map(job => createFavoriteJobCard(job)).join('');
}

// Crear tarjeta de empleo favorito
function createFavoriteJobCard(job) {
    return `
        <div class="favorite-job-card">
            <div class="favorite-badge">
                <i class="fas fa-heart"></i>
            </div>
            
            <div class="job-card-header">
                <h3 class="job-title" onclick="openJobModal(${job.id})">${job.title}</h3>
                <p class="company-name">
                    <i class="fas fa-building"></i>
                    ${job.company}
                </p>
            </div>
            
            <div class="job-card-body">
                <div class="job-meta">
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${job.location}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${formatJobType(job.type)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-user-tie"></i>
                        <span>${formatExperience(job.experience)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${job.posted}</span>
                    </div>
                </div>
                
                <div class="job-salary">${job.salary}</div>
                
                <div class="job-description">
                    ${job.description.substring(0, 120)}...
                </div>
                
                <div class="job-tags">
                    ${job.tags.slice(0, 4).map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                    ${job.tags.length > 4 ? `<span class="job-tag">+${job.tags.length - 4} más</span>` : ''}
                </div>
            </div>
            
            <div class="job-card-actions">
                <button class="action-btn apply-btn" onclick="applyToJob(${job.id})">
                    <i class="fas fa-paper-plane"></i>
                    Aplicar
                </button>
                <button class="action-btn view-btn-action" onclick="openJobModal(${job.id})">
                    <i class="fas fa-eye"></i>
                    Ver detalles
                </button>
                <button class="action-btn remove-btn" onclick="showRemoveConfirm(${job.id})">
                    <i class="fas fa-trash"></i>
                    Eliminar
                </button>
            </div>
        </div>
    `;
}

// Cambiar vista (grid/list)
function setView(view) {
    currentView = view;
    
    const gridBtn = document.getElementById('gridView');
    const listBtn = document.getElementById('listView');
    
    if (gridBtn && listBtn) {
        gridBtn.classList.toggle('active', view === 'grid');
        listBtn.classList.toggle('active', view === 'list');
    }
    
    displayFavorites();
}

// Mostrar confirmación para eliminar favorito
function showRemoveConfirm(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    jobToRemove = jobId;
    
    const modal = document.getElementById('confirmModal');
    const jobPreview = document.getElementById('jobPreview');
    
    if (modal && jobPreview) {
        jobPreview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <i class="fas fa-briefcase" style="color: #667eea; font-size: 1.5rem;"></i>
                <div>
                    <strong>${job.title}</strong><br>
                    <span style="color: #666;">${job.company}</span>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

// Confirmar eliminación de favorito
function confirmRemoveFavorite() {
    if (jobToRemove) {
        removeFavorite(jobToRemove);
        closeConfirmModal();
        jobToRemove = null;
    }
}

// Eliminar empleo de favoritos
function removeFavorite(jobId) {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    savedJobs = savedJobs.filter(id => id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    
    // Recargar favoritos
    loadFavorites();
    
    const job = jobsData.find(j => j.id === jobId);
    if (job) {
        showTemporaryMessage(`"${job.title}" eliminado de favoritos`, 'info');
    }
}

// Limpiar todos los favoritos
function clearAllFavorites() {
    if (favoritesJobs.length === 0) {
        showTemporaryMessage('No tienes empleos guardados', 'info');
        return;
    }
    
    const confirmClear = confirm(`¿Estás seguro de que quieres eliminar todos los ${favoritesJobs.length} empleos de tus favoritos? Esta acción no se puede deshacer.`);
    
    if (confirmClear) {
        localStorage.removeItem('savedJobs');
        loadFavorites();
        showTemporaryMessage('Todos los favoritos han sido eliminados', 'info');
    }
}

// Cerrar modal de confirmación
function closeConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.style.display = 'none';
    }
    jobToRemove = null;
}

// Abrir modal con detalles del empleo (reutilizar del script principal)
function openJobModal(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    const modalContent = document.getElementById('jobModalContent');
    if (!modalContent) return;
    
    modalContent.innerHTML = `
        <div class="job-modal-header">
            <h2>${job.title}</h2>
            <div class="job-salary">${job.salary}</div>
        </div>
        
        <div class="job-company-info">
            <h3><i class="fas fa-building"></i> ${job.company}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
            <p><i class="fas fa-clock"></i> ${formatJobType(job.type)}</p>
            <p><i class="fas fa-user-tie"></i> ${formatExperience(job.experience)}</p>
        </div>
        
        <div class="job-section">
            <h3>Descripción del puesto</h3>
            <p>${job.description}</p>
        </div>
        
        <div class="job-section">
            <h3>Requisitos</h3>
            <ul>
                ${job.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
        </div>
        
        <div class="job-section">
            <h3>Habilidades</h3>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        <div class="job-modal-actions">
            <button class="apply-btn" onclick="applyToJob(${job.id})">
                <i class="fas fa-paper-plane"></i>
                Aplicar a este empleo
            </button>
            <button class="remove-btn" onclick="showRemoveConfirm(${job.id}); closeJobModal();">
                <i class="fas fa-heart-broken"></i>
                Eliminar de favoritos
            </button>
        </div>
        
        <div class="job-posted-info">
            <p><i class="fas fa-calendar"></i> Publicado ${job.posted}</p>
        </div>
    `;
    
    const modal = document.getElementById('jobModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Cerrar modal de empleo
function closeJobModal() {
    const modal = document.getElementById('jobModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Funciones de utilidad (reutilizar del script principal)
function formatJobType(type) {
    const types = {
        'tiempo-completo': 'Tiempo completo',
        'medio-tiempo': 'Medio tiempo',
        'freelance': 'Freelance',
        'remoto': 'Remoto'
    };
    return types[type] || type;
}

function formatExperience(experience) {
    const experiences = {
        'junior': 'Junior (0-2 años)',
        'mid': 'Semi-senior (2-5 años)',
        'senior': 'Senior (5+ años)'
    };
    return experiences[experience] || experience;
}

// Aplicar a empleo (reutilizar del script principal)
function applyToJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (job && currentUser) {
        const user = JSON.parse(currentUser);
        showTemporaryMessage(`¡Aplicación enviada! ${user.name}, tu aplicación para "${job.title}" en ${job.company} ha sido procesada.`, 'success');
    }
}

// Función para mostrar mensajes temporales (reutilizar del script principal)
function showTemporaryMessage(message, type = 'info') {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `temp-message temp-message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos para el mensaje
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'info' ? '#d1ecf1' : '#fff3cd'};
        color: ${type === 'success' ? '#155724' : type === 'info' ? '#0c5460' : '#856404'};
        padding: 15px 20px;
        border-radius: 8px;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'info' ? '#bee5eb' : '#ffeaa7'};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animar entrada
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 4000);
} 