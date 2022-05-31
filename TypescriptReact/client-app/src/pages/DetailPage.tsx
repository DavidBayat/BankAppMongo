import React, { ChangeEvent, useEffect, useState } from 'react';
import '../App.css';
import { Link, useParams } from 'react-router-dom';
import Moment from 'moment';

interface Transaction {
  createdAt: any,
  amount: any
}

const DetailPage = () => {
  const { id } = useParams();
  const [transactionData, settransactionData] = useState<Transaction[]>([]);
  const [transactionItem, settransactionItem] = useState<String>();

  const getTransactionData = async () => {
    const responseTrans = await fetch(`https://localhost:7260/api/User/${id}`);
    const userTransResults = await responseTrans.json();
    settransactionData(userTransResults);
  }
  useEffect(() => {
    getTransactionData()
  }, [transactionData])

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const com = { id, transactionItem };

    fetch(`https://localhost:7260/api/User/${id}?amount=${transactionItem}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(com)
    })
    getTransactionData();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    settransactionItem(e.target.value)
  };

  return (
    <main className='App'>
    
    <div className='App_table'>
      <div className='Saldo'>
        <h3>Saldo:  {transactionData.reduce((a, b) => a + b.amount, 0)} SEK</h3>
      </div>
      <table>
        <tr>
          <th>Datum</th>
          <th>Belopp</th>
        </tr>
        {transactionData.map((val, key) => {
          return (
            <tr key={key}>
              <td>{Moment(val.createdAt).format('YYYY-MM-DD')}</td>
              <td>{val.amount}</td>
            </tr>
          )
        })}
      </table>
      <div className='header'>
    <form>
        <input id='txtTodoItemToAdd' type="text" placeholder='Belopp' name='userItem' onChange={handleChange}/>
      </form>
      <button className='button' id='btnAddUser' onClick={handleSubmit}>Insättning</button>
    </div>
    </div>
    
  </main>
  )
}

export default DetailPage