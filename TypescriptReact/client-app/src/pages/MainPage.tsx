import React, { ChangeEvent, useEffect, useState } from 'react';
import '../App.css';
import User from '../components/User';

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



function MainPage() {
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
    <main className='App'>
    <header className='header'>
      <form className='inputcontainer'>
        <input id='txtTodoItemToAdd' type="text" placeholder='Skapa nytt' name='userItem' value={userItem} onChange={handleChange}/>
        {/* <input type="number" placeholder='Insättning / uttag' name='taskDescription' value={transaction} onChange={handleChange}/> */}
      </form>
      <button className='button' id='btnAddUser' onClick={handleSubmit}>Lägg till</button>
    </header>
    <div className='App_table'>
    <table>
        <tr>
          <th>Kontonamn</th>
          <th>Saldo</th>
          <th>  </th>
        </tr>
        {userData.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.currentBalance}</td>
              <td><a href="">Välj</a></td>
            </tr>
          )
        })}
      </table>
       {/* {userData.map(item => {
         return <User key={item.id} name={item.name} currentBalance={item.currentBalance} /> })
        } */}
    </div>
  </main>
  );
}

export default MainPage;