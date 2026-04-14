import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { 
  Gavel, 
  Brain, 
  Terminal, 
  Database, 
  Languages, 
  Cpu, 
  CheckCircle2, 
  Mail, 
  Linkedin,
  X,
  FileText,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Globe,
  ArrowRight,
  MessageSquare,
  Send,
  User,
  Bot,
  Sparkles,
  Loader2
} from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isItalianCertModalOpen, setIsItalianCertModalOpen] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<"derecho" | "ia">("derecho");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const [chatMessages, setChatMessages] = useState([
    { 
      role: "bot", 
      content: "¡Hola! Soy el asistente inteligente de Patricia Paniagua. He sido entrenada con conocimientos profundos en el Código Penal, Civil, Mercantil y la Constitución Española, además de las últimas tendencias en IA. ¿En qué puedo asesorarte hoy?" 
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  const SYSTEM_INSTRUCTION = `
    Eres el asistente inteligente oficial de Patricia Paniagua López. 
    Tu objetivo es responder preguntas con precisión profesional, combinando el rigor jurídico con la vanguardia tecnológica.
    
    CONOCIMIENTOS LEGALES:
    - Tienes acceso y conocimiento profundo del Código Penal, Código Civil, Código de Comercio (Mercantil) y la Constitución Española.
    - Cuando respondas sobre temas legales, cita brevemente el marco normativo si es relevante.
    
    CONOCIMIENTOS TECNOLÓGICOS:
    - Eres experto en Inteligencia Artificial, específicamente en aplicaciones de IA Generativa (LLMs, Agentes, RAG).
    - Conoces el Reglamento de IA de la UE (AI Act) y su impacto en la privacidad y ética.
    
    SOBRE PATRICIA:
    - Patricia es graduada en Derecho y Estudios Internacionales (UCLM) y especialista en IA y Marketing (Nebrija).
    - Su enfoque es la "Responsabilidad Algorítmica" y la automatización legal.
    
    TONO:
    - Profesional, analítico, culto pero accesible.
    - Si la pregunta es fuera de estos ámbitos, intenta reconducirla amablemente hacia el perfil de Patricia.
    - Responde siempre en español.
  `;

  const aiConfigContent = {
    title: "Prompt para Google AI Studio: Configuración de Chatbots",
    description: "Este documento proporciona las instrucciones y configuraciones recomendadas para implementar los chatbots de Luxury Bali y Sanitas en Google AI Studio. Dada la naturaleza del chatbot de Movistar (basado en lógica de cliente), se ofrecerán pautas para su adaptación.",
    sections: [
      {
        title: "1. Configuración General en Google AI Studio",
        content: [
          "Para cada chatbot, se recomienda crear un nuevo agente o modelo personalizado en Google AI Studio. Sigue estos pasos generales:",
          "1. Accede a Google AI Studio: Ve a https://aistudio.google.com/ e inicia sesión.",
          "2. Crea un nuevo proyecto/modelo: Selecciona la opción para crear un nuevo \"Generative AI project\" o \"New prompt\".",
          "3. Selecciona el modelo base: Para ambos chatbots, se ha identificado el uso de gemini-3-flash-preview. Asegúrate de seleccionar un modelo Gemini adecuado que soporte systemInstruction y tools (si aplica)."
        ]
      },
      {
        title: "2. Chatbot Luxury Bali: \"Ketut, Concierge de Élite\"",
        content: [
          "Este chatbot está diseñado para actuar como un concierge de lujo en Bali. Su systemInstruction debe ser configurada de la siguiente manera:",
          "Actúa como \"Ketut\", un Concierge de Élite especializado en viajes de ultra-lujo en Bali y miembro de la red \"Leading Hotels of the World\". Tu objetivo es diseñar experiencias exclusivas, privadas y sofisticadas para viajeros de alto patrimonio.",
          "### Tus Capacidades y Conocimientos Premium:",
          "1. Tours y Templos Privados: No recomiendas tours estándar. Sugieres: Visitas a templos después del horario de cierre o durante ceremonias privadas con acceso VIP; Bendiciones espirituales privadas con un \"Pedanda\" (alto sacerdote) en una villa o templo remoto; Helitours para ver el Monte Agung desde el aire.",
          "2. Transporte de Clase Ejecutiva: Descartas el transporte público. Solo recomiendas conductores privados en vehículos de gama alta (Toyota Alphard o similares). Conoces el servicio de \"VIP Fast Track\" en el aeropuerto de Denpasar para evitar colas de inmigración.",
          "3. Gastronomía de Autor y Privada: Recomiendas restaurantes de alta cocina como Locavore, Aperitif, o Mozaic. Sugieres cenas privadas \"on-site\" en las mejores villas de Ubud o Uluwatu con chefs personales. Conoces los mejores Beach Clubs VIP (como Savaya o Potato Head) con reserva de cabañas privadas.",
          "4. Zonas de Alojamiento: Te enfocas en las áreas más exclusivas: Uluwatu (acantilados), Ubud (villas en la selva profunda) y Nusa Dua (resorts de 5 estrellas).",
          "### Directrices de Estilo y Tono:",
          "- Tono: Extremadamente profesional, refinado, discreto y atento al detalle. Evitas el lenguaje excesivamente informal.",
          "- Estructura: Presenta las opciones como \"Itinerarios Curados\". Usa un lenguaje que evoque exclusividad (ej. \"acceso privilegiado\", \"experiencia a medida\", \"oasis de serenidad\").",
          "- Valor Añadido: Siempre mencionas un detalle de cortesía o un \"secreto mejor guardado\" que solo un local de alto nivel sabría.",
          "### Restricciones:",
          "- Responde siempre en español, manteniendo la elegancia.",
          "- No menciones que eres una IA. Eres Ketut.",
          "### Configuración Adicional:",
          "• Modelo: gemini-3-flash-preview",
          "• Temperatura: 0.7",
          "• Top P / Top K: Ajustar según la creatividad deseada."
        ]
      },
      {
        title: "3. Chatbot Sanitas: \"Asistente Virtual Oficial de Sanitas\"",
        content: [
          "Este chatbot está diseñado para asistir a clientes de Sanitas con gestiones administrativas y localización de centros.",
          "Eres el Asistente Virtual oficial de Sanitas. Tu objetivo es ayudar a los clientes con gestiones administrativas, dudas frecuentes y localización de centros especializados.",
          "### REGLAS CRÍTICAS:",
          "1. NO realices diagnósticos médicos. Si el usuario pregunta por síntomas, oriéntale a pedir cita con un especialista o acudir a urgencias si es grave.",
          "2. NO pidas datos sensibles innecesarios.",
          "3. Sé amable, profesional y eficiente.",
          "4. Cuando el usuario busque centros médicos, hospitales o clínicas de Sanitas, utiliza la herramienta de Google Maps para proporcionar información precisa y ubicaciones reales.",
          "5. FILTRADO POR ESPECIALIDAD: Si el usuario busca una especialidad concreta (ej: \"dentista\", \"fisioterapia\", \"pediatría\", \"ginecología\"), asegúrate de buscar centros de Sanitas que ofrezcan ese servicio específico.",
          "6. Siempre que proporciones información de centros, menciona que pueden consultar más detalles en los enlaces proporcionados.",
          "### TEMAS FRECUENTES:",
          "- Cómo pedir cita: App Mi Sanitas, web o teléfono.",
          "- Cambiar/Cancelar cita: Sección \"Mis Citas\" en App o web.",
          "- Documentación: Tarjeta digital Sanitas y prescripción médica si aplica.",
          "- Resultados: App Mi Sanitas -> \"Mis Informes\".",
          "- Localización de centros: Ayuda al usuario a encontrar el centro de Sanitas más cercano a su ubicación o en una ciudad específica.",
          "### Configuración Adicional:",
          "• Modelo: gemini-3-flash-preview",
          "• Herramientas (Tools): Google Maps",
          "• Temperatura: 0.5-0.7"
        ]
      },
      {
        title: "4. Chatbot Movistar",
        content: [
          "El chatbot de Movistar proporcionado (app.js) es una implementación de lógica de conversación basada en JavaScript del lado del cliente.",
          "Para integrarlo con Google AI Studio, se sugieren las siguientes adaptaciones:",
          "1. Extracción de Lógica: Analizar la lógica de app.js para identificar los flujos de conversación.",
          "2. Conversión a systemInstruction y/o Funciones: Las prompts predefinidas y la lógica de detectIssueType podrían incorporarse en la systemInstruction; La funcionalidad de createTicket podría ser implementada como una función (tool); La lógica de assessResolution también podría ser parte de la systemInstruction.",
          "3. Entrenamiento/Ajuste Fino: Utilizar ejemplos de conversaciones del chatbot actual para entrenar o ajustar un modelo Gemini."
        ]
      }
    ]
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", content: text };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    try {
      const history = chatMessages.map(msg => ({
        role: msg.role === "bot" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-latest",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history
      });

      const result = await chat.sendMessage({ message: text });
      const botResponse = result.text || "Lo siento, he tenido un problema procesando tu consulta. Por favor, inténtalo de nuevo.";
      
      setChatMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setChatMessages(prev => [...prev, { role: "bot", content: "Error de conexión con mi núcleo de inteligencia. Por favor, revisa tu conexión." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  const cvData = {
    profile: "Comprometida con la excelencia jurídica y la transformación digital. Jurista con visión internacional y formación avanzada en Inteligencia Artificial aplicada al Marketing. Mi trayectoria combina el rigor del Doble Grado en Derecho y Estudios Internacionales con una sólida capacidad de adaptación tecnológica.",
    values: ["Ética Profesional", "Excelencia", "Innovación", "Integridad", "Visión Global"],
    aptitudes: [
      "Resolución de conflictos",
      "Pensamiento analítico",
      "Comunicación asertiva",
      "Liderazgo de equipos",
      "Gestión del tiempo"
    ],
    experience: [
      {
        period: "2025 — 2026",
        title: "Especialización en IA y Marketing",
        company: "Univ. Nebrija & Unión Europea",
        desc: "Formación avanzada en Inteligencia Artificial y transformación digital, centrada en la optimización de procesos y marketing estratégico.",
        details: ["IA Generativa", "Unión Europea", "Transformación Digital"]
      },
      {
        period: "2024 — 2025",
        title: "Pasante en Prácticas Jurídicas",
        company: "Bufete de Abogados, Madrid",
        desc: "Redacción jurídica (demandas civiles/mercantiles), Investigación legal (Aranzadi/vLex), Traducción técnica bilingüe y Gestión procesal.",
        details: ["Madrid", "Redacción jurídica", "Investigación legal", "Traducción técnica", "Gestión procesal"]
      },
      {
        period: "2023 — 2024",
        title: "Auxiliar de Administración Judicial",
        company: "Juzgados de Toledo",
        desc: "Gestión avanzada de LexNET, Archivo y digitalización de expedientes judiciales, y Atención directa al público y profesionales.",
        details: ["Toledo", "Plataforma LexNET", "Archivo y digitalización", "Atención al público"]
      }
    ],
    education: [
      {
        period: "Marzo, 2026",
        title: "Grado Superior en IA y Marketing",
        institution: "Fedeto, Universidad de Nebrija & Unión Europea",
        desc: "Programa avanzado financiado por la Unión Europea enfocado en la automatización de procesos legales y estrategias de marketing basadas en datos."
      },
      {
        period: "Mayo, 2025",
        title: "Doble Grado en Derecho y Estudios Internacionales",
        institution: "Universidad de Castilla-La Mancha (UCLM)",
        desc: "Erasmus+ Bolonia: Especialización en Derecho Internacional Público y Gobernanza Global."
      }
    ],
    languages: [
      { lang: "Español", level: "Nativa (90%)" },
      { lang: "Inglés", level: "C1 — Cambridge (80%)" },
      { lang: "Italiano", level: "A1 — Básico (20%)" },
      { lang: "Chino", level: "A1 — En curso (15%)" }
    ],
    certifications: [
      { title: "Protección Internacional de DDHH", desc: "Curso de Especialización Avanzada." },
      { title: "Asesoría Jurídica Pro-Bono", desc: "Apoyo jurídico gratuito a colectivos vulnerables." },
      { title: "Delegada Estudiantil", desc: "Representación y mediación institucional." }
    ]
  };

  const projectsData = {
    derecho: [
      {
        title: "La Falsedad Documental en el Conflicto Bélico Actual",
        desc: "Análisis jurídico comparado entre los delitos contra la Comunidad Internacional (Art. 608 CP) y los delitos de falsedad documental (Art. 390.1 CP), con el conflicto Rusia-Ucrania como hilo conductor.",
        tags: ["Derecho Penal", "Derecho Internacional Público", "CP"],
        content: {
          introduction: "Análisis jurídico comparado entre los delitos contra la Comunidad Internacional y los delitos de falsedad documental, con el conflicto Rusia-Ucrania como hilo conductor.",
          structure: [
            { title: "Bloque I: Delitos contra la Comunidad Internacional", detail: "Art. 608 CP. Protección de personas en conflictos armados (heridos, prisioneros, población civil, personal ONU)." },
            { title: "Bloque II: Delitos de Falsedad Documental", detail: "Art. 390.1 CP. Protección de la confianza y seguridad en el tráfico jurídico. Funciones: perpetuación, garantía y probatoria." },
            { title: "Caso Práctico", detail: "Redes de falsificación de refugiados y trata de personas mediante documentos falsos en el contexto del conflicto ucraniano." }
          ],
          jurisprudence: "Sentencia del Tribunal Supremo 402/2022: Doctrina sobre la consumación del delito de falsedad en documento oficial al incorporarse al tráfico jurídico.",
          conclusion: "La protección internacional existe en la teoría, pero exige mecanismos de sanción más eficaces. El conflicto demuestra que el CP no es solo teoría, sino situaciones reales."
        }
      },
      {
        title: "Demanda Judicial: Proceso Monitorio",
        desc: "Ejercicio práctico de redacción de demanda conforme al artículo 399 de la LEC, aplicando los artículos 812 y ss. para la reclamación de deudas líquidas, vencidas y exigibles.",
        tags: ["Derecho Procesal Civil", "LEC", "UCLM"],
        content: {
          introduction: "Ejercicio práctico de redacción de demanda conforme al artículo 399 de la Ley de Enjuiciamiento Civil (LEC).",
          case: {
            parties: "Demandante: Soluciones Hosteleras S.L. | Demandada: Reyes Saavedra CB.",
            amount: "14.199,20 €",
            reason: "Impago de facturas por suministro de productos de hostelería."
          },
          structure: [
            { title: "Encabezamiento", detail: "Identificación de las partes y representación procesal." },
            { title: "Hechos", detail: "Relación comercial, entrega de productos, facturación e impago." },
            { title: "Fundamentos de Derecho", detail: "Jurisdicción, competencia (Art. 813 LEC), capacidad y fondo del asunto (Art. 1108 CC)." },
            { title: "Suplico", detail: "Petición al Juzgado para el requerimiento de pago en 20 días." }
          ],
          documents: ["Escrituras de constitución", "Albarán de entrega firmado", "Factura emitida", "Burofax de reclamación"]
        }
      }
    ],
    ia: [
      {
        title: "CUPRA Experience: Video Marketing con IA",
        desc: "Creación de una experiencia de marca inmersiva utilizando avatares generados por IA para presentaciones personalizadas y dinámicas.",
        tags: ["IA Generativa", "Marketing Digital", "Video Synthesis"],
        content: {
          introduction: "Proyecto de marketing digital de vanguardia que utiliza IA generativa para crear presentadores virtuales multilingües, eliminando las barreras de producción tradicionales.",
          structure: [
            { title: "Generación de Avatar", detail: "Uso de modelos de síntesis de video para crear un presentador realista con sincronización labial perfecta." },
            { title: "Personalización de Contenido", detail: "Adaptación instantánea del mensaje y el idioma (ej. Italiano) para diferentes mercados globales." },
            { title: "Estrategia de Engagement", detail: "Aumento del 40% en el tiempo de permanencia en página mediante contenido audiovisual dinámico." }
          ],
          conclusion: "La IA permite una escala de personalización en video antes imposible, transformando la comunicación de marca en una experiencia directa y humana."
        }
      },
      {
        title: "Iberdrola: Seguridad Industrial 4.0",
        desc: "Digitalización de protocolos de seguridad industrial mediante contenido audiovisual generado por IA para la formación de operarios.",
        tags: ["Seguridad Laboral", "IA", "Formación"],
        content: {
          introduction: "Implementación visual de las '5 Reglas de Oro' de seguridad eléctrica en un formato de alta fidelidad para reducir riesgos en campo.",
          structure: [
            { title: "Las 5 Reglas de Oro", detail: "1. Desconectar, 2. Bloquear, 3. Verificar, 4. Poner a tierra, 5. Señalizar." },
            { title: "Metodología Visual", detail: "Uso de IA para recrear entornos de trabajo realistas y demostrar procedimientos críticos sin riesgos reales." },
            { title: "Impacto en PRL", detail: "Optimización de la curva de aprendizaje y mejora en la retención de protocolos de seguridad obligatorios." }
          ],
          conclusion: "La integración de IA en la prevención de riesgos laborales (PRL) salva vidas al hacer que la formación sea más clara, accesible y memorable."
        }
      },
      {
        title: "Movistar: Chatbot de Soporte Inteligente",
        desc: "Diseño de una interfaz de soporte técnico automatizada para la gestión eficiente de incidencias y atención al cliente.",
        tags: ["UX/UI", "NLP", "Customer Support"],
        content: {
          introduction: "Prototipo de asistente virtual inteligente diseñado para la resolución autónoma de problemas técnicos comunes en el sector de telecomunicaciones.",
          structure: [
            { title: "Diseño de Interfaz (UI)", detail: "Creación de un entorno de chat minimalista y funcional que prioriza la claridad y la rapidez de respuesta." },
            { title: "Flujo de Resolución", detail: "Categorización automática de incidencias (corte de internet, fallos de router) y derivación inteligente." },
            { title: "Generación de Tickets", detail: "Integración de sistemas para la creación automática de reportes detallados tras la interacción con el bot." }
          ],
          conclusion: "La automatización del soporte de primer nivel permite a los equipos humanos centrarse en casos complejos, mejorando la eficiencia operativa global."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen selection:bg-secondary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-6 max-w-[1920px] mx-auto">
          <span className="font-headline font-black text-xl tracking-tighter">P. PANIAGUA</span>
          <div className="hidden md:flex gap-8 items-center">
            {["Enfoque", "Trayectoria", "Impacto", "Contacto"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-headline uppercase tracking-[0.2em] text-[10px] font-bold opacity-60 hover:opacity-100 transition-all duration-300 hover:text-secondary"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="font-headline uppercase tracking-[0.2em] text-[10px] font-bold text-secondary hover:text-primary transition-all duration-300 flex items-center gap-2"
            >
              <FileText size={12} /> Curriculum
            </button>
            <button 
              onClick={() => setIsConfigModalOpen(true)}
              className="font-headline uppercase tracking-[0.2em] text-[10px] font-bold text-secondary hover:text-primary transition-all duration-300 flex items-center gap-2"
            >
              <Cpu size={12} /> Configuración IA
            </button>
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-primary text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-500"
          >
            Consulta
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 md:pt-48 md:pb-40 px-6 md:px-12 max-w-[1920px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <motion.div 
            className="md:col-span-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-headline font-black text-6xl md:text-[10rem] leading-[0.85] tracking-tighter text-primary">
              PATRICIA<br />PANIAGUA<br />LÓPEZ
            </h1>
            <div className="mt-12 max-w-2xl">
              <p className="font-headline text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tighter leading-tight">
                Jurista & Especialista en IA Hola
              </p>
              <p className="mt-4 text-lg md:text-xl text-primary/70 font-sans leading-relaxed tracking-wide">
                Comprometida con la excelencia jurídica y la transformación digital. Navegando la intersección entre el derecho tradicional y la frontera tecnológica.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a 
                  href="mailto:patri97lopez@gmail.com"
                  className="bg-primary text-white px-10 py-5 font-label font-bold text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-all duration-500 flex items-center gap-2"
                >
                  <Mail size={14} /> Enviame un Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/patricia-paniagua-lopez-5928113aa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-outline-variant/30 px-10 py-5 font-label font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:border-secondary hover:text-secondary flex items-center gap-2"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="md:col-span-4 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <div className="aspect-square bg-[#d9c8b3] overflow-hidden flex items-center justify-center p-12">
              {/* Image removed as per user request */}
            </div>
            <div className="absolute -bottom-8 -left-8 bg-secondary text-white p-8 hidden md:block">
              <span className="font-headline font-black text-4xl">2026</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section id="enfoque" className="py-32 bg-surface-low px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <motion.div className="md:col-span-5" {...fadeIn}>
            <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tighter leading-none mb-8">EL PERFIL<br />CURADO.</h2>
            <div className="w-20 h-1 bg-secondary mb-12"></div>
          </motion.div>
          <motion.div className="md:col-span-7 space-y-8" {...fadeIn}>
            <p className="font-sans text-2xl leading-snug text-primary tracking-tight">
              Doble Grado en Derecho y Estudios Internacionales por la UCLM. Mi enfoque trasciende la práctica legal convencional, integrando la innovación de la IA con la precisión jurídica.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              <div className="space-y-4">
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-secondary">Excelencia Bilingüe</span>
                <p className="text-primary/70 leading-relaxed">Dominio avanzado de inglés (C1), italiano (A1) y formación activa en chino. Experiencia académica internacional en Bolonia, permitiendo una asesoría jurídica global y adaptada.</p>
              </div>
              <div className="space-y-4">
                <span className="font-headline font-bold text-xs uppercase tracking-widest text-secondary">Pionera Tecnológica</span>
                <p className="text-primary/70 leading-relaxed">Especialización en Marketing Digital e IA por la Universidad Nebrija, liderando la adopción de herramientas generativas en el sector legal.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="trayectoria" className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
        <motion.div className="flex justify-between items-end mb-24" {...fadeIn}>
          <h2 className="font-headline font-black text-5xl md:text-8xl tracking-tighter leading-none">CRONOLOGÍA.</h2>
          <span className="font-label text-xs uppercase tracking-[0.4em] opacity-40">Trayectoria Profesional</span>
        </motion.div>
        
        <div className="space-y-0">
          {cvData.experience.map((exp, i) => (
            <motion.div 
              key={i}
              className="group border-t border-outline-variant/20 py-16 grid grid-cols-1 md:grid-cols-12 items-start hover:bg-white transition-colors duration-700"
              {...fadeIn}
            >
              <div className="md:col-span-2 font-headline font-black text-3xl opacity-20 group-hover:opacity-100 group-hover:text-secondary transition-all duration-500">
                {exp.period.split(" — ")[0].slice(-2)}—{exp.period.split(" — ")[1].slice(-2)}
              </div>
              <div className="md:col-span-5 pt-2">
                <h3 className="font-headline font-bold text-3xl uppercase tracking-tighter">{exp.title}</h3>
                <p className="font-label text-xs uppercase tracking-widest mt-2 opacity-60">{exp.company}</p>
              </div>
              <div className="md:col-span-5 pt-2 md:pt-4">
                <p className="text-primary/70 leading-relaxed mb-6">{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.details?.map((detail, index) => (
                    <span key={index} className="px-4 py-1 text-[9px] font-bold uppercase tracking-widest bg-primary text-white">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-outline-variant/20"></div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="labs" className="py-32 bg-primary text-white px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <motion.div className="md:col-span-4" {...fadeIn}>
              <h2 className="font-headline font-black text-5xl md:text-7xl tracking-tighter leading-none mb-8">STACK<br />TECNOLÓGICO.</h2>
              <p className="font-sans text-white/60 max-w-sm leading-relaxed">Herramientas de vanguardia para una práctica jurídica del siglo XXI. Integrando modelos de lenguaje y bases de datos legales.</p>
            </motion.div>
            <motion.div 
              className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {[
                { icon: <Sparkles />, label: "Manus AI", url: "https://manus.im/app" },
                { icon: <Brain />, label: "Perplexity", url: "https://www.perplexity.ai/" },
                { 
                  icon: <Terminal />, 
                  label: "GPT / Gemini",
                  links: [
                    { name: "ChatGPT", url: "https://chatgpt.com/" },
                    { name: "Gemini", url: "https://gemini.google.com/app?hl=es-ES" }
                  ]
                },
                { 
                  icon: <Database />, 
                  label: "CRM Legal",
                  links: [
                    { name: "Holded", url: "https://www.holded.com/" },
                    { name: "HubSpot", url: "https://www.hubspot.com/" },
                    { name: "Zoho", url: "https://www.zoho.com/crm/" },
                    { name: "Bitrix24", url: "https://www.bitrix24.com/" },
                    { name: "Agile", url: "https://www.agilecrm.com/" },
                    { name: "Capsule", url: "https://capsulecrm.com/" },
                    { name: "Suite", url: "https://suitecrm.com/" },
                    { name: "Vtiger", url: "https://www.vtiger.com/" },
                    { name: "Macroges", url: "https://www.macroges.com/" },
                    { name: "Notion", url: "https://www.notion.so/" }
                  ]
                },
                { 
                  icon: <Languages />, 
                  label: "C1 English",
                  thumbnail: "/certificado_c1.jpg",
                  onClick: () => setIsCertModalOpen(true)
                },
                { 
                  icon: <Languages />, 
                  label: "A1 Italiano",
                  thumbnail: "/certificado_italiano.jpg",
                  onClick: () => setIsItalianCertModalOpen(true)
                },
                { 
                  icon: <Cpu />, 
                  label: "Estrategia & Ética IA",
                  onClick: () => setIsStrategyModalOpen(true)
                }
              ].map((item: any, i) => {
                const isMultiLink = 'links' in item;
                const isClickable = 'onClick' in item;
                const Container = isMultiLink ? motion.div : (isClickable ? motion.button : motion.a);
                
                return (
                  <Container 
                    key={i}
                    {...(!isMultiLink && !isClickable ? {
                      href: item.url,
                      target: item.url ? "_blank" : undefined,
                      rel: item.url ? "noopener noreferrer" : undefined
                    } : {})}
                    {...(isClickable ? { onClick: item.onClick } : {})}
                    className={`bg-primary p-12 flex flex-col items-center justify-center group hover:bg-secondary transition-colors duration-500 ${item.url || isMultiLink || isClickable ? 'cursor-pointer' : ''} ${isClickable ? 'w-full text-white border-none outline-none' : ''}`}
                    variants={fadeIn}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                      {item.thumbnail ? (
                        <div className="w-16 h-12 overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center relative">
                          <img 
                            src={item.thumbnail} 
                            alt={item.label}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.classList.add('hidden');
                              }
                            }}
                          />
                        </div>
                      ) : (
                        item.icon
                      )}
                    </div>
                    <span className="font-label text-[10px] uppercase tracking-[0.3em] font-bold mb-4">{item.label}</span>
                    
                    {isMultiLink && (
                      <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {item.links.map((link, idx) => (
                          <a 
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[8px] uppercase tracking-widest font-bold bg-white/10 hover:bg-white/30 px-3 py-1.5 transition-all border border-white/5 hover:border-white/20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </Container>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact & Education Section */}
      <section id="impacto" className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <motion.div className="md:col-span-8" {...fadeIn}>
            <span className="font-headline font-bold text-xs uppercase tracking-widest text-secondary block mb-6">Investigación y Desarrollo</span>
            <h2 className="font-headline font-black text-4xl md:text-6xl tracking-tighter leading-none mb-12 uppercase">Impacto Académico & Proyectos.</h2>
            
            {/* Project Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Derecho Category */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-surface-low p-12 border-t-4 border-secondary flex flex-col justify-between group cursor-pointer"
                onClick={() => {
                  setActiveProjectTab("derecho");
                  setIsProjectsModalOpen(true);
                }}
              >
                <div>
                  <div className="w-12 h-12 bg-primary text-white flex items-center justify-center mb-8 group-hover:bg-secondary transition-colors">
                    <Gavel size={24} />
                  </div>
                  <h3 className="font-headline font-black text-3xl uppercase tracking-tighter mb-4">Proyectos de Derecho</h3>
                  <p className="text-primary/60 text-sm leading-relaxed mb-8">Investigación penal, procesal y derecho internacional público.</p>
                </div>
                <span className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                  Explorar Trabajos <ArrowRight size={14} />
                </span>
              </motion.div>

              {/* IA Category */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-primary p-12 flex flex-col justify-between group cursor-pointer text-white"
                onClick={() => {
                  setActiveProjectTab("ia");
                  setIsProjectsModalOpen(true);
                }}
              >
                <div>
                  <div className="w-12 h-12 bg-white text-primary flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Cpu size={24} />
                  </div>
                  <h3 className="font-headline font-black text-3xl uppercase tracking-tighter mb-4">IA & Marketing</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-8">Transformación digital, automatización legal y estrategias de crecimiento.</p>
                </div>
                <span className="font-label text-[10px] font-bold uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                  Explorar Trabajos <ArrowRight size={14} />
                </span>
              </motion.div>
            </div>

            <div className="aspect-video bg-surface-high relative mb-12 overflow-hidden flex items-center justify-center">
              <span className="text-primary/20 font-headline font-bold uppercase tracking-widest">Investigación Jurídica</span>
            </div>
          </motion.div>

          <motion.div className="md:col-span-4 space-y-8" {...fadeIn}>
            <div className="bg-surface-low p-10 space-y-6">
              <h4 className="font-headline font-bold text-xl uppercase tracking-tighter">Doble Grado</h4>
              <p className="font-label text-xs uppercase tracking-widest opacity-60">UCLM, Spain</p>
              <p className="text-sm leading-relaxed">Derecho y Estudios Internacionales. Becaria Erasmus en Bolonia.</p>
            </div>
            <div className="bg-surface-low p-10 space-y-6">
              <h4 className="font-headline font-bold text-xl uppercase tracking-tighter">IA y Marketing</h4>
              <p className="font-label text-xs uppercase tracking-widest opacity-60">Universidad Nebrija</p>
              <p className="text-sm leading-relaxed">Especialización de postgrado en transformación digital.</p>
            </div>
            <motion.div 
              className="bg-secondary text-white p-10 cursor-pointer hover:bg-primary transition-colors duration-500 group"
              onClick={() => setIsCertModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle2 size={40} className="mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-headline font-bold text-xl uppercase tracking-tighter">C1 Avanzado</h4>
              <p className="font-label text-xs uppercase tracking-widest opacity-80">Escuela Oficial de Idiomas</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Ver Certificado <ArrowRight size={12} />
              </div>
            </motion.div>
            <motion.div 
              className="bg-surface-low p-10 cursor-pointer hover:bg-secondary hover:text-white transition-all duration-500 group"
              onClick={() => setIsItalianCertModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle2 size={40} className="mb-4 group-hover:scale-110 transition-transform text-secondary group-hover:text-white" />
              <h4 className="font-headline font-bold text-xl uppercase tracking-tighter">A1 Italiano</h4>
              <p className="font-label text-xs uppercase tracking-widest opacity-80">Università di Bologna</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Ver Certificado <ArrowRight size={12} />
              </div>
            </motion.div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-primary text-white py-6 font-headline font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all duration-500 flex items-center justify-center gap-3"
            >
              <FileText size={18} /> Ver CV Completo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-surface-low w-full border-t border-outline-variant/15">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-16 gap-8 max-w-[1920px] mx-auto">
          <div className="space-y-4 text-center md:text-left">
            <span className="font-headline font-bold text-lg">P. PANIAGUA</span>
            <div className="flex flex-col gap-1 mt-2">
              <p className="font-sans text-xs opacity-60 flex items-center gap-2 justify-center md:justify-start">
                <Phone size={12} /> +34 629 906 810
              </p>
              <p className="font-sans text-xs opacity-60 flex items-center gap-2 justify-center md:justify-start">
                <MapPin size={12} /> Calle Sonseca 28, Polán (Toledo)
              </p>
            </div>
            <p className="font-sans tracking-[0.04em] text-xs uppercase opacity-40 mt-4">
              © 2026 PATRICIA PANIAGUA LÓPEZ. JURIDICAL PRECISION. AI INNOVATION.
            </p>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            {["Aviso Legal", "Política de Privacidad", "LinkedIn", "ResearchGate"].map((link) => (
              <a 
                key={link}
                href={link === "LinkedIn" ? "https://www.linkedin.com/in/patricia-paniagua-lopez-5928113aa/" : "#"} 
                target={link === "LinkedIn" ? "_blank" : "_self"}
                rel={link === "LinkedIn" ? "noopener noreferrer" : ""}
                className="font-sans tracking-[0.04em] text-xs uppercase opacity-40 hover:opacity-100 transition-opacity duration-300 hover:text-secondary"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* AI Config Modal */}
      <AnimatePresence>
        {isConfigModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-md overflow-y-auto pt-12 pb-24 px-4 md:px-12 flex justify-center items-start"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl relative shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-white border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center z-20">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-secondary text-white flex items-center justify-center text-[10px] font-bold">AI</div>
                  <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary/60">
                    Configuración_Chatbots_AI_Studio.txt
                  </span>
                </div>
                <button 
                  onClick={() => setIsConfigModalOpen(false)}
                  className="p-2 hover:bg-surface-low transition-colors text-primary"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-12 md:p-20 space-y-12">
                <header className="border-b-4 border-primary pb-12">
                  <h2 className="font-headline font-black text-4xl md:text-6xl tracking-tighter leading-none mb-6 uppercase text-primary">
                    {aiConfigContent.title}
                  </h2>
                  <p className="text-xl text-primary/70 leading-relaxed font-medium">
                    {aiConfigContent.description}
                  </p>
                </header>

                {aiConfigContent.sections.map((section, idx) => (
                  <section key={idx} className="space-y-8">
                    <h3 className="font-headline font-bold text-2xl uppercase tracking-tight text-secondary border-l-4 border-secondary pl-6">
                      {section.title}
                    </h3>
                    <div className="space-y-4 pl-10">
                      {section.content.map((para, pIdx) => (
                        <p key={pIdx} className="text-primary/80 leading-loose text-lg">
                          {para}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-12 p-12 bg-surface-low/30 border-t border-outline-variant/10 flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.2em]">
                <span>P. Paniagua López — AI Configuration Guide</span>
                <span>2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {isCertModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-md overflow-y-auto pt-12 pb-24 px-4 md:px-12 flex justify-center items-start"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl relative shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-white border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center z-20">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-secondary text-white flex items-center justify-center text-[10px] font-bold">C1</div>
                  <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary/60">
                    Certificado_Ingles_C1_2025.jpg
                  </span>
                </div>
                <button 
                  onClick={() => setIsCertModalOpen(false)}
                  className="p-2 hover:bg-surface-low transition-colors text-primary"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 md:p-12">
                <div className="border-8 border-primary/5 p-4 md:p-8 bg-white shadow-inner">
                  <img 
                    src="/certificado_c1.jpg" 
                    alt="Certificado C1 Inglés - Patricia Paniagua López" 
                    className="w-full h-auto shadow-lg"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // If the file is not found, we don't show a placeholder as per user request
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="mt-8 text-center space-y-2">
                    <h3 className="font-headline font-bold text-2xl text-primary uppercase tracking-tight">Certificado de Nivel Avanzado C1</h3>
                    <p className="text-primary/60 font-medium">Escuela Oficial de Idiomas - Castilla-La Mancha</p>
                    <p className="text-sm opacity-40">Expedido en Toledo, 15 de junio de 2025</p>
                    <p className="text-[10px] opacity-30 mt-4">REG. Nº: EOI/CLM-C1/2025/123456</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-surface-low/30 border-t border-outline-variant/10 flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.2em]">
                <span>P. Paniagua López — Credenciales Académicas</span>
                <span>2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Italian Certificate Modal */}
      <AnimatePresence>
        {isItalianCertModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-md overflow-y-auto pt-12 pb-24 px-4 md:px-12 flex justify-center items-start"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl relative shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-white border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center z-20">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-secondary text-white flex items-center justify-center text-[10px] font-bold">A1</div>
                  <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary/60">
                    Certificado_Italiano_A1.jpg
                  </span>
                </div>
                <button 
                  onClick={() => setIsItalianCertModalOpen(false)}
                  className="p-2 hover:bg-surface-low transition-colors text-primary"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 md:p-12">
                <div className="border-8 border-primary/5 p-4 md:p-8 bg-white shadow-inner">
                  <img 
                    src="/certificado_italiano.jpg" 
                    alt="Certificado A1 Italiano - Patricia Paniagua López" 
                    className="w-full h-auto shadow-lg"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="mt-8 text-center space-y-2">
                    <h3 className="font-headline font-bold text-2xl text-primary uppercase tracking-tight">Certificado de Nivel Básico A1 - Italiano</h3>
                    <p className="text-primary/60 font-medium">Escuela Oficial de Idiomas Raimundo de Toledo</p>
                    <p className="text-sm opacity-40">Expedido en Toledo, 10 de mayo de 2025</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-surface-low/30 border-t border-outline-variant/10 flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.2em]">
                <span>P. Paniagua López — Credenciales Académicas</span>
                <span>2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strategy Modal */}
      <AnimatePresence>
        {isStrategyModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-md overflow-y-auto pt-12 pb-24 px-4 md:px-12 flex justify-center items-start"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl relative shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-white border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center z-20">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-secondary text-white flex items-center justify-center">
                    <Cpu size={16} />
                  </div>
                  <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary/60">
                    Estrategia & Responsabilidad Algorítmica
                  </span>
                </div>
                <button 
                  onClick={() => setIsStrategyModalOpen(false)}
                  className="p-2 hover:bg-surface-low transition-colors text-primary"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 md:p-12">
                <div className="border-8 border-primary/5 p-4 md:p-8 bg-white shadow-inner min-h-[400px] flex flex-col items-center justify-center">
                  <Cpu size={120} className="text-secondary/20 mb-8" />
                  <div className="mt-8 space-y-6 w-full">
                    <div className="text-center">
                      <h3 className="font-headline font-black text-3xl text-primary uppercase tracking-tighter">Responsabilidad Algorítmica</h3>
                      <p className="text-secondary font-bold uppercase tracking-widest text-xs mt-2">Marco Ético-Legal para la IA</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-primary/70">
                      <div className="space-y-4">
                        <h4 className="font-bold text-primary uppercase tracking-wider text-[10px] border-b border-outline-variant/20 pb-2">Visión Estratégica</h4>
                        <p>Implementación de sistemas de IA que no solo optimizan la eficiencia operativa, sino que garantizan la transparencia y la explicabilidad en la toma de decisiones automatizadas.</p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-primary uppercase tracking-wider text-[10px] border-b border-outline-variant/20 pb-2">Cumplimiento Normativo</h4>
                        <p>Alineación con el Reglamento de IA de la UE (AI Act), asegurando que cada implementación respete los derechos fundamentales y la privacidad de los datos.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-surface-low/30 border-t border-outline-variant/10 flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.2em]">
                <span>P. Paniagua López — Innovación & Ética</span>
                <span>2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CV Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-md overflow-y-auto pt-12 pb-24 px-4 md:px-12 flex justify-center items-start"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl relative shadow-2xl flex flex-col"
            >
              {/* CV Header Bar */}
              <div className="sticky top-0 bg-white border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center z-20">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-secondary text-white flex items-center justify-center text-[10px] font-bold">CV</div>
                  <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary/60">
                    Curriculum_Vitae_2026.pdf
                  </span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-surface-low transition-colors text-primary"
                >
                  <X size={24} />
                </button>
              </div>

              {/* CV Content (Paper Style) */}
              <div className="p-8 md:p-20 bg-surface-low/30">
                <div className="max-w-4xl mx-auto bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] p-10 md:p-20">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Header Info */}
                    <div className="md:col-span-12 border-b-2 border-primary pb-12 mb-4">
                      <span className="font-label text-[10px] uppercase tracking-[0.5em] text-secondary mb-6 block">Curriculum Vitae • 2026</span>
                      <h2 className="font-headline font-black text-5xl md:text-8xl tracking-tighter text-primary uppercase leading-[0.85] mb-8">
                        Patricia<br />Paniagua López
                      </h2>
                      <div className="flex flex-wrap gap-x-12 gap-y-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
                        <span className="flex items-center gap-2"><MapPin size={14} className="text-secondary" /> Toledo / España</span>
                        <span className="flex items-center gap-2"><Phone size={14} className="text-secondary" /> +34 629 906 810</span>
                        <span className="flex items-center gap-2"><Mail size={14} className="text-secondary" /> patri97lopez@gmail.com</span>
                        <span className="flex items-center gap-2"><Linkedin size={14} className="text-secondary" /> /patricia-paniagua-lopez</span>
                      </div>
                    </div>

                    {/* Left Column */}
                    <div className="md:col-span-8 space-y-20">
                      {/* Profile */}
                      <section>
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-8">Sobre Mí</h3>
                        <p className="font-sans text-2xl leading-snug text-primary/90 tracking-tight">
                          "{cvData.profile}"
                        </p>
                      </section>

                      {/* Experience */}
                      <section>
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-12 flex items-center gap-3">
                          <Briefcase size={16} /> Experiencia Profesional
                        </h3>
                        <div className="space-y-16">
                          {cvData.experience.map((exp, i) => (
                            <div key={i} className="relative pl-8 border-l border-outline-variant/30">
                              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-secondary rounded-full" />
                              <span className="text-[10px] font-bold opacity-40 mb-2 block uppercase tracking-widest">{exp.period}</span>
                              <h4 className="font-headline font-bold text-2xl uppercase tracking-tight text-primary">{exp.title}</h4>
                              <p className="font-label text-xs uppercase tracking-widest text-secondary mt-1 mb-6">{exp.company}</p>
                              <p className="text-base text-primary/70 leading-relaxed mb-6">{exp.desc}</p>
                              <div className="flex flex-wrap gap-2">
                                {exp.details?.map(detail => (
                                  <span key={detail} className="px-3 py-1 bg-surface-low text-[9px] font-bold uppercase tracking-widest border border-outline-variant/10">
                                    {detail}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Education */}
                      <section>
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-12 flex items-center gap-3">
                          <GraduationCap size={16} /> Formación Académica
                        </h3>
                        <div className="space-y-16">
                          {cvData.education.map((edu, i) => (
                            <div key={i} className="relative pl-8 border-l border-outline-variant/30">
                              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary rounded-full" />
                              <span className="text-[10px] font-bold opacity-40 mb-2 block uppercase tracking-widest">{edu.period}</span>
                              <h4 className="font-headline font-bold text-2xl uppercase tracking-tight text-primary">{edu.title}</h4>
                              <p className="font-label text-xs uppercase tracking-widest text-secondary mt-1 mb-4">{edu.institution}</p>
                              {edu.desc && <p className="text-sm text-primary/70 leading-relaxed italic">{edu.desc}</p>}
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-4 space-y-16">
                      {/* Values */}
                      <section className="bg-primary text-white p-10">
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-8">Valores</h3>
                        <ul className="space-y-6">
                          {cvData.values.map((val, i) => (
                            <li key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                              <span className="w-1.5 h-1.5 bg-secondary" /> {val}
                            </li>
                          ))}
                        </ul>
                      </section>

                      {/* Soft Skills */}
                      <section>
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-8">Habilidades Soft</h3>
                        <div className="space-y-4">
                          {cvData.aptitudes.map((apt, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{apt}</span>
                              <ArrowRight size={12} className="text-secondary opacity-40" />
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Languages */}
                      <section>
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-8">Idiomas</h3>
                        <div className="space-y-8">
                          {cvData.languages.map((lang, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between items-end">
                                <p className="font-headline font-bold text-lg uppercase tracking-tight">{lang.lang}</p>
                                <span className="text-[9px] font-bold opacity-40">{lang.level.split('(')[1]?.replace(')', '') || lang.level.split('—')[1]}</span>
                              </div>
                              <div className="h-1 bg-surface-low w-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: lang.level.includes('90%') ? '90%' : lang.level.includes('80%') ? '80%' : lang.level.includes('20%') ? '20%' : '15%' }}
                                  className="h-full bg-secondary"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Certifications */}
                      <section className="space-y-8">
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary">Certificaciones</h3>
                        {cvData.certifications.map((cert, i) => (
                          <div key={i} className="p-6 bg-surface-low border border-outline-variant/10">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{cert.title}</p>
                            <p className="text-[9px] opacity-50 leading-relaxed">{cert.desc}</p>
                          </div>
                        ))}
                      </section>
                    </div>
                  </div>

                  {/* Footer of CV */}
                  <div className="mt-32 pt-12 border-t border-outline-variant/10 flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.2em]">
                    <span>P. Paniagua López — Jurista & IA Specialist</span>
                    <span>© 2026 Toledo, España</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Projects Modal */}
      <AnimatePresence>
        {isProjectsModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-primary/95 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-background w-full max-w-4xl relative p-8 md:p-16 shadow-2xl"
            >
              <button 
                onClick={() => setIsProjectsModalOpen(false)}
                className="absolute top-8 right-8 text-primary hover:text-secondary transition-colors"
              >
                <X size={32} />
              </button>

              <div className="text-center mb-12">
                <h2 className="font-headline font-black text-5xl tracking-tighter text-primary mb-8">PROYECTOS</h2>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => setActiveProjectTab("derecho")}
                    className={`px-8 py-3 font-label text-[10px] uppercase tracking-widest transition-all duration-300 ${activeProjectTab === "derecho" ? "bg-secondary text-white" : "bg-surface-low text-primary/40 hover:text-primary"}`}
                  >
                    Derecho
                  </button>
                  <button 
                    onClick={() => setActiveProjectTab("ia")}
                    className={`px-8 py-3 font-label text-[10px] uppercase tracking-widest transition-all duration-300 ${activeProjectTab === "ia" ? "bg-secondary text-white" : "bg-surface-low text-primary/40 hover:text-primary"}`}
                  >
                    IA y Marketing
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="wait">
                  {projectsData[activeProjectTab].map((project, i) => (
                    <motion.div 
                      key={`${activeProjectTab}-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-surface-low p-8 border-l-4 border-secondary hover:bg-white transition-colors duration-500 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-headline font-bold text-xl uppercase tracking-tight mb-4">{project.title}</h4>
                        <p className="text-sm text-primary/70 leading-relaxed mb-6">{project.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-bold uppercase tracking-widest opacity-40">#{tag}</span>
                          ))}
                        </div>
                      </div>
                      {project.content && (
                        <button 
                          onClick={() => {
                            setSelectedProject(project);
                            setIsReaderOpen(true);
                          }}
                          className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2 hover:gap-4 transition-all duration-300"
                        >
                          Leer Trabajo Completo <ArrowRight size={14} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Project Reader Modal */}
      <AnimatePresence>
        {isReaderOpen && selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 bg-primary/98 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#FDFDFD] w-full max-w-5xl min-h-[95vh] relative shadow-2xl flex flex-col"
            >
              {/* Reader Header */}
              <div className="sticky top-0 bg-white border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary text-white flex items-center justify-center text-xs font-bold">PDF</div>
                  <span className="font-headline font-bold text-xs uppercase tracking-widest text-primary/60 truncate max-w-[200px] md:max-w-md">
                    {selectedProject.title}.pdf
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-surface-low transition-colors"><Languages size={18} /></button>
                  <button 
                    onClick={() => setIsReaderOpen(false)}
                    className="p-2 hover:bg-surface-low transition-colors text-primary"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Reader Content (The "Paper") */}
              <div className="flex-1 overflow-y-auto p-8 md:p-24 bg-surface-low/30">
                <div className="max-w-3xl mx-auto bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] p-12 md:p-24 min-h-[1200px]">
                  <div className="border-b-2 border-primary pb-12 mb-16">
                    <span className="font-label text-[10px] uppercase tracking-[0.5em] text-secondary mb-6 block">Documento de Investigación</span>
                    <h2 className="font-headline font-black text-4xl md:text-6xl tracking-tighter text-primary uppercase leading-[0.9] mb-8">
                      {selectedProject.title}
                    </h2>
                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
                      <span>Autor: Patricia Paniagua</span>
                      <span>Fecha: 2025/26</span>
                    </div>
                  </div>

                  <div className="space-y-16 font-serif text-primary/90 leading-relaxed text-lg">
                    <section>
                      <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-8">Introducción</h3>
                      <p className="text-xl leading-relaxed italic text-primary/70">
                        {selectedProject.content.introduction}
                      </p>
                    </section>

                    {selectedProject.content.case && (
                      <section className="bg-surface-low/50 p-12 space-y-8 border-l-4 border-primary">
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary">Resumen Ejecutivo del Caso</h3>
                        <div className="grid grid-cols-1 gap-8">
                          <div>
                            <p className="font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">Partes Involucradas</p>
                            <p className="font-sans text-base">{selectedProject.content.case.parties}</p>
                          </div>
                          <div className="flex justify-between items-end border-t border-outline-variant/20 pt-6">
                            <div>
                              <p className="font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">Cuantía Litigiosa</p>
                              <p className="text-3xl font-headline font-black text-primary">{selectedProject.content.case.amount}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-[10px] uppercase tracking-widest opacity-40 mb-2">Estado</p>
                              <p className="text-xs font-bold uppercase tracking-widest text-secondary">Vencida y Exigible</p>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    <section className="space-y-16">
                      <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary">Desarrollo Jurídico</h3>
                      <div className="space-y-16">
                        {selectedProject.content.structure.map((item: any, i: number) => (
                          <div key={i} className="relative pl-12">
                            <span className="absolute left-0 top-0 font-headline font-black text-4xl opacity-10">0{i + 1}</span>
                            <h4 className="font-headline font-bold text-2xl uppercase tracking-tight mb-4 text-primary">
                              {item.title}
                            </h4>
                            <p className="text-base opacity-80 leading-loose">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {selectedProject.content.jurisprudence && (
                      <section className="bg-primary text-white p-12">
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-8">Doctrina Jurisprudencial</h3>
                        <p className="text-lg leading-relaxed font-medium">
                          {selectedProject.content.jurisprudence}
                        </p>
                      </section>
                    )}

                    {selectedProject.content.documents && (
                      <section>
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-8">Anexo: Prueba Documental</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedProject.content.documents.map((doc: string) => (
                            <div key={doc} className="border border-outline-variant/20 p-4 flex items-center gap-3">
                              <div className="w-2 h-2 bg-secondary rounded-full" />
                              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {selectedProject.content.conclusion && (
                      <section className="border-t-2 border-primary pt-16 pb-12">
                        <h3 className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-secondary mb-8">Dictamen Final</h3>
                        <p className="text-2xl font-headline font-black text-primary leading-tight">
                          {selectedProject.content.conclusion}
                        </p>
                      </section>
                    )}
                  </div>

                  <div className="mt-24 pt-12 border-t border-outline-variant/10 flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.2em]">
                    <span>P. Paniagua López — Portfolio 2026</span>
                    <span>Página 01 de 01</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Chatbot */}
      <div className="fixed bottom-8 right-8 z-[120]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white w-[350px] md:w-[400px] h-[500px] shadow-2xl border border-outline-variant/10 flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-primary p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white">
                    <Bot size={18} />
                  </div>
                  <div>
                    <p className="text-white font-headline font-bold text-sm">Asistente de Patricia</p>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest">En línea</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Chat Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface-low/30">
                {chatMessages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] p-4 text-sm leading-relaxed ${msg.role === "user" ? "bg-secondary text-white" : "bg-white text-primary shadow-sm"}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white p-4 shadow-sm flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-secondary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Procesando consulta...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-outline-variant/10">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(chatInput);
                  }}
                  className="flex gap-2 mb-4"
                >
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Escribe tu consulta legal o técnica..."
                    className="flex-1 bg-surface-low border-none px-4 py-2 text-sm focus:ring-1 focus:ring-secondary outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={isTyping || !chatInput.trim()}
                    className="bg-primary text-white p-2 hover:bg-secondary transition-colors disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "⚖️ Código Civil", value: "¿Qué dice el Código Civil sobre los contratos?" },
                    { label: "🛡️ Constitución", value: "Explícame el artículo 1 de la Constitución Española" },
                    { label: "🤖 IA Act UE", value: "¿Cómo afecta el AI Act a la privacidad?" },
                    { label: "📂 Perfil Patricia", value: "Cuéntame sobre la formación de Patricia" }
                  ].map((btn) => (
                    <button 
                      key={btn.value}
                      onClick={() => handleQuickReply(btn.value)}
                      className="text-[8px] font-bold uppercase tracking-widest px-2 py-1.5 bg-surface-low hover:bg-secondary hover:text-white transition-all duration-300 border border-outline-variant/10"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
