![edge cases 5](https://github.com/user-attachments/assets/c4857ee9-18a3-40e3-adf7-a41e756f821c)#  Gmail-like REST API – Assignment 3

## System Overview
This project implements a modular, RESTful backend in Node.js and Express that simulates a Gmail-like interface. It integrates with a C++ server from Assignment 2 using TCP sockets for real-time blacklist validation.

The project is built using the MVC architecture and exposes a full-featured API for managing users, authentication, emails, labels, and blacklist entries.

> **Notes:** 1. The C++ server must be compiled and executed independently, using the specifications from Assignment 2. The Node.js server opens a TCP socket connection to it and expects it to support commands like POST <url>, GET <url>, and DELETE <url>. Both components are running and configured to the same port.
> 2. The TCP sercer from Exercise 2 was "locked" in a branch named "Sprint2" that can be excecuted independently.

---

## Sprint Features
- Modular route handling via Express
- In-memory data storage (no database) via the model
- Full CRUD API for labels, mails, and users
- URL-based blacklist filtering through TCP communication with C++ server
- Error handling and proper HTTP status codes

---

## API Endpoints

### Users
- `POST /api/users` – Register new user
- `GET /api/users/:id` – Retrieve user data by ID

### Tokens
- `POST /api/tokens` – Authenticate user, returns `{ id: <userId> }`

### Mails
- `GET /api/mails` – Get 50 latest mails
- `POST /api/mails` – Send mail (validates links via blacklist)
- `GET /api/mails/:id` – Get specific mail
- `PATCH /api/mails/:id` – Update mail
- `DELETE /api/mails/:id` – Delete mail
- `GET /api/mails/search/:query` – Search by title/content/sender/receiver

### Labels
- `GET /api/labels` – List all labels
- `POST /api/labels` – Create label
- `GET /api/labels/:id` – Get label
- `PATCH /api/labels/:id` – Update label
- `DELETE /api/labels/:id` – Delete label

### Blacklist (via C++ Socket Server)
- `POST /api/blacklist` – Add URL to blacklist
- `DELETE /api/blacklist` – Remove URL from blacklist (via request body)

---

## Project Structure
# TODO: add it when finish the project

## Integration with Assignment 2 (C++ Server)
- TCP socket client (Node) communicates with a multithreaded C++ server
- C++ server supports:
  - `POST <url>` – Add URL
  - `GET <url>` – Check if blacklisted
  - `DELETE <url>` – Remove from blacklist
- All blacklist functionality in the Node server delegates to this system

The Node service assumes the C++ server is listening on localhost:<PORT> and that the port matches the one configured in blacklistService.js. You must launch the C++ server before running the Node backend.
---

## Running Instructions
# TODO: add it when finish the project

```bash

npm install
npm start
```

### Requirements:
- C++ blacklist server must be running (`localhost:<PORT>`) before Node server starts.
- Port should match the one expected in `blacklist.js` in the models folder

---

## Notes
- JSON is the standard format for all API requests/responses
- There is no DB; in-memory logic only
- SOLID principles and modular code structure maintained
- Errors returned in `{ error: "..." }` format

---

## Developer Info
- Project: Advanced Programming – Assignment 3
- GitHub: https://github.com/liany2/Advanced-Programming---Gmail-Repository


---

### Build & Run Instructions (using WSL Linux)

**Build and run C++ Server with Docker:**

```bash
docker network create network
cd src
docker build -t program .
docker run -it --name cppserver --network network -p 7070:7070 -v "$(realpath ../data):/data" program ./runProg 7070 <bloom filter size> <hash> <hash> ...
```

**Build and run Node.js Server with Docker:**

```bash
cd src/node-server
docker build -t node-server .
docker run -it --name nodejs --network network -p 9090:9090 node-server
```

#### For Example:
*C++ server*
```bash
docker network create network
cd src
docker build -t program .
docker run -it --name cppserver --network network -p 7070:7070 -v "$(realpath ../data):/data" program ./runProg 7070 8 1 2
```

*Node.js server*
```bash
cd src/node-server
docker build -t node-server .
docker run -it --name nodejs --network network -p 9090:9090 node-server
```

*Example explanation:*  
 In this example, the Node.js server listens for connections on port **9090**, The C++ server listens to port **7070** the Bloom filter will be initialized with a size of **8**, and the standard hash functions used are: **1** and **2**.



> **Note:** Please make sure to start the **server** before the **client**, so that the server is ready and listening for incoming requests. And then open a new terminal to put commands in curl format.

---
## Example curl
```bash
curl -X POST http://localhost:3000/api/blacklist \
  -H "Content-Type: application/json" \
  -d '{"url": "http://malicious.com"}'
```

```bash
curl -X DELETE http://localhost:3000/api/blacklist \
  -H "Content-Type: application/json" \
  -d '{"url": "http://malicious.com"}'
```
## Documentation (via Kali-Linux):
### 1.  Running Examples:
  * *Example 1:*
  ![valid ex 1](https://github.com/user-attachments/assets/c644001d-47ad-4245-9976-5c03b9c4d6c0)
  ![valid ex 2](https://github.com/user-attachments/assets/cd4e6af5-28d3-4a5e-aa79-91a98ca5ece8)
  ![valid ex 3](https://github.com/user-attachments/assets/f794f897-329a-49b5-9b50-50974d235a07)


  * *Example 2 - Mails Operations:*
  ![mails check 1](https://github.com/user-attachments/assets/212cbb90-4347-4299-b404-11f95d603592)
  ![mails check 2](https://github.com/user-attachments/assets/279755ae-f879-4c3e-9d25-09da19a65190)
  ![mails check 3- patch](https://github.com/user-attachments/assets/be78dfb2-65ac-4230-825e-940789bbf8e6)
  ![mails check 4 - DELETE](https://github.com/user-attachments/assets/5370577f-b9e0-44c9-8685-6a6de48de152)
  ![mails check 5 - search](https://github.com/user-attachments/assets/a353755a-8213-40ae-9ce6-b7a38643206a)
  ![mails check 6 - search](https://github.com/user-attachments/assets/e37a0d80-a038-426a-8190-0ceb9ba040cf)


  * *Example 3 - Labels Operations:*
  ![labels 1](https://github.com/user-attachments/assets/aa8a3f52-2307-4e4d-81f2-1a4c53a4c7f6)
  ![labels 2-PATCH](https://github.com/user-attachments/assets/1311d63b-13b0-4929-ae9c-ec4968e11252)
  ![labels 3-DELETE](https://github.com/user-attachments/assets/edf56b58-2288-415e-a4bb-a556f5290bd7)


  * *Example 4 - Blacklist Operations:*
  * Adding url to blacklist and send mail:
  ![adding url to blacklist and send mail](https://github.com/user-attachments/assets/e10965e6-1a00-4e39-b25e-f3a808b0e803)
  * Delete URL from blacklist and send a new mail:
  ![image](https://github.com/user-attachments/assets/daba14e2-6ed0-4722-a581-d021053d9366)
  ![blacklist cont](https://github.com/user-attachments/assets/b00307af-7a07-42fb-826d-48db2d7bf32b)


 * *Example 5 – Edge Cases:*
   ![edge cases 1](https://github.com/user-attachments/assets/ee6bc648-5dc5-4ad1-afe0-3f34fd494ba9)
   ![edge cases 2](https://github.com/user-attachments/assets/37f1ec4d-c728-4d9b-8fb7-320bd90d7525)
   ![edge cases 3](https://github.com/user-attachments/assets/e6b7f11b-2e48-4e49-9694-bf0fcb913ecf)
   ![edge cases 4](https://github.com/user-attachments/assets/92cb2969-6fae-4b87-a581-35fd3b4b1a26)
   ![edge cases 5](https://github.com/user-attachments/assets/f6e41d79-6442-4db1-8bba-31119ac8d97d)


### 2. Tests Pass:
![tests run](https://github.com/user-attachments/assets/334c1e02-06d7-4e3c-8d3e-99d1730e4c52)

### 3. Building & Running C++ server:
  ![building+running Ex2 c++ server](https://github.com/user-attachments/assets/88d178c3-8945-47f7-bb34-b2800e2d2c0d)

### 4. Building & Running Node.js server:
![building+running Ex3 node js server](https://github.com/user-attachments/assets/33bb4f69-e3f6-4658-a037-fa603aaa1636)

---
