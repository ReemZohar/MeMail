  <img width="100" alt="image" src="https://github.com/user-attachments/assets/65777939-a69f-4417-8e78-cf3ad9d03896" />
 
#   "Me-Mail" - Gmail-like REST API – Fullstack Project


##  System Overview

This project implements a modular fullstack Gmail-like mail system with:
-  A **C++ TCP Server** for blacklist validation (Bloom Filter logic).
-  A **Node.js + Express REST API** to manage users, mails, labels, spam filtering, and favorites.
-  A **React Frontend** simulating a Gmail-style user interface.
- **Bootstrap** - A CSS framework for building responsive desktop websites
> The system uses the MVC architecture and allows real-time validation between the Node.js backend and the C++ server over TCP.

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

2. Build and start all services with Docker Compose:

```bash
docker compose up --build
```
3. Open the client in your browser:
Navigate to `http://localhost:3000` to access the client application.



### Ports
- React App: `http://localhost:3000`
- Node.js API: `http://localhost:9090`
- C++ Bloom Server: `localhost:7070` (TCP socket)

Example: Advanced Mail Search
Use the following curl command to test advanced filtering
```bash
curl -X GET "http://localhost:9090/api/mails/advanced?folder=inbox&isFavorite=true&sender=1&startDate=2025-06-01&endDate=2025-06-30" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

> ***Note:*** Replace YOUR_TOKEN with your valid JWT.



### Compiling & Running Examples (with WSL):
![image](https://github.com/user-attachments/assets/76b95638-0fe7-45ea-b6f8-08e484468a1c)

![image](https://github.com/user-attachments/assets/6b61dea9-5a69-45ba-8d7f-667f2ee4af30)

---
## System Features
* To use two users simultaneously, you need to log in to one as usual and the other in an incognito window.
* The .env file is exposed here, although it should be hidden, for exercise purposes only.
---


##  User Operations

### Registration and Login

#### Create A New MeMail User:
<img width="750" height="300" alt="image" src="https://github.com/user-attachments/assets/579a6b8d-e92e-46d6-94fa-a532f1258655" />


Registers a new user by providing a unique username and password, creating an account in the system.
> To register, you can go to the following API: `http://localhost:3000/register`

#### Login To MeMail:
<img width="500" alt="image" src="https://github.com/user-attachments/assets/5213b4b4-51d7-4c2e-ba85-2c49d4ea9461" />

Authenticates an existing user by verifying their credentials and returning a valid access token.
> To log in, you can go to the following API: `http://localhost:3000/login`




### Managing emails

#### Send A New Mail:
Sends a new email by specifying the recipient, subject, and content. The mail is saved in the "Sent" folder.

![image](https://github.com/user-attachments/assets/6612c9f1-87d9-4493-a1a1-7895e99e157d)

1. After login, find the "Compose" button on the top left of the screen, press it.
<img width="350" alt="image" src="https://github.com/user-attachments/assets/8b7361d8-a4b6-46ee-97ab-adbf85af01cf" />
  
2. A new mail window will be opened - fill the relevant fields and write there the mail content. Then press the "Send" button.



#### Edit A Mail:
<img width="120" alt="image" src="https://github.com/user-attachments/assets/f7cc5f1d-0840-4290-9910-84aa85ffff6b" />

Allows editing a draft or previously saved mail before sending or re-saving it.

> ***Note:*** When a user edits an email, the updated version is visible only to them.

#### Mark / Remove Mail From Favorites:
<img width="300" alt="image" src="https://github.com/user-attachments/assets/ada1c802-f139-436e-922d-6bea6aed678d" />

Marks an email as a favorite for quick access, or removes it from the favorites list.


#### Mark / Remove Mail As Spam:

<img width="300" alt="image" src="https://github.com/user-attachments/assets/e5ea489a-eb95-42c6-ac09-6e510086d72b" />


Flags an email as spam, moving it to the "Spam" folder, it can also be unmarked. These actions remove/ adds all the URLs to black list.
> ***Note:*** All future mails that will contain blacklisted URLs will go to spam automatically.

#### Delete Mail:
<img width="300" alt="image" src="https://github.com/user-attachments/assets/0663ab9b-67d1-4065-8a65-56262a947616" />

removes an email from the user's mailbox

#### Mark Mail As Read / Unread:
<img width="300" alt="image" src="https://github.com/user-attachments/assets/8cc4ff7b-e460-411d-9d44-f2266d9a5393" />

For user's convenience.

#### Add A New Label:
![image](https://github.com/user-attachments/assets/8a90eb65-d807-4133-95e4-e6092519e6fe)

Add a new label for future mail assignments.

#### Edit / Delete A Label:
![image](https://github.com/user-attachments/assets/2f1b0a95-622e-4b4f-ae5e-376b210e8eb5) 
<img width="200" alt="image" src="https://github.com/user-attachments/assets/322632a0-1f09-4db7-868e-5777b26d174e" />

By clicking the 3-dots next to the label name, you can:
* Modify the name of an existing label to better suit your organizational preferences.
* Permanently remove a label from your account. Emails previously labeled will no longer have that label.

#### Assign Label / Remove Assignment To Mail:
![image](https://github.com/user-attachments/assets/43cd6cad-a3b6-489f-aaf5-787b85de8ba3) 
![image](https://github.com/user-attachments/assets/77537e96-ba04-49dd-98af-ce41a4e16544)

By clicking the 3-dots located at the top-right corner of the mail window, you can:
* Add a specific label to an email to categorize or organize it for easier retrieval.
* Detach a label from an email, removing its association with that category.

#### Search For A Mail:
![image](https://github.com/user-attachments/assets/0be645a0-c2bf-4963-8087-305ac04f70be)

Allows searching for emails based on content and subject.
You can also use advanced-search by clicking the filtering button.




### More Features

#### Left Menu:
![image](https://github.com/user-attachments/assets/fda393ad-5ecd-4291-93ba-32762402ea6b)

Includes all the folders and labels so that the user will be able to see all the relevant mails in there.

#### Dark Mode Button:
![image](https://github.com/user-attachments/assets/bb807361-dd37-41b0-a5b9-0fc6287f0b15)

Located at the top-right corner of all screens, this toggles the program between light & dark modes.

#### User Window:
<img width="250" alt="image" src="https://github.com/user-attachments/assets/1d0920e0-5c33-438a-90cd-b5a47bf600d7" />

In this window the user can see all his relevant information such as name, email address, and avatar.
This window also contains a *log out button*.

#### Log Out Button:
![image](https://github.com/user-attachments/assets/77f6ad5c-6041-465a-a178-2fef80a11feb)

Located in the user window.

#### Drafts handling
![image](https://github.com/user-attachments/assets/3e84dae2-d654-4f84-ad06-bea55d58d998)

When a user starts composing an email and leaves the window, the email is saved as a draft.
Later, the user can continue writing and finish the email, or alternatively delete the draft.
