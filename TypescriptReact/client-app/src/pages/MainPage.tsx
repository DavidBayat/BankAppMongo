import React, { ChangeEvent, useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


interface User {
  id: any,
  name : any,
  currentBalance: any,
}



function MainPage() {
  const [userData, setUserData] = useState<User[]>([]);
  const [userItem, setUserItem] = useState<string>('');
  
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
              <td><Link to={`/User/${val.id}`}>Välj</Link></td>
            </tr>
          )
        })}
      </table>
      <div className='header'>
      <form>
        <input id='txtTodoItemToAdd' type="text" placeholder='Skapa nytt' name='userItem' value={userItem} onChange={handleChange}/>
      </form>
      <button className='button' id='btnAddUser' onClick={handleSubmit}>Lägg till</button>
    </div>
    </div>
    
  </main>
  );
}

export default MainPage;