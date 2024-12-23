
# Todo Full Stack Application

A full-stack application for managing tasks, built with **Next.js** for the frontend and **Node.js, Express, TypeScript, and Prisma** for the backend. It uses MongoDB as the database and features JWT authentication. The project is containerized with Docker for seamless deployment.

---

## Technology Stack

### **Frontend**
- **Next.js** (React framework)
- **TypeScript**
- **Tailwind CSS**

### **Backend**
- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **MongoDB**
- **JWT Authentication**

### **Other Tools**
- **Docker** (for containerization)
- **Nginx** (optional for reverse proxy)

---

## Installation (Local Development)

### **Backend (Server)**

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd todo-home-task/server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   ```env
   DATABASE_URL="your-mongodb-connection-string"
   JWT_SECRET="your-secret-key"
   ```

4. **Generate the Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

---

### **Frontend (Client)**

1. **Navigate to the client directory:**

   ```bash
   cd todo-home-task/client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env.local` file:**

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The client will be accessible at `http://localhost:3000`.

---

## Docker Deployment

### **Dockerfile (Server)**

Below is the `Dockerfile` used for containerizing the backend application:

```dockerfile
FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json ./
COPY ./prisma ./

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

### **Steps to Deploy with Docker**

1. **Build the Docker image for the server:**

   ```bash
   docker build -t todo-server .
   ```

2. **Run the server container:**

   ```bash
   docker run -p 3001:3001 \
     -e DATABASE_URL="your-mongodb-connection-string" \
     -e JWT_SECRET="your-secret-key" \
     todo-server
   ```

Your server will be accessible at `http://localhost:3001`.

---

## API Documentation

### **Authentication Endpoints**

#### **POST /api/auth/signup**

Create a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### **POST /api/auth/login**

Login with existing credentials.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### **POST /api/auth/logout**

Logout the current user.

---

## **Todo Endpoints**

All todo endpoints require authentication via a JWT token.

#### **GET /api/todos**

Retrieve all todos for the authenticated user.

#### **POST /api/todos**

Create a new todo.

**Request Body:**

```json
{
  "title": "Todo title",
  "description": "Todo description"
}
```

#### **PUT /api/todos/:id**

Update a todo by ID.

**Request Body:**

```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

#### **DELETE /api/todos/:id**

Delete a todo by ID.

#### **PATCH /api/todos/:id/toggle**

Toggle the completion status of a todo.

---

## AWS EC2 Deployment Guide (with Docker)

1. **Launch an EC2 Instance:**

   - Select **Ubuntu Server 22.04 LTS**.
   - Choose **t2.micro** (free tier eligible).
   - Configure the security group to allow inbound traffic on ports **22 (SSH)**, **80 (HTTP)**, and **3001 (API)**.

2. **Connect to your EC2 instance:**

   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

3. **Install Docker:**

   ```bash
   sudo apt update
   sudo apt install -y docker.io
   ```

4. **Push the Docker image to Docker Hub:**

   ```bash
   docker login
   docker tag todo-server your-dockerhub-username/todo-server
   docker push your-dockerhub-username/todo-server
   ```

5. **Pull and run the image on your EC2 instance:**

   ```bash
   docker pull your-dockerhub-username/todo-server
   docker run -d -p 3001:3001 \
     -e DATABASE_URL="your-mongodb-connection-string" \
     -e JWT_SECRET="your-secret-key" \
     your-dockerhub-username/todo-server
   ```

6. **(Optional) Setup Nginx as a reverse proxy:**

   ```bash
   sudo apt install -y nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add the following configuration:

   ```nginx
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
   ```

   Test and restart Nginx:

   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

Your application is now accessible at `http://your-ec2-public-ip` or `http://your-domain.com`.

