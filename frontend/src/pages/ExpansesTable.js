import React from 'react'

const ExpansesTable = ({expanses, handleDelete}) => {
  return (
    <div className='expense-list' >
      {
        expanses.map((expanse,index)=>(
          <div key={index} className='expense-item'>
            <button onClick={()=>handleDelete(expanse._id)} className='delete-button'>X</button>
            <div className='expense-description' >{expanse.text}</div>
            <div className='expense-amount' style={{
              color: expanse.amount > 0 ? "#27ae60" : "#e74c3c"
            }} >{expanse.amount}</div>
          </div>
        ))
      }
    </div>
  )
}

export default ExpansesTable
