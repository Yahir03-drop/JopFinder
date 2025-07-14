// Firebase Configuration para JobFinder
console.log('🔥 Inicializando Firebase para JobFinder...');

// Para demostración, simularemos Firebase con una implementación local mejorada
// En producción real, aquí iría la configuración real de Firebase

class FirebaseDemo {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('firebase_users') || '[]');
    this.jobs = JSON.parse(localStorage.getItem('firebase_jobs') || '[]');
    this.applications = JSON.parse(localStorage.getItem('firebase_applications') || '[]');
    this.currentUser = JSON.parse(sessionStorage.getItem('firebase_current_user') || 'null');
    
    // Inicializar con datos de ejemplo si está vacío
    this.initializeWithSampleData();
    
    console.log('🔥 Firebase Demo inicializado');
  }

  // Simular autenticación con Firebase
  async createUserWithEmailAndPassword(email, password, userData = {}) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = this.users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Crear nuevo usuario
      const newUser = {
        uid: 'user_' + Date.now(),
        email: email,
        name: userData.name || email.split('@')[0],
        userType: userData.userType || 'candidate',
        company: userData.company || '',
        position: userData.position || '',
        phone: userData.phone || '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        emailVerified: true,
        provider: 'email'
      };

      // Guardar usuario
      this.users.push(newUser);
      localStorage.setItem('firebase_users', JSON.stringify(this.users));

      // Auto-login del usuario
      this.currentUser = newUser;
      sessionStorage.setItem('firebase_current_user', JSON.stringify(newUser));

      // Enviar email de bienvenida
      this.sendWelcomeEmail(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Simular login
  async signInWithEmailAndPassword(email, password) {
    try {
      // Buscar usuario
      const user = this.users.find(u => u.email === email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Simular verificación de contraseña
      if (email === 'admin@jobfinder.com' && password !== 'admin123') {
        throw new Error('Contraseña incorrecta');
      }
      if (email === 'demo@demo.com' && password !== 'demo123') {
        throw new Error('Contraseña incorrecta');
      }

      // Actualizar último login
      user.lastLogin = new Date().toISOString();
      this.updateUser(user);

      // Establecer como usuario actual
      this.currentUser = user;
      sessionStorage.setItem('firebase_current_user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Simular login con Google
  async signInWithGoogle() {
    try {
      const googleUser = {
        uid: 'google_' + Date.now(),
        email: 'usuario.google@gmail.com',
        name: 'Usuario Google',
        photoURL: 'https://via.placeholder.com/150',
        userType: 'candidate',
        provider: 'google',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        emailVerified: true
      };

      // Verificar si ya existe
      let existingUser = this.users.find(u => u.email === googleUser.email);
      if (!existingUser) {
        this.users.push(googleUser);
        localStorage.setItem('firebase_users', JSON.stringify(this.users));
        existingUser = googleUser;
      }

      this.currentUser = existingUser;
      sessionStorage.setItem('firebase_current_user', JSON.stringify(existingUser));

      return { success: true, user: existingUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Cerrar sesión
  async signOut() {
    this.currentUser = null;
    sessionStorage.removeItem('firebase_current_user');
    localStorage.removeItem('rememberedUser');
    return { success: true };
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.currentUser;
  }

  // Actualizar usuario
  updateUser(userData) {
    const index = this.users.findIndex(u => u.uid === userData.uid);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      localStorage.setItem('firebase_users', JSON.stringify(this.users));
    }
  }

  // Publicar empleo
  async publishJob(jobData) {
    try {
      if (!this.currentUser) {
        throw new Error('Debes estar logueado para publicar empleos');
      }

      const newJob = {
        id: 'job_' + Date.now(),
        ...jobData,
        publisherId: this.currentUser.uid,
        publisherEmail: this.currentUser.email,
        publisherName: this.currentUser.name,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        applications: 0,
        views: 0
      };

      this.jobs.unshift(newJob);
      localStorage.setItem('firebase_jobs', JSON.stringify(this.jobs));

      return { success: true, jobId: newJob.id, job: newJob };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Obtener todos los empleos
  async getAllJobs(filters = {}) {
    try {
      let filteredJobs = [...this.jobs];

      // Aplicar filtros
      if (filters.category && filters.category !== '') {
        filteredJobs = filteredJobs.filter(job => job.category === filters.category);
      }
      
      if (filters.experience && filters.experience !== '') {
        if (filters.experience === 'sin-experiencia') {
          filteredJobs = filteredJobs.filter(job => job.entryLevel === true);
        } else {
          filteredJobs = filteredJobs.filter(job => job.experience === filters.experience);
        }
      }
      
      if (filters.type && filters.type !== '') {
        filteredJobs = filteredJobs.filter(job => job.type === filters.type);
      }
      
      if (filters.location && filters.location !== '') {
        filteredJobs = filteredJobs.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.search && filters.search !== '') {
        const searchTerm = filters.search.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      }

      return { success: true, jobs: filteredJobs };
    } catch (error) {
      return { success: false, error: error.message, jobs: [] };
    }
  }

  // Obtener empleos del usuario actual
  async getMyJobs() {
    try {
      if (!this.currentUser) {
        throw new Error('Debes estar logueado');
      }

      const myJobs = this.jobs.filter(job => job.publisherId === this.currentUser.uid);
      return { success: true, jobs: myJobs };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Aplicar a empleo
  async applyToJob(jobId, applicationData = {}) {
    try {
      if (!this.currentUser) {
        throw new Error('Debes estar logueado para aplicar');
      }

      // Verificar si ya aplicó
      const existingApplication = this.applications.find(app => 
        app.jobId === jobId && app.applicantId === this.currentUser.uid
      );

      if (existingApplication) {
        throw new Error('Ya has aplicado a este empleo');
      }

      const newApplication = {
        id: 'app_' + Date.now(),
        jobId: jobId,
        applicantId: this.currentUser.uid,
        applicantEmail: this.currentUser.email,
        applicantName: this.currentUser.name,
        ...applicationData,
        appliedAt: new Date().toISOString(),
        status: 'pending'
      };

      this.applications.push(newApplication);
      localStorage.setItem('firebase_applications', JSON.stringify(this.applications));

      // Incrementar contador del empleo
      const job = this.jobs.find(j => j.id === jobId);
      if (job) {
        job.applications = (job.applications || 0) + 1;
        localStorage.setItem('firebase_jobs', JSON.stringify(this.jobs));
      }

      return { success: true, application: newApplication };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Obtener aplicaciones del usuario
  async getMyApplications() {
    try {
      if (!this.currentUser) {
        throw new Error('Debes estar logueado');
      }

      const myApplications = this.applications.filter(app => 
        app.applicantId === this.currentUser.uid
      );

      // Enriquecer con datos del empleo
      const enrichedApplications = myApplications.map(app => {
        const job = this.jobs.find(j => j.id === app.jobId);
        return {
          ...app,
          job: job
        };
      });

      return { success: true, applications: enrichedApplications };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Enviar email de bienvenida
  // Enviar email de bienvenida (con servicio real + simulación)
  async sendWelcomeEmail(user) {
    try {
      // 1. Intentar enviar email real con EmailJS (si está configurado)
      if (window.emailService && window.emailService.isConfigured()) {
        console.log('📧 Enviando email real de bienvenida...');
        await window.emailService.sendWelcomeEmail(user);
      } else {
        console.log('⚠️ EmailJS no configurado - usando simulación');
        // Mostrar notificación de simulación
        if (window.emailService) {
          window.emailService.showEmailNotification(
            '📧 Email de bienvenida simulado (configura EmailJS para envíos reales)', 
            'info'
          );
        }
      }

      // 2. Guardar registro en historial local (simulación/backup)
      const emailData = {
        id: 'email_' + Date.now(),
        to: user.email,
        from: 'welcome@jobfinder.com',
        subject: '🎉 ¡Bienvenido a JobFinder!',
        template: 'welcome',
        content: `
          <h2>¡Hola ${user.name}!</h2>
          <p>¡Bienvenido a JobFinder! Tu cuenta ha sido creada exitosamente.</p>
          <p><strong>Detalles de tu cuenta:</strong></p>
          <ul>
            <li>📧 Email: ${user.email}</li>
            <li>👤 Tipo: ${user.userType === 'candidate' ? 'Candidato' : 'Empresa'}</li>
            <li>📅 Fecha de registro: ${new Date().toLocaleDateString('es-ES')}</li>
          </ul>
          <p>¡Ahora puedes empezar a buscar empleos o publicar oportunidades!</p>
          <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <h3>🚀 Próximos pasos:</h3>
            <ol>
              <li>Completa tu perfil profesional</li>
              <li>${user.userType === 'candidate' ? 'Explora empleos disponibles' : 'Publica tu primer empleo'}</li>
              <li>Configura alertas de notificaciones</li>
            </ol>
          </div>
        `,
        sentAt: new Date().toISOString(),
        status: window.emailService && window.emailService.isConfigured() ? 'sent_real' : 'sent_simulation'
      };

      // Guardar en historial de emails
      let emailHistory = JSON.parse(localStorage.getItem('emailHistory') || '[]');
      emailHistory.unshift(emailData);
      localStorage.setItem('emailHistory', JSON.stringify(emailHistory));

      console.log('✅ Email de bienvenida procesado para:', user.email);
      return { success: true, emailData };

    } catch (error) {
      console.error('❌ Error al enviar email de bienvenida:', error);
      return { success: false, error: error.message };
    }
  }

  // Inicializar con datos de ejemplo
  initializeWithSampleData() {
    // ⚠️ BASE DE DATOS LIMPIA - SIN DATOS PRECARGADOS ⚠️
    console.log('🗂️ Inicializando base de datos limpia (sin datos precargados)');
    
    // NO cargar usuarios de ejemplo - empezar con base limpia
    // Solo mantener estructura vacía
    if (this.users.length === 0) {
      console.log('👥 Base de usuarios vacía - listo para registros reales');
    }

    // NO cargar empleos de ejemplo - empezar con base limpia  
    if (this.jobs.length === 0) {
      console.log('💼 Base de empleos vacía - listo para publicaciones reales');
    }

    // NO cargar aplicaciones de ejemplo
    if (this.applications.length === 0) {
      console.log('📝 Base de aplicaciones vacía - listo para aplicaciones reales');
    }

    console.log('✅ Base de datos limpia inicializada correctamente');
  }

  // Método para limpiar completamente la base de datos
  clearAllData() {
    this.users = [];
    this.jobs = [];
    this.applications = [];
    this.currentUser = null;
    
    // Limpiar localStorage
    localStorage.removeItem('firebase_users');
    localStorage.removeItem('firebase_jobs');  
    localStorage.removeItem('firebase_applications');
    sessionStorage.removeItem('firebase_current_user');
    sessionStorage.removeItem('currentUser');
    
    console.log('🧹 Toda la base de datos ha sido limpiada');
    return { success: true, message: 'Base de datos limpiada completamente' };
  }

  // Obtener estadísticas
  getStats() {
    return {
      totalUsers: this.users.length,
      totalJobs: this.jobs.length,
      totalApplications: this.applications.length,
      activeUsers: this.users.filter(u => u.isActive).length,
      companiesCount: this.users.filter(u => u.userType === 'company').length,
      candidatesCount: this.users.filter(u => u.userType === 'candidate').length
    };
  }
}

// Crear instancia global
window.firebaseDemo = new FirebaseDemo();

// Exportar funciones para compatibilidad
window.firebase = {
  auth: {
    currentUser: () => window.firebaseDemo.getCurrentUser(),
    createUserWithEmailAndPassword: (email, password, userData) => 
      window.firebaseDemo.createUserWithEmailAndPassword(email, password, userData),
    signInWithEmailAndPassword: (email, password) => 
      window.firebaseDemo.signInWithEmailAndPassword(email, password),
    signInWithGoogle: () => window.firebaseDemo.signInWithGoogle(),
    signOut: () => window.firebaseDemo.signOut()
  },
  jobs: {
    publish: (jobData) => window.firebaseDemo.publishJob(jobData),
    getAll: (filters) => window.firebaseDemo.getAllJobs(filters),
    getMy: () => window.firebaseDemo.getMyJobs(),
    apply: (jobId, data) => window.firebaseDemo.applyToJob(jobId, data)
  },
  applications: {
    getMy: () => window.firebaseDemo.getMyApplications()
  },
  stats: () => window.firebaseDemo.getStats()
};

console.log('🎯 Firebase Demo configurado - Usuarios persistentes activados');
console.log('📊 Stats:', window.firebaseDemo.getStats()); 