## Todo-Gyandhan

A modern Full-Stack Todo App built using Node.js, Express, MongoDB (Backend) and React, Tailwind CSS (Frontend). This app allows users to create, edit, delete, sort and prioritize tasks efficiently.

## **Features**
Add new tasks with title, description, and priority  
Edit existing tasks  
Sort Tasks by Priority, Title and Description  
Drag and Drop Functionality
Delete tasks  
Display all tasks in a clean UI  
Responsive and modern UI built with Tailwind CSS  
RESTful API with Express.js and MongoDB  

---

## **Project Folder Structure**
```
📦 Todo-Gyandhan
 ┣ 📂 Client            # React + Tailwind Frontend
 ┃ ┣ 📂 public             # React public files
 ┃ ┣ 📂 src                # React source files
 ┃ ┃ ┣ 📜 App.jsx          # App component
 ┃ ┃ ┣ 📜 App.css          # App CSS File
 ┃ ┃ ┣ 📜 index.js         # React entry point
 ┃ ┃ ┣ 📜 App.jsx          # App component
 ┃ ┃ ┣ 📜 Main.jsx         # Main React File
 ┃ ┣ 📜 tailwind.config.js # Tailwind CSS Config
 ┣ 📂 Server              # Node.js + Express Backend
 ┃ ┣ 📂 config             # Database configuration
 ┃ ┣ 📂 models             # Mongoose models
 ┃ ┣ 📂 routes             # API routes
 ┃ ┣ 📜 server.js          # Main Express server
 ┣ 📜 .gitignore           # Git Ignore file
 ┣ 📜 README.md            # Project Documentation
 ┣ 📜 package.json         # Dependencies & Scripts
```

---

## **Tech Stack**
### **Backend**
- **Node.js** - JavaScript runtime for server-side logic
- **Express.js** - Web framework for building RESTful APIs
- **MongoDB** - NoSQL Database for storing tasks
- **Mongoose** - ODM for MongoDB  
- **Cors** - Middleware for cross-origin requests  
- **dotenv** - Environment variable management  

### **Frontend**
- **React.js** - UI Framework
- **Tailwind CSS** - Utility-first CSS for styling
- **Fetch API** - Handling API requests
- **DnD-Kit/Core** - For Drag and Drop

---

## **Getting Started**

### ** Clone the Repository**
```sh
git clone https://github.com/NajimuddinS/Todo-Gyandhan
cd Todo-Gyandhan
```

---

## **Backend Setup (Node.js + Express + MongoDB)**

### **Navigate to the Backend Folder**
```sh
cd backend
```

### ** Install Dependencies**
```sh
npm install
```

### ** Create a `.env` file in `backend` folder**
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### ** Start the Server**
```sh
npm start
```
The server will run at **http://localhost:5000**

---

## **Frontend Setup (React + Tailwind CSS)**

### **Navigate to the Frontend Folder**
```sh
cd frontend
```

### **Install Dependencies**
```sh
npm install
```

### ** Start the Frontend**
```sh
npm run dev
```
The frontend will be available at **http://localhost:5173**

---

## **Frontend UI Preview**
The UI is designed using **Tailwind CSS** with a **minimalist and clean design.**  
It supports **real-time updates, Drag and Drop Functionality, and a responsive layout.**  

![image](https://raw.githubusercontent.com/NajimuddinS/Todo-Gyandhan/refs/heads/main/Client/src/assets/sc.PNG)


---

## **Deployment**
You can deploy this project using:
- **Frontend**: Vercel, Netlify  
- **Backend**: Heroku, Render, Railway  
- **Database**: MongoDB Atlas  

---
