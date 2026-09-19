import React, { useState } from "react";
import { handleError } from "../utils";

const ExpenseTrackerForm = ({addExpanses}) => {

  const [expenseInfo,setExpenseInfo]= useState({text: '' , amount: ''})

      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    }

    const handleExpense = (e)=>{
      e.preventDefault()      
      console.log(expenseInfo)
      const {text,amount} = expenseInfo
      if(!text || !amount){
        handleError('All fields are required')
        return
      }
      setExpenseInfo({text:'',amount:''})
      addExpanses(expenseInfo)
    }

  return (
    <div className="form-card">
      <h2>Add Transaction</h2>
      <p className="form-hint">Use a negative amount for expenses, positive for income</p>
      <form onSubmit={handleExpense}>
        <div className="form-group">
          <label htmlFor="text">Description</label>
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder="Enter your expense description..."
            value={expenseInfo.text}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="e.g. 500 or -200"
            value={expenseInfo.amount}
          />
        </div>
        <button type="submit" className="btn-primary">Add Transaction</button>
      </form>
    </div>
  );
};

export default ExpenseTrackerForm;