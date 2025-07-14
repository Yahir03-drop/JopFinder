// Empresarios Script - JobFinder
let entryLevelJobs = [];

document.addEventListener('DOMContentLoaded', function() {
    loadEntryLevelJobs();
    setupJobForm();
    
    if (entryLevelJobs.length === 0) {
        loadSampleJobs();
    }
});

function setupJobForm() {
    const form = document.getElementById('jobPostingForm');
    if (form) {
        form.addEventListener('submit', handleJobSubmission);
    }
}

function showJobForm() {
    const section = document.getElementById('jobPostingSection');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showCompanyStats() {
    alert('Las estadísticas estarán disponibles próximamente');
}

function handleJobSubmission(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('companyName').value,
        location: document.getElementById('jobLocation').value,
        type: document.getElementById('jobType').value,
        salary: document.getElementById('salary').value,
        description: document.getElementById('jobDescription').value,
        requirements: document.getElementById('requirements').value,
        benefits: document.getElementById('benefits').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value || '',
        posted: 'Hace unos minutos',
        entryLevel: true
    };
    
    if (validateForm(formData)) {
        publishJob(formData);
    }
}

function validateForm(data) {
    const required = ['title', 'company', 'location', 'type', 'salary', 'description', 'requirements', 'benefits', 'contactEmail'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            alert(`El campo "${field}" es requerido`);
            return false;
        }
    }
    
    if (!data.contactEmail.includes('@')) {
        alert('Por favor ingresa un email válido');
        return false;
    }
    
    return true;
}

