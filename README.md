🗳️ SecureVote – Blockchain Voting System

A decentralized and secure voting system built using blockchain technology. This project ensures transparency, immutability, and reliability in electronic voting, preventing fraud and unauthorized modifications.

🚀 Features

🔒 Blockchain-based Security – votes are immutable and tamper-proof

👥 User Authentication – only registered voters can vote

🗳️ One Person, One Vote – prevents multiple voting attempts

📊 Real-time Results – vote counting and tallying on the blockchain

🌐 Decentralized – no central authority controls the data

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript (or React/Angular if used)

Backend: Node.js / Java / Python (update according to your project)

Blockchain: Ethereum / Ganache / Web3.js (update if using something else)

Database: MySQL / MongoDB (if applicable)

📂 Project Structure
SecureVote-Blockchain-Voting-System/
│── contracts/         # Smart contracts
│── migrations/        # Contract deployment scripts
│── src/               # Frontend source code
│── server/            # Backend API (if applicable)
│── test/              # Test cases
│── package.json       # Node dependencies
│── truffle-config.js  # Truffle/Ganache config (if used)
│── README.md          # Documentation

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/ARBiradar/-Secured-Voting-System-Using-Block-Chain.git
cd SecureVote-Blockchain-Voting-System

2️⃣ Install dependencies

If using Node.js:

npm install


If using Python:

pip install -r requirements.txt

3️⃣ Setup Blockchain Network

Install Ganache (for local Ethereum blockchain).

Start Ganache and copy the RPC URL (usually http://127.0.0.1:7545).

Update the blockchain config file (truffle-config.js or .env).

4️⃣ Compile & Deploy Smart Contracts

If using Truffle:

truffle compile
truffle migrate --reset

5️⃣ Run the Project

For backend:

npm start


For frontend:

npm run dev


(or adjust based on your setup)

🧪 Testing

Run blockchain tests:

truffle test

📸 Screenshots

(Add screenshots of your app UI here)

👨‍💻 Contributors

Adarsh Biradar


📜 License

This project is licensed under the MIT License.
