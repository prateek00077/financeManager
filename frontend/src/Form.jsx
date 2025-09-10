import React from 'react'


const Form = () => {
  return (
    <form className="space-y-6 w-full">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Add Transaction</h2>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Title</label>
        <input
          type="text"
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50"
          placeholder="e.g. Salary, Groceries"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Amount</label>
        <input
          type="number"
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50"
          placeholder="e.g. 1000"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Date</label>
        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm bg-gray-50"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Category</label>
        <div className="flex gap-3 mt-1">
          <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
            <input type="radio" name="category" value="credit" className="accent-blue-600" />
            Credit
          </label>
          <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
            <input type="radio" name="category" value="debit" className="accent-blue-600" />
            Debit
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm shadow-sm mt-2"
      >
        Add Transaction
      </button>
    </form>
  )
}

export default Form
