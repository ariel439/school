import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Classrooms = () => {
//classroom object
const classroom = {
  id: 0,
  name: '',
  students: [],
  teacher: null
}

//useState
const [classrooms, setClassrooms] = useState([]);
const [objClassroom, setObjClassroom] = useState(classroom);

//useEffect
useEffect(() => {
  fetch("http://localhost:8080/classroom/list")
  .then(response => response.json())
  .then(converted_response => setClassrooms(converted_response));
}, []);

//functions
const getClassroom = (e) => {
  setObjClassroom({...objClassroom, [e.target.name]:e.target.value})
  console.log(objClassroom);
}

//reset form
const resetForm = () => {
  setObjClassroom(classroom);
}

//register
const register = () => {
  fetch("http://localhost:8080/classroom/register", {
    method: 'post',
    body: JSON.stringify(objClassroom),
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json'
    }
  })
  .then(response => response.json())
  .then(converted_response => {
    if(converted_response.msg !== undefined){
      alert(converted_response.msg);
    } else {
      setClassrooms([...classrooms, converted_response]);
      resetForm();
    }
  })
}

//delete
const remove = (id, index) => {
  fetch("http://localhost:8080/classroom/remove/"+id, {
    method: 'delete',
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json'
    }
  })
  .then(response => response.json())
  .then(converted_response => {
    let array = [...classrooms];
    array.splice(index, 1);
    setClassrooms(array);
    resetForm();
  })
}

const update = () => {
  fetch("http://localhost:8080/classroom/update", {
    method: 'put',
    body: JSON.stringify(objClassroom),
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json'
    }
  })
  .then(response => response.json())
  .then(converted_response => {
    if(converted_response.msg !== undefined){
      alert(converted_response.msg);
    } else {
      let array = [...classrooms];
      let index = array.findIndex((c => {
        return c.id === objClassroom.id;
      }));
      array[index] = objClassroom;
      setClassrooms(array);
      resetForm();
    }
  })
}

//select
const selectClassroom = (index) => {
  setObjClassroom(classrooms[index]);
}

return (
  <div className='classrooms'>
    <div className='add'>
      <h1>Add Classroom</h1>
      <div className='inputs'>
        <label>ID:</label>
        <input type='number' disabled className='input-id' value={objClassroom.id}></input>
        <label>Name:</label>
        <input type='text' onChange={getClassroom} name='name' value={objClassroom.name}></input>
        {objClassroom.id == 0 ? <button onClick={register}>Register</button> : null}
        {objClassroom.id != 0 ? <button onClick={update}>Update</button> : null}
        {objClassroom.id != 0 ? <button onClick={resetForm}>Cancel</button> : null}
      </div>
    </div>
    <div className='list'>
      <h1>List of classrooms</h1>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Select</th>
              <th>Delete</th>
            </tr>
          </tbody>
      {
        classrooms.map((obj, index) => (
          <tbody key={index}>
            <tr>
              <td>{index+1}</td>
              <td><Link to={"/classrooms/"+obj.id}>{obj.name}</Link></td>
              <td><button onClick={() => {selectClassroom(index)}}>Select</button></td>
              <td><button onClick={() => {remove(obj.id, index)}}>DELETE</button></td>
            </tr>
          </tbody>
        ))
      }
        </table>
    </div>
  </div>
)
}

export default Classrooms