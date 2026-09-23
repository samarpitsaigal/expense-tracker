import React from 'react'

const formatDateTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const datePart = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const timePart = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${datePart}, ${timePart}`
}

const ExpansesTable = ({expanses, handleDelete, loading}) => {
  return (
    <div className='transactions'>
      <h2>Transactions</h2>
      {
        loading ? (
          <div className='expense-list'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='expense-item expense-skeleton'>
                <div className='skeleton skeleton-delete'></div>
                <div className='expense-info'>
                  <div className='skeleton skeleton-line skeleton-line-lg'></div>
                  <div className='skeleton skeleton-line'></div>
                </div>
                <div className='skeleton skeleton-line skeleton-amount'></div>
              </div>
            ))}
          </div>
        ) : expanses.length === 0 ? (
          <div className='transactions-empty'>No transactions yet. Add your first one!</div>
        ) : (
          <div className='expense-list'>
            {
              expanses.map((expanse,index)=>(
                <div key={index} className='expense-item'>
                  <button onClick={()=>handleDelete(expanse._id)} className='delete-button' title='Delete'>X</button>
                  <div className='expense-info'>
                    <div className='expense-description' >{expanse.text}</div>
                    <div className='expense-meta' >{formatDateTime(expanse.createdAt)}</div>
                  </div>
                  <div className={`expense-amount ${expanse.amount >= 0 ? 'income-text' : 'expense-text'}`} >
                    {expanse.amount >= 0 ? '+' : ''}{expanse.amount}
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default ExpansesTable