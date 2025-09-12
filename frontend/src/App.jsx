
import React, { useState, useEffect } from 'react';
import Form from './Form';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Edit state
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: '', amount: '', date: '', category: '' });

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await fetch(`http://localhost:5000/${id}/delete`, { method: 'DELETE' });
      fetchTransactions();
    } catch (err) {
      alert('Failed to delete transaction');
    }
  };

  // Handle edit button click
  const handleEditClick = (tx) => {
    setEditId(tx._id);
    setEditData({
      title: tx.title,
      amount: tx.amount,
      date: tx.date,
      category: tx.category
    });
    setShowForm(false);
  };

  // Handle edit form submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/${editId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      setEditId(null);
      fetchTransactions();
    } catch (err) {
      alert('Failed to update transaction');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Finance Manager</h1>
      <button
        onClick={() => { setShowForm(true); setEditId(null); }}
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
              <Form setShowForm={setShowForm} onAdd={fetchTransactions} />
            </div>
          </div>
        </>
      )}
      {editId && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                onClick={() => setEditId(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <form className="space-y-6 w-full" onSubmit={handleEditSubmit}>
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Edit Transaction</h2>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">Title</label>
                  <input type="text" value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">Amount</label>
                  <input type="number" value={editData.amount} onChange={e => setEditData({ ...editData, amount: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">Date</label>
                  <input type="date" value={editData.date} onChange={e => setEditData({ ...editData, date: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-medium">Category</label>
                  <div className="flex gap-3 mt-1">
                    <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                      <input type="radio" name="edit-category" value="credit" checked={editData.category === 'credit'} onChange={e => setEditData({ ...editData, category: e.target.value })} className="accent-blue-600" />
                      Credit
                    </label>
                    <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                      <input type="radio" name="edit-category" value="debit" checked={editData.category === 'debit'} onChange={e => setEditData({ ...editData, category: e.target.value })} className="accent-blue-600" />
                      Debit
                    </label>
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm shadow-sm mt-2">Update Transaction</button>
              </form>
            </div>
          </div>
        </>
      )}
      <div className="w-full max-w-md bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Transactions</h2>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <ul className="space-y-3">
            {transactions.map((tx, idx) => (
              <li key={tx._id || idx} className="flex items-center justify-between border-b last:border-b-0 py-2">
                <div>
                  <div className="font-medium text-gray-800">{tx.title}</div>
                  <div className="text-xs text-gray-400">{tx.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={
                    tx.category === "credit"
                      ? "text-green-600 font-semibold flex items-center"
                      : "text-red-600 font-semibold flex items-center"
                  }>
                    {tx.category === "credit" ? "+" : "-"}
                    ₹{tx.amount}
                    <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{tx.category}</span>
                  </span>
                  <button onClick={() => handleEditClick(tx)} className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition">Edit</button>
                  <button onClick={() => handleDelete(tx._id)} className="ml-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App
