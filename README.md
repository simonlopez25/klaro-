# Klaro - Limpieza de Datos sin Friccion

**Convierte hojas de calculo desordenadas en datos listos para trabajar en segundos**

![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?style=flat-square&logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10+-3776ab?style=flat-square&logo=python)
![Pandas](https://img.shields.io/badge/Pandas-2-150458?style=flat-square&logo=pandas)
![License](https://img.shields.io/badge/License-Private-ef4444?style=flat-square)

---

## Tabla de Contenidos

- [Descripcion](#descripcion)
- [Caracteristicas Principales](#caracteristicas-principales)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalacion y Configuracion](#instalacion-y-configuracion)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Reglas de Limpieza](#reglas-de-limpieza)
- [Desarrollo](#desarrollo)
- [Despliegue](#despliegue)
- [Contribucion](#contribucion)
- [Licencia](#licencia)
- [Autor](#autor)

---

## Descripcion

**Klaro** es una aplicacion web de limpieza de datos disenada para equipos de Administracion, Ventas y Marketing. Permite a usuarios sin conocimientos tecnicos cargar archivos Excel o CSV con datos desordenados y obtener una version limpia, normalizada y lista para usar en segundos.

La aplicacion procesa los archivos **100% en memoria** sin almacenar datos en servidores, garantizando la privacidad y cumplimiento del RGPD.

---

## Caracteristicas Principales

- **Carga de archivos** mediante drag & drop o seleccion manual
- **Deteccion automatica** de columnas (emails, nombres, telefonos)
- **Limpieza inteligente** de datos con reglas configurables
- **Eliminacion de duplicados** y filas vacias
- **Correccion de dominios de email** (gmil.com -> gmail.com, etc.)
- **Separacion de nombres y apellidos** automatica
- **Normalizacion de telefonos** (solo digitos y +)
- **Previsualizacion** de datos limpios en tabla
- **Descarga en formato Excel** (.xlsx)
- **Procesamiento 100% privado** - sin almacenamiento
- **Interfaz responsive** y accesible (WCAG 2.1 AA)
- **Procesa hasta 50,000 filas** en segundos

---

## Tecnologias Utilizadas

### Frontend

| Tecnologia | Version | Proposito |
|---|---|---|
| [React](https://react.dev/) | 19.2.8 | Biblioteca de interfaz de usuario |
| [Vite](https://vitejs.dev/) | 8.2.2 | Build tool y dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.19 | Framework de estilos utility-first |
| [React Router DOM](https://reactrouter.com/) | 7.18.3 | Enrutamiento SPA |
| [Axios](https://axios-http.com/) | 1.20.0 | Cliente HTTP |

### Backend

| Tecnologia | Proposito |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | Framework web para API REST |
| [Uvicorn](https://www.uvicorn.org/) | Servidor ASGI |

---

## Arquitectura del Proyecto

```
Klaro/
├── src/
│   ├── components/
│   │   ├── atoms/           # Componentes base reutilizables
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Logo.jsx
│   │   ├── molecules/       # Composiciones de atomos
│   │   │   ├── MetricCard.jsx
│   │   │   └── UseCaseSelector.jsx
│   │   └── organisms/       # Componentes de seccion completa
│   │       ├── DownloadCard.jsx
│   │       ├── DropZone.jsx
│   │       ├── DropZoneCard.jsx
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       ├── Navbar.jsx
│   │       └── TopBanner.jsx
│   ├── pages/
│   │   └── Home.jsx         # Pagina principal
│   ├── service/
│   │   └── api.js           # Cliente API (fetch)
│   ├── style/
│   │   └── index.css        # Estilos globales + Tailwind
│   ├── assets/
│   │   └── hero.png
│   ├── App.jsx              # Componente raiz + rutas
│   └── main.jsx             # Punto de entrada
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── files.py        # Endpoints de archivos
│   │   ├── services/
│   │   │   └── cleaning_service.py  # Logica de limpieza con Pandas
│   │   └── __init__.py
│   ├── main.py                  # Aplicacion FastAPI + CORS
│   └── requirements.txt
├── index.html
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
├── postcss.config.js
└── package.json
```

### Patron de Disenio

El frontend sigue **Atomic Design**:

- **Atomos**: Componentes indivisibles (Badge, Button, Logo)
- **Moleculas**: Grupos funcionales de atomos (MetricCard, UseCaseSelector)
- **Organismos**: Secciones completas de la interfaz (Navbar, DropZoneCard, DownloadCard)

| [Pandas](https://pandas.pydata.org/) | Manipulacion y limpieza de datos |
| [OpenPyXL](https://openpyxl.readthedocs.io/) | Lectura/escritura de archivos Excel |


---

## Requisitos Previos

Asegurate de tener instalado:

- [Node.js](https://nodejs.org/) 18+ y npm
- [Python](https://www.python.org/) 3.10+
- [pip](https://pip.pypa.io/) (gestor de paquetes de Python)

---

## Instalacion y Configuracion

### 1. Clonar el repositorio

```bash
git clone https://github.com/simonlopez25/klaro-.git
cd klaro-
```

### 2. Configurar el Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 3. Configurar el Frontend

```bash
cd ..

# Instalar dependencias
npm install
```

---

## Uso

### Iniciar el Backend

Desde el directorio `backend/` con el entorno virtual activado:


---

## API Endpoints

### `POST /api/clean`

Sube y limpia un archivo CSV o Excel.

**Request:**
- `Content-Type`: `multipart/form-data`
- `body`: archivo (.csv, .xlsx, .xls)

**Response (200):**
```json
{
  "filename": "contactos.csv",
  "total_rows": 1420,
  "duplicates_removed": 47,
  "rules_applied": [
    "Eliminacion filas vacias",
    "Eliminacion duplicados (47 removidos)",
    "Limpieza espacios",
    "Emails: correo",
    "Nombres: nombre_completo",
    "Telefonos: telefono"
  ],
  "preview": [
    { "Nombre": "Maria", "Apellido": "Garcia", "Email": "maria@gmail.com" }
  ],
  "message": "Archivo procesado con exito"
}
```

### `POST /api/download-excel`

Sube un archivo y devuelve la version limpia como descarga Excel.

**Request:**
- `Content-Type`: `multipart/form-data`
- `body`: archivo (.csv, .xlsx, .xls)

**Response:** Archivo `.xlsx` como streaming download.

### `GET /`

Health check endpoint.

**Response:**
```json
{

---

## Reglas de Limpieza

El servicio aplica las siguientes reglas automaticamente:

| Regla | Descripcion |
|---|---|
| **Filas vacias** | Elimina filas donde todos los valores son nulos |
| **Duplicados** | Elimina registros duplicados y reporta cantidad removida |
| **Espacios** | Trim (quita espacios extra) en todas las columnas de texto |
| **Emails** | Convierte a minusculas, quita espacios y corrige dominios comunes (gmil->gmail, hotmial->hotmail, etc.) |
| **Nombres** | Separa nombre y apellido desde columnas tipo "nombre", "name", "cliente" |
| **Telefonos** | Mantiene solo digitos y simbolo `+` |

### Dominios de Email Corregidos

| Incorrecto | Correcto |
|---|---|
| gmil.com, gmai.com, gamil.com, gmail.co, gmail.cm, gmail.con | gmail.com |
| hotmial.com, hotmal.com, hotmail.co, hotmail.cm, hotmail.con | hotmail.com |
| outlok.com, outloo.com, outlook.co, outlook.cm | outlook.com |
| yahooo.com, yaho.com, yahoo.co | yahoo.com |

---

## Desarrollo

### Scripts Disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo Vite (puerto 5173) |
| `npm run build` | Genera build de produccion en `/dist` |
| `npm run preview` | Sirve el build de produccion localmente |
| `npm run lint` | Ejecuta ESLint para revision de codigo |

### Variables de Entorno

El frontend se conecta al backend en `http://localhost:8000`. Para cambiar la URL base, modifica `src/service/api.js`:

```javascript
const API_URL = 'http://localhost:8000/api'
```

---

## Despliegue

### Frontend (Vite)

```bash
npm run build
```

Los archivos estaticos se generan en `dist/`. Puedes desplegarlos en:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- Cualquier hosting de archivos estaticos

### Backend (FastAPI)

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Opciones de despliegue:

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
- [AWS/GCP/Azure](https://fastapi.tiangolo.com/deployment/)

> **Nota**: Actualiza la configuracion de CORS en `backend/main.py` para permitir el origen de produccion del frontend.

---

## Contribucion

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Anade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

Este proyecto es de uso privado. Todos los derechos reservados  2026 Klaro Technologies.

---

## Autor

**Simon Lopez**

- GitHub: [@simonlopez25](https://github.com/simonlopez25)
- Proyecto: [klaro-](https://github.com/simonlopez25/klaro-)

---

**Hecho con React + FastAPI + Pandas**

Ahorra 4 horas semanales eliminando el formateo manual de Excel


### ESLint

El proyecto usa ESLint con plugins para React Hooks y React Refresh. Configuracion en `eslint.config.js`.

  "status": "Klaro API funcionando correctamente",
  "security": "100% en memoria"
}
```

```bash
uvicorn main:app --reload --port 8000
```

La API estara disponible en `http://localhost:8000`

Documentacion interactiva: `http://localhost:8000/docs`

### Iniciar el Frontend

Desde el directorio raiz del proyecto:

```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:5173`

### Flujo de Uso

1. **Cargar archivo**: Arrastra un archivo `.xlsx`, `.xls` o `.csv` al area de carga
2. **Procesar**: Haz clic en "Ejecutar Limpieza en Backend"
3. **Revisar**: Observa la previsualizacion de los datos limpios
4. **Descargar**: Descarga el archivo limpio en formato Excel

- **Procesa hasta 50,000 filas** en segundos

---

## Tecnologías Utilizadas

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| [React](https://react.dev/) | 19.2.8 | Biblioteca de interfaz de usuario |
| [Vite](https://vitejs.dev/) | 8.2.2 | Build tool y dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.19 | Framework de estilos utility-first |
| [React Router DOM](https://reactrouter.com/) | 7.18.3 | Enrutamiento SPA |
| [Axios](https://axios-http.com/) | 1.20.0 | Cliente HTTP |

### Backend

| Tecnología | Propósito |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | Framework web para API REST |
| [Uvicorn](https://www.uvicorn.org/) | Servidor ASGI |
| [Pandas](https://pandas.pydata.org/) | Manipulación y limpieza de datos |
| [OpenPyXL](https://openpyxl.readthedocs.io/) | Lectura/escritura de archivos Excel |

---

## Arquitectura del Proyecto

```
Klaro/
├── src/
│   ├── components/
│   │   ├── atoms/           # Componentes base reutilizables
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Logo.jsx
│   │   ├── molecules/       # Composiciones de átomos
│   │   │   ├── MetricCard.jsx
│   │   │   └── UseCaseSelector.jsx
│   │   └── organisms/       # Componentes de sección completa
│   │       ├── DownloadCard.jsx
│   │       ├── DropZone.jsx
│   │       ├── DropZoneCard.jsx
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       ├── Navbar.jsx
│   │       └── TopBanner.jsx
│   ├── pages/
│   │   └── Home.jsx         # Página principal
│   ├── service/
│   │   └── api.js           # Cliente API (fetch)
│   ├── style/
│   │   └── index.css        # Estilos globales + Tailwind
│   ├── assets/
│   │   └── hero.png
│   ├── App.jsx              # Componente raíz + rutas
│   └── main.jsx             # Punto de entrada
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── files.py        # Endpoints de archivos
│   │   ├── services/
│   │   │   └── cleaning_service.py  # Lógica de limpieza con Pandas
│   │   └── __init__.py
│   ├── main.py                  # Aplicación FastAPI + CORS
│   └── requirements.txt
├── index.html
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
├── postcss.config.js
└── package.json
```

### Patrón de Diseño

El frontend sigue **Atomic Design**:

- **Átomos**: Componentes indivisibles (Badge, Button, Logo)
- **Moléculas**: Grupos funcionales de átomos (MetricCard, UseCaseSelector)
- **Organismos**: Secciones completas de la interfaz (Navbar, DropZoneCard, DownloadCard)


---

## Requisitos Previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) 18+ y npm
- [Python](https://www.python.org/) 3.10+
- [pip](https://pip.pypa.io/) (gestor de paquetes de Python)

---

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/simonlopez25/klaro-.git
cd klaro-
```

### 2. Configurar el Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 3. Configurar el Frontend

```bash
cd ..

# Instalar dependencias
npm install
```

---

## Uso

### Iniciar el Backend

Desde el directorio `backend/` con el entorno virtual activado:

```bash
uvicorn main:app --reload --port 8000
```

La API estará disponible en `http://localhost:8000`

Documentación interactiva: `http://localhost:8000/docs`

### Iniciar el Frontend

Desde el directorio raíz del proyecto:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Flujo de Uso

1. **Cargar archivo**: Arrastra un archivo `.xlsx`, `.xls` o `.csv` al área de carga
2. **Procesar**: Haz clic en "Ejecutar Limpieza en Backend"
3. **Revisar**: Observa la previsualización de los datos limpios
4. **Descargar**: Descarga el archivo limpio en formato Excel

---

## API Endpoints

### `POST /api/clean`

Sube y limpia un archivo CSV o Excel.

**Request:**
- `Content-Type`: `multipart/form-data`
- `body`: archivo (.csv, .xlsx, .xls)

**Response (200):**
```json
{
  "filename": "contactos.csv",
  "total_rows": 1420,
  "duplicates_removed": 47,
  "rules_applied": [
    "Eliminacion filas vacias",
    "Eliminacion duplicados (47 removidos)",
    "Limpieza espacios",
    "Emails: correo",
    "Nombres: nombre_completo",
    "Telefonos: telefono"
  ],
  "preview": [
    { "Nombre": "María", "Apellido": "García", "Email": "maria@gmail.com" }
  ],
  "message": "Archivo procesado con éxito"
}
```

### `POST /api/download-excel`

Sube un archivo y devuelve la versión limpia como descarga Excel.

**Request:**
- `Content-Type`: `multipart/form-data`
- `body`: archivo (.csv, .xlsx, .xls)

**Response:** Archivo `.xlsx` como streaming download.

### `GET /`

Health check endpoint.

**Response:**
```json
{
  "status": "Klaro API funcionando correctamente",

---

## Reglas de Limpieza

El servicio aplica las siguientes reglas automáticamente:

| Regla | Descripción |
|---|---|
| **Filas vacías** | Elimina filas donde todos los valores son nulos |
| **Duplicados** | Elimina registros duplicados y reporta cantidad removida |
| **Espacios** | Trim (quita espacios extra) en todas las columnas de texto |
| **Emails** | Convierte a minusculas, quita espacios y corrige dominios comunes (gmil->gmail, hotmial->hotmail, etc.) |
| **Nombres** | Separa nombre y apellido desde columnas tipo "nombre", "name", "cliente" |
| **Teléfonos** | Mantiene solo dígitos y símbolo `+` |

### Dominios de Email Corregidos

| Incorrecto | Correcto |
|---|---|
| gmil.com, gmai.com, gamil.com, gmail.co, gmail.cm, gmail.con | gmail.com |
| hotmial.com, hotmal.com, hotmail.co, hotmail.cm, hotmail.con | hotmail.com |
| outlok.com, outloo.com, outlook.co, outlook.cm | outlook.com |
| yahooo.com, yaho.com, yahoo.co | yahoo.com |

---

## Desarrollo

### Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo Vite (puerto 5173) |
| `npm run build` | Genera build de producción en `/dist` |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint para revisión de código |

### Variables de Entorno

El frontend se conecta al backend en `http://localhost:8000`. Para cambiar la URL base, modifica `src/service/api.js`:

```javascript
const API_URL = 'http://localhost:8000/api'
```

### ESLint

El proyecto usa ESLint con plugins para React Hooks y React Refresh. Configuración en `eslint.config.js`.

---

## Despliegue

### Frontend (Vite)

```bash
npm run build
```

Los archivos estáticos se generan en `dist/`. Puedes desplegarlos en:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- Cualquier hosting de archivos estáticos

### Backend (FastAPI)

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Opciones de despliegue:

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
- [AWS/GCP/Azure](https://fastapi.tiangolo.com/deployment/)

> **Nota**: Actualiza la configuración de CORS en `backend/main.py` para permitir el origen de producción del frontend.

---

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

Este proyecto es de uso privado. Todos los derechos reservados © 2026 Klaro Technologies.

---

## Autor

**Simón López**

- GitHub: [@simonlopez25](https://github.com/simonlopez25)
- Proyecto: [klaro-](https://github.com/simonlopez25/klaro-)

---

**Hecho con React + FastAPI + Pandas**

Ahorra 4 horas semanales eliminando el formateo manual de Excel


