# AI Forge — AI Video & Image Generation Platform

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), TypeScript, Tailwind CSS |
| **Backend** | Express, TypeScript, Node.js |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | JWT (jsonwebtoken) |
| **File Upload** | Multer |
| **Dev** | tsx, concurrently |

## Setup Instructions

```bash
# 1. Clone / open project
# 2. Install dependencies
npm install

# 3. Configure environment
# server/.env already exists; update DATABASE_URL if needed

# 4. Generate Prisma client (required after schema changes)
cd server
npx prisma generate --schema ../prisma/schema.prisma

# 5. Run migrations (optional, requires PostgreSQL running)
npx prisma migrate dev --schema ../prisma/schema.prisma

# 6. Start dev servers (client + server concurrently)
cd ..
npm run dev
```

- Client: http://localhost:3000
- Server: http://localhost:5000
- Health Check: `GET /health`

## Architecture Flow

```
┌─────────────┐     HTTP/REST     ┌──────────────┐     SQL     ┌──────────┐
│   Client    │ ─────────────────>│    Server    │───────────>│  PostgreSQL│
│  (React)    │     JWT Bearer     │  (Express)   │  Prisma    │  (Prisma)  │
└─────────────┘ <─────────────────└──────────────┘     <──────┘
      │                            │
      ▼                            ▼
  localStorage                  multer uploads
  (token/user)                   /uploads/
```

**Request Flow:**
1. Client sends request with `Authorization: Bearer <jwt>`
2. `auth` middleware verifies token via `JWT_SECRET`
3. Server handles generation / history / auth routes
4. Prisma ORM queries PostgreSQL
5. Response returned to client; results cached/displayed

## Key Features

- **Video Generation** (text-to-video / image-to-video)
- **Image Generation** (prompt + model + style selection)
- **History** with live processing polling
- **File Upload** for image-to-video source
- **Authenticated Routes** via JWT
