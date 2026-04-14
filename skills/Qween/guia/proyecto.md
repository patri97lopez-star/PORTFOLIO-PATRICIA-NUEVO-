# Proyecto: Portfolio de Patricia Paniagua López

## Descripción General

Este proyecto es una **aplicación web tipo portfolio/portafolio profesional** desarrollada para **Patricia Paniagua López**, una jurista española especializada en Inteligencia Artificial aplicada al marketing y al derecho.

La aplicación combina la presentación profesional de su trayectoria con un **chatbot inteligente** integrado que actúa como asistente virtual, capaz de responder preguntas sobre temas jurídicos (Código Penal, Civil, Mercantil, Constitución Española) y sobre Inteligencia Artificial.

---

## Tecnologías Utilizadas

| Tecnología | Propósito |
|---|---|
| **React 19** | Framework principal de UI |
| **TypeScript** | Tipado estático |
| **Vite 6** | Bundler y servidor de desarrollo |
| **Tailwind CSS 4** | Estilos y diseño utility-first |
| **Motion (Framer Motion)** | Animaciones |
| **Lucide React** | Iconografía |
| **Google Gemini AI (@google/genai)** | Motor de IA para el chatbot |
| **Express** | Servidor backend (disponible) |
| **Dotenv** | Gestión de variables de entorno |

---

## Estructura del Proyecto

```
PROYECTOS/
├── src/
│   ├── App.tsx              # Componente principal con toda la lógica
│   ├── main.tsx             # Punto de entrada de React
│   └── index.css            # Estilos globales y configuración Tailwind
├── skills/
│   └── Qween/
│       └── guia/
│           └── proyecto.md  # Este archivo
├── index.html               # HTML base
├── package.json             # Dependencias y scripts
├── vite.config.ts           # Configuración de Vite
├── tsconfig.json            # Configuración de TypeScript
├── .env.example             # Ejemplo de variables de entorno
└── README.md                # Documentación original
```

---

## Funcionalidades Principales

### 1. Portfolio Profesional
- **Sección Hero**: Presentación impactante con nombre, título y enlaces de contacto
- **Enfoque**: Valores profesionales y aptitudes clave
- **Trayectoria**: Experiencia laboral y formación académica detallada
- **Impacto**: Certificaciones y logros
- **Contacto**: Información de contacto y enlaces a redes sociales

### 2. Chatbot Inteligente (Asistente de Patricia)
- **Motor**: Google Gemini (modelo `gemini-3-flash-latest`)
- **Capacidades**:
  - Responde preguntas sobre derecho español (Penal, Civil, Mercantil, Constitucional)
  - Conocimientos en Inteligencia Artificial y AI Act de la UE
  - Conoce el perfil profesional de Patricia en profundidad
  - Mantiene contexto de conversación (historial de chat)
- **Interfaz**: Widget flotante con mensajes animados y indicador de escritura

### 3. Modales Informativos
- **Currículum Vitae**: CV completo con experiencia, educación, idiomas y certificaciones
- **Configuración IA**: Documentación técnica sobre implementación de chatbots en Google AI Studio (Luxury Bali, Sanitas, Movistar)
- **Proyectos**: Secciones separadas para proyectos de Derecho e IA
- **Certificaciones**: Detalles de certificaciones obtenidas

### 4. Diseño Visual
- **Tipografías**: Epilogue (títulos), Inter (cuerpo), Manrope (etiquetas)
- **Paleta de colores**:
  - Primary: `#000613` (azul oscuro casi negro)
  - Secondary: `#556B2F` (verde oliva)
  - Background: `#F9F9F9` (blanco cálido)
- **Estilo**: Minimalista, editorial, con animaciones suaves

---

## Configuración del Entorno

### Variables de Entorno Requeridas

Crear un archivo `.env.local` en la raíz del proyecto con:

```env
GEMINI_API_KEY=tu_clave_api_de_gemini_aqui
```

### Obtención de la API Key
1. Ir a [Google AI Studio](https://aistudio.google.com/)
2. Iniciar sesión con cuenta de Google
3. Generar una API Key en la sección de configuración
4. Copiar la clave al archivo `.env.local`

---

## Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo en `http://localhost:3000` |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run clean` | Elimina la carpeta `dist` |
| `npm run lint` | Verifica el código con TypeScript (tsc --noEmit) |

---

## Instrucciones de Ejecución

### Prerrequisitos
- **Node.js** (versión 18 o superior recomendada)
- **npm** (gestor de paquetes)
- **API Key de Google Gemini**

### Pasos para Ejecutar en Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variable de entorno**:
   - Crear archivo `.env.local` en la raíz
   - Añadir: `GEMINI_API_KEY=tu_clave_aqui`

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**:
   - Abrir navegador en `http://localhost:3000`

---

## Notas Técnicas

- **Tailwind CSS v4**: Se usa el plugin `@tailwindcss/vite` para integración directa con Vite
- **HMR**: Hot Module Replacement está habilitado por defecto (se puede desactivar con `DISABLE_HMR=true`)
- **TypeScript**: Configuración estricta con target ES2020
- **Responsive**: Diseño adaptable a móvil, tablet y escritorio
- **Animaciones**: Uso extensivo de Framer Motion para transiciones suaves

---

## Sobre Patricia Paniagua López

- **Formación**: Doble Grado en Derecho y Estudios Internacionales (UCLM)
- **Especialización**: IA y Marketing (Universidad Nebrija & Unión Europea)
- **Idiomas**: Español (nativo), Inglés (C1), Italiano (A1), Chino (A1)
- **Enfoque profesional**: Intersección entre derecho tradicional e Inteligencia Artificial
- **LinkedIn**: [Perfil de Patricia](https://www.linkedin.com/in/patricia-paniagua-lopez-5928113aa/)

---

## Enlaces Útiles

- **Google AI Studio**: https://aistudio.google.com/
- **Documentación Gemini**: https://ai.google.dev/gemini-api/docs
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/

---

*Documento creado por Qween - Asistente de desarrollo*
*Fecha: 14 de abril de 2026*
