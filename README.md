#  Gmail-like REST API – Assignment 3

## System Overview
This project implements a modular, `RESTful` backend in `Node.js` and `Express` that simulates a Gmail-like interface. It integrates with a C++ server from Assignment 2 using TCP sockets for real-time blacklist validation.

The project is built using the MVC architecture and exposes a full-featured API for managing users, authentication, emails, labels, and blacklist entries.

The project was built to be as similar as possible to real email apps and how they usually work.


> **Notes:**
> 1. The C++ server must be compiled and executed independently, using the specifications from Assignment 2. The Node.js server opens a TCP socket connection to it and expects it to support commands like `POST <url>`, `GET <url>`, and `DELETE <url>`. Both components are running and configured to the same port.
>
> 2. The TCP server from Exercise 2 was "locked" in a branch named "Sprint2" that can be excecuted independently.

---

## Sprint Features
- Modular route handling via Express
- In-memory data storage (no database) via the model
- Full CRUD API for labels, mails, and users
- URL-based blacklist filtering through TCP communication with C++ server
- Error handling and proper HTTP status codes
- JSON is the standard format for all API requests/responses
- SOLID principles and modular code structure maintained
---
### TCP Server (C++)
1. Explanation:
  * Receives and handles commands via TCP socket from the client.
  * Delegates logic to `ActionFactory` using `IAction` classes (`AddURLToBL`, `CheckURLInBL`, `DeleteURLFromBL`).
  * Maintains the blacklist in-memory and on disk.

2. Files:
  * `Server.cpp/h`: Socket handling, request loop
  * `BloomFilter.cpp/h`: Core blacklist logic
  * `ActionFactory.cpp/h`: Dispatches actions
> **Note:** This project uses IPv4.

### HTML Server (Node.js)
1. Explanation:
* A multi-threaded web server built with Node.js using the MVC architecture.
* Exposes a RESTful API for managing users, tokens, emails, labels, and blacklist URLs.
* Communicates with the C++ TCP server over a persistent socket to validate URLs in emails.
* Supports user registration, login, email operations, labeling, searching, and blacklist management.

2. Files:
* `App.js`: Entry point that starts the Node.js server and establishes TCP connection to the C++ server.
* `routes/`: Defines route handlers for /api/users, /api/mails, /api/labels, /api/blacklist, and /api/tokens.
* `controllers/`: Implements business logic for each route
* `models/`: In-memory data structures and helper functions to manage users, mails, and labels.
* `models/blacklist.js`: Manages communication with the TCP server to check/add/delete blacklist URLs.

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

## Integration with Assignment 2 (C++ Server)
- TCP socket client (Node) communicates with a multithreaded C++ server
- C++ server supports:
  - `POST <url>` – Add URL
  - `GET <url>` – Check if blacklisted
  - `DELETE <url>` – Remove from blacklist
- All blacklist functionality in the Node server delegates to this system
- The Node service assumes the C++ server is listening on localhost:<PORT> and that the port matches the one configured in blacklistService.js. You must launch the C++ server before running the Node backend.
---

## Running Instructions
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



> **Note:**
> 1. Please make sure to start the **server** before the **client**, so that the server is ready and listening for incoming requests. And then open a new terminal to put commands in curl format.
> 2. Please pay attention to run the C++ server on port 7070 because the node.js sends the requests to this port.

**Build and run tests from exercise 1+2:**
```bash
cd src
docker build -t url-bl-checker .
docker run -it --rm url-bl-checker ./runTests
```

---

## Developer Info
- Project: Advanced Programming – Assignment 3
- GitHub: https://github.com/liany2/Advanced-Programming---Gmail-Repository

---
## Example curl
The node.js server will get the request via curl format:

```bash
curl -X <command> <URL> \
  -H "Content-Type: application/json" \
  -d '{"key1": "value1", "key2": "value2" ...}'
```
For example:
```bash
curl -X DELETE http://localhost:3000/api/blacklist \
  -H "Content-Type: application/json" \
  -d '{"url": "http://malicious.com"}'
```
> **Note:** Full examples of using curl can be found under the section: "Running Examples (text)".

---

