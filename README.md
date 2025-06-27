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
Registers a new user by providing a unique username and password, creating an account in the system.

#### Login To MeMail
Authenticates an existing user by verifying their credentials and returning a valid access token.

### Managing emails

#### Send A New Mail
Sends a new email by specifying the recipient, subject, and content. The mail is saved in the "Sent" folder.

1. After login, find the "Compose" button on the top left of the screen, press it.![image](https://github.com/user-attachments/assets/53bab2a6-f7c0-49a0-95d2-01b781d99a5c)
2. A new mail window will be opened - fill the relevant fields and write there the mail content. Then press the "Send" button.
   ![image](https://github.com/user-attachments/assets/aaf6f068-707a-4323-adcd-23d722e6db9c)


#### Edit A Mail
Allows editing a draft or previously saved mail before sending or re-saving it.
<img width="287" alt="image" src="https://github.com/user-attachments/assets/44eace62-cde0-454e-bc85-87b9bbf02fd9" />
> ***Note:*** When a user edits an email, the updated version is visible only to them.

#### Mark/Remove Mail As Favorite
Marks an email as a favorite for quick access, or removes it from the favorites list.
<img width="266" alt="image" src="https://github.com/user-attachments/assets/9ea8e130-333d-458c-b3da-38c66f856ee3" />

#### Mark/Remove Mail As Spam
Flags an email as spam, moving it to the "Spam" folder and optionally adding the sender to the blacklist. It can also be unmarked.
These actions remove/ adds all the URLs to black list.
<img width="263" alt="image" src="https://github.com/user-attachments/assets/e9d6cf51-1155-45a7-b4de-772c86798a3d" />

#### Delete Mail
removes an email from the user's mailbox
<img width="290" alt="image" src="https://github.com/user-attachments/assets/fc349e6d-f8cd-448b-9082-92f86da01cb5" />

#### Add A New Label
![image](https://github.com/user-attachments/assets/d601f858-4ba0-44bf-a62f-6f791afd9561)

Add a new label for future mail assignments.

#### Edit / Delete A Label
![image](https://github.com/user-attachments/assets/2f1b0a95-622e-4b4f-ae5e-376b210e8eb5)
![image](https://github.com/user-attachments/assets/322632a0-1f09-4db7-868e-5777b26d174e)

By clicking the 3-dots next to the label name, you can:
* Modify the name of an existing label to better suit your organizational preferences.
* Permanently remove a label from your account. Emails previously labeled will no longer have that label.

#### Assign Label / Remove Assignment To Mail
![image](https://github.com/user-attachments/assets/43cd6cad-a3b6-489f-aaf5-787b85de8ba3)   
![image](https://github.com/user-attachments/assets/77537e96-ba04-49dd-98af-ce41a4e16544)

By clicking the 3-dots located at the top-right corner of the mail window, you can:
* Add a specific label to an email to categorize or organize it for easier retrieval.
* Detach a label from an email, removing its association with that category.

#### Search For A Mail
![image](https://github.com/user-attachments/assets/0be645a0-c2bf-4963-8087-305ac04f70be)

Allows searching for emails based on content, subject, sender, and receiver.
You can also use advanced-search by clicking the filtering button.


### Another Features

#### Dark Mode Button
![image](https://github.com/user-attachments/assets/bb807361-dd37-41b0-a5b9-0fc6287f0b15)

Located at the top-right corner of all screens, this toggles the program between light & dark modes.


#### User Window
In this window the user can see all his relevant information such as name, email address, and avatar.
This window also contains a *log out button*.

#### Log Out Button
![image](https://github.com/user-attachments/assets/77f6ad5c-6041-465a-a178-2fef80a11feb)

Located into the user window.





