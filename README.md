# MoneyScope

Aplicação fullstack para controle financeiro pessoal, com renda e gastos em memória, dashboard, gráficos e insights automáticos.

## Stack

- Frontend: React, Vite, Tailwind, React Router, Axios, Recharts
- Backend: ASP.NET Core Web API (.NET 8)
- Persistência: listas em memória (`List<T>`)
- API: REST
- Containers: Docker separado para frontend e backend
- Deploy: compatível com Render

## Estrutura

```txt
backend/
  Controllers/
  DTOs/
  Models/
  Services/
  Program.cs
  Dockerfile
frontend/
  src/
    components/
    hooks/
    pages/
    services/
    types/
  Dockerfile
  nginx.conf
```

## Executar localmente

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

A API sobe em `http://localhost:10000`.

Swagger:

```txt
http://localhost:10000/swagger
```

Endpoints:

```txt
GET    /income
POST   /income
DELETE /income/{id}
GET    /expenses
POST   /expenses
DELETE /expenses/{id}
GET    /dashboard
GET    /insights
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Por padrão o frontend usa `http://localhost:10000` como API. Para apontar para outra URL:

```bash
VITE_API_URL=https://sua-api.onrender.com npm run dev
```

No PowerShell:

```powershell
$env:VITE_API_URL="https://sua-api.onrender.com"
npm run dev
```

## Docker

### Backend

```bash
docker build -t moneyscope-backend ./backend
docker run -p 10000:10000 -e PORT=10000 moneyscope-backend
```

### Frontend

```bash
docker build -t moneyscope-frontend ./frontend --build-arg VITE_API_URL=http://localhost:10000
docker run -p 8080:80 moneyscope-frontend
```

Abra `http://localhost:8080`.

## Deploy no Render

### Backend

1. Crie um Web Service.
2. Escolha Docker.
3. Defina `Root Directory` como `backend`.
4. Configure:

```txt
PORT=10000
ASPNETCORE_URLS=http://+:10000
```

### Frontend

1. Crie um Static Site.
2. Defina `Root Directory` como `frontend`.
3. Use:

```txt
Build Command: npm install && npm run build
Publish Directory: dist
```

4. Configure `VITE_API_URL` com a URL pública do backend no Render.
5. Configure rewrite para SPA:

```txt
Source: /*
Destination: /index.html
Action: Rewrite
```

O arquivo `render.yaml` também está pronto para blueprint, com backend Docker e frontend estático.
