import React, { useState } from 'react'
import { useEffect } from 'react';

const Teachers = () => {

  //teacher object
  const teacher = {
    id: 0,
    name: '',
    classrooms: [],
  }

  //useState
  const [teachers, setTeachers] = useState([]);
  const [objTeacher, setObjTeacher] = useState(teacher);

  //useEffect
  useEffect(() => {
    fetch("http://localhost:8080/teacher/list")
    .then(response => response.json())
    .then(converted_response => setTeachers(converted_response));
  }, []);

  //functions
  const getTeacher = (e) => {
    setObjTeacher({...objTeacher, [e.target.name]:e.target.value})
  }

  //reset form
  const resetForm = () => {
    setObjTeacher(teacher);
  }

  //register
  const register = () => {
    fetch("http://localhost:8080/teacher/register", {
      method: 'post',
      body: JSON.stringify(objTeacher),
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
        setTeachers([...teachers, converted_response]);
        resetForm();
      }
    })
  }

  //delete
  const remove = (id, index) => {
    fetch("http://localhost:8080/teacher/remove/"+id, {
      method: 'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(response => response.json())
    .then(converted_response => {
      let array = [...teachers];
      array.splice(index, 1);
      setTeachers(array);
      resetForm();
    })
  }

  const update = () => {
    fetch("http://localhost:8080/teacher/update", {
      method: 'put',
      body: JSON.stringify(objTeacher),
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
        let array = [...teachers];
        let index = array.findIndex((t => {
          return t.id === objTeacher.id;
        }));
        array[index] = objTeacher;
        setTeachers(array);
        resetForm();
      }
    })
  }

  //select
  const selectTeacher = (index) => {
    setObjTeacher(teachers[index]);

  }

  return (
    <div className='teachers'>
      <div className='add'>
        <h1>Add Teacher</h1>
        <div className='inputs'>
          <label>ID:</label>
          <input type='number' disabled className='input-id' value={objTeacher.id}></input>
          <label>Name:</label>
          <input type='text' onChange={getTeacher} name='name' value={objTeacher.name}></input>
          {objTeacher.id == 0 ? <button onClick={register}>Register</button> : null}
          {objTeacher.id != 0 ? <button onClick={update}>Update</button> : null}
          {objTeacher.id != 0 ? <button onClick={resetForm}>Cancel</button> : null}
        </div>
      </div>
      <div className='list'>
        <h1>List of teachers</h1>
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
          teachers.map((obj, index) => (
            <tbody key={index}>
              <tr>
                <td>{index+1}</td>
                <td>{obj.name}</td>
                <td><button onClick={() => {selectTeacher(index)}}>Select</button></td>
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

export default Teachers