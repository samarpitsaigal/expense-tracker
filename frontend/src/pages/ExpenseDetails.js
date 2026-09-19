import React from 'react'

const ExpenseDetails = ({ expenseAmt, incomeAmt }) => {
  console.log(expenseAmt, incomeAmt)
  return (
    <div>
      <div>YOUR BALANCE IS: {expenseAmt - incomeAmt}</div>
      <div  className='amount-container'>
        income
        <span className='income-amount' >{incomeAmt}</span>
        expense
        <span className='expense-amount' >{expenseAmt}</span>
      </div>

    </div>
  )
}

export default ExpenseDetails