
# 🛡️ SecureVote – Blockchain-Based Voting System

SecureVote is a full-stack, decentralized voting platform built with Spring Boot, MySQL, and Ethereum blockchain integration. It ensures vote integrity, transparency, and auditability using Merkle trees, Zero-Knowledge Proof simulation, and smart contracts.

---

## 🚀 Features

- 🔐 **JWT Authentication** for secure voter and admin access
- 🗳️ **Blockchain-backed voting** with transaction hash and Merkle root
- 📊 **Admin dashboard** with audit logs and suspicious activity alerts
- 🧠 **ZKP Simulation** for voter privacy
- 📈 **Voting statistics** with charts and real-time feedback
- 🧾 **Email receipts** with blockchain confirmation
- 🧩 **Modular architecture** for easy extension and testing

---

## 🧰 Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Backend      | Spring Boot 3.x, Java 17, web3j      |
| Frontend     | React + Vite (or AngularJS if used)  |
| Database     | MySQL 8.x                            |
| Blockchain   | Hardhat or Ganache (local Ethereum)  |
| Security     | JWT, role-based access               |
| Dev Tools    | Maven, Postman, GitHub               |

---

## 📁 Project Structure

SecureVote/ ├── backend/
            │  ├── src/main/java/com/adarsh/securevote/ 
            │  ├── resources/
            |  |  |── config/blockchain.properties   
            |  |  ├── sql/schema.sql 
            │  |  ├── sql/seed-data.sql 
            ├── frontend/ 
            │ ├── src/ 
            │ ├── vite.config.ts 
            │ └── .env
            
---
## 🛠️ Local Setup Instructions

### 🔧 Prerequisites

- Node.js 18+
- Java 17+
- Maven
- MySQL 8+
- Hardhat or Ganache (for local blockchain)

---

### 🗄️ 1. Setup MySQL

```sql
CREATE DATABASE securevote;
Update backend/src/main/resources/application.properties with your DB credentials.
________________________________________
🔗 2. Start Local Blockchain
npx hardhat node
Export your account credentials:
export BLOCKCHAIN_PRIVATE_KEY=0xYourPrivateKey
export BLOCKCHAIN_WALLET_ADDRESS=0xYourWalletAddress
Deploy your smart contract and update blockchain.properties with the contract address.
________________________________________
⚙️ 3. Run Backend
cd backend
mvn clean install
mvn spring-boot:run
Backend will be live at: http://localhost:8080/securevote
________________________________________
🎨 4. Run Frontend
cd frontend
npm install
npm run dev
Frontend will be live at: http://localhost:3000
________________________________________
🔍 API Endpoints
Endpoint	Method	Description
/securevote/auth/login	POST	Login with JWT
/securevote/vote/cast	POST	Cast a vote
/securevote/receipt	GET	Get blockchain vote receipt
/securevote/admin/logs	GET	View audit logs
________________________________________
📦 Environment Variables
Set these in .env or system environment:
BLOCKCHAIN_PRIVATE_KEY=0xYourPrivateKey
BLOCKCHAIN_WALLET_ADDRESS=0xYourWalletAddress
VITE_API_BASE_URL=http://localhost:8080/securevote
________________________________________
🧪 Testing Checklist
•	✅ Frontend loads and connects to backend
•	✅ Vote casting returns blockchain transaction hash
•	✅ Vote stored in MySQL with Merkle root
•	✅ Audit logs created for each action
•	✅ JWT authentication works for voter/admin
________________________________________
👨💻 Author
Adarsh Biradar 
Aspiring Software Engineer | Blockchain Enthusiast | Data Analyst
📍 Bengaluru, India
🔗https://www.linkedin.com/in/adarsh-biradar-87141a261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
   YouTube : https://www.youtube.com/watch?v=RloSjG6Y9do
________________________________________
📜 License
This project is licensed under the MIT License. Feel free to fork, extend, and contribute!

