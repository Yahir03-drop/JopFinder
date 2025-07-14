// ===== PROFILE SCRIPT - JOBFINDER =====

// Variables globales
let currentUser = null;
let isEditMode = false;
let profileData = {
    personal: {},
    experience: [],
    education: [],
    skills: {
        technical: [],
        soft: []
    },
    languages: [],
    certifications: [],
    portfolio: [],
    preferences: {},
    social: {},
    cv: null
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
    setupEventListeners();
    setupNavigation();
    loadUserProfile();
});

function initializeProfile() {
    // Verificar sesión de usuario
    const userSession = sessionStorage.getItem('currentUser');
    if (!userSession) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userSession);
    updateUserDisplay();
}

function updateUserDisplay() {
    const userName = document.getElementById('userName');
    const profileName = document.getElementById('profileName');
    const email = document.getElementById('email');
    
    if (userName) userName.textContent = currentUser.name || currentUser.email.split('@')[0];
    if (profileName) profileName.textContent = currentUser.name || 'Usuario';
    if (email) email.value = currentUser.email;
}

// ===== CONFIGURACIÓN DE EVENTOS =====
function setupEventListeners() {
    // CV Upload
    const cvUpload = document.getElementById('cvUpload');
    const cvUploadArea = document.getElementById('cvUploadArea');
    
    if (cvUpload && cvUploadArea) {
        cvUpload.addEventListener('change', handleCVUpload);
        
        // Drag and drop
        cvUploadArea.addEventListener('dragover', handleDragOver);
        cvUploadArea.addEventListener('drop', handleDrop);
        cvUploadArea.addEventListener('dragleave', handleDragLeave);
        cvUploadArea.addEventListener('click', () => cvUpload.click());
    }

    // Photo upload
    const photoUpload = document.getElementById('photoUpload');
    if (photoUpload) {
        photoUpload.addEventListener('change', handlePhotoUpload);
    }

    // Form inputs auto-save
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', saveProfileData);
    });
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.profile-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// ===== FUNCIONES DE SUBIDA DE ARCHIVOS =====
function handleCVUpload(event) {
    const file = event.target.files[0];
    if (file) {
        processCVFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processCVFile(files[0]);
    }
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove('dragover');
}

function processCVFile(file) {
    // Validar tipo de archivo
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        alert('Por favor, sube un archivo PDF, DOC o DOCX.');
        return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 5MB.');
        return;
    }

    // Simular subida
    const reader = new FileReader();
    reader.onload = function(e) {
        const cvData = {
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            uploadDate: new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            data: e.target.result
        };

        profileData.cv = cvData;
        showCVUploaded(cvData);
        saveProfileData();
        
        // Actualizar progreso del perfil
        updateProfileCompletion();
    };
    reader.readAsDataURL(file);
}

function showCVUploaded(cvData) {
    const uploadArea = document.getElementById('cvUploadArea');
    const currentCV = document.getElementById('cvCurrent');
    const fileName = document.getElementById('cvFileName');
    const fileSize = document.getElementById('cvFileSize');
    const uploadDate = document.getElementById('cvUploadDate');

    if (uploadArea) uploadArea.style.display = 'none';
    if (currentCV) currentCV.style.display = 'block';
    if (fileName) fileName.textContent = cvData.name;
    if (fileSize) fileSize.textContent = cvData.size;
    if (uploadDate) uploadDate.textContent = `Subido el ${cvData.uploadDate}`;
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePhoto = document.getElementById('profilePhoto');
            if (profilePhoto) {
                profilePhoto.src = e.target.result;
                profileData.personal.photo = e.target.result;
                saveProfileData();
            }
        };
        reader.readAsDataURL(file);
    }
}

// ===== FUNCIONES DE CV =====
function previewCV() {
    if (profileData.cv && profileData.cv.data) {
        const modal = document.getElementById('cvPreviewModal');
        const iframe = document.getElementById('cvPreviewFrame');
        
        if (modal && iframe) {
            iframe.src = profileData.cv.data;
            modal.style.display = 'block';
        }
    } else {
        alert('No hay CV disponible para vista previa.');
    }
}

