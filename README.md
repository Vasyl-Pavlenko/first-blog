# MERN Blog Backend

Welcome to the MERN (MongoDB, Express, React, Node.js) Blog Backend repository! This repository contains the backend code for the MERN blog application. The backend is responsible for handling user authentication, managing blog posts, comments, and image uploads.

## Prerequisites

Before you begin, make sure you meet the following requirements:

- Node.js (v14 or higher) is installed on your machine.
- Access to a MongoDB instance or connection URL.

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/vasyl-pavlenko/mern-blog-backend.git
cd mern-blog-backend
npm install
MONGO_URL=your-mongodb-connection-url
npm start
```

2. The server will start on the specified port (default: 4444) and will be ready to handle API requests.

## Features
#### User authentication (registration, login)
#### CRUD operations for blog posts
#### Adding and retrieving comments for blog posts
#### File uploads for post images

## API Endpoints
#### POST /auth/register: Register a new user
#### POST /auth/login: Log in with existing user credentials
#### GET /auth/me: Retrieve user information (requires authentication)
#### POST /upload: Upload an image file (requires authentication)
#### GET /posts: Get all blog posts
#### GET /posts/:id: Get a specific blog post by ID
#### POST /posts: Create a new blog post (requires authentication)
#### PATCH /posts/:id: Update a blog post (requires authentication)
#### DELETE /posts/:id: Delete a blog post (requires authentication)
#### GET /comments: Get all comments
#### POST /comments: Add a new comment to a blog post (requires authentication)

## Contributing
Contributions are welcome! If you find any issues or want to enhance the project, feel free to create a pull request. Please ensure your code follows best practices and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
