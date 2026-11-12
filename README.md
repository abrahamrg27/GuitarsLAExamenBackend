# GuitarsLA Backend — API REST

API Node.js/Express con Sequelize y PostgreSQL para el catálogo de guitarras.

## Requisitos

- Node.js 20 o superior y npm.
- Docker Desktop ejecutándose, o una instalación local de PostgreSQL.

## Instalar dependencias

```powershell
cd "C:\Users\Abraham RG\GuitarsLA-ts\GuitarsLA-Backend"
npm install
```

## Configurar PostgreSQL con Docker

Este comando crea la base de datos `guitarsla` con usuario `postgres` y contraseña `postgres`:

```powershell
docker run -d --name guitarsla-postgres `
  -e POSTGRES_DB=guitarsla `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -p 5432:5432 `
  postgres:16
```

Si el contenedor ya existe pero está detenido:

```powershell
docker start guitarsla-postgres
```

Comprueba que PostgreSQL esté listo:

```powershell
docker exec guitarsla-postgres pg_isready -U postgres -d guitarsla
```

## Configurar variables de entorno

Desde la carpeta del backend:

```powershell
Copy-Item .env.example .env
```

El archivo `.env` debe contener:

```env
PORT=3008
FRONTEND_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=5432
DB_NAME=guitarsla
DB_USER=postgres
DB_PASSWORD=postgres
```

Si utilizas PostgreSQL instalado localmente, conserva `PORT=3008` y cambia `DB_PASSWORD` por la contraseña real.

## Arrancar el backend

```powershell
npm start
```

La API estará disponible en `http://localhost:3008`.

Para desarrollo con reinicio automático:

```powershell
npm run dev
```

Al iniciar, Sequelize verifica la conexión y crea la tabla `guitars` si todavía no existe.

## Verificar la API

En otra PowerShell:

```powershell
Invoke-RestMethod http://localhost:3008/api/health
Invoke-RestMethod http://localhost:3008/api/guitars
```

La segunda petición devuelve el catálogo almacenado. Para crear una guitarra:

```powershell
$guitar = @{
  name = "Lukather"
  image = "guitarra_01"
  description = "Guitarra eléctrica profesional"
  price = 299
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri http://localhost:3008/api/guitars `
  -Method Post `
  -ContentType "application/json" `
  -Body $guitar
```

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Comprueba que la API está activa |
| GET | `/api/guitars` | Devuelve todas las guitarras |
| POST | `/api/guitars` | Registra una guitarra validada |

## Detener PostgreSQL

```powershell
docker stop guitarsla-postgres
```

No compartas ni subas el archivo `.env`; contiene credenciales locales.
