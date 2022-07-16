# A simple CRUD with Fastify

![List films gif](https://raw.githubusercontent.com/falconandrea/simple-nodejs-tests/main/images/crud-fastify.gif)

Simple CRUD for manage Authors and Books.

- Moongose/MongoDB
- Fastify
- Prettier and Eslint
- Swagger documentation with Fastify plugin
- Tap for testing.

## For start in local

```
cp .env.example .env
# Change MongoDB connection in .env file

npm install
npm run start

# Prettier and Eslint
npm run eslint
npm run prettier

# Run test with Tap
npm run test
```

Open `localhost:3000` for see the application.

Open `localhost:3000/documentation` for see Swagger API documentation.
