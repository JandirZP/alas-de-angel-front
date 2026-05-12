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

## Repositorios del Proyecto

El proyecto está dividido en dos repositorios para mantener una separación clara entre el cliente y el servidor:

- **Frontend (React + Vite):** [alas-de-angel-front](https://github.com/JandirZP/alas-de-angel-front) *(Este repositorio)*
- **Backend (Spring Boot):** [alas-de-angel-back](https://github.com/JandirZP/alas-de-angel-back)

## Entorno de Producción (Despliegue)

La aplicación se encuentra desplegada y accesible en la nube a través de los siguientes servicios:

- **Frontend:** Alojado en **Netlify**, garantizando una entrega rápida y continua.
- **Backend:** Alojado en **Render**, sirviendo la API REST y manejando la lógica del sistema.
- **Base de Datos:** Alojada en **Supabase**.

## Instalación y Configuración Local (Frontend)

Sigue estos pasos para levantar el entorno de desarrollo del frontend en tu máquina local.

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión LTS recomendada).
- Tener el backend corriendo localmente o configurar las variables de entorno para apuntar al backend en Render.

### Pasos

1. **Clonar este repositorio:**
   ```bash
   git clone https://github.com/JandirZP/alas-de-angel-front.git
   ```

2. **Ingresar al directorio:**
   *(Si el nombre de la carpeta local es diferente, ajusta el comando).*
   ```bash
   cd alas-de-angel-front
   ```

3. **Instalar las dependencias:**
   ```bash
   npm install
   ```

4. **Configurar Variables de Entorno:**
   Crea un archivo `.env` en la raíz del proyecto y añade las variables necesarias, como la URL base de tu backend (`VITE_API_URL`, etc.).

5. **Iniciar el servidor de desarrollo:**
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
