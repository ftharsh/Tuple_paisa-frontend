# 💸 Tuple Paisa - A Secure & Smart Wallet Application

Tuple Paisa is a full-stack wallet application designed for seamless and secure digital transactions. With JWT-based authentication, responsive UI, and real-time email updates powered by Kafka, Tuple Paisa offers a feature-rich experience for both developers and users.

---

## 🚀 Features

### 🔐 Authentication
- **JWT-based Login & Signup**
  - Secure authentication using JSON Web Tokens.
  - Ensures only authenticated users can perform transactions.

### 💼 Wallet Operations
- **Transaction Types:**
  - ✅ **Recharge** – Add money to your wallet.
  - 🔁 **Transfer** – Send money to other users.
    - 🤑 Get **5% cashback** on every successful transfer!

### 📈 Real-Time Transaction Tracking
- 💹 Track transactions using dynamic charts.
- 📊 Analyze spending patterns and income trends in real time.

### 📬 Real-Time Email Notifications
- Powered by **Kafka**:
  - Sends transactional email updates instantly for every recharge or transfer.
  - Enables better transparency and tracking for users.

### 🌐 Security
- ✅ **CORS** and **CSRF** protection implemented.
- Backend and frontend communication is protected with secure headers and token validation.

### 📱 Responsive & Intuitive UI
- Built with a user-friendly interface:
  - 📱 Fully responsive across devices.
  - ⌨️ **AutoTyping** feature: Smart user suggestion while typing recipient names for transfer.
  - 🚀 Smooth transitions and clear feedback for user actions.

---

## 🛠️ Tech Stack

### Backend
- **Spring Boot**
- **Java**
- **Kafka**
- **MongoDB**
- **JUnit**

### Frontend
- **React.js**
- **Three.js**
- **D3.js**
- **Material UI**
- **Tailwind CSS**
- **Chart.js**
- **Lottie React**
- **Particle.js**
- **jsPDF**
- **html2canvas**
- **Jest**

---
### 🖼️ Screenshots
## 🏁 Landing Page
![Screenshot from 2025-06-08 12-00-17](https://github.com/user-attachments/assets/65efdf0c-5f2f-433b-bf06-7d5f263a1032)
## 📋 Statement Export and Wallet Stats
![Screenshot from 2025-06-08 12-05-21](https://github.com/user-attachments/assets/5c8efce3-4f81-4078-8edc-ad8503cb40dc)
## ✅ Transaction Completion Dialog
![Screenshot from 2025-06-08 12-06-33](https://github.com/user-attachments/assets/26571a5f-2999-4acc-b0f1-c15d880f8ceb)
## 🔧 Transaction Analytics Board
![Screenshot from 2025-07-02 15-23-50](https://github.com/user-attachments/assets/94b2eaee-d645-42a7-9c21-7c3602461a9b)
![Screenshot from 2025-07-02 15-23-54](https://github.com/user-attachments/assets/4540c73e-07a7-4199-8150-a1006976e5ab)
## 📝 Receiver's Name AutoSuggest feature
![Screenshot from 2025-07-02 15-23-36](https://github.com/user-attachments/assets/0ecd1c8a-b5fb-4b33-ab4d-772acb37f4a8)
### 🧪 Test Coverage : Jest

| File/Directory                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line(s)             |
|---------------------------------------|---------|----------|---------|---------|-------------------------------|
| **All files**                         | 94.34   | 82.75    | 84.33   | 95.01   | -                             |
| `src`                                 | 100     | 100      | 100     | 100     | -                             |
| └── `App.jsx`                         | 100     | 100      | 100     | 100     | -                             |
| `src/Constant`                        | 100     | 100      | 100     | 100     | -                             |
| └── `theme.js`                        | 100     | 100      | 100     | 100     | -                             |
| `src/components`                      | 97.29   | 91.66    | 88.88   | 97.22   | -                             |
| ├── `Authpage.jsx`                    | 96.77   | 91.66    | 83.33   | 96.77   | Line 157                      |
| └── `DashboardMain.jsx`              | 100     | 100      | 100     | 100     | -                             |
| `src/components/dashboard`           | 93.07   | 81.17    | 82.5    | 94.21   | -                             |
| ├── `DashBoardSidebar.jsx`           | 93.1    | 75.6     | 88.23   | 92.72   | Lines 87-90, 230              |
| ├── `ErrorMessage.jsx`               | 100     | 100      | 100     | 100     | -                             |
| ├── `ReportCard.jsx`                 | 100     | 100      | 100     | 100     | -                             |
| ├── `TransactionView.jsx`           | 90.19   | 83.33    | 66.66   | 93.61   | Lines 161, 272–280            |
| └── `TransitionEffect.jsx`           | 100     | 100      | 100     | 100     | -                             |
| `src/components/dashboard/common`    | 100     | 100      | 100     | 100     | -                             |
| ├── `Button.jsx`                     | 100     | 100      | 100     | 100     | -                             |
| └── `Loader.jsx`                     | 100     | 100      | 100     | 100     | -                             |
| `src/components/dashboard/guide`     | 100     | 100      | 100     | 100     | -                             |
| └── `GuideAvatar.jsx`               | 100     | 100      | 100     | 100     | -                             |
| `src/components/home`                | 88.31   | 79.16    | 72.22   | 89.18   | -                             |
| ├── `Homepage.jsx`                   | 100     | 100      | 100     | 100     | -                             |
| ├── `MorphingText.jsx`               | 87.93   | 79.16    | 72.72   | 89.09   | Lines 38, 53–54, 73–74, 78    |
| └── `Pattern.jsx`                    | 85.71   | 100      | 60      | 85.71   | Lines 9, 21                   |
| `src/components/utils`               | 100     | 78.12    | 100     | 100     | -                             |
| ├── `authService.js`                 | 100     | 100      | 100     | 100     | -                             |
| ├── `chartService.js`                | 100     | 75       | 100     | 100     | Line 19                       |
| ├── `transactionService.js`         | 100     | 75       | 100     | 100     | Line 11                       |
| └── `walletService.js`              | 100     | 80       | 100     | 100     | Lines 24–25, 51, 77           |

** Test Suites:** 19 passed out of 19  
** Tests:** 89 passed out of 89  
** Time:** 3.744 seconds  
** Snapshots:** 0



## 📦 Setup Instructions

### Prerequisites
- React.js & npm
- Java 17+
- Kafka & Zookeeper
- MongoDB or SQL database


### Clone the Repository
```bash
git clone https://github.com/ftharsh/Tuple_paisa-frontend.git
cd tuplepaisa_frontend-main
