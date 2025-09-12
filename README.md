# Finance Manager

A minimalistic full-stack web application to manage your personal finances. Easily add, edit, and delete transactions, and view your transaction history in a clean UI.

## Features
- Add, edit, and delete transactions (title, amount, date, category)
- Distinguish between credit and debit transactions
- Responsive, modern UI with modal forms
- Backend API with Express and MongoDB
- CORS enabled for frontend-backend communication

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your MongoDB URI and desired port:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

### Usage
- Open your browser at `http://localhost:5173` (or the port shown in your terminal).
- Add, edit, or delete transactions using the UI.

## API Endpoints
- `GET    /`           - Get all transactions
- `POST   /add`        - Add a new transaction
- `PUT    /:id/edit`   - Update a transaction
- `DELETE /:id/delete` - Delete a transaction

## Folder Structure
```
financeManager/
  backend/
    src/
      controllers/
      models/
      routes/
      server.js
    package.json
  frontend/
    src/
      App.jsx
      Form.jsx
      main.jsx
    package.json
```

## License
MIT
