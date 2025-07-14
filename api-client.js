// Cliente de API para JobFinder con JSON Server
// Reemplaza firebase-config.js para usar una base de datos real

class JobFinderAPI {
  constructor() {
    this.baseURL = 'http://localhost:3001';
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;
    
    // Propiedades para compatibilidad con código legacy
    this.users = [];
    this.jobs = [];
    this.applications = [];
    
    console.log('🌐 Conectando con API en:', this.baseURL);
    this.testConnection();
    this.loadDataFromAPI();
  }

  // Cargar datos desde la API para compatibilidad
  async loadDataFromAPI() {
    try {
      const [usersResult, jobsResult, applicationsResult] = await Promise.all([
        this.get('/users'),
        this.get('/jobs'),
        this.get('/applications')
      ]);

      if (usersResult.success) this.users = usersResult.data;
      if (jobsResult.success) this.jobs = jobsResult.data;
      if (applicationsResult.success) this.applications = applicationsResult.data;
      
    } catch (error) {
      console.log('⚠️ No se pudieron cargar datos iniciales (normal si la API no está corriendo)');
    }
  }

  // Probar conexión con la API
  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/users`);
      if (response.ok) {
        console.log('✅ Conexión con API exitosa');
        return true;
      } else {
        console.warn('⚠️ API responde pero con errores');
        return false;
      }
    } catch (error) {
      console.error('❌ Error de conexión con API:', error);
      console.log('💡 Asegúrate de ejecutar: npm start');
      return false;
    }
  }

  // ===== MÉTODOS HTTP AUXILIARES =====
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { success: true, data };
      
    } catch (error) {
      console.error(`❌ Error en ${endpoint}:`, error);
      return { success: false, error: error.message };
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // ===== AUTENTICACIÓN =====
  
  async createUserWithEmailAndPassword(email, password, userData = {}) {
    try {
      // Verificar si el usuario ya existe
      const existingUsers = await this.get(`/users?email=${email}`);
      if (existingUsers.success && existingUsers.data.length > 0) {
        return { success: false, error: 'El email ya está registrado' };
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        email: email,
        password: password, // En producción, esto debería estar hasheado
        name: userData.name || email.split('@')[0],
        userType: userData.userType || 'candidate',
        company: userData.company || '',
        position: userData.position || '',
        phone: userData.phone || '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        emailVerified: true
      };

      const result = await this.post('/users', newUser);
      
      if (result.success) {
        // Auto-login
        this.currentUser = result.data;
        sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Actualizar array local para compatibilidad
        this.users.push(result.data);
        
        // Enviar email de bienvenida
        this.sendWelcomeEmail(result.data);
        
        console.log('✅ Usuario registrado y logueado:', email);
        return { success: true, user: result.data };
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Error al registrar usuario:', error);
      return { success: false, error: error.message };
    }
  }

  async signInWithEmailAndPassword(email, password) {
    try {
      const result = await this.get(`/users?email=${email}&password=${password}`);
      
      if (result.success && result.data.length > 0) {
        const user = result.data[0];
        
        // Actualizar último login
        await this.put(`/users/${user.id}`, {
          ...user,
          lastLogin: new Date().toISOString()
        });

        this.currentUser = user;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        console.log('✅ Login exitoso:', email);
        return { success: true, user };
      } else {
        return { success: false, error: 'Credenciales incorrectas' };
      }
      
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
    console.log('✅ Logout exitoso');
    return { success: true };
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // ===== EMPLEOS =====
  
  async publishJob(jobData) {
    try {
      if (!this.currentUser) {
        return { success: false, error: 'Usuario no autenticado' };
      }

      const newJob = {
        id: Date.now().toString(),
        ...jobData,
        employerId: this.currentUser.id,
        employerEmail: this.currentUser.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        views: 0,
        applicationsCount: 0
      };

      const result = await this.post('/jobs', newJob);
      
      if (result.success) {
        console.log('✅ Empleo publicado:', jobData.title);
        return { success: true, job: result.data };
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Error al publicar empleo:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllJobs(filters = {}) {
    try {
      let endpoint = '/jobs?isActive=true';
      
      // Aplicar filtros
      if (filters.location) endpoint += `&location=${encodeURIComponent(filters.location)}`;
      if (filters.type) endpoint += `&type=${encodeURIComponent(filters.type)}`;
      if (filters.category) endpoint += `&category=${encodeURIComponent(filters.category)}`;
      if (filters.search) endpoint += `&title_like=${encodeURIComponent(filters.search)}`;
      
      // Ordenamiento y límite
      endpoint += '&_sort=createdAt&_order=desc';
      if (filters.limit) endpoint += `&_limit=${filters.limit}`;

      const result = await this.get(endpoint);
      
      if (result.success) {
        console.log(`✅ ${result.data.length} empleos obtenidos`);
        return { success: true, jobs: result.data };
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Error al obtener empleos:', error);
      return { success: false, error: error.message };
    }
  }

  async getMyJobs() {
    try {
      if (!this.currentUser) {
        return { success: false, error: 'Usuario no autenticado' };
      }

      const result = await this.get(`/jobs?employerId=${this.currentUser.id}`);
      
      if (result.success) {
        console.log(`✅ ${result.data.length} empleos propios obtenidos`);
        return { success: true, jobs: result.data };
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Error al obtener mis empleos:', error);
      return { success: false, error: error.message };
    }
  }

  async applyToJob(jobId, applicationData = {}) {
    try {
      if (!this.currentUser) {
        return { success: false, error: 'Usuario no autenticado' };
      }

      // Verificar si ya aplicó
      const existing = await this.get(`/applications?jobId=${jobId}&applicantId=${this.currentUser.id}`);
      if (existing.success && existing.data.length > 0) {
        return { success: false, error: 'Ya has aplicado a este empleo' };
      }

      const newApplication = {
        id: Date.now().toString(),
        jobId: jobId,
        applicantId: this.currentUser.id,
        applicantEmail: this.currentUser.email,
        applicantName: this.currentUser.name,
        ...applicationData,
        appliedAt: new Date().toISOString(),
        status: 'pending'
      };

      const result = await this.post('/applications', newApplication);
      
      if (result.success) {
        console.log('✅ Aplicación enviada al empleo:', jobId);
        return { success: true, application: result.data };
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Error al aplicar al empleo:', error);
      return { success: false, error: error.message };
    }
  }

  async getMyApplications() {
    try {
      if (!this.currentUser) {
        return { success: false, error: 'Usuario no autenticado' };
      }

      const result = await this.get(`/applications?applicantId=${this.currentUser.id}&_expand=job`);
      
      if (result.success) {
        console.log(`✅ ${result.data.length} aplicaciones obtenidas`);
        return { success: true, applications: result.data };
      }
      
      return result;
      
    } catch (error) {
      console.error('❌ Error al obtener mis aplicaciones:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== ESTADÍSTICAS =====
  
  async getStats() {
    try {
      const [usersResult, jobsResult, applicationsResult] = await Promise.all([
        this.get('/users'),
        this.get('/jobs'),
        this.get('/applications')
      ]);

      return {
        totalUsers: usersResult.success ? usersResult.data.length : 0,
        totalJobs: jobsResult.success ? jobsResult.data.length : 0,
        totalApplications: applicationsResult.success ? applicationsResult.data.length : 0,
        activeJobs: jobsResult.success ? jobsResult.data.filter(job => job.isActive).length : 0
      };
      
    } catch (error) {
      console.error('❌ Error al obtener estadísticas:', error);
      return { totalUsers: 0, totalJobs: 0, totalApplications: 0, activeJobs: 0 };
    }
  }

  // ===== EMAILS =====
  
  async sendWelcomeEmail(user) {
    try {
      // Usar el servicio de email si está disponible
      if (window.emailService && window.emailService.isConfigured()) {
        console.log('📧 Enviando email real de bienvenida...');
        await window.emailService.sendWelcomeEmail(user);
      } else {
        console.log('⚠️ EmailJS no configurado - usando simulación');
        if (window.emailService) {
          window.emailService.showEmailNotification(
            '📧 Email de bienvenida simulado (configura EmailJS para envíos reales)', 
            'info'
          );
        }
      }

      // Guardar registro en historial local
      const emailData = {
        id: 'email_' + Date.now(),
        to: user.email,
        from: 'welcome@jobfinder.com',
        subject: '🎉 ¡Bienvenido a JobFinder!',
        template: 'welcome',
        sentAt: new Date().toISOString(),
        status: window.emailService && window.emailService.isConfigured() ? 'sent_real' : 'sent_simulation'
      };

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

  // ===== UTILIDADES =====
  
  async clearAllData() {
    try {
      console.log('🧹 Limpiando toda la base de datos...');
      
      // Obtener todos los IDs para eliminar
      const [users, jobs, applications] = await Promise.all([
        this.get('/users'),
        this.get('/jobs'), 
        this.get('/applications')
      ]);

      // Eliminar todos los registros
      const deletePromises = [];
      
      if (users.success) {
        users.data.forEach(user => deletePromises.push(this.delete(`/users/${user.id}`)));
      }
      if (jobs.success) {
        jobs.data.forEach(job => deletePromises.push(this.delete(`/jobs/${job.id}`)));
      }
      if (applications.success) {
        applications.data.forEach(app => deletePromises.push(this.delete(`/applications/${app.id}`)));
      }

      await Promise.all(deletePromises);
      
      // Limpiar sesión
      this.currentUser = null;
      sessionStorage.removeItem('currentUser');
      
      console.log('✅ Base de datos limpiada completamente');
      return { success: true, message: 'Base de datos limpiada' };
      
    } catch (error) {
      console.error('❌ Error al limpiar base de datos:', error);
      return { success: false, error: error.message };
    }
  }
}

// Crear instancia global
const jobFinderAPI = new JobFinderAPI();

// Exportar para compatibilidad con el código existente
window.firebase = jobFinderAPI;
window.firebaseDemo = jobFinderAPI;

// También crear alias global para facilidad de uso
window.jobFinderAPI = jobFinderAPI; 