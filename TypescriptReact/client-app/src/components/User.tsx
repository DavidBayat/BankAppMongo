import React from 'react'
import App from '../App';

interface Props {
    name: string,
    currentBalance: number
}

const User = ({ name, currentBalance } : Props) => {
    return (
      <div className="task">
        <table className="content">
          <tr>
              <th>Namn</th>
              <th>Saldo</th>
          </tr>
          <tr>
              <td>{name}</td>
              <td>{currentBalance}</td>
          </tr>
        </table>
        <button
        //   onClick={() => {
        //     completeTask(task.taskName);
        //   }}
        >
          Välj
        </button>
      </div>
    );
  };
  

export default User