import React from 'react'

const ExpenseDetails = ({ expenseAmt, incomeAmt }) => {
  const balance = incomeAmt - expenseAmt;
  return (
    <div className='stat-grid'>
      <div className='stat-card balance-card'>
        <div className='stat-label'>Your Balance</div>
        <div className={`stat-value ${balance >= 0 ? 'income-text' : 'expense-text'}`}>
          {balance}
        </div>
      </div>
      <div className='stat-card'>
        <div className='stat-label'>Income</div>
        <div className='stat-value income-text'>+{incomeAmt}</div>
      </div>
      <div className='stat-card'>
        <div className='stat-label'>Expense</div>
        <div className='stat-value expense-text'>-{expenseAmt}</div>
      </div>
    </div>
  )
}

export default ExpenseDetails