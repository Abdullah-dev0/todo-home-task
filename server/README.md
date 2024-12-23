# Todo Next Server

A RESTful API server for todo application built with Node.js, Express, TypeScript, and Prisma with MongoDB.

## Technology Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MongoDB
- JWT Authentication
- Docker

## Prerequisites

- Node.js 20.x
- MongoDB database
- Docker (optional)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-next/server
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
DATABASE_URL="your-mongodb-connection-string"
JWT_SECRET="your-secret-key"
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Start development server:

```bash
npm run dev
```

## Docker Deployment

1. Build the Docker image:

```bash
docker build -t todo-next-server .
```

2. Run the container:

```bash
docker run -p 3001:3001 -e DATABASE_URL="your-mongodb-url" -e JWT_SECRET="your-secret" todo-next-server
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/signup

Create a new user account.

Request body:

```json
{
	"email": "user@example.com",
	"password": "password123",
	"name": "John Doe"
}
```

#### POST /api/auth/login

Login with existing credentials.

Request body:

```json
{
	"email": "user@example.com",
	"password": "password123"
}
```

#### POST /api/auth/logout

Logout current user.

### Todo Endpoints

All todo endpoints require authentication via JWT cookie.

#### GET /api/gettodos

Get all todos for authenticated user.

#### POST /api/addtodo

Create a new todo.

Request body:

```json
{
	"title": "Todo title",
	"description": "Todo description"
}
```

#### PUT /api/todos/:id

Update a todo by ID.

Request body:

```json
{
	"title": "Updated title",
	"description": "Updated description"
}
```

#### DELETE /api/todos/:id

Delete a todo by ID.

#### PATCH /api/totoggletododos/:id

Toggle todo completion status.

## AWS EC2 Deployment Guide

1. Launch EC2 Instance:

   - Choose Ubuntu Server 22.04 LTS
   - Select t2.micro (free tier)
   - Configure security group to allow inbound traffic on ports 22 (SSH) and 3001 (API)

2. Connect to EC2:

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

3. 


```

6. (Optional) Setup Nginx as reverse proxy:

```bash
# Install Nginx
sudo apt install nginx -y

# Configure Nginx
sudo vi /etc/nginx/sites-available/default

# Add configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```
