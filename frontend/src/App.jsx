import React, { useState, useEffect } from 'react'
import Form from './Form'

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Finance Manager</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-8 px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        + Add Transaction
      </button>
      {showForm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <Form />
            </div>
          </div>
        </>
      )}
      <div className="w-full max-w-md bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Transactions</h2>
        <ul className="space-y-3">
          {transactions.map((tx, idx) => (
            <li key={idx} className="flex items-center justify-between border-b last:border-b-0 py-2">
              <div>
                <div className="font-medium text-gray-800">{tx.title}</div>
                <div className="text-xs text-gray-400">{tx.date}</div>
              </div>
              <div className={
                tx.category === "credit"
                  ? "text-green-600 font-semibold flex items-center"
                  : "text-red-600 font-semibold flex items-center"
              }>
                {tx.category === "credit" ? "+" : "-"}
                ₹{tx.amount}
                <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{tx.category}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
