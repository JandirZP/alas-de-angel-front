# Alas de Angel - Sistema de Gestión Hospitalaria

![Estado](https://img.shields.io/badge/Estado-En_Desarrollo-green)
![Java](https://img.shields.io/badge/Backend-Java_Spring_Boot-007396)
![React](https://img.shields.io/badge/Frontend-React_TypeScript-61DAFB)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E)

## Descripción del Proyecto

**Alas de Angel** es un sistema full-stack diseñado para digitalizar y optimizar la gestión de atención médica en centros de salud. El objetivo principal de esta plataforma es agilizar el flujo de pacientes, desde su ingreso hasta la gestión de su información clínica, garantizando seguridad, rapidez y una excelente experiencia de usuario.

Este proyecto fue desarrollado con un enfoque en escalabilidad y buenas prácticas de arquitectura de software, separando claramente las responsabilidades entre el cliente (Frontend) y el servidor (Backend).

## Características Principales (Módulos)

- **Gestión de Historial Médico:** Creación, lectura y actualización de los registros clínicos de los pacientes de forma segura.
- **Módulo de Triaje:** Sistema de priorización para evaluar rápidamente la urgencia de los pacientes que ingresan, optimizando los tiempos de espera.
- **Interfaz Reactiva:** Diseño moderno y adaptable (Responsive Design) para facilitar el uso por parte del personal médico administrativo.
- **Seguridad:** Implementación de autenticación y protección de rutas.

## Stack Tecnológico

El proyecto está construido utilizando las siguientes tecnologías:

**Frontend:**
- [React](https://reactjs.org/) - Librería principal para la interfaz de usuario.
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático para un código más robusto.
- [Tailwind CSS](https://tailwindcss.com/) - Framework de utilidades CSS para los estilos ágiles.

**Backend:**
- [Java](https://www.java.com/) & [Spring Boot](https://spring.io/projects/spring-boot) - Framework principal para la API REST, lógica de negocio y seguridad.

**Base de Datos:**
- [Supabase](https://supabase.com/) - Alternativa Open Source para la base de datos relacional y gestión de almacenamiento.

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión recomendada)
- [Java JDK 17+](https://www.oracle.com/java/technologies/downloads/)
- [Maven](https://maven.apache.org/)
- Cuenta en Supabase con las credenciales de la base de datos.

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TuUsuario/alas-de-angel.git](https://github.com/TuUsuario/alas-de-angel.git)

2. **Configurar y levantar el Backend (Spring Boot):**

   Navega a la carpeta del backend.

   ```bash
   cd gestion-pacientes-back
   ```

   Configura las variables de entorno en el archivo application.properties o application.yml con tus credenciales de Supabase.

   Ejecuta el proyecto:

   ```bash
   ./mvnw spring-boot:run
   ```

3. **Configurar y levantar el Frontend (React):**

   Navega a la carpeta del frontend.

   ```bash
   cd gestion-pacientes-front
   ```

   Instala las dependencias:

   ```bash
   npm install
   ```

   Crea un archivo .env en la raíz del frontend y añade las variables de entorno necesarias (URLs de la API, etc.).

   Ejecuta el proyecto:

   ```bash
   npm run dev
   ```

## Estructura del Proyecto

A continuación se detalla la organización principal de los directorios dentro de `src/`:

- **`api/`**: Cliente HTTP para la comunicación con el Backend (configuración base y URLs).
- **`components/`**: Componentes reutilizables de UI (botones, inputs, modales, etc.).
- **`events/`**: Lógica de eventos y manejo de acciones.
- **`hooks/`**: Custom hooks de React para lógica reutilizable.
- **`layouts/`**: Estructuras de diseño base (plantillas) para las páginas.
- **`modules/`**: Vistas y lógica de negocio agrupada por dominio (ej. Landing, Pacientes, Doctores).
- **`pages/`**: Componentes que actúan como páginas completas de la aplicación.
- **`router/`**: Configuración de React Router para la navegación.
- **`services/`**: Llamadas específicas a los endpoints del backend organizadas por entidad.
- **`types/`**: Definiciones de interfaces, modelos y tipos de TypeScript.
- **`utils/`**: Funciones utilitarias generales y helpers.

## Autenticación y Seguridad

El sistema implementa un flujo de autenticación seguro basado en **JSON Web Tokens (JWT)**:

- **Inicio de Sesión**: Los usuarios deben iniciar sesión para obtener su token de acceso.
- **Protección de Rutas**: Se implementan protectores de ruta (guards) en el frontend; las vistas privadas y dashboards solo son accesibles con un token válido.
- **Consumo de APIs**: El token JWT se almacena de forma segura en el cliente y se incluye automáticamente en las cabeceras (`Authorization: Bearer <token>`) de las peticiones HTTP que requieren permisos.
