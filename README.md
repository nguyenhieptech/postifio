# Postifio

![image](https://github.com/nguyenhieptech/post-management-app/assets/48057064/63fe6372-0c0f-44c9-a455-ac718014fe58)

![image](https://github.com/nguyenhieptech/post-management-app/assets/48057064/8ec27161-a86d-414a-8042-e0740c4535f3)

![image](https://github.com/nguyenhieptech/post-management-app/assets/48057064/b79b2dd5-2fd2-4dac-ae4c-4ad367089a24)

![image](https://github.com/nguyenhieptech/post-management-app/assets/48057064/8c3dfd17-5a93-4d73-a903-ee182f2e92b2)

![image](https://github.com/nguyenhieptech/post-management-app/assets/48057064/5388fe68-d456-4b96-b610-0a3af294e387)

## Backend

- Tech stack: NestJS (Fastify), Prisma ORM

- Set up

```bash
# Open a terminal inside backend folder
cd api

# Install dependencies
pnpm i
```

- After that, set up a local Postgresql database. This step varies on different systems. Find online tutorials to set up. Then, create a `.env` file and change update your database URL.

```env
DATABASE_URL="postgresql://your-user:your-password@localhost:5432/your-db-name?schema=public"
JWT_SECRET="Change to your JWT secret"
```

- Let's move on to Prisma

```bash
# Generate prisma
npx prisma generate
# or pnpm prisma:generate

# Migrate prisma schema to db
npx prisma migrate dev
# or pnpm prisma:migrate

# Seed database if needed
npx prisma db seed
# or pnpm prisma:seed

# After that, open prisma studio
npx prisma studio
# or pnpm prisma:studio
```

- Run project locally

```bash
# Start backend web server
pnpm start:dev
```

- After seeding database successfully, there are 2 initial users, each user has 7 posts. One can login with these accounts, or create a new one.

  - User 1

    - email: user1@gmail.com
    - password: password

  - User 2

    - email: user2@gmail.com
    - password: password

## Set up Frontend

- Techstack: React (Vite), ShadcnUI, Tailwind CSS, Redux Toolkit

- Set up: open a new terminal

```bash
# Open a terminal inside frontend folder
cd web

# Install dependencies
pnpm i
```

- After that, run project locally

```bash
pnpm start:dev
```

- Once again, one can login with these users:

  - User 1:

    - email: user1@gmail.com
    - password: password

  - User 2:

    - email: user2@gmail.com
    - password: password
