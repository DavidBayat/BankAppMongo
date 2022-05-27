import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

interface Transaction {
    createdAt: any,
    amount: any
}
interface User {
  id: any,
  name : any,
  currentBalance: any,
  transactions: Transaction[] 
}



function App() {
  const [userData, setUserData] = useState<User[]>([]);
  const [userItem, setUserItem] = useState<string>('');
  const [transaction, setTransaction] = useState<number>(0);
  
  const getData = async () => {
    const response = await fetch("https://localhost:7260/api/User");
    const userResults = await response.json();
    setUserData(userResults);
  }

  useEffect(() => {
    getData()
  }, [userData])

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const com = { userItem };

    fetch(`https://localhost:7260/api/User?name=${userItem}`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(com)
    })
    getData();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setUserItem(e.target.value)
    
  };

  return (
    <main className='main'>
    <header className='header'>
      <form className='inputcontainer'>
        <input id='AddUser' type="text" placeholder='Sök konto' name='userItem' value={userItem} onChange={handleChange}/>
        {/* <input type="number" placeholder='Insättning / uttag' name='taskDescription' value={transaction} onChange={handleChange}/> */}
      </form>
      <button id='btnAddUser' onClick={handleSubmit}>Lägg till Användare</button>
    </header>
    <ul className='todolist'>
       {userData.map(c => 
      <li className='task'>{c.name} || {c.currentBalance}</li> )}
    </ul>
  </main>
  );
}

export default App;