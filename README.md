#  Gmail-like REST API – Fullstack Project

##  System Overview

This project implements a modular fullstack Gmail-like mail system with:
-  A **C++ TCP Server** for blacklist validation (Bloom Filter logic).
-  A **Node.js + Express REST API** to manage users, mails, labels, spam filtering, and favorites.
-  A **React Frontend** simulating a Gmail-style user interface.

The system uses the MVC architecture and allows real-time validation between the Node.js backend and the C++ server over TCP.

---

##  Features
- JWT-based user authentication.
- Mail creation, deletion, draft saving, spam marking, and favorites.
- Blacklist support with automatic updates from the C++ server.
- Custom routing in React using React Router.
- Drafts and real-time spam filtering logic.
- Advanced filters on backend (`/api/mails?isSpam=true&isFavorite=false`, etc).

---

בהחלט! הנה גרסה מוכנה להעתקה ל־README.md:

markdown
Copy
Edit
## Running with Docker Compose

To simplify deployment and development, the system supports Docker Compose with three services:

- `cpp-server`: C++ TCP server for Bloom filter operations.
- `node-server`: RESTful API written in Node.js/Express.
- `react-app`: Frontend UI built with React.

### Setup

1. Clone the repository and navigate to the root folder:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
Create a .env file inside the src/node-server directory with the following content:

ini
Copy
Edit
JWT_SECRET=your_jwt_secret_here
Replace your_jwt_secret_here with a secure random string.

Build and run the project with Docker Compose:

bash
Copy
Edit
docker compose up --build
Ports
React app: http://localhost:3000

Node.js API server: http://localhost:9090

C++ BloomFilter server: localhost:7070 (TCP socket)

Example: Advanced Mail Search
You can test the advanced search API using curl:

bash
Copy
Edit
curl -X GET "http://localhost:9090/api/mails/advanced?folder=inbox&isFavorite=true&sender=1&startDate=2025-06-01&endDate=2025-06-30" \
  -H "Authorization: Bearer YOUR_TOKEN"
Replace YOUR_TOKEN with a valid JWT token
