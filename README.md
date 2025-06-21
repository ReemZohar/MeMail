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

## Running with Docker Compose
To simplify development and deployment, the system is structured using Docker Compose, with three main services:

cpp-server: Compiles and runs the C++ BloomFilter server on port 7070.

node-server: RESTful API written in Node.js/Express, exposed on port 9090.

react-app: Frontend UI written in React, available at http://localhost:3000.

### Prerequisites
Make sure you have the following installed on your system:

Docker

Docker Compose

⚙ Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/liany2/Advanced-Programming---Gmail-Repository

Create a .env file for the Node.js server:

bash
Copy
Edit
cp src/node-server/.env.example src/node-server/.env
Then edit src/node-server/.env and fill in the required secret, for example:

env
Copy
Edit
JWT_SECRET=your_jwt_secret_here
Start all services:

bash
Copy
Edit
docker compose up --build
Access the system:

Frontend: http://localhost:3000

Node API: http://localhost:9090

C++ Server: http://localhost:7070

### Environment Example File
A sample environment file is available at:

bash
Copy
Edit
src/node-server/.env.example
Make sure to never commit real secrets in .env files — only .env.example should be version-controlled.

