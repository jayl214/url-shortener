# URL Shortener

A simple URL shortener app built with T3 stack as a learning exercise

## How to run

- Fill in GITHUB_ID, GITHUB_SECRET, NEXTAUTH_SECRET, and DATABASE_URL (postgres)
- run `prisma migrate deploy`
- run `npx run dev`

## Migrations

Makes changes to schema.prisma, then run:
`prisma migrate dev --name name_of_migration`

`prisma migrate deploy`
