// Datos de ejemplo de empleos
const jobsData = [
    // TECNOLOGÍA
    {
        id: 1,
        title: "Desarrollador Frontend React",
        company: "TechStart Solutions",
        location: "Ciudad de México, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "tecnologia",
        salary: "$35,000 - $45,000 MXN/mes",
        description: "Buscamos un desarrollador Frontend con experiencia en React para unirse a nuestro equipo dinámico. Trabajarás en proyectos innovadores y colaborarás con un equipo multidisciplinario.",
        requirements: ["3+ años de experiencia en React", "Conocimientos en JavaScript ES6+", "Experiencia con CSS3 y HTML5", "Familiaridad con Git"],
        tags: ["React", "JavaScript", "CSS", "HTML", "Git"],
        posted: "Hace 2 días",
        featured: true
    },
    {
        id: 2,
        title: "Desarrollador Backend Node.js",
        company: "ServerTech Inc",
        location: "Remoto (LATAM)",
        type: "remoto",
        experience: "mid",
        category: "tecnologia",
        salary: "$40,000 - $50,000 MXN/mes",
        description: "Desarrollador Backend especializado en Node.js para trabajar en APIs robustas y escalables. Oportunidad de trabajo 100% remoto.",
        requirements: ["Experiencia sólida en Node.js", "Bases de datos MongoDB y PostgreSQL", "APIs RESTful", "Conocimientos en Docker"],
        tags: ["Node.js", "MongoDB", "PostgreSQL", "Docker", "APIs"],
        posted: "Hace 1 semana",
        featured: false
    },
    {
        id: 3,
        title: "Desarrollador Full Stack",
        company: "WebDev Studio",
        location: "San Francisco, CA",
        type: "tiempo-completo",
        experience: "senior",
        category: "tecnologia",
        salary: "$65,000 - $80,000 MXN/mes",
        description: "Desarrollador Full Stack con experiencia en tecnologías modernas. Liderarás el desarrollo de aplicaciones web completas.",
        requirements: ["5+ años de experiencia", "React y Node.js", "Bases de datos SQL y NoSQL", "Arquitectura de software"],
        tags: ["React", "Node.js", "Full Stack", "SQL", "NoSQL"],
        posted: "Hace 2 días",
        featured: true
    },
    {
        id: 4,
        title: "DevOps Engineer",
        company: "CloudTech Systems",
        location: "Guadalajara, México",
        type: "tiempo-completo",
        experience: "senior",
        category: "tecnologia",
        salary: "$55,000 - $70,000 MXN/mes",
        description: "Ingeniero DevOps para gestionar infraestructura cloud y procesos de CI/CD en entornos de alta disponibilidad.",
        requirements: ["Experiencia con AWS/Azure", "Docker y Kubernetes", "Jenkins/GitLab CI", "Terraform"],
        tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        posted: "Hace 3 días",
        featured: false
    },
    {
        id: 5,
        title: "Analista de Datos",
        company: "DataInsights Corp",
        location: "Monterrey, México",
        type: "tiempo-completo",
        experience: "junior",
        category: "tecnologia",
        salary: "$25,000 - $32,000 MXN/mes",
        description: "Analista de datos junior para trabajar con big data y crear dashboards. Oportunidad de crecimiento en empresa tecnológica.",
        requirements: ["Python o R", "SQL avanzado", "Power BI o Tableau", "Estadística básica"],
        tags: ["Python", "SQL", "Power BI", "Analytics", "Big Data"],
        posted: "Hace 4 días",
        featured: false
    },

    // MARKETING
    {
        id: 6,
        title: "Especialista en Marketing Digital",
        company: "Creative Marketing Agency",
        location: "Ciudad de México, México",
        type: "tiempo-completo",
        experience: "junior",
        category: "marketing",
        salary: "$22,000 - $28,000 MXN/mes",
        description: "Únete a nuestro equipo de marketing como especialista digital. Gestionarás campañas en redes sociales, SEO y análisis de datos para nuestros clientes.",
        requirements: ["Experiencia en Google Ads y Facebook Ads", "Conocimientos de SEO", "Análisis de datos con Google Analytics", "Creatividad y proactividad"],
        tags: ["Google Ads", "SEO", "Analytics", "Social Media", "Marketing"],
        posted: "Hace 1 día",
        featured: false
    },
    {
        id: 7,
        title: "Community Manager",
        company: "Social Media Pro",
        location: "Austin, TX",
        type: "medio-tiempo",
        experience: "junior",
        category: "marketing",
        salary: "$15,000 - $20,000 MXN/mes",
        description: "Community Manager para gestionar redes sociales de múltiples clientes. Posibilidad de trabajo híbrido.",
        requirements: ["Experiencia en RRSS", "Capacidad de creación de contenido", "Photoshop básico", "Inglés nativo"],
        tags: ["RRSS", "Contenido", "Photoshop", "Community", "Engagement"],
        posted: "Hace 2 días",
        featured: false
    },
    {
        id: 8,
        title: "Director de Marketing",
        company: "StartupTech",
        location: "Polanco, CDMX, México",
        type: "tiempo-completo",
        experience: "senior",
        category: "marketing",
        salary: "$80,000 - $120,000 MXN/mes",
        description: "Director de Marketing para liderar estrategia de crecimiento en startup tecnológica de rápido crecimiento.",
        requirements: ["7+ años en marketing", "Experiencia en startups", "Growth hacking", "Liderazgo de equipos"],
        tags: ["Growth", "Estrategia", "Liderazgo", "Startup", "KPIs"],
        posted: "Hace 5 días",
        featured: true
    },

    // DISEÑO
    {
        id: 9,
        title: "Diseñador UX/UI",
        company: "Design Studio CDMX",
        location: "Roma Norte, CDMX, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "diseño",
        salary: "$30,000 - $40,000 MXN/mes",
        description: "Diseñador UX/UI para crear experiencias digitales excepcionales. Trabajarás en proyectos diversos desde apps móviles hasta plataformas web.",
        requirements: ["3+ años en UX/UI", "Figma y Adobe Creative Suite", "Experiencia en research", "Portfolio sólido"],
        tags: ["UX", "UI", "Figma", "Adobe", "Research"],
        posted: "Hace 3 días",
        featured: false
    },
    {
        id: 10,
        title: "Diseñador Gráfico Senior",
        company: "Creative Agency",
        location: "Miami, FL",
        type: "tiempo-completo",
        experience: "senior",
        category: "diseño",
        salary: "$45,000 - $55,000 MXN/mes",
        description: "Diseñador gráfico senior para liderar proyectos creativos de marcas reconocidas internacionalmente.",
        requirements: ["5+ años experiencia", "Branding y identidad", "Adobe Master", "Inglés fluido"],
        tags: ["Branding", "Adobe", "Creatividad", "Senior", "Internacional"],
        posted: "Hace 4 días",
        featured: true
    },

    // VENTAS
    {
        id: 11,
        title: "Ejecutivo de Ventas",
        company: "Sales Pro",
        location: "Roma Norte, CDMX, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "ventas",
        salary: "$28,000 - $35,000 MXN/mes + comisiones",
        description: "Ejecutivo de ventas para expansión de cartera de clientes. Excelentes oportunidades de crecimiento y comisiones atractivas.",
        requirements: ["Experiencia en ventas B2B", "Orientación a objetivos", "Habilidades de negociación", "CRM (Salesforce preferible)"],
        tags: ["Ventas", "B2B", "CRM", "Salesforce", "Negociación"],
        posted: "Hace 6 días",
        featured: false
    },
    {
        id: 12,
        title: "Comercial de Seguros",
        company: "InsureTech Solutions",
        location: "Puebla, México",
        type: "tiempo-completo",
        experience: "junior",
        category: "ventas",
        salary: "$20,000 - $25,000 MXN/mes + comisiones",
        description: "Comercial para venta de seguros particulares y empresariales. Formación incluida y alto potencial de ingresos.",
        requirements: ["Orientación comercial", "Capacidad de comunicación", "Licencia de conducir", "Disponibilidad para viajar"],
        tags: ["Seguros", "Comercial", "B2C", "Comisiones", "Formación"],
        posted: "Hace 3 días",
        featured: false
    },

    // FINANZAS
    {
        id: 13,
        title: "Analista Financiero",
        company: "FinanceCorp",
        location: "Interlomas, CDMX, México",
        type: "tiempo-completo",
        experience: "junior",
        category: "finanzas",
        salary: "$22,000 - $28,000 MXN/mes",
        description: "Oportunidad para analista financiero junior. Trabajarás en análisis de inversiones, reportes financieros y modelado de datos.",
        requirements: ["Licenciatura en Finanzas o Economía", "Excel avanzado", "Conocimientos en Power BI", "Capacidad analítica"],
        tags: ["Excel", "Power BI", "Análisis", "Finanzas", "Reportes"],
        posted: "Hace 5 días",
        featured: false
    },
    {
        id: 14,
        title: "Controller Financiero",
        company: "Global Finance Group",
        location: "New York, NY",
        type: "tiempo-completo",
        experience: "senior",
        category: "finanzas",
        salary: "$60,000 - $75,000 MXN/mes",
        description: "Controller financiero para multinacional. Responsable de reporting, presupuestos y análisis de desviaciones.",
        requirements: ["5+ años en finanzas", "SAP o similar ERP", "Reporting consolidado", "Inglés nativo"],
        tags: ["SAP", "Controlling", "Budgets", "Reporting", "IFRS"],
        posted: "Hace 1 semana",
        featured: true
    },

    // RECURSOS HUMANOS
    {
        id: 15,
        title: "Especialista en Recursos Humanos",
        company: "HR Solutions",
        location: "Guadalajara, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "recursos-humanos",
        salary: "$25,000 - $32,000 MXN/mes",
        description: "Especialista en RRHH para gestión integral del talento humano. Enfoque en reclutamiento, capacitación y desarrollo organizacional.",
        requirements: ["Psicología o RRHH", "Experiencia en reclutamiento", "Conocimientos laborales", "Habilidades interpersonales"],
        tags: ["RRHH", "Reclutamiento", "Talento", "Desarrollo", "Organizacional"],
        posted: "Hace 2 días",
        featured: false
    },
    {
        id: 16,
        title: "Director de Talento Humano",
        company: "Corporate Excellence",
        location: "Las Vegas, NV",
        type: "tiempo-completo",
        experience: "senior",
        category: "recursos-humanos",
        salary: "$70,000 - $90,000 MXN/mes",
        description: "Director de Talento Humano para liderar estrategia de RRHH en empresa multinacional. Gestión de equipos globales.",
        requirements: ["Maestría en RRHH", "10+ años experiencia", "Liderazgo global", "Inglés nativo"],
        tags: ["Dirección", "Global", "Estrategia", "Liderazgo", "Multinacional"],
        posted: "Hace 1 semana",
        featured: true
    },

    // SALUD
    {
        id: 17,
        title: "Enfermera General",
        company: "Hospital Privado CDMX",
        location: "Del Valle, CDMX, México",
        type: "tiempo-completo",
        experience: "junior",
        category: "salud",
        salary: "$18,000 - $24,000 MXN/mes",
        description: "Enfermera general para unidad de hospitalización. Ambiente profesional y oportunidades de especialización.",
        requirements: ["Título de Enfermería", "Cédula profesional", "Disponibilidad de turnos", "Vocación de servicio"],
        tags: ["Enfermería", "Hospital", "Salud", "Turnos", "Servicio"],
        posted: "Hace 1 día",
        featured: false
    },
    {
        id: 18,
        title: "Médico Especialista",
        company: "Clínica Especializada",
        location: "Boston, MA",
        type: "tiempo-completo",
        experience: "senior",
        category: "salud",
        salary: "$85,000 - $110,000 MXN/mes",
        description: "Médico especialista para clínica de alta especialidad. Práctica privada con excelente reputación.",
        requirements: ["Especialidad médica", "Board certification", "Experiencia clínica", "Inglés fluido"],
        tags: ["Medicina", "Especialista", "Clínica", "Privada", "Certificación"],
        posted: "Hace 4 días",
        featured: true
    },

    // EDUCACIÓN
    {
        id: 19,
        title: "Profesor de Inglés",
        company: "Instituto de Idiomas Global",
        location: "Polanco, CDMX, México",
        type: "medio-tiempo",
        experience: "junior",
        category: "educacion",
        salary: "$250 - $400 MXN/hora",
        description: "Profesor de inglés para clases grupales e individuales. Horarios flexibles y ambiente dinámico.",
        requirements: ["Inglés nativo o C2", "Experiencia docente", "Certificación TESOL/TEFL", "Dinámico y paciente"],
        tags: ["Inglés", "Docencia", "TESOL", "Idiomas", "Flexible"],
        posted: "Hace 3 días",
        featured: false
    },
    {
        id: 20,
        title: "Coordinador Académico",
        company: "Universidad Privada",
        location: "Denver, CO",
        type: "tiempo-completo",
        experience: "senior",
        category: "educacion",
        salary: "$45,000 - $55,000 MXN/mes",
        description: "Coordinador académico para programas universitarios. Liderazgo educativo y desarrollo curricular.",
        requirements: ["Maestría en Educación", "Experiencia universitaria", "Liderazgo académico", "Inglés nativo"],
        tags: ["Academia", "Universidad", "Coordinación", "Curricular", "Liderazgo"],
        posted: "Hace 1 semana",
        featured: false
    },

    // LEGAL
    {
        id: 21,
        title: "Abogado Corporativo",
        company: "Bufete Legal Internacional",
        location: "Santa Fe, CDMX, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "legal",
        salary: "$35,000 - $45,000 MXN/mes",
        description: "Abogado corporativo para asesoría legal integral a empresas nacionales e internacionales.",
        requirements: ["Licenciatura en Derecho", "Cédula profesional", "Experiencia corporativa", "Inglés avanzado"],
        tags: ["Derecho", "Corporativo", "Asesoría", "Internacional", "Legal"],
        posted: "Hace 2 días",
        featured: false
    },
    {
        id: 22,
        title: "Socio Junior",
        company: "Firma Legal Premium",
        location: "Chicago, IL",
        type: "tiempo-completo",
        experience: "senior",
        category: "legal",
        salary: "$75,000 - $95,000 MXN/mes",
        description: "Socio junior en firma legal de prestigio. Oportunidad de desarrollo y participación en casos importantes.",
        requirements: ["JD o equivalente", "Bar exam", "5+ años experiencia", "Track record comprobado"],
        tags: ["Socio", "Firma", "Premium", "Desarrollo", "Casos"],
        posted: "Hace 5 días",
        featured: true
    },

    // INGENIERÍA
    {
        id: 23,
        title: "Ingeniero Civil",
        company: "Constructora Nacional",
        location: "Querétaro, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "ingenieria",
        salary: "$30,000 - $38,000 MXN/mes",
        description: "Ingeniero civil para proyectos de infraestructura urbana. Participación en obras de gran escala.",
        requirements: ["Ingeniería Civil", "Cédula profesional", "AutoCAD", "Experiencia en obra"],
        tags: ["Civil", "Infraestructura", "AutoCAD", "Obra", "Proyectos"],
        posted: "Hace 3 días",
        featured: false
    },
    {
        id: 24,
        title: "Ingeniero de Software Senior",
        company: "Tech Innovation Lab",
        location: "Seattle, WA",
        type: "tiempo-completo",
        experience: "senior",
        category: "ingenieria",
        salary: "$70,000 - $85,000 MXN/mes",
        description: "Ingeniero de software senior para liderar desarrollo de productos innovadores en laboratorio tecnológico.",
        requirements: ["Computer Science", "8+ años experiencia", "Arquitectura de software", "Team leadership"],
        tags: ["Software", "Senior", "Arquitectura", "Liderazgo", "Innovación"],
        posted: "Hace 4 días",
        featured: true
    },

    // CONSULTORÍA
    {
        id: 25,
        title: "Consultor de Negocios",
        company: "Business Consulting Group",
        location: "Reforma, CDMX, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "consultoria",
        salary: "$40,000 - $50,000 MXN/mes",
        description: "Consultor de negocios para proyectos de transformación empresarial. Trabajo con clientes de diversos sectores.",
        requirements: ["MBA o carrera afín", "Experiencia en consultoría", "Análisis estratégico", "Presentaciones ejecutivas"],
        tags: ["Consultoría", "Negocios", "Estrategia", "Transformación", "MBA"],
        posted: "Hace 2 días",
        featured: false
    },
    {
        id: 26,
        title: "Partner Consultor",
        company: "Global Strategy Firm",
        location: "Atlanta, GA",
        type: "tiempo-completo",
        experience: "senior",
        category: "consultoria",
        salary: "$90,000 - $120,000 MXN/mes",
        description: "Partner consultor para firma global de estrategia. Liderazgo de proyectos de alta complejidad.",
        requirements: ["MBA top tier", "10+ años consultoría", "Client management", "Business development"],
        tags: ["Partner", "Estrategia", "Global", "Liderazgo", "MBA"],
        posted: "Hace 1 semana",
        featured: true
    },

    // LOGÍSTICA
    {
        id: 27,
        title: "Coordinador de Logística",
        company: "Logistics Solutions México",
        location: "Lerma, Estado de México",
        type: "tiempo-completo",
        experience: "junior",
        category: "logistica",
        salary: "$20,000 - $26,000 MXN/mes",
        description: "Coordinador de logística para gestión de cadena de suministro. Oportunidad en empresa líder del sector.",
        requirements: ["Ingeniería Industrial o afín", "Conocimientos en SCM", "Excel avanzado", "Orientación a resultados"],
        tags: ["Logística", "SCM", "Cadena", "Suministro", "Coordinación"],
        posted: "Hace 4 días",
        featured: false
    },
    {
        id: 28,
        title: "Director de Operaciones",
        company: "Multinational Logistics",
        location: "Phoenix, AZ",
        type: "tiempo-completo",
        experience: "senior",
        category: "logistica",
        salary: "$80,000 - $100,000 MXN/mes",
        description: "Director de operaciones para gestión integral de logística multinacional. Liderazgo de equipos globales.",
        requirements: ["Supply Chain", "15+ años transporte", "Optimización rutas", "Fleet management"],
        tags: ["Logística", "Transporte", "Rutas", "Flotas", "Optimización"],
        posted: "Hace 6 días",
        featured: true
    },

    // TURISMO
    {
        id: 29,
        title: "Guía Turístico",
        company: "CDMX Tours",
        location: "Centro Histórico, CDMX, México",
        type: "freelance",
        experience: "junior",
        category: "turismo",
        salary: "$300 - $500 MXN/hora",
        description: "Guía turístico para tours en Ciudad de México. Idiomas valorados. Horario flexible y ambiente dinámico.",
        requirements: ["Licencia de guía turístico", "Conocimiento de CDMX", "Idiomas", "Habilidades comunicativas"],
        tags: ["Guía", "Tours", "Idiomas", "CDMX", "Cultural"],
        posted: "Hace 2 días",
        featured: false
    },
    {
        id: 30,
        title: "Director de Hotel",
        company: "Hotel Boutique Playa del Carmen",
        location: "Playa del Carmen, México",
        type: "tiempo-completo",
        experience: "senior",
        category: "turismo",
        salary: "$50,000 - $65,000 MXN/mes",
        description: "Director general para hotel boutique de lujo. Gestión integral del establecimiento y equipos.",
        requirements: ["Formación en hostelería", "10+ años en hotelería", "Inglés nativo", "Liderazgo"],
        tags: ["Hotel", "Dirección", "Lujo", "Hostelería", "Gestión"],
        posted: "Hace 1 semana",
        featured: true
    },

    // COMUNICACIÓN
    {
        id: 31,
        title: "Periodista Digital",
        company: "Medio Digital Nacional",
        location: "Condesa, CDMX, México",
        type: "tiempo-completo",
        experience: "junior",
        category: "comunicacion",
        salary: "$18,000 - $24,000 MXN/mes",
        description: "Periodista para medio digital con enfoque en noticias de tecnología y startups. Ambiente dinámico y creativo.",
        requirements: ["Comunicación o Periodismo", "Redacción web", "Redes sociales", "Curiosidad periodística"],
        tags: ["Periodismo", "Digital", "Redacción", "Tecnología", "Noticias"],
        posted: "Hace 3 días",
        featured: false
    },
    {
        id: 32,
        title: "Director de Comunicación",
        company: "Corporate Communications Inc",
        location: "Washington, DC",
        type: "tiempo-completo",
        experience: "senior",
        category: "comunicacion",
        salary: "$65,000 - $80,000 MXN/mes",
        description: "Director de comunicación corporativa para gestión de imagen y relaciones públicas de empresa multinacional.",
        requirements: ["Maestría en Comunicación", "Crisis management", "Media relations", "Strategic planning"],
        tags: ["Comunicación", "Corporativa", "Relaciones", "Públicas", "Crisis"],
        posted: "Hace 1 semana",
        featured: true
    },

    // AGRICULTURA
    {
        id: 33,
        title: "Ingeniero Agrónomo",
        company: "AgroTech Solutions",
        location: "Culiacán, Sinaloa, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "agricultura",
        salary: "$25,000 - $32,000 MXN/mes",
        description: "Ingeniero agrónomo para proyectos de agricultura sustentable y tecnología agrícola de vanguardia.",
        requirements: ["Ingeniería Agronómica", "Agricultura sustentable", "Tecnología agrícola", "Trabajo de campo"],
        tags: ["Agricultura", "Sustentable", "Tecnología", "Campo", "Cultivos"],
        posted: "Hace 4 días",
        featured: false
    },
    {
        id: 34,
        title: "Director de Agronegocio",
        company: "Global Agriculture Corp",
        location: "Des Moines, IA",
        type: "tiempo-completo",
        experience: "senior",
        category: "agricultura",
        salary: "$70,000 - $85,000 MXN/mes",
        description: "Director de agronegocio para liderar operaciones agrícolas a gran escala y desarrollo de mercados.",
        requirements: ["MBA Agronegocio", "15+ años experiencia", "Mercados internacionales", "Liderazgo ejecutivo"],
        tags: ["Agronegocio", "Dirección", "Mercados", "Internacional", "Ejecutivo"],
        posted: "Hace 5 días",
        featured: true
    },

    // ENERGÍA
    {
        id: 35,
        title: "Ingeniero en Energías Renovables",
        company: "Green Energy México",
        location: "Puebla, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "energia",
        salary: "$35,000 - $42,000 MXN/mes",
        description: "Ingeniero especializado en energías renovables para proyectos solares y eólicos de gran escala.",
        requirements: ["Ingeniería en Energía", "Proyectos renovables", "AutoCAD/PVsyst", "Sustentabilidad"],
        tags: ["Energía", "Renovables", "Solar", "Eólica", "Sustentable"],
        posted: "Hace 2 días",
        featured: false
    },
    {
        id: 36,
        title: "Director de Energía",
        company: "Energy Solutions International",
        location: "Houston, TX",
        type: "tiempo-completo",
        experience: "senior",
        category: "energia",
        salary: "$90,000 - $110,000 MXN/mes",
        description: "Director de energía para liderar estrategia energética global y desarrollo de nuevos proyectos.",
        requirements: ["Maestría en Energía", "20+ años experiencia", "Mercados energéticos", "Liderazgo global"],
        tags: ["Energía", "Dirección", "Estrategia", "Global", "Proyectos"],
        posted: "Hace 1 semana",
        featured: true
    },

    // CONSTRUCCIÓN
    {
        id: 37,
        title: "Maestro de Obra",
        company: "Constructora Regional",
        location: "Toluca, Estado de México",
        type: "tiempo-completo",
        experience: "mid",
        category: "construccion",
        salary: "$22,000 - $28,000 MXN/mes",
        description: "Maestro de obra para supervisión de proyectos residenciales y comerciales. Experiencia en construcción tradicional.",
        requirements: ["Experiencia en construcción", "Supervisión de obra", "Lectura de planos", "Liderazgo de equipos"],
        tags: ["Construcción", "Obra", "Supervisión", "Planos", "Residencial"],
        posted: "Hace 3 días",
        featured: false
    },
    {
        id: 38,
        title: "Director de Construcción",
        company: "Premier Construction Group",
        location: "Dallas, TX",
        type: "tiempo-completo",
        experience: "senior",
        category: "construccion",
        salary: "$80,000 - $100,000 MXN/mes",
        description: "Director de construcción para proyectos de gran escala. Gestión integral de obras complejas.",
        requirements: ["Ingeniería Civil", "15+ años construcción", "Project management", "Grandes proyectos"],
        tags: ["Construcción", "Dirección", "Proyectos", "Gestión", "Escala"],
        posted: "Hace 6 días",
        featured: true
    },

    // BANCA
    {
        id: 39,
        title: "Analista de Riesgos",
        company: "Banco Nacional",
        location: "Santa Fe, CDMX, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "banca",
        salary: "$32,000 - $40,000 MXN/mes",
        description: "Analista de riesgos para entidad bancaria. Análisis crediticio y gestión de carteras.",
        requirements: ["Economía/Administración", "Experiencia en banca", "Análisis crediticio", "Excel avanzado"],
        tags: ["Riesgos", "Banca", "Crédito", "Análisis", "Cartera"],
        posted: "Hace 4 días",
        featured: false
    },
    {
        id: 40,
        title: "Private Banker",
        company: "Banco Privado Internacional",
        location: "Houston, TX",
        type: "tiempo-completo",
        experience: "senior",
        category: "banca",
        salary: "$70,000 - $90,000 MXN/mes + variable",
        description: "Private Banker para gestión de patrimonios de clientes de alta renta. Excelente package retributivo.",
        requirements: ["Experiencia en banca privada", "Gestión patrimonios", "Productos financieros", "Bilingüe"],
        tags: ["Private Banking", "Patrimonios", "High Net Worth", "Gestión", "Premium"],
        posted: "Hace 1 semana",
        featured: true
    },

    // SEGUROS
    {
        id: 41,
        title: "Agente de Seguros",
        company: "Aseguradora Líder",
        location: "Guadalajara, México",
        type: "tiempo-completo",
        experience: "junior",
        category: "seguros",
        salary: "$18,000 - $22,000 MXN/mes + comisiones",
        description: "Agente de seguros para venta de pólizas individuales y empresariales. Formación completa incluida.",
        requirements: ["Bachillerato", "Orientación comercial", "Licencia de conducir", "Actitud de servicio"],
        tags: ["Seguros", "Ventas", "Pólizas", "Comercial", "Formación"],
        posted: "Hace 2 días",
        featured: false
    },
    {
        id: 42,
        title: "Director de Seguros",
        company: "Insurance Global Solutions",
        location: "Atlanta, GA",
        type: "tiempo-completo",
        experience: "senior",
        category: "seguros",
        salary: "$85,000 - $105,000 MXN/mes",
        description: "Director de seguros para liderar operaciones de aseguradora internacional. Gestión de equipos globales.",
        requirements: ["Actuaría o afín", "15+ años seguros", "Liderazgo global", "Productos complejos"],
        tags: ["Seguros", "Dirección", "Global", "Actuaría", "Liderazgo"],
        posted: "Hace 5 días",
        featured: true
    },

    // INMOBILIARIA
    {
        id: 43,
        title: "Agente Inmobiliario",
        company: "Inmobiliaria Premium",
        location: "Polanco, CDMX, México",
        type: "freelance",
        experience: "junior",
        category: "inmobiliaria",
        salary: "Comisiones 3-6% + $12,000 MXN base",
        description: "Agente inmobiliario para venta de propiedades de lujo en zona premium de CDMX. Alto potencial de ingresos.",
        requirements: ["Licencia inmobiliaria", "Licencia de conducir", "Idiomas (inglés)", "Orientación comercial"],
        tags: ["Inmobiliario", "Lujo", "CDMX", "Ventas", "Idiomas"],
        posted: "Hace 2 días",
        featured: false
    },
    {
        id: 44,
        title: "Property Manager",
        company: "Real Estate Solutions",
        location: "Tampa, FL",
        type: "tiempo-completo",
        experience: "mid",
        category: "inmobiliaria",
        salary: "$35,000 - $45,000 MXN/mes",
        description: "Property Manager para gestión de cartera de propiedades comerciales y residenciales.",
        requirements: ["Experiencia en real estate", "Gestión propiedades", "Bilingüe", "Software inmobiliario"],
        tags: ["Property", "Gestión", "Commercial", "Residencial", "Portfolio"],
        posted: "Hace 4 días",
        featured: false
    },

    // GASTRONOMÍA
    {
        id: 45,
        title: "Chef de Cocina",
        company: "Restaurante Gourmet",
        location: "Roma Norte, CDMX, México",
        type: "tiempo-completo",
        experience: "mid",
        category: "gastronomia",
        salary: "$25,000 - $32,000 MXN/mes",
        description: "Chef de cocina para restaurante gourmet. Creación de menús innovadores y liderazgo de brigada.",
        requirements: ["Estudios gastronómicos", "Experiencia en alta cocina", "Creatividad culinaria", "Liderazgo"],
        tags: ["Chef", "Gourmet", "Cocina", "Creatividad", "Liderazgo"],
        posted: "Hace 1 día",
        featured: false
    },
    {
        id: 46,
        title: "Director de Restaurante",
        company: "Fine Dining Group",
        location: "Las Vegas, NV",
        type: "tiempo-completo",
        experience: "senior",
        category: "gastronomia",
        salary: "$60,000 - $75,000 MXN/mes",
        description: "Director de restaurante para cadena de alta gama. Gestión operativa y desarrollo de conceptos.",
        requirements: ["Hospitalidad/Gastronomía", "10+ años experiencia", "Operaciones múltiples", "P&L management"],
        tags: ["Restaurante", "Dirección", "Fine Dining", "Operaciones", "Gestión"],
        posted: "Hace 1 semana",
        featured: true
    },

    // TRANSPORTE
    {
        id: 47,
        title: "Chofer Ejecutivo",
        company: "Servicios Ejecutivos VIP",
        location: "Polanco, CDMX, México",
        type: "tiempo-completo",
        experience: "junior",
        category: "transporte",
        salary: "$16,000 - $20,000 MXN/mes",
        description: "Chofer ejecutivo para servicio VIP. Atención a ejecutivos y clientes premium.",
        requirements: ["Licencia tipo A", "Experiencia mínima", "Presentación impecable", "Discreción"],
        tags: ["Chofer", "Ejecutivo", "VIP", "Servicio", "Premium"],
        posted: "Hace 3 días",
        featured: false
    },
    {
        id: 48,
        title: "Director de Logística",
        company: "Transportation Solutions",
        location: "Memphis, TN",
        type: "tiempo-completo",
        experience: "senior",
        category: "transporte",
        salary: "$75,000 - $90,000 MXN/mes",
        description: "Director de logística para empresa de transporte. Optimización de rutas y gestión de flotas.",
        requirements: ["Supply Chain", "15+ años transporte", "Optimización rutas", "Fleet management"],
        tags: ["Logística", "Transporte", "Rutas", "Flotas", "Optimización"],
        posted: "Hace 4 días",
        featured: true
    },

    // RETAIL
    {
        id: 49,
        title: "Store Manager",
        company: "Fashion Retail Chain",
        location: "Santa Monica, CA",
        type: "tiempo-completo",
        experience: "mid",
        category: "retail",
        salary: "$30,000 - $38,000 MXN/mes",
        description: "Store Manager para tienda flagship de cadena de moda. Gestión integral de punto de venta.",
        requirements: ["Experiencia en retail", "Gestión de equipos", "Orientación a ventas", "Visual merchandising"],
        tags: ["Retail", "Fashion", "Store Manager", "Ventas", "Equipos"],
        posted: "Hace 2 días",
        featured: false
    },

    // MANUFACTURA
    {
        id: 50,
        title: "Ingeniero de Producción",
        company: "Fábrica Automoción Tijuana",
        location: "Tijuana, México",
        type: "tiempo-completo",
        experience: "senior",
        category: "manufactura",
        salary: "$45,000 - $55,000 MXN/mes",
        description: "Ingeniero de producción para planta de automoción. Optimización de procesos y mejora continua.",
        requirements: ["Ingeniería Industrial", "Lean Manufacturing", "Six Sigma", "Automoción"],
        tags: ["Producción", "Automoción", "Lean", "Six Sigma", "Procesos"],
        posted: "Hace 5 días",
        featured: true
    }
];

