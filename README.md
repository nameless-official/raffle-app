<h1 align="center" id="title">Raflle App</h1>

<p id="description">Aplicación para el CodeQuest de DevTalles.</p>

<h2>🚀 Demo</h2>

[raffle-api.up.railway.app](raffle-api.up.railway.app)

<h2>Screenshots:</h2>

<img src="https://firebasestorage.googleapis.com/v0/b/nameless-afa75.appspot.com/o/screenshot%2F1710748122157-Screenshot%202024-03-18%20014634.png?alt=media&amp;token=11a2be52-bd19-43f4-9709-b4050d98c024" alt="project-screenshot" width="480" height="270/">
  
  
<h2>🧐 Cataracterísticas</h2>

Acá algunas de las características más importantes del proyecto:

- Selección de ganadores
- Seleccion de ganadores por algoritmo Fisher-Yates
- Seleccion de ganadores por algoritmo ParallelShuffle
- Clasificación de premios en diferentes niveles
- Creación de premios
- Creación de toneos
- Acceso a torneos por URL personalizada

<h2>🛠️ Pasos de instalación:</h2>

<p>1. Clonar el repositorio</p>

```bash
git clone https://github.com/nameless-official/raffle-app.git
```

<p>2. Instalar las dependencias</p>

```bash
cd raffle-app
npm install
```

<p>3. Ejecutar la Aplicación</p>

```bash
ng serve
```

<p>4. Conexión al API</p>

- Modificar el archivo `environment.ts` con la URL del API

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
};
```

<h2>💻 Built with</h2>

Technologies used in the project:

- Angular
- PrimeNG
