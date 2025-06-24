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
To simplify deployment and development, the system supports Docker Compose with three services:

- cpp-server: C++ TCP server for Bloom filter operations.
- node-server: RESTful API written in Node.js/Express.
- react-app: Frontend UI built with React.

### Setup
1. Clone the repository and navigate into it:

```bash
git clone https://github.com/liany2/Advanced-Programming---Gmail-Repository
cd Advanced-Programming---Gmail-Repository
```

2. Create a .env file inside the src/node-server/ directory:
```bash
JWT_SECRET=your_jwt_secret_here
```
Replace your_jwt_secret_here with a secure random string.

You can find an example .env file in the src/node-server/ directory named .env.example.
Use it as a template to create your own .env file.


3. Build and start all services with Docker Compose:

```bash
docker compose up --build
```

### Ports
- React App: http://localhost:3000
- Node.js API: http://localhost:9090
- C++ Bloom Server: localhost:7070 (TCP socket)

Example: Advanced Mail Search
Use the following curl command to test advanced filtering
```bash
curl -X GET "http://localhost:9090/api/mails/advanced?folder=inbox&isFavorite=true&sender=1&startDate=2025-06-01&endDate=2025-06-30" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Replace YOUR_TOKEN with your valid JWT.


---

##  User Operations

### Registration and Login

#### Create A New MeMail User
#### Login To MeMail

### Managing emails

#### Send A New Mail
1. After login, find the "Compose" button on the top left of the screen, press it.
   ![image](https://github.com/user-attachments/assets/53bab2a6-f7c0-49a0-95d2-01b781d99a5c)
2. A new mail window will be opened - fill the relevant fields and write there the mail content. Then press the "Send" button.
   ![image](https://github.com/user-attachments/assets/aaf6f068-707a-4323-adcd-23d722e6db9c)


#### Edit A Mail
#### Mark/Remove mail as favorite
#### Mark/Remove mail as spam
#### Delete Mail
#### Label Mail As ...
#### Remove Mail From Label
#### Edit A Label
#### Delete A Label