// Variables globales
let filteredJobs = [...jobsData];
let displayedJobs = [];
let currentPage = 1;
const jobsPerPage = 6;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada - inicializando aplicación'); // Debug
    
    displayJobs();
    updateJobsCount();
    setupEventListeners();
    
    // Limpiar cualquier dato residual que pueda interferir
    clearAnyResidualData();
    
    checkUserSession();
    
    // Verificación adicional para asegurar que el enlace de login funcione
    ensureLoginLinkWorks();
});

// Función para limpiar datos residuales
function clearAnyResidualData() {
    // Verificar si hay datos de sesión inválidos
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        try {
            JSON.parse(currentUser);
        } catch (error) {
            console.log('Datos de sesión inválidos encontrados - limpiando'); // Debug
            sessionStorage.removeItem('currentUser');
        }
    }
}

// Función para asegurar que el enlace de login funcione
function ensureLoginLinkWorks() {
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        // Asegurar que tenga todos los atributos necesarios
        loginLink.href = 'login.html';
        loginLink.style.pointerEvents = 'auto';
        loginLink.style.cursor = 'pointer';
        
        // Agregar event listener adicional como respaldo
        loginLink.addEventListener('click', function(e) {
            console.log('Clic en enlace de login detectado'); // Debug
            // Permitir navegación normal (no prevent default)
        });
        
        console.log('Enlace de login configurado correctamente'); // Debug
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Búsqueda en tiempo real
    const jobSearch = document.getElementById('jobSearch');
    const locationSearch = document.getElementById('locationSearch');
    
    if (jobSearch) jobSearch.addEventListener('input', handleSearch);
    if (locationSearch) locationSearch.addEventListener('input', handleSearch);
    
    // Filtros
    const categoryFilter = document.getElementById('categoryFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (experienceFilter) experienceFilter.addEventListener('change', applyFilters);
    if (typeFilter) typeFilter.addEventListener('change', applyFilters);
    
    // Smooth scroll para navegación (solo enlaces internos que empiecen con #)
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función de búsqueda
function searchJobs() {
    handleSearch();
    const jobsSection = document.getElementById('jobs');
    if (jobsSection) {
        jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleSearch() {
    const jobSearchEl = document.getElementById('jobSearch');
    const locationSearchEl = document.getElementById('locationSearch');
    
    const searchTerm = jobSearchEl ? jobSearchEl.value.toLowerCase() : '';
    const locationTerm = locationSearchEl ? locationSearchEl.value.toLowerCase() : '';
    
    filteredJobs = jobsData.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                            job.company.toLowerCase().includes(searchTerm) ||
                            job.description.toLowerCase().includes(searchTerm) ||
                            job.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesLocation = job.location.toLowerCase().includes(locationTerm);
        
        return matchesSearch && matchesLocation;
    });
    
    applyFilters();
}

// Aplicar filtros
function applyFilters() {
    const categoryEl = document.getElementById('categoryFilter');
    const experienceEl = document.getElementById('experienceFilter');
    const typeEl = document.getElementById('typeFilter');
    
    const category = categoryEl ? categoryEl.value : '';
    const experience = experienceEl ? experienceEl.value : '';
    const type = typeEl ? typeEl.value : '';
    
    let filtered = filteredJobs;
    
    if (category) {
        filtered = filtered.filter(job => job.category === category);
    }
    
    if (experience) {
        filtered = filtered.filter(job => job.experience === experience);
    }
    
    if (type) {
        filtered = filtered.filter(job => job.type === type);
    }
    
    filteredJobs = filtered;
    currentPage = 1;
    displayJobs();
    updateJobsCount();
}

// Limpiar filtros
function clearFilters() {
    const elements = [
        'jobSearch', 'locationSearch', 'categoryFilter', 
        'experienceFilter', 'typeFilter'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
    
    filteredJobs = [...jobsData];
    currentPage = 1;
    displayJobs();
    updateJobsCount();
}

// Mostrar empleos
function displayJobs() {
    const container = document.getElementById('jobsContainer');
    if (!container) return;
    
    const startIndex = 0;
    const endIndex = currentPage * jobsPerPage;
    
    displayedJobs = filteredJobs.slice(startIndex, endIndex);
    
    container.innerHTML = displayedJobs.map(job => createJobCard(job)).join('');
    
    // Mostrar/ocultar botón "Cargar más"
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        if (endIndex >= filteredJobs.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Crear tarjeta de empleo
function createJobCard(job) {
    return `
        <div class="job-card" onclick="openJobModal(${job.id})">
            <div class="job-header">
                <div class="job-info">
                    <h3 class="job-title">${job.title}</h3>
                    <p class="company-name">${job.company}</p>
                </div>
                <div class="job-salary">${job.salary}</div>
            </div>
            
            <div class="job-details">
                <div class="job-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
                <div class="job-type">
                    <i class="fas fa-clock"></i>
                    <span>${formatJobType(job.type)}</span>
                </div>
                <div class="job-experience">
                    <i class="fas fa-user-tie"></i>
                    <span>${formatExperience(job.experience)}</span>
                </div>
            </div>
            
            <div class="job-description">
                ${job.description.substring(0, 120)}...
            </div>
            
            <div class="job-tags">
                ${job.tags.slice(0, 3).map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                ${job.tags.length > 3 ? `<span class="job-tag">+${job.tags.length - 3} más</span>` : ''}
            </div>
            
            <div class="job-actions">
                <button class="apply-btn" onclick="event.stopPropagation(); applyToJob(${job.id})">
                    <i class="fas fa-paper-plane"></i>
                    Aplicar
                </button>
                <span class="job-posted">${job.posted}</span>
            </div>
        </div>
    `;
}

// Formatear tipo de empleo
function formatJobType(type) {
    const types = {
        'tiempo-completo': 'Tiempo completo',
        'medio-tiempo': 'Medio tiempo',
        'freelance': 'Freelance',
        'remoto': 'Remoto'
    };
    return types[type] || type;
}

// Formatear experiencia
function formatExperience(experience) {
    const experiences = {
        'junior': 'Junior (0-2 años)',
        'mid': 'Semi-senior (2-5 años)',
        'senior': 'Senior (5+ años)'
    };
    return experiences[experience] || experience;
}

// Actualizar contador de empleos
function updateJobsCount() {
    const countElement = document.getElementById('jobsCount');
    if (countElement) {
        countElement.textContent = filteredJobs.length;
    }
}

// Cargar más empleos
function loadMoreJobs() {
    currentPage++;
    displayJobs();
}

// Abrir modal con detalles del empleo
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
            <button class="save-btn" onclick="saveJob(${job.id})">
                <i class="fas fa-bookmark"></i>
                Guardar empleo
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

// Cerrar modal
function closeJobModal() {
    const modal = document.getElementById('jobModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Aplicar a empleo
function applyToJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (job) {
        if (currentUser) {
            const user = JSON.parse(currentUser);
            showTemporaryMessage(`¡Aplicación enviada! ${user.name}, tu aplicación para "${job.title}" en ${job.company} ha sido procesada.`, 'success');
        } else {
            const confirmRedirect = confirm(`Para aplicar a "${job.title}" necesitas iniciar sesión. ¿Quieres ir al login?`);
            if (confirmRedirect) {
                window.location.href = 'login.html';
            }
        }
    }
}

// Guardar empleo
function saveJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (job) {
        if (currentUser) {
            // Simular guardar en favoritos (en una app real se guardaría en base de datos)
            let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
            
            if (!savedJobs.includes(jobId)) {
                savedJobs.push(jobId);
                localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
                showTemporaryMessage(`"${job.title}" guardado en favoritos`, 'success');
            } else {
                showTemporaryMessage(`"${job.title}" ya está en tus favoritos`, 'info');
            }
        } else {
            const confirmRedirect = confirm(`Para guardar "${job.title}" necesitas iniciar sesión. ¿Quieres ir al login?`);
            if (confirmRedirect) {
                window.location.href = 'login.html';
            }
        }
    }
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('jobModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    
    // Cerrar menú de usuario si se hace clic fuera
    const userMenu = document.getElementById('userMenu');
    const userSection = document.getElementById('userSection');
    if (userMenu && userSection && !userSection.contains(event.target)) {
        userMenu.classList.add('hidden');
    }
}

// Funciones de manejo de sesión de usuario
function checkUserSession() {
    const currentUser = sessionStorage.getItem('currentUser');
    const loginLink = document.getElementById('loginLink');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    console.log('Verificando sesión de usuario:', currentUser ? 'Usuario encontrado' : 'No hay usuario'); // Debug
    
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            console.log('Usuario parseado:', user); // Debug
            
            if (loginLink && userMenu && userName) {
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
            }
            
        } catch (error) {
            console.error('Error parsing user session:', error);
            clearUserSession();
        }
    } else {
        // No hay usuario logueado - asegurar que el enlace de login sea visible
        console.log('No hay usuario - mostrando enlace de login'); // Debug
        if (loginLink && userMenu) {
            loginLink.style.display = 'flex';
            loginLink.style.pointerEvents = 'auto'; // Asegurar que sea clickeable
            userMenu.classList.add('hidden');
            userMenu.style.display = 'none';
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

function showFavorites() {
    window.location.href = 'favoritos.html';
    hideUserDropdown();
}

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
        
        // Opcional: redirigir al login después de un tiempo
        setTimeout(() => {
            if (confirm('¿Quieres ir a la página de login?')) {
                window.location.href = 'login.html';
            }
        }, 2000);
    }
    
    hideUserDropdown();
}

function clearUserSession() {
    const loginLink = document.getElementById('loginLink');
    const userMenu = document.getElementById('userMenu');
    
    console.log('Limpiando sesión de usuario'); // Debug
    
    if (loginLink && userMenu) {
        loginLink.style.display = 'flex';
        loginLink.style.pointerEvents = 'auto'; // Asegurar que sea clickeable
        loginLink.href = 'login.html'; // Asegurar que el href esté configurado
        userMenu.classList.add('hidden');
        userMenu.style.display = 'none';
    }
}

function hideUserDropdown() {
    const dropdown = document.querySelector('.user-dropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
}

function showTemporaryMessage(message, type = 'info') {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `temp-message temp-message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos para el mensaje
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
    
    // Animar entrada
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Añadir estilos CSS adicionales para el modal
const additionalStyles = `
<style>
.job-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.job-modal-header h2 {
    color: #333;
    margin-bottom: 0;
}

.job-company-info {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
}

.job-company-info h3 {
    color: #333;
    margin-bottom: 10px;
}

.job-company-info p {
    margin-bottom: 8px;
    color: #666;
}

.job-section {
    margin-bottom: 25px;
}

.job-section h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.2rem;
}

.job-section ul {
    padding-left: 20px;
}

.job-section li {
    margin-bottom: 8px;
    color: #666;
}

.job-modal-actions {
    display: flex;
    gap: 15px;
    margin: 30px 0 20px;
    flex-wrap: wrap;
}

.save-btn {
    background: transparent;
    color: #667eea;
    border: 2px solid #667eea;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.save-btn:hover {
    background: #667eea;
    color: white;
}

.job-posted-info {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #eee;
    color: #999;
}
</style>
`;

// Añadir estilos adicionales al head
document.head.insertAdjacentHTML('beforeend', additionalStyles); 