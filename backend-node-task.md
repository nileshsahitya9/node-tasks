## Backend API Development with Node.js and TypeScript

### Introduction
The project is a simple social media application that allows users to create posts and follow each other.

### Installation & Setup

Follow the steps below to install and set up the project:

1. Install the project dependencies by running the following command in your terminal:
```bash
$ yarn
```
2. Start the Docker services defined in the Docker Compose file by running:

```bash
$ docker compose -f docker/compose.yml up -d
```

3. Navigate to the backend workspace and generate the Prisma client
```bash
$ cd workspaces/backend
$ yarn prisma generate
```

4. Run the migrations and start the development server
```bash
$ yarn prisma migrate dev --name init
$ yarn dev
```

### API Documentation

You can access the API documentation by visiting the following URL:  [API Documentation](http://localhost:1337/docs)

### Development Tasks

Here are the tasks that need to be completed:

- [ ] Conduct a walkthrough of the codebase to understand its structure and functionality.
- [ ] Review the codebase and make notes of areas that can be improved.
- [ ] Optimize the /api/v1/posts/feed endpoint for better performance.
- [ ] Implement the /api/v1/users/:id/follow endpoint to allow users to follow each other.
