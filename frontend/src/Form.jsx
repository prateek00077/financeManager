
import React, { useState } from 'react';

const Form = ({ onAdd, setShowForm }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !amount || !date || !category) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_PORT}add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount, date, category })
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      const data = await res.json();
      if (onAdd) onAdd();
      setShowForm(false);
    } catch (err) {
      setError("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Add Transaction</h2>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50"
          placeholder="e.g. Salary, Groceries"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50"
          placeholder="e.g. 1000"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Category</label>
        <div className="flex gap-3 mt-1">
          <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
            <input type="radio" name="category" value="credit" checked={category === "credit"} onChange={e => setCategory(e.target.value)} className="accent-blue-600" />
            Credit
          </label>
          <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
            <input type="radio" name="category" value="debit" checked={category === "debit"} onChange={e => setCategory(e.target.value)} className="accent-blue-600" />
            Debit
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm shadow-sm mt-2 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}

export default Form
