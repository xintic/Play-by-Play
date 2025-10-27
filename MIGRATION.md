# Migration from Vite to Next.js

## ✅ Conversion Complete!

Your project has been successfully converted from **Vite + React** to **Next.js 15**.

## What Changed

### 📦 Dependencies
- ✅ Added **Next.js 15** and dependencies
- ✅ Removed **Vite** and related packages
- ✅ Updated ESLint to use Next.js configuration
- ✅ Kept React 19 and TypeScript

### 📁 File Structure

**Removed:**
- ❌ `src/` directory (Vite structure)
- ❌ `index.html` (Next.js generates this)
- ❌ `vite.config.ts`
- ❌ Vite-specific TypeScript configs

**Added:**
- ✅ `app/` directory (Next.js App Router)
  - `layout.tsx` - Root layout
  - `page.tsx` - Home page (migrated from App.tsx)
  - `globals.css` - Global styles
  - `page.module.css` - Component styles
- ✅ `next.config.ts` - Next.js configuration
- ✅ Updated `tsconfig.json` for Next.js
- ✅ `.eslintrc.json` - Next.js ESLint config

### 🎨 Assets
All your game assets are **preserved** in the `public/` folder:
- ✅ Audio files (30 tracks + sound effects)
- ✅ Game boards
- ✅ Player cards (Frölunda & Leksand teams)
- ✅ Tactics cards

## How to Run

```bash
# Development server
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

Visit **http://localhost:3000** to see your app!

## Next Steps: Adding Multiplayer Features

### 1. **Database Setup**
Choose a database for storing game state and user data:
- **Vercel Postgres** (easiest for Next.js)
- **Supabase** (includes auth)
- **MongoDB Atlas** (flexible)
- **PrismaORM** (any SQL database)

### 2. **Authentication**
Add user accounts with **NextAuth.js**:

```bash
npm install next-auth
```

Create `/app/api/auth/[...nextauth]/route.ts` for auth endpoints.

### 3. **API Routes**
Create backend endpoints in `/app/api/`:
- `/app/api/games/route.ts` - Create/join games
- `/app/api/leaderboard/route.ts` - Get top players
- `/app/api/players/route.ts` - Manage player data

### 4. **Real-time Multiplayer**
Options for live game updates:
- **Pusher** (easiest, managed service)
- **Socket.io** (more control)
- **Supabase Realtime** (if using Supabase)
- **Vercel AI SDK** (for AI-powered features)

### 5. **State Management**
For complex game state:

```bash
npm install zustand
# or
npm install @reduxjs/toolkit react-redux
```

## Example: Creating Your First API Route

Create `/app/api/hello/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from your hockey game API!' });
}
```

Test it at: http://localhost:3000/api/hello

## Folder Structure Example

```
/app
  /api
    /auth
      [...nextauth]/route.ts
    /games
      route.ts
      /[gameId]
        route.ts
  /game
    page.tsx              # Game board view
  /leaderboard
    page.tsx              # Leaderboard view
  layout.tsx              # Root layout
  page.tsx                # Home/lobby
/lib
  db.ts                   # Database connection
  auth.ts                 # Auth helpers
/components
  PlayerCard.tsx          # Reusable components
  TacticCard.tsx
/types
  game.ts                 # TypeScript types
```

## Deployment

Your Next.js app is ready to deploy to:

### **Vercel** (Recommended - made by Next.js creators)
```bash
npm install -g vercel
vercel
```

### **Railway**
- Supports Node.js apps
- Auto-deploy from Git

### **DigitalOcean App Platform**
- Full control over your stack

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

---

**Happy Coding! 🏒**

Your hockey strategy game is now ready for online multiplayer, user authentication, and leaderboards!

