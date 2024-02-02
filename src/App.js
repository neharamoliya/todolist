
import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, settask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTask, setEditTask] = useState();
  const [search, setsearch] = useState('');
  const [reset, setreset] = useState([]);

  function handleSubmit() {
    if (editTask !== undefined) {
      const updatedTodos = [...todos];
      updatedTodos[editTask] = { text: task, completed: false };
      setTodos(updatedTodos);
      setEditTask(undefined);
    } else if (task.trim() !== '') {
      setTodos([...todos, { text: task, completed: false }]);
      setreset([...reset, { text: task, completed: false }]);
    }
    settask('');
  }

  const handleDelete = (value) => {
    const updatedTasks = todos.filter((todo) => todo.text !== value);
    setTodos(updatedTasks);
  };

  const handleEdit = (index) => {
    settask(todos[index].text);
    setEditTask(index);
  };

  const handleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
    setTodos(updatedTodos);
    setreset(updatedTodos);
  };

  const Clickbtn = () => {
    const click = [...reset];
    var data = click.filter((todo) => {
      return todo.text === search;
    })
    setTodos(data);
    setsearch("");
  };

  const Combtn = () => {
    const completebtn = reset.filter((todo) => {
      return todo.completed === true;
    });
    setTodos(completebtn);
  };

  const unCombtn = () => {
    const completebtn = reset.filter((todo) => {
      return todo.completed === false;
    });
    setTodos(completebtn);
  };

  const allbtn = () => {
    setTodos([...reset]);
  }

  return (
    <center>
      <div className='App'>
        <p>To-Do List</p>
        <div className="box">
          <input type='text' value={task} onChange={(e) => settask(e.target.value)} className="input" />
          <button onClick={handleSubmit} className="addbtn">Add</button>
        </div>
        <ul>
          <div className='search'>
            <input type='text' placeholder='serch' value={search} onChange={(e) => setsearch(e.target.value)} className="serch-bar"></input>
          </div>
          <div className='event'>
            <button onClick={Clickbtn}>check</button>
            <button onClick={Combtn}>completed</button>
            <button onClick={unCombtn}>uncompleted</button>
            <button onClick={allbtn}>all</button>
          </div>
          <div className='task'>
            {todos.map((todo, index) => (
              <li key={index} className="btnn" >
                <div>
                  <input type='checkbox' checked={todo.completed} onChange={() => handleComplete(index)} style={{ margin: '0px 10px 0px 0px' }} className="check"></input>
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                  <button onClick={() => handleDelete(todo.text)} className="del">Delete</button>
                  <button onClick={() => handleEdit(index)} className="edit">Edit</button>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </center>
  );
}

export default App;