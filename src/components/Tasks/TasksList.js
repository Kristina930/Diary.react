import React from 'react';
import axios from "axios";
import AddTasksForm from './AddTasksForm';
import Task from './Task';

import editSvg from '../../assets/img/edit.svg';

import './tasks.scss';



const TasksList = ({ list, onEditTitle, onAddTask, onRemoveTask, onEditTask, withoutEmpty,}) => {



  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name );
      if(newTitle) {
        onEditTitle(list.id, newTitle);
        axios
        .patch('http://localhost:3001/lists' + list.id, {
          name: newTitle
        })
        .catch(() => {
          alert('Ошибка: не удалось обновить название списка');
        });
      }
  }

  


  return (
    <div className="tasks">
      <h2 style={{color: list.color.hex}} className="tasks__title">
        {list.name}
      <img 
        onClick={editTitle}
        src={editSvg} 
        alt='Edit icon'/> 
      </h2>
      <div className='tasks__items'>
      {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {
          list.tasks.map(task => (
           <Task 
           key={task.id} {...task} 
           list={list} 
           onEdit={onEditTask} 
           onRemove={onRemoveTask}/>
          ))
        }

        <AddTasksForm list={list} onAddTask={onAddTask}/>
        
      </div>
    </div>
  )
}

export default TasksList;