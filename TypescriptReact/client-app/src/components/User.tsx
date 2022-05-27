import React from 'react'
import App from '../App';

interface Props {
    name: string,
    currentBalance: number
}

const User = ({ name, currentBalance } : Props) => {
    return (
      <div className="task">
        <div className="content">
          <span>{name}</span>
          <span>{currentBalance}</span>
        </div>
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