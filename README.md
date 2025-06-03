# Advanced-Programming---Gmail-Repository

## URL Blacklisting Hash System with Client-Server Architecture

### Introduction

This project implements a modular URL blacklisting system based on hash functions and an extendable architecture. 
The system filters URLs repeatable hash functions and a persistent blacklist file. In this sprint, the system was expanded to support:

* A new `DELETE` operation to remove URLs from the blacklist.
* A **TCP-based client-server architecture** for real-time interaction between a Python client and C++ server.

The design leverages interfaces (`IAction`, `IUserInput`, `IUserOutput`, `IHasher`, `Iclient`, `Iprogram`) to allow seamless feature addition with minimal changes.

---

### Sprint Overview

This sprint delivered:

1. Core hashing logic (`HashRepeats`, `runHashOnURL`).
2. Simulated blacklist system with:

   * Bit array (BloomFilter logic)
   * Persistent file of blacklisted URLs
3. Full user interaction cycle:

   * Input
   * Validation
   * Hashing
   * Output
4. TCP Client-Server communication
5. `DELETE` support for removing URLs
6. Extensive unit testing

---

### Client (Python)
1. explanation:
The Client connects to a server using TCP and allows message exchange.
It’s implemented using Python sockets and follows an interface (`IClient`) to ensure a consistent structure.
  * `Client.py`:
     * Establishes a connection to a server IP and port.
     *   Sends and receives messages over the socket.
     *   Uses UTF-8 encoding for communication.
2. files:
  * `IClient.py`:
     * Defines the interface (IClient) that every client must implement, including methods to start the connection, send/receive messages, and close the socket.
  * `main.py`:
     * Initializes a Client object with IP and port from command-line arguments.
     * Starts communication with the server.
     * Loops to read user input, sends it to the server, and prints the server's response.
This design makes the client modular and easy to extend or replace and the interface ensures any new implementation will be compatible with the existing structure.---

### TCP Server (C++)
1. explanation:
  * Receives and handles commands via TCP socket from the client.
  * Delegates logic to `ActionFactory` using `IAction` classes (`AddURLToBL`, `CheckURLInBL`, `DeleteURLFromBL`).
  * Maintains the blacklist in-memory and on disk.

2. files:
  * `Server.cpp/h`: Socket handling, request loop
  * `BloomFilter.cpp/h`: Core blacklist logic
  * `ActionFactory.cpp/h`: Dispatches actions
> **Note:** This project uses IPv4.

### HTML Server (Node.js)
1. explanation:
* A multi-threaded web server built with Node.js using the MVC architecture.
* Exposes a RESTful API for managing users, tokens, emails, labels, and blacklist URLs.
* Communicates with the C++ TCP server over a persistent socket to validate URLs in emails.
* Supports user registration, login, email operations, labeling, searching, and blacklist management.

2. files:
* `App.js`: Entry point that starts the Node.js server and establishes TCP connection to the C++ server.
* `routes/`: Defines route handlers for /api/users, /api/mails, /api/labels, /api/blacklist, and /api/tokens.
* `controllers/`: Implements business logic for each route
* `models/`: In-memory data structures and helper functions to manage users, mails, and labels.
* `models/blacklist.js`: Manages communication with the TCP server to check/add/delete blacklist URLs.

---

### Input/Output Flow

1. Client starts and connects to server
2. User inputs a command (e.g., `POST <url>`)
3. Client sends command via TCP socket
4. Server validates, performs action, returns response
5. Client prints response to screen

---

### Supported Commands

1. `POST <url>` – Add URL to the blacklist (returns `201 Created`)

2. `GET <url>` – Check if URL is blacklisted (returns `200 Ok` followed by result)

3. `DELETE <url>` – Remove URL from the blacklist file only (returns `204 No Content` or `404 not found` if the URL never added to the black list)

> the server will return `400 Bad Request` – For invalid command formats or not valid URLs format.

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

### Edge Cases

1. **Empty URL input**: System waits for valid input.
2. **All repeat counts = 0**: BloomFilter bit array remains unchanged.
3. **Deleting a URL that does not exist**: System returns `404 Not Found`.

---

### Blacklist File (BLFile.txt)

* **Path**: `/data/BLFile.txt`

* **Structure**:

  1. First line: Size of the BloomFilter
  2. Second line: Bit array (space-separated)
  3. From line 3: List of blacklisted URLs

* **Initialization**:  If BLFile.txt does not exist (e.g. on first run), it is created.
  After the first user input, the system is initializing the Bloom filter with the specified size and an all-zero bit array.

* **When `POST`**: Modifies bits + appends URL

* **When `DELETE`**: Removes URL (and possibly bits if necessary)

---
### Example of the Blacklist File

*While initialized:*
```
8
0 0 0 0 0 0 0 0
```

*After adding URLs:*
```
8
0 0 1 1 1 1 0 1
www.example.com0
www.example.com1
www.example.com2
```