## Documentation (via Kali-Linux):
### 1.  Running Examples (pictures):
  * *Example 1:*
    ![valid ex 1](https://github.com/user-attachments/assets/c644001d-47ad-4245-9976-5c03b9c4d6c0)


    ![valid ex 2](https://github.com/user-attachments/assets/cd4e6af5-28d3-4a5e-aa79-91a98ca5ece8)


    ![valid ex 3](https://github.com/user-attachments/assets/f794f897-329a-49b5-9b50-50974d235a07)



  * *Example 2 - Mails Operations:*
    ![mails check 1](https://github.com/user-attachments/assets/212cbb90-4347-4299-b404-11f95d603592)
    Sending a mail with all required fields. Status 201 Created confirms success.


    ![mails check 2](https://github.com/user-attachments/assets/279755ae-f879-4c3e-9d25-09da19a65190)
    Fetching a specific mail by ID. Status 200 OK confirms the mail exists and was retrieved.


    ![mails check 3- patch](https://github.com/user-attachments/assets/be78dfb2-65ac-4230-825e-940789bbf8e6)
    Updating an existing mail (title/content). Status 204 No Content confirms the update succeeded.
     > Just like in a real email system, the update is applied only for the user who performed it.


    ![mails check 4 - DELETE](https://github.com/user-attachments/assets/5370577f-b9e0-44c9-8685-6a6de48de152)
    Deleting a mail by ID. Status 204 No Content indicates successful deletion.
      > Just like in a real email system, the deletion is applied only for the user who performed it.


    ![mails check 5 - search](https://github.com/user-attachments/assets/a353755a-8213-40ae-9ce6-b7a38643206a)


    ![mails check 6 - search](https://github.com/user-attachments/assets/e37a0d80-a038-426a-8190-0ceb9ba040cf)
    Search query. Status 200 OK with relevant results.


  * *Example 3 - Labels Operations:*
    ![labels 1](https://github.com/user-attachments/assets/aa8a3f52-2307-4e4d-81f2-1a4c53a4c7f6)
    Creating a label for a user. Status 201 Created with a Location header for the new label.


    ![labels 2-PATCH](https://github.com/user-attachments/assets/1311d63b-13b0-4929-ae9c-ec4968e11252)
    Updating a label name. Status 204 No Content confirms a successful update.


    ![labels 3-DELETE](https://github.com/user-attachments/assets/edf56b58-2288-415e-a4bb-a556f5290bd7)

    Deleting a label. Status 204 No Content confirms successful deletion.


  * *Example 4 - Blacklist Operations:*
    ![adding url to blacklist and send mail](https://github.com/user-attachments/assets/e10965e6-1a00-4e39-b25e-f3a808b0e803)
    Adding a URL to the blacklist and then trying to send a mail containing it. Status 400 Bad Request due to blacklisted content.


    ![delete URL from blacklist and send a new mail](https://github.com/user-attachments/assets/aeba4f4b-7e9d-4b55-9ca3-4115e1c7a58e)
    Removing the URL from the blacklist and sending the mail again. Status 201 Created confirms success.


    ![blacklist cont](https://github.com/user-attachments/assets/b00307af-7a07-42fb-826d-48db2d7bf32b)


    Continuation: mail successfully sent after URL was removed from the blacklist.


 * *Example 5 – Edge Cases:*
   ![edge cases 1](https://github.com/user-attachments/assets/ee6bc648-5dc5-4ad1-afe0-3f34fd494ba9)
   Sending mail with missing fields (e.g., no content or title). Status 400 Bad Request.


   ![edge cases 2](https://github.com/user-attachments/assets/37f1ec4d-c728-4d9b-8fb7-320bd90d7525)
   Sending mail with non-existing sender or receiver. Status 404 Not Found.


   ![edge cases 3](https://github.com/user-attachments/assets/e6b7f11b-2e48-4e49-9694-bf0fcb913ecf)
   Sending mail with a blacklisted URL. Status 400 Bad Request.


   ![edge cases 4](https://github.com/user-attachments/assets/92cb2969-6fae-4b87-a581-35fd3b4b1a26)
   Again, sending mail with invalid user IDs. Status 404 Not Found.


   ![edge cases 5](https://github.com/user-attachments/assets/f6e41d79-6442-4db1-8bba-31119ac8d97d)
   Another test with missing required fields. Status 400 Bad Request.


### 2. Running Examples (text):
#### Create user
```bash
curl -i -X POST http://localhost:9090/api/users \
-H "Content-Type: application/json" \
-d '{"username": "noa", "password": "1234", "name": "Noa"}'
```
##### → 201 Created
```bash
curl -i -X POST http://localhost:9090/api/users \
-H "Content-Type: application/json" \
-d '{"username": "lian", "password": "1234", "name": "Lian"}'
```
##### → 201 Created


#### Send mail
```bash
curl -X POST http://localhost:9090/api/mails -H "Content-Type: application/json" \
-d '{"title": "Hi", "content": "Hello", "sender": "1", "receiver": "2"}'
```
##### → 201 Created

#### Get mail by ID
```bash
curl -X GET http://localhost:9090/api/mails/1
```
##### → 200 OK with mail JSON

#### Get all mails
```bash
curl -X GET http://localhost:9090/api/mails -H "user-id: 1"
```
##### → 200 OK with mail list


  * *Example 2 - Mails Operations:*
#### Send mail
```bash
curl -X POST http://localhost:9090/api/mails -H "Content-Type: application/json" \
-d '{"title": "Mail", "content": "Body", "sender": "1", "receiver": "2"}'
```
##### → 201 Created

#### Get mail by ID
```bash
curl -X GET http://localhost:9090/api/mails/1
```
##### → 200 OK

#### Patch mail
```bash
curl -X PATCH http://localhost:9090/api/mails/1 -H "Content-Type: application/json" \
-d '{"title": "Updated Title"}'
```
##### → 204 No Content

#### Delete mail
```bash
curl -X DELETE http://localhost:9090/api/mails/1
```
##### → 204 No Content

#### Search mails
```bash
curl -X GET http://localhost:9090/api/mails/search/hello
```
##### → 200 OK with results

```bash
curl -X GET http://localhost:9090/api/mails/search/world
```
##### → 200 OK with results


  * *Example 3 - Labels Operations:*
#### Create label
```bash
curl -X POST http://localhost:9090/api/labels -H "Content-Type: application/json" \
-H "user-id: 1" -d '{"name": "Work"}'
```
##### → 201 Created with Location header

#### Update label
```bash
curl -X PATCH http://localhost:9090/api/labels/1 -H "Content-Type: application/json" \
-d '{"name": "Updated Label"}'
```
##### → 204 No Content

#### Delete label
```bash
curl -X DELETE http://localhost:9090/api/labels/1
```
##### → 204 No Content


  * *Example 4 - Blacklist Operations:*
#### Add URL to blacklist
```bash
curl -X POST http://localhost:9090/api/blacklist -H "Content-Type: application/json" \
-d '{"url": "http://bad.com"}'
```
##### → 201 Created

#### Try sending mail with blacklisted URL
```bash
curl -X POST http://localhost:9090/api/mails -H "Content-Type: application/json" \
-d '{"title": "Spam", "content": "Visit http://bad.com", "sender": "1", "receiver": "2"}'
```
##### → 400 Bad Request – Mail contains blacklisted URL

#### Remove URL from blacklist
```bash
curl -X DELETE http://localhost:9090/api/blacklist -H "Content-Type: application/json" \
-d '{"url": "http://bad.com"}'
```
##### → 204 No Content

#### Retry sending mail with removed URL
```bash
curl -X POST http://localhost:9090/api/mails -H "Content-Type: application/json" \
-d '{"title": "Spam", "content": "Visit http://bad.com", "sender": "1", "receiver": "2"}'
```
##### → 201 Created


 * *Example 5 – Edge Cases:*
#### Missing fields
```bash
curl -X POST http://localhost:9090/api/mails -H "Content-Type: application/json" -d '{}'
```
##### → 400 Bad Request – Missing required fields

#### Invalid user
```bash
curl -X POST http://localhost:9090/api/mails -H "Content-Type: application/json" \
-d '{"title": "Hello", "content": "test", "sender": "999", "receiver": "2"}'
```
##### → 404 Not Found – Sender or receiver not found

#### Blacklisted URL (again)
```bash
curl -X POST http://localhost:9090/api/mails -H "Content-Type: application/json" \
-d '{"title": "Hey", "content": "http://bad.com", "sender": "1", "receiver": "2"}'
```
##### → 400 Bad Request – Mail contains blacklisted URL


### 3. Tests Pass:
![tests run](https://github.com/user-attachments/assets/334c1e02-06d7-4e3c-8d3e-99d1730e4c52)

### 4. Building & Running C++ server:
  ![building+running Ex2 c++ server](https://github.com/user-attachments/assets/88d178c3-8945-47f7-bb34-b2800e2d2c0d)

### 5. Building & Running Node.js server:
![building+running Ex3 node js server](https://github.com/user-attachments/assets/a7bd48d8-cc22-4ac8-9dd4-f1bd5024b7ec)


---
