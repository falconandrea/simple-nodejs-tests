# Boilerplate CRUD with Express and Mongoose

- Mongoose/MongoDB
- Express
- Nodemon
- Prettier and Eslint
- Jest for testing.

## For start in local

```
cp .env.example .env
# Change MongoDB connection in .env file

npm install
npm run start

# Prettier and Eslint
npm run eslint
npm run prettier

# Run test with Jest
npm run test
```

Open `localhost:3000` for see the application.

## Example CRUD created

```
Created a basic Model, Controller, Routes and Tests for the User Entity with name, surname and status (Boolean).

GET /api/users?name=&surname=&status= [List with simple filters]
GET /api/users/:id [Get]
POST /api/users [Create]
PUT /api/users/:id [Update]
DELETE /api/users/:id [Delete]

```
