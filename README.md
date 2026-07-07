# 📝 MERN Notes App

A full-stack Notes Management application built with the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js).

Users can securely register, log in, and manage personal notes with features like searching, pinning, updating, and deleting notes. The frontend is built with React and served as a production build by the Express backend, making the application deployable as a single Docker container.

---

# 🚀 Features

* 🔐 User Authentication (Sign Up & Login)
* 🔑 JWT Authentication & Authorization
* 📝 Create Notes
* ✏️ Update Notes
* 🗑️ Delete Notes
* 📌 Pin  Notes
* 🔍 Search Notes
* 🔒 Protected Routes
* 💾 Persistent Login Sessions
* 📱 Responsive Design
* 🐳 Docker Support

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Icons
* React Modal
* Vite

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt
* Helmet
* Morgan

## DevOps

* Docker
* Docker Compose

---

# 📂 Project Structure

```text
notes-app/
│
├── frontend/                 # React source code
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── public/               # Production React build
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── .dockerignore
│   └── index.js
│
├── screenshots/
│
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=9000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret
```

---

# 💻 Running Locally

## Clone the repository

```bash
git clone https://github.com/Ali-eng-git/notes-app.git

cd notes-app
```

## Install frontend dependencies

```bash
cd frontend
npm install
```

## Build the React application

```bash
npm run build
```

Copy the generated `dist` folder into the backend as `backend/public`.

## Install backend dependencies

```bash
cd ../backend
npm install
```

## Start the backend

```bash
npm start
```

The application will be available at:

```text
http://localhost:9000
```

---

# 🐳 Running with Docker

Navigate to the backend directory.

```bash
cd backend
```

Build and start the container.

```bash
docker compose up --build
```

Once the container starts successfully, open:

```text
http://localhost:9000
```

---

# 📸 Screenshots

## 📸 Screenshots

### Login Page
![Login](screenshots/login.jpg)

---

### Sign Up Page

![Signup](screenshots/signup.jpg)

---

### Dashboard

![Dashboard](screenshots/dashboard.jpg)

---

### Add Note

![Add Note](screenshots/add.jpg)

---

### Update Note

![Update Note](screenshots/update.jpg)

---

### Search Notes

![Search Notes](screenshots/search.jpg)

---


# 📌 Planned Improvements

* Multi-stage Docker build
* Automatic React production build during Docker image creation
* CI/CD pipeline
* Production deployment
* HTTPS support

---

# 👨‍💻 Author

**Ali Hassan**

GitHub: https://github.com/Ali-eng-git

Portfolio: https://portfolio-orcin-sigma-y7a31h3rig.vercel.app/



---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

