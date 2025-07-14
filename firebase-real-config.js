// Configuración Real de Firebase para JobFinder
// Reemplaza firebase-config.js cuando tengas las credenciales reales

// Importar Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Tu configuración de Firebase (obtén esto desde Firebase Console)
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "jobfinder-xxxxx.firebaseapp.com",
  projectId: "jobfinder-xxxxx",
  storageBucket: "jobfinder-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxx"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Clase para manejar operaciones de base de datos
class JobFinderDB {
  constructor() {
    this.db = db;
    this.auth = auth;
    this.currentUser = null;
    
    // Escuchar cambios de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      if (user) {
        console.log('✅ Usuario autenticado:', user.email);
      } else {
        console.log('❌ Usuario no autenticado');
      }
    });
  }

  // ===== AUTENTICACIÓN =====
  
  async register(email, password, userData = {}) {
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      const userDoc = {
        uid: user.uid,
        email: user.email,
        name: userData.name || email.split('@')[0],
        userType: userData.userType || 'candidate',
        company: userData.company || '',
        position: userData.position || '',
        phone: userData.phone || '',
        createdAt: new Date(),
        lastLogin: new Date(),
        isActive: true,
        emailVerified: user.emailVerified
      };

      await setDoc(doc(this.db, 'users', user.uid), userDoc);
      
      console.log('✅ Usuario registrado exitosamente');
      return { success: true, user: userDoc };
      
    } catch (error) {
      console.error('❌ Error al registrar usuario:', error);
      return { success: false, error: error.message };
    }
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Actualizar último login
      await setDoc(doc(this.db, 'users', user.uid), {
        lastLogin: new Date()
      }, { merge: true });

      console.log('✅ Login exitoso');
      return { success: true, user };
      
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
      return { success: false, error: error.message };
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      console.log('✅ Logout exitoso');
      return { success: true };
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== EMPLEOS =====
  
  async publishJob(jobData) {
    try {
      if (!this.currentUser) throw new Error('Usuario no autenticado');

      const jobDoc = {
        ...jobData,
        employerId: this.currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        applications: [],
        views: 0
      };

      const docRef = doc(collection(this.db, 'jobs'));
      await setDoc(docRef, jobDoc);
      
      console.log('✅ Empleo publicado exitosamente');
      return { success: true, jobId: docRef.id };
      
    } catch (error) {
      console.error('❌ Error al publicar empleo:', error);
      return { success: false, error: error.message };
    }
  }

  async getJobs(filters = {}) {
    try {
      let jobQuery = query(collection(this.db, 'jobs'), where('isActive', '==', true));

      // Aplicar filtros
      if (filters.location) {
        jobQuery = query(jobQuery, where('location', '==', filters.location));
      }
      if (filters.type) {
        jobQuery = query(jobQuery, where('type', '==', filters.type));
      }
      if (filters.category) {
        jobQuery = query(jobQuery, where('category', '==', filters.category));
      }

      // Ordenar por fecha
      jobQuery = query(jobQuery, orderBy('createdAt', 'desc'));

      // Límite
      if (filters.limit) {
        jobQuery = query(jobQuery, limit(filters.limit));
      }

      const querySnapshot = await getDocs(jobQuery);
      const jobs = [];
      
      querySnapshot.forEach((doc) => {
        jobs.push({ id: doc.id, ...doc.data() });
      });

      console.log(`✅ ${jobs.length} empleos obtenidos`);
      return { success: true, jobs };
      
    } catch (error) {
      console.error('❌ Error al obtener empleos:', error);
      return { success: false, error: error.message };
    }
  }

  async applyToJob(jobId, applicationData = {}) {
    try {
      if (!this.currentUser) throw new Error('Usuario no autenticado');

      const applicationDoc = {
        jobId,
        applicantId: this.currentUser.uid,
        applicantEmail: this.currentUser.email,
        ...applicationData,
        appliedAt: new Date(),
        status: 'pending'
      };

      const docRef = doc(collection(this.db, 'applications'));
      await setDoc(docRef, applicationDoc);
      
      console.log('✅ Aplicación enviada exitosamente');
      return { success: true, applicationId: docRef.id };
      
    } catch (error) {
      console.error('❌ Error al aplicar al empleo:', error);
      return { success: false, error: error.message };
    }
  }

  // ===== UTILIDADES =====
  
  async getStats() {
    try {
      const usersSnapshot = await getDocs(collection(this.db, 'users'));
      const jobsSnapshot = await getDocs(collection(this.db, 'jobs'));
      const applicationsSnapshot = await getDocs(collection(this.db, 'applications'));

      return {
        totalUsers: usersSnapshot.size,
        totalJobs: jobsSnapshot.size,
        totalApplications: applicationsSnapshot.size
      };
    } catch (error) {
      console.error('❌ Error al obtener estadísticas:', error);
      return { totalUsers: 0, totalJobs: 0, totalApplications: 0 };
    }
  }
}

// Exportar instancia global
const jobFinderDB = new JobFinderDB();
export default jobFinderDB;

// Para compatibilidad con el código existente
window.firebase = jobFinderDB; 