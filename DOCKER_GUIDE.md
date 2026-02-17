# 🐳 Docker Deployment Guide

This project is fully containerized using Docker, allowing you to run the portfolio in a production-ready environment with minimal setup.

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop).

---

## 🚀 Quick Start (Recommended)

The easiest way to run the project is using Docker Compose:

```bash
# Start the container in detached mode
docker-compose up -d
```

Your portfolio will now be accessible at: **[http://localhost:8080](http://localhost:8080)**

To stop the container:
```bash
docker-compose down
```

---

## 🛠 Manual Build & Run

If you prefer using the Docker CLI directly:

### 1. Build the Image
```bash
docker build -t harigaran-portfolio .
```

### 2. Run the Container
```bash
docker run -d -p 8080:80 --name my-portfolio harigaran-portfolio
```

Access the site at **[http://localhost:8080](http://localhost:8080)**.

---

## 📂 Configuration Details

- **Dockerfile**: Uses a multi-stage build. 
    1. **Stage 1 (Build)**: Installs dependencies and builds the Vite app into the `/dist` folder.
    2. **Stage 2 (Serve)**: Uses a lightweight `Nginx-alpine` image to serve the static files.
- **nginx.conf**: Configured to handle Single Page Application (SPA) routing, ensuring that refreshing the page on sub-routes (like `/admin`) doesn't result in a 404 error.
- **Port Mapping**: The internal container port is `80`, but it is mapped to `8080` on your host machine to avoid conflicts with other local services.

---

## 🧪 Testing the Production Build
Running the project in Docker is the best way to verify how it will behave on a live server (like Vercel or a VPS) because it serves the actual **minified production bundle** instead of the development server.
