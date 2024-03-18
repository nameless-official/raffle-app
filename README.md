<h1 align="center" id="title">Raflle App</h1>

<p id="description">Aplicación para el CodeQuest de DevTalles.</p>

<h2>🚀 Demo</h2>

[raffle-app.azurewebsites.net](https://raffle-app.azurewebsites.net/)

<h2>Screenshots:</h2>

<img src="https://firebasestorage.googleapis.com/v0/b/nameless-afa75.appspot.com/o/screenshots%2F1710753963087-Screenshot%202024-03-18%20032441.png?alt=media&token=5bcb5de1-bd18-4da1-8a9c-7e366ffce65f" alt="project-screenshot" width="480" height="270/">

<img src="https://firebasestorage.googleapis.com/v0/b/nameless-afa75.appspot.com/o/screenshots%2F1710753963087-Screenshot%202024-03-18%20032441.png?alt=media&token=5bcb5de1-bd18-4da1-8a9c-7e366ffce65f" alt="project-screenshot" width="480" height="270/">

<img src="https://firebasestorage.googleapis.com/v0/b/nameless-afa75.appspot.com/o/screenshots%2F1710753963087-Screenshot%202024-03-18%20032441.png?alt=media&token=5bcb5de1-bd18-4da1-8a9c-7e366ffce65f" alt="project-screenshot" width="480" height="270/">

<img src="https://firebasestorage.googleapis.com/v0/b/nameless-afa75.appspot.com/o/screenshots%2F1710753963087-Screenshot%202024-03-18%20032441.png?alt=media&token=5bcb5de1-bd18-4da1-8a9c-7e366ffce65f" alt="project-screenshot" width="480" height="270/">

<img src="https://firebasestorage.googleapis.com/v0/b/nameless-afa75.appspot.com/o/screenshots%2F1710753963087-Screenshot%202024-03-18%20032441.png?alt=media&token=5bcb5de1-bd18-4da1-8a9c-7e366ffce65f" alt="project-screenshot" width="480" height="270/">
  
  
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

<p> 5. Acceder a la administración</p>

- Hay que acceder através de la URL: `https://raffle-app.azurewebsites.net/auth/login`
  Usuario: admin
  Contraseña: Adm1ni$tR470r

- Se puede dar mantenimento a los sorteos `https://raffle-app.azurewebsites.net/admin/raffles`
- Se puede dar mantenimento a los estados de sorteos `https://raffle-app.azurewebsites.net/admin/data-managment/raffle-status`
- Se puede dar mantenimento a los premios `https://raffle-app.azurewebsites.net/admin/data-managment/prizes`
- Se puede dar mantenimento a los niveles de premios `https://raffle-app.azurewebsites.net/data-managment/admin/prize-levels`
- Se puede ver a los participantes de un sorteo `https://raffle-app.azurewebsites.net/admin/data-managment/raffle-data/nombre-del-sorteo`
- Se puede escoger a los ganadores de un sorteo, de forma aleatoria usando 2 tipos de algoritmos o de forma manual `https://raffle-app.azurewebsites.net/admin/data-managment/raffle-data/nombre-del-sorteo`

<p> 6. Vistas públicas</p>

- Ver los sorteos actuales: `https://raffle-app.azurewebsites.net/raffles`
- Ver un sorteo en específico: `https://raffle-app.azurewebsites.net/raffles/nombre-del-sorteo`
- Ver a los ganadores del sorteo: `https://raffle-app.azurewebsites.net/raffles/nombre-del-sorteo` (cuando el sorteo esté en estado de FINISHED)

<h2>💻 Built with</h2>

Technologies used in the project:

- Angular
- PrimeNG
