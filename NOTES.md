# IMPORTANT NOTES

## GETTING STARTED WITH PRISMA STEPS

- install prisma as dev a dependency: `pnpm i -D prisma`.
- initialize prisma: `pnpm dlx prisma init`
- install prisma client: `pnpm i @prisma/client`.
- update `DATABASE_URL` in `.env` file with your database URL.
- run this command when you first create your models and whenever you update them: `pnpm dlx prisma migrate`.
- generate a prisma client: `pnpm dlx prisma generate`.
- push db: `pnpm dlx prisma db push`.

## CREATE MODELS

Define a model:

```prisma
  model User {
  id Int @id @default(autoincrement())
  name String
  }

```
