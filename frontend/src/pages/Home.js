import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpansesTable from './ExpansesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expanses, setExpanses] = useState([])
    const [expenseAmt,setExpenseAmt] = useState(0)
    const [incomeAmt,setIncomeAmt] = useState(0)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    useEffect(()=>{
        const amount = expanses.map((item)=>item.amount)
        console.log(amount)
        const income = amount.filter(item=>item>0).reduce((acc,item)=>(acc +=item),0)
        console.log('income',income)
        const exp = amount.filter(item=>item<0).reduce((acc,item)=>(acc+=item),0)*-1
        console.log('expenses is: ',exp )
        setIncomeAmt(income)
        setExpenseAmt(exp)
        
    },[expanses])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchExpanses = useCallback(async () => {
        setLoading(true)
        try {
            const url = `${APIUrl}/expanses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers); 
            if (response.status === 403) {
                navigate('/login')
                return
            }
            const result = await response.json();
            console.log(result);
            setExpanses(result.data.expanses);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false)
        }
    }, [navigate])

    const addExpanses = async (data) => {
        try {
            const url = `${APIUrl}/expanses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type':'application/json'
                },
                method:'POST',
                body:JSON.stringify(data)
            }
            const response = await fetch(url, headers); 
            if (response.status === 403) {
                navigate('/login')
                return
            }
            const result = await response.json();
            console.log(result);
            setExpanses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const handleDelete = async (expanseId) => {
        try {
            const url = `${APIUrl}/expanses/${expanseId}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type':'application/json'
                },
                method:'DELETE',
            }
            const response = await fetch(url, headers); 
            if (response.status === 403) {
                navigate('/login')
                return
            }
            const result = await response.json();
            console.log(result);
            setExpanses(result.data.expanses);
            handleSuccess(result.message)
        } catch (err) {
            handleError(err);
        }
    }
    
    useEffect(() => {
        fetchExpanses()
    }, [fetchExpanses])

    return (
        <div className='dashboard'>
            <div className='dash-header'>
                <div className='dash-brand'>
                    <div className='dash-brand-mark'>₹</div>
                    <div>
                        <div className='dash-brand-title'>Expense Tracker</div>
                        <div className='dash-welcome'>Welcome, {loggedInUser}</div>
                    </div>
                </div>
                <button onClick={handleLogout} className='btn-logout'>Logout</button>
            </div>
            <div className='dash-body'>
                <div>
                    <ExpenseDetails expenseAmt={expenseAmt} incomeAmt={incomeAmt} />
                    <ExpenseTrackerForm addExpanses={addExpanses} />
                </div>
                <ExpansesTable expanses={expanses} handleDelete={handleDelete} loading={loading} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home