function downloadCV() {
    if (profileData.cv && profileData.cv.data) {
        const link = document.createElement('a');
        link.href = profileData.cv.data;
        link.download = profileData.cv.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('No hay CV disponible para descargar.');
    }
}

function deleteCV() {
    if (confirm('¿Estás seguro de que quieres eliminar tu CV?')) {
        profileData.cv = null;
        
        const uploadArea = document.getElementById('cvUploadArea');
        const currentCV = document.getElementById('cvCurrent');
        
        if (uploadArea) uploadArea.style.display = 'block';
        if (currentCV) currentCV.style.display = 'none';
        
        saveProfileData();
        updateProfileCompletion();
    }
}

function closeCVPreview() {
    const modal = document.getElementById('cvPreviewModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ===== FUNCIONES DE EXPERIENCIA =====
function addExperience() {
    const experience = {
        id: Date.now(),
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        current: false,
        location: '',
        description: '',
        achievements: []
    };

    profileData.experience.push(experience);
    renderExperienceItem(experience);
    saveProfileData();
}

function editExperience(button) {
    // Implementar modal de edición
    alert('Función de edición en desarrollo');
}

function deleteExperience(button) {
    if (confirm('¿Eliminar esta experiencia?')) {
        const experienceItem = button.closest('.experience-item');
        experienceItem.remove();
        saveProfileData();
    }
}

function renderExperienceItem(experience) {
    const experienceList = document.getElementById('experienceList');
    if (!experienceList) return;

    const item = document.createElement('div');
    item.className = 'experience-item';
    item.innerHTML = `
        <div class="experience-header">
            <div class="experience-info">
                <h3>${experience.position || 'Nueva posición'}</h3>
                <h4>${experience.company || 'Nueva empresa'}</h4>
                <p class="experience-period">${experience.startDate || 'Fecha inicio'} - ${experience.current ? 'Presente' : experience.endDate || 'Fecha fin'}</p>
                <p class="experience-location">${experience.location || 'Ubicación'}</p>
            </div>
            <div class="experience-actions">
                <button class="btn-icon" onclick="editExperience(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" onclick="deleteExperience(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="experience-description">
            <p>${experience.description || 'Descripción del puesto...'}</p>
        </div>
    `;

    experienceList.appendChild(item);
}

// ===== FUNCIONES DE EDUCACIÓN =====
function addEducation() {
    const education = {
        id: Date.now(),
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        grade: '',
        description: ''
    };

    profileData.education.push(education);
    renderEducationItem(education);
    saveProfileData();
}

function editEducation(button) {
    alert('Función de edición en desarrollo');
}

function deleteEducation(button) {
    if (confirm('¿Eliminar esta educación?')) {
        const educationItem = button.closest('.education-item');
        educationItem.remove();
        saveProfileData();
    }
}

function renderEducationItem(education) {
    const educationList = document.getElementById('educationList');
    if (!educationList) return;

    const item = document.createElement('div');
    item.className = 'education-item';
    item.innerHTML = `
        <div class="education-header">
            <div class="education-info">
                <h3>${education.degree || 'Nuevo título'}</h3>
                <h4>${education.institution || 'Nueva institución'}</h4>
                <p class="education-period">${education.startDate || 'Año inicio'} - ${education.endDate || 'Año fin'}</p>
                <p class="education-grade">${education.grade || 'Nota media: N/A'}</p>
            </div>
            <div class="education-actions">
                <button class="btn-icon" onclick="editEducation(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" onclick="deleteEducation(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    educationList.appendChild(item);
}

// ===== FUNCIONES DE HABILIDADES =====
function addSkill(type) {
    const skillName = prompt(`Nombre de la habilidad ${type === 'technical' ? 'técnica' : 'blanda'}:`);
    if (!skillName || !skillName.trim()) return;

    if (type === 'technical') {
        const level = prompt('Nivel (1-100):');
        const levelNum = parseInt(level);
        
        if (isNaN(levelNum) || levelNum < 1 || levelNum > 100) {
            alert('Por favor ingresa un nivel válido (1-100)');
            return;
        }

        const skill = {
            name: skillName.trim(),
            level: levelNum,
            levelText: getLevelText(levelNum)
        };

        profileData.skills.technical.push(skill);
        renderTechnicalSkill(skill);
    } else {
        profileData.skills.soft.push(skillName.trim());
        renderSoftSkill(skillName.trim());
    }

    saveProfileData();
}

function addSoftSkill() {
    addSkill('soft');
}

function getLevelText(level) {
    if (level >= 90) return 'Experto';
    if (level >= 70) return 'Avanzado';
    if (level >= 50) return 'Intermedio';
    return 'Básico';
}

function renderTechnicalSkill(skill) {
    const technicalSkills = document.getElementById('technicalSkills');
    if (!technicalSkills) return;

    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
        <div class="skill-info">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-level">${skill.levelText}</span>
        </div>
        <div class="skill-bar">
            <div class="skill-progress" style="width: ${skill.level}%"></div>
        </div>
    `;

    technicalSkills.appendChild(skillItem);
}

function renderSoftSkill(skillName) {
    const softSkills = document.getElementById('softSkills');
    if (!softSkills) return;

    const skillTag = document.createElement('span');
    skillTag.className = 'skill-tag';
    skillTag.textContent = skillName;

    softSkills.appendChild(skillTag);
}

// ===== FUNCIONES DE IDIOMAS =====
function addLanguage() {
    const languageName = prompt('Nombre del idioma:');
    if (!languageName || !languageName.trim()) return;

    const level = prompt('Nivel (1-5, donde 5 es nativo):');
    const levelNum = parseInt(level);
    
    if (isNaN(levelNum) || levelNum < 1 || levelNum > 5) {
        alert('Por favor ingresa un nivel válido (1-5)');
        return;
    }

    const language = {
        name: languageName.trim(),
        level: levelNum,
        levelText: getLanguageLevelText(levelNum)
    };

    profileData.languages.push(language);
    renderLanguage(language);
    saveProfileData();
}

function getLanguageLevelText(level) {
    const levels = ['', 'Básico (A1)', 'Intermedio (A2)', 'Intermedio Alto (B1)', 'Avanzado (B2)', 'Nativo'];
    return levels[level] || 'Básico';
}

function renderLanguage(language) {
    const languagesList = document.getElementById('languagesList');
    if (!languagesList) return;

    const languageItem = document.createElement('div');
    languageItem.className = 'language-item';
    languageItem.innerHTML = `
        <div class="language-info">
            <div class="language-details">
                <h3>${language.name}</h3>
                <p>${language.levelText}</p>
            </div>
            <div class="language-level">
                <div class="level-dots">
                    ${Array.from({length: 5}, (_, i) => 
                        `<span class="dot ${i < language.level ? 'active' : ''}"></span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;

    languagesList.appendChild(languageItem);
}

// ===== FUNCIONES DE CERTIFICACIONES =====
function addCertification() {
    const certification = {
        id: Date.now(),
        name: prompt('Nombre de la certificación:') || '',
        issuer: prompt('Emisor:') || '',
        issueDate: prompt('Fecha de emisión (YYYY-MM):') || '',
        expiryDate: prompt('Fecha de expiración (YYYY-MM, opcional):') || '',
        credentialUrl: prompt('URL de la credencial (opcional):') || ''
    };

    if (!certification.name.trim()) return;

    profileData.certifications.push(certification);
    renderCertification(certification);
    saveProfileData();
}

function renderCertification(certification) {
    const certificationsList = document.getElementById('certificationsList');
    if (!certificationsList) return;

    const item = document.createElement('div');
    item.className = 'certification-item';
    item.innerHTML = `
        <div class="certification-icon">
            <i class="fas fa-certificate"></i>
        </div>
        <div class="certification-info">
            <h3>${certification.name}</h3>
            <p class="certification-issuer">${certification.issuer}</p>
            <p class="certification-date">
                Emitido: ${certification.issueDate}${certification.expiryDate ? ` • Expira: ${certification.expiryDate}` : ''}
            </p>
            ${certification.credentialUrl ? `<a href="${certification.credentialUrl}" class="certification-link" target="_blank">Ver credencial</a>` : ''}
        </div>
    `;

    certificationsList.appendChild(item);
}

// ===== FUNCIONES DE PORTAFOLIO =====
function addProject() {
    const project = {
        id: Date.now(),
        name: prompt('Nombre del proyecto:') || '',
        description: prompt('Descripción breve:') || '',
        technologies: prompt('Tecnologías usadas (separadas por coma):') || '',
        demoUrl: prompt('URL de la demo (opcional):') || '',
        codeUrl: prompt('URL del código (opcional):') || '',
        imageUrl: ''
    };

    if (!project.name.trim()) return;

    profileData.portfolio.push(project);
    renderProject(project);
    saveProfileData();
}

function renderProject(project) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <div class="project-image">
            <img src="${project.imageUrl || 'https://via.placeholder.com/300x200/6366f1/ffffff?text=' + encodeURIComponent(project.name)}" alt="${project.name}">
        </div>
        <div class="project-content">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.split(',').map(tech => 
                    `<span class="tech-tag">${tech.trim()}</span>`
                ).join('')}
            </div>
            <div class="project-links">
                ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                ${project.codeUrl ? `<a href="${project.codeUrl}" target="_blank"><i class="fab fa-github"></i> Código</a>` : ''}
            </div>
        </div>
    `;

    projectsGrid.appendChild(projectCard);
}

// ===== FUNCIONES DE UBICACIONES =====
function addLocation() {
    const newLocationInput = document.getElementById('newLocation');
    const location = newLocationInput.value.trim();
    
    if (!location) return;

    const preferredLocations = document.getElementById('preferredLocations');
    const locationTag = document.createElement('span');
    locationTag.className = 'location-tag';
    locationTag.innerHTML = `${location} <button onclick="removeLocation(this)">×</button>`;
    
    preferredLocations.appendChild(locationTag);
    newLocationInput.value = '';
    saveProfileData();
}

function removeLocation(button) {
    const locationTag = button.closest('.location-tag');
    locationTag.remove();
    saveProfileData();
}

// ===== FUNCIONES DE DOCUMENTOS =====
function uploadDocument() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            // Simular subida de documento
            const documentsList = document.getElementById('documentsList');
            const documentItem = document.createElement('div');
            documentItem.className = 'document-item';
            documentItem.innerHTML = `
                <i class="fas fa-file-alt"></i>
                <span>${file.name}</span>
                <div class="document-actions">
                    <button class="btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon"><i class="fas fa-download"></i></button>
                </div>
            `;
            documentsList.appendChild(documentItem);
            saveProfileData();
        }
    };
    input.click();
}

// ===== FUNCIONES DE MODO EDICIÓN =====
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.querySelector('.btn-primary');
    const floatingActions = document.querySelector('.floating-actions');
    
    if (isEditMode) {
        editBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar';
        if (floatingActions) floatingActions.style.display = 'flex';
        enableFormInputs();
    } else {
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Editar Perfil';
        if (floatingActions) floatingActions.style.display = 'none';
        disableFormInputs();
    }
}

function enableFormInputs() {
    const inputs = document.querySelectorAll('.form-input:not([readonly]), .form-textarea');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.style.backgroundColor = '';
    });
}

function disableFormInputs() {
    const inputs = document.querySelectorAll('.form-input:not(#email), .form-textarea');
    inputs.forEach(input => {
        input.setAttribute('readonly', true);
        input.style.backgroundColor = '#f9fafb';
    });
}

// ===== FUNCIONES DE GUARDADO =====
function saveProfile() {
    // Recopilar todos los datos del formulario
    collectFormData();
    
    // Guardar en localStorage
    localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(profileData));
    
    // Mostrar mensaje de éxito
    showSuccessMessage('Perfil guardado correctamente');
    
    // Salir del modo edición
    toggleEditMode();
    
    // Actualizar progreso del perfil
    updateProfileCompletion();
}

function cancelChanges() {
    // Recargar datos guardados
    loadUserProfile();
    
    // Salir del modo edición
    toggleEditMode();
    
    showSuccessMessage('Cambios cancelados');
}

function collectFormData() {
    // Información personal
    profileData.personal = {
        firstName: document.getElementById('firstName')?.value || '',
        lastName: document.getElementById('lastName')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        birthDate: document.getElementById('birthDate')?.value || '',
        location: document.getElementById('location')?.value || '',
        bio: document.getElementById('bio')?.value || '',
        photo: profileData.personal.photo || ''
    };

    // Redes sociales
    profileData.social = {
        linkedin: document.getElementById('linkedinUrl')?.value || '',
        github: document.getElementById('githubUrl')?.value || '',
        website: document.getElementById('websiteUrl')?.value || '',
        twitter: document.getElementById('twitterUrl')?.value || ''
    };

    // Preferencias laborales
    const availability = document.querySelector('input[name="availability"]:checked')?.value || '';
    profileData.preferences = {
        availability: availability,
        workModes: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.nextElementSibling?.textContent?.trim()),
        minSalary: document.getElementById('minSalary')?.value || '',
        maxSalary: document.getElementById('maxSalary')?.value || '',
        locations: Array.from(document.querySelectorAll('.location-tag')).map(tag => tag.textContent.replace('×', '').trim())
    };
}

function saveProfileData() {
    collectFormData();
    localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(profileData));
}

function loadUserProfile() {
    const savedProfile = localStorage.getItem(`profile_${currentUser.email}`);
    if (savedProfile) {
        profileData = JSON.parse(savedProfile);
        populateProfileForm();
    }
    updateProfileCompletion();
}

function populateProfileForm() {
    // Información personal
    if (profileData.personal) {
        document.getElementById('firstName').value = profileData.personal.firstName || '';
        document.getElementById('lastName').value = profileData.personal.lastName || '';
        document.getElementById('phone').value = profileData.personal.phone || '';
        document.getElementById('birthDate').value = profileData.personal.birthDate || '';
        document.getElementById('location').value = profileData.personal.location || '';
        document.getElementById('bio').value = profileData.personal.bio || '';
        
        if (profileData.personal.photo) {
            document.getElementById('profilePhoto').src = profileData.personal.photo;
        }
    }

    // CV
    if (profileData.cv) {
        showCVUploaded(profileData.cv);
    }

    // Redes sociales
    if (profileData.social) {
        document.getElementById('linkedinUrl').value = profileData.social.linkedin || '';
        document.getElementById('githubUrl').value = profileData.social.github || '';
        document.getElementById('websiteUrl').value = profileData.social.website || '';
        document.getElementById('twitterUrl').value = profileData.social.twitter || '';
    }

    // Preferencias
    if (profileData.preferences) {
        if (profileData.preferences.availability) {
            const availabilityRadio = document.querySelector(`input[name="availability"][value="${profileData.preferences.availability}"]`);
            if (availabilityRadio) availabilityRadio.checked = true;
        }
        
        document.getElementById('minSalary').value = profileData.preferences.minSalary || '';
        document.getElementById('maxSalary').value = profileData.preferences.maxSalary || '';
    }
}

// ===== FUNCIONES DE UTILIDAD =====
function updateProfileCompletion() {
    let completedSections = 0;
    const totalSections = 10;

    // Verificar cada sección
    if (profileData.personal?.firstName && profileData.personal?.lastName) completedSections++;
    if (profileData.cv) completedSections++;
    if (profileData.experience?.length > 0) completedSections++;
    if (profileData.education?.length > 0) completedSections++;
    if (profileData.skills?.technical?.length > 0 || profileData.skills?.soft?.length > 0) completedSections++;
    if (profileData.languages?.length > 0) completedSections++;
    if (profileData.certifications?.length > 0) completedSections++;
    if (profileData.portfolio?.length > 0) completedSections++;
    if (profileData.preferences?.availability) completedSections++;
    if (profileData.social?.linkedin || profileData.social?.github) completedSections++;

    const completionRate = Math.round((completedSections / totalSections) * 100);
    const completionRateElement = document.getElementById('completionRate');
    if (completionRateElement) {
        completionRateElement.textContent = completionRate + '%';
    }
}

function showSuccessMessage(message) {
    // Crear y mostrar mensaje de éxito temporal
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// ===== FUNCIONES DE SESIÓN =====
function logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('rememberUser');
    window.location.href = 'index.html';
}

// ===== ANIMACIONES CSS =====
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);