---
### Validation Checks (C++ server)
* IPv4 Validation
* Port Validation
* Hash Function Numbers Validation
* Blacklist Size Validation (BLSize)
* Command Validation (`POST`, `GET`, `DELETE`)
* URL Validation
---
### Main Data Structures

* `std::vector<bool>` – Blacklist bit array
* `std::function<size_t(string)>` – Hash function signature
* `std::vector<shared_ptr<IHasher>>` – Multiple hashers
* `BloomFilter` – Wraps blacklist logic, file sync

---

### Key Components

* `IUserInput`, `MenuChoiceInput`, `FirstUserInput`: Input wrappers
* `validateUserInput`: Input validation logic
* `IAction`, `AddURLToBL`, `CheckURLInBL`, `DeleteURLFromBL`: Action logic
* `IUserOutput`, `OutputToClient`: Output formatting + socket
* `IHasher`, `HashRepeats`: Reusable hash logic
* `IClient`: Interface for client communication, enabling pluggable implementations like a Python client or other future clients

---



## Documentation (via Kali-Linux):
### 1.  Running Examples:
  * *Example 1:*
  ![valid ex 1](https://github.com/user-attachments/assets/c644001d-47ad-4245-9976-5c03b9c4d6c0)
  ![valid ex 2](https://github.com/user-attachments/assets/cd4e6af5-28d3-4a5e-aa79-91a98ca5ece8)
  ![valid ex 3](https://github.com/user-attachments/assets/f794f897-329a-49b5-9b50-50974d235a07)


  * *Example 2:*
  


  * *Example 3 - invalid BlackList's arguments:*


  * *Example 4 – Invalid port number as a server's argument:*


 * *Example 5 – Invalid port number as a client's argument:*


 * *Example 6 – Invalid command / URL:*


 * *Example 7 :*



### 2. Tests Pass:
![tests pass](documentation-pictures/10.png)

### 3. Building & Running C++ server:
  ![building+running Ex2 c++ server](https://github.com/user-attachments/assets/88d178c3-8945-47f7-bb34-b2800e2d2c0d)

### 4. Building & Running Node.js server:
![building+running Ex3 node js server](https://github.com/user-attachments/assets/33bb4f69-e3f6-4658-a037-fa603aaa1636)

---



### File Structure Overview

```
src/
├── client/                       # Python TCP client
│   ├── Client.py                 # Client socket logic
│   ├── IClient.py                # Interface for future clients
│   ├── main.py                   # Entrypoint script
│   └── dockerfile                # Dockerfile for Python client

├── hash/                         # Hash logic
│   ├── HashRepeats.cpp / .h
│   ├── IHasher.h
│   ├── runHashOnURL.cpp / .h

├── initialization/              # Startup system setup
│   ├── initializeBLSystem.cpp / .h
│   ├── Program.cpp / .h
│   └── IProgram.h

├── server/                      # C++ server
│   ├── Server.cpp / .h

├── user/                        # Input / Output / Actions
│   ├── actions/
│   │   ├── ActionFactory.cpp / .h
│   │   ├── AddURLToBL.cpp / .h
│   │   ├── CheckURLInBL.cpp / .h
│   │   ├── DeleteURLFromBL.cpp / .h
│   │   ├── IAction.h
│   │   └── userAction.cpp / .h
│   ├── user_input/
│   │   ├── FirstUserInput.cpp / .h
│   │   ├── MenuChoiceInput.cpp / .h
│   │   └── IUserInput.h
│   └── user_output/
│       ├── OutputToClient.cpp / .h
│       ├── UserOutput.cpp / .h
│       └── IUserOutput.h

├── validations/
│   ├── validateUserInput.cpp / .h

├── BloomFilter.cpp / .h         # BloomFilter logic
├── main.cpp                     # Server entrypoint
├── Dockerfile                   # Dockerfile for C++ server
├── CMakeLists.txt

├── tests/                       # GTest unit tests
│   ├── ActionFactoryTest.cpp
│   ├── addURLToBLTest.cpp
│   ├── CheckURLInBLTest.cpp
│   ├── DeleteURLFromBLTest.cpp
│   ├── initializeBLSystemTest.cpp
│   ├── OutputToClientTest.cpp
│   ├── runHashOnURLTest.cpp
│   ├── serverTest.cpp
│   ├── userActionTest.cpp
│   └── validateUserInputTest.cpp

└── README.md
```

---

### Technologies Used

* **C++17** – Core backend logic
* **Python 3.9** – Client logic
* **CMake** – Build system
* **Google Test** – Testing framework
* **Docker** – Containerized build/run
* **STL / Filesystem** – Efficient memory and file I/O

---

### Summary

This sprint showcases how a modular design enables easy extension. 
The new DELETE operation and client-server communication were added without rewriting core logic — thanks to clean interfaces and abstractions.
This architecture is modular, testable, and designed for future expansion—such as integrating different hash functions, adding new client types, or supporting advanced blacklist policies.
