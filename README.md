# Login Form with JWT

## 📝 Introduction
This project is a login system using **JSON Web Token (JWT)** for user authentication. The project includes both **Frontend** and **Backend** working together.

---

## 📂 Project Structure
```
Login-form-with-JWT/
│── web_FE/         # Frontend (ReactJS)
│── web_API_use_JWT/  # Backend (Node.js + Express + JWT)
│── README.md       # Documentation
```

---

## 🚀 Technologies Used
### 🔹 **Frontend (ReactJS)**
- ReactJS
- React Router
- Axios (API calls)
- Material UI

### 🔹 **Backend (Node.js & Express)**
- Node.js + Express.js
- JSON Web Token (JWT)
- cookie-parser (store refresh token in cookies)
---

## ⚙️ Installation & Running the Project

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/sonpham811z/Login-form-with-JWT.git
cd Login-form-with-JWT
```

### 2️⃣ **Install Backend Dependencies**
```sh
cd web_API_use_JWT
yarn install
npm dev
```

### 3️⃣ **Install Frontend Dependencies**
```sh
cd ../web_FE
yarn install
yarn dev
```

---

## 🔑 JWT Authentication Mechanism
1. **User logs in** → Server generates **access token** + **refresh token**
2. **Access token** is stored in **httpOnly cookie** 
3. **Refresh token** is stored in **httpOnly cookie**
4. When **access token expires**, the system **calls the refresh token API**
5. If **refresh token is also expired**, the user must **log in again**

---

## 📌 Key Features
✅ User registration and login with JWT  
✅ Store refresh token in **httpOnly cookie**  
✅ Middleware to verify JWT validity  
✅ Auto-refresh access token when expired  
✅ React Router protects the dashboard with JWT  

---

## 📧 Contact
If you have any questions or suggestions, please contact:
- **GitHub**: [sonpham811z](https://github.com/sonpham811z)