async function publishJob(jobData) {
    try {
        // Verificar que el usuario esté logueado
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            alert('Debes iniciar sesión para publicar empleos');
            window.location.href = 'login.html';
            return;
        }
        
        // Usar Firebase para publicar el empleo
        const result = await window.firebaseDemo.publishJob(jobData);
        
        if (result.success) {
            document.getElementById('jobPostingForm').reset();
            alert('¡Empleo publicado exitosamente! Ya está disponible para candidatos sin experiencia.');
            
            // Recargar empleos desde Firebase
            loadEntryLevelJobs();
            
            setTimeout(() => {
                document.querySelector('.published-jobs').scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        } else {
            alert('Error al publicar empleo: ' + result.error);
        }
    } catch (error) {
        console.error('Error publicando empleo:', error);
        alert('Error al conectar con el servidor');
    }
}

async function loadEntryLevelJobs() {
    try {
        // Cargar empleos desde Firebase
        const result = await window.firebaseDemo.getAllJobs({ entryLevel: true });
        
        if (result.success) {
            entryLevelJobs = result.jobs.filter(job => job.entryLevel === true);
        } else {
            console.error('Error cargando empleos:', result.error);
            entryLevelJobs = [];
        }
    } catch (error) {
        console.error('Error conectando con Firebase:', error);
        // Fallback a localStorage si Firebase falla
        const saved = localStorage.getItem('entryLevelJobs');
        if (saved) {
            entryLevelJobs = JSON.parse(saved);
        }
    }
    
    displayJobs();
}

function displayJobs() {
    const container = document.getElementById('entryLevelJobsGrid');
    if (!container) return;
    
    if (entryLevelJobs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-briefcase"></i>
                <h3>Aún no hay empleos publicados</h3>
                <p>Sé el primero en publicar una oportunidad para candidatos sin experiencia</p>
                <button onclick="showJobForm()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Publicar primer empleo
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = entryLevelJobs.map(job => createJobCard(job)).join('');
}

function createJobCard(job) {
    return `
        <div style="background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; transition: transform 0.3s ease;">
            <div style="background: #10b981; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; position: absolute; margin-top: -0.5rem; margin-left: -0.5rem;">Sin experiencia</div>
            
            <h3 style="color: #333; margin-bottom: 0.5rem; margin-top: 1rem;">${job.title}</h3>
            <p style="color: #667eea; font-weight: 500; margin-bottom: 0.5rem;">
                <i class="fas fa-building"></i> ${job.company}
            </p>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">
                <i class="fas fa-map-marker-alt"></i> ${job.location}
            </p>
            
            <div style="margin-bottom: 1rem;">
                <span style="color: #666; font-size: 0.9rem; margin-right: 1rem;">
                    <i class="fas fa-clock"></i> ${formatJobType(job.type)}
                </span>
                <span style="color: #666; font-size: 0.9rem;">
                    <i class="fas fa-calendar"></i> ${job.posted}
                </span>
            </div>
            
            <div style="font-weight: 600; color: #059669; font-size: 1.1rem; margin-bottom: 1rem;">${job.salary}</div>
            
            <div style="color: #666; line-height: 1.5; margin-bottom: 1rem;">
                ${job.description.substring(0, 120)}...
            </div>
            
            <div style="margin-bottom: 1rem;">
                <h4 style="font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">Buscamos:</h4>
                <p style="font-size: 0.85rem; color: #666;">${job.requirements.substring(0, 100)}...</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="font-size: 0.9rem; color: #333; margin-bottom: 0.5rem;">Ofrecemos:</h4>
                <p style="font-size: 0.85rem; color: #666;">${job.benefits.substring(0, 100)}...</p>
            </div>
            
            <div style="display: flex; gap: 0.75rem;">
                <button onclick="applyToJob(${job.id})" style="flex: 1; padding: 0.75rem; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    <i class="fas fa-paper-plane"></i> Aplicar
                </button>
                <button onclick="saveJob(${job.id})" style="padding: 0.75rem; background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; border-radius: 8px; cursor: pointer;">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; font-size: 0.9rem; color: #666;">
                <i class="fas fa-envelope"></i> ${job.contactEmail}
                ${job.contactPhone ? `<br><i class="fas fa-phone"></i> ${job.contactPhone}` : ''}
            </div>
        </div>
    `;
}

function formatJobType(type) {
    const types = {
        'tiempo-completo': 'Tiempo completo',
        'medio-tiempo': 'Medio tiempo',
        'practicas': 'Prácticas',
        'remoto': 'Remoto'
    };
    return types[type] || type;
}

async function applyToJob(jobId) {
    try {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        
        if (!currentUser) {
            const confirmRedirect = confirm('Para aplicar necesitas iniciar sesión. ¿Quieres ir al login?');
            if (confirmRedirect) {
                window.location.href = 'login.html';
            }
            return;
        }
        
        // Aplicar usando Firebase
        const result = await window.firebaseDemo.applyToJob(jobId, {
            candidateName: currentUser.name,
            candidateEmail: currentUser.email
        });
        
        if (result.success) {
            const job = entryLevelJobs.find(j => j.id === jobId);
            alert(`¡Aplicación enviada exitosamente a "${job.title}" en ${job.company}!`);
        } else {
            alert('Error al enviar aplicación: ' + result.error);
        }
    } catch (error) {
        console.error('Error aplicando a empleo:', error);
        alert('Error al conectar con el servidor');
    }
}

function saveJob(jobId) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
        const confirmRedirect = confirm('Para guardar empleos necesitas iniciar sesión. ¿Quieres ir al login?');
        if (confirmRedirect) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    const job = entryLevelJobs.find(j => j.id === jobId);
    if (job) {
        // Guardar en favoritos locales (se puede mejorar con Firebase)
        let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        
        if (!savedJobs.includes(jobId)) {
            savedJobs.push(jobId);
            localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
            alert(`"${job.title}" guardado en favoritos`);
        } else {
            alert(`"${job.title}" ya está en tus favoritos`);
        }
    }
}

function previewJob() {
    const formData = {
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('companyName').value,
        location: document.getElementById('jobLocation').value,
        type: document.getElementById('jobType').value,
        salary: document.getElementById('salary').value,
        description: document.getElementById('jobDescription').value,
        requirements: document.getElementById('requirements').value,
        benefits: document.getElementById('benefits').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactPhone: document.getElementById('contactPhone').value
    };
    
    if (!formData.title || !formData.company || !formData.description) {
        alert('Por favor completa al menos el título, empresa y descripción para la vista previa');
        return;
    }
    
    alert('Vista previa: ' + formData.title + ' en ' + formData.company);
}

function loadSampleJobs() {
    const sampleJobs = [
        {
            id: 1001,
            title: "Asistente de Marketing Digital - Sin experiencia",
            company: "StartupTech México",
            location: "Ciudad de México (Híbrido)",
            type: "tiempo-completo",
            salary: "$18,000 - $22,000 MXN/mes",
            description: "Buscamos a una persona entusiasta y con ganas de aprender para unirse a nuestro equipo de marketing. Recibirás capacitación completa en marketing digital, redes sociales y análisis de datos.",
            requirements: "Actitud positiva y ganas de aprender. Conocimientos básicos de redes sociales. Excelente comunicación. Disponibilidad de tiempo completo. Espíritu colaborativo.",
            benefits: "Capacitación pagada en marketing digital. Oportunidades de crecimiento rápido. Ambiente joven y dinámico. Horarios flexibles. Seguro médico. Vales de despensa.",
            contactEmail: "rh@startuptech.mx",
            contactPhone: "+52 55 1234 5678",
            posted: "Hace 1 día",
            entryLevel: true
        },
        {
            id: 1002,
            title: "Trainee en Atención al Cliente",
            company: "Servicios Globales SA",
            location: "Guadalajara, México",
            type: "tiempo-completo",
            salary: "$15,000 - $18,000 MXN/mes",
            description: "Oportunidad perfecta para iniciar tu carrera profesional. Brindarás soporte telefónico y por chat a nuestros clientes, con un programa completo de capacitación de 2 semanas.",
            requirements: "Preparatoria o carrera técnica terminada. Habilidades de comunicación. Paciencia y empatía. Disponibilidad para trabajar por turnos. Actitud de servicio.",
            benefits: "Programa de entrenamiento de 2 semanas. Plan de carrera definido. Bonos por desempeño. Capacitación continua. Ambiente multicultural. Oportunidad de home office.",
            contactEmail: "talento@serviciosglobales.com",
            contactPhone: "+52 33 9876 5432",
            posted: "Hace 3 días",
            entryLevel: true
        },
        {
            id: 1003,
            title: "Practicante de Administración - Primer Empleo",
            company: "Corporativo Empresarial",
            location: "Monterrey, México",
            type: "practicas",
            salary: "$12,000 - $15,000 MXN/mes",
            description: "Prácticas profesionales remuneradas con posibilidad de contratación. Apoyarás en tareas administrativas generales mientras desarrollas habilidades profesionales clave.",
            requirements: "Estudiante de últimos semestres o recién egresado. Conocimientos básicos de Office. Responsabilidad y puntualidad. Ganas de aprender y crecer. Disponibilidad inmediata.",
            benefits: "Mentoría personalizada. Posibilidad de contratación al finalizar. Experiencia en empresa reconocida. Horarios de estudiante. Certificaciones gratuitas. Red de contactos profesionales.",
            contactEmail: "practicas@corporativo.mx",
            contactPhone: "",
            posted: "Hace 5 días",
            entryLevel: true
        }
    ];
    
    entryLevelJobs = sampleJobs;
    localStorage.setItem('entryLevelJobs', JSON.stringify(entryLevelJobs));
    displayJobs();
} 