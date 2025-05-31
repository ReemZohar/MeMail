#  Gmail-like REST API – Assignment 3

## System Overview
This project implements a modular, RESTful backend in Node.js and Express that simulates a Gmail-like interface. It integrates with a C++ server from Assignment 2 using TCP sockets for real-time blacklist validation.

The project is built using the MVC architecture and exposes a full-featured API for managing users, authentication, emails, labels, and blacklist entries.

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
