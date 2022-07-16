# A simple CRUD with Fastify

![List films gif](https://raw.githubusercontent.com/falconandrea/simple-nodejs-tests/main/images/crud-fastify.gif)

- Moongose/MongoDB
- Fastify
- Prettier and Eslint
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

## API

```
# List authors
GET api/author

# Create new author
POST api/author with payload { name: 'Name', surname: 'Surname' }

# Get detail author
GET api/author/:id

# Delete an author
DELETE api/author/:id
```
