import React, { useState } from 'react'
import { useEffect } from 'react';


const Students = () => {
  //student object
  const student = {
    id: 0,
    name: '',
    classroom: null
  }

  //useState
  const [students, setStudents] = useState([]);
  const [objStudent, setObjStudent] = useState(student);
  const [crs, setCrs] = useState([]);

  //useEffect
  useEffect(() => {
    fetch("http://localhost:8080/student/list")
    .then(response => response.json())
    .then(converted_response => setStudents(converted_response));
    fetch("http://localhost:8080/classroom/list")
    .then(response => response.json())
    .then(converted_response => setCrs(converted_response));
  }, []);

  //functions
  const getStudent = (e) => {
    setObjStudent({...objStudent, [e.target.name]:e.target.value})
  }

  //reset form
  const resetForm = () => {
    setObjStudent(student);
  }

  //register
  const register = () => {
    fetch("http://localhost:8080/student/register", {
      method: 'post',
      body: JSON.stringify(objStudent),
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
        setStudents([...students, converted_response]);
        resetForm();
      }
    })
  }

  //delete
  const remove = (id, index) => {
    fetch("http://localhost:8080/student/remove/"+id, {
      method: 'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(response => response.json())
    .then(converted_response => {
      let array = [...students];
      array.splice(index, 1);
      setStudents(array);
      resetForm();
    })
  }

  const update = () => {
    fetch("http://localhost:8080/student/update", {
      method: 'put',
      body: JSON.stringify(objStudent),
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
        let array = [...students];
        let index = array.findIndex((s => {
          return s.id === objStudent.id;
        }));
        array[index] = objStudent;
        setStudents(array);
        resetForm();
      }
    })
  }

  //select
  const selectStudent = (index) => {
    setObjStudent(students[index]);

  }

  //setClassroom
  const setClassroom = (cr) => {
    crs.map((obj) => {
      if(obj.name == cr) {
        setObjStudent(objStudent => ({...objStudent, classroom:obj}));
      }
    })
  }

  return (
    <div className='students'>
      <div className='add'>
        <h1>Add Student</h1>
        <div className='inputs'>
          <label>ID:</label>
          <input type='number' disabled className='input-id' value={objStudent.id}></input>
          <label>Name:</label>
          <input type='text' onChange={getStudent} name='name' value={objStudent.name}></input>
          <label>Classroom:</label>
          <select id="classroom" name="classroom" onChange={e=>{setClassroom(e.target.value)}}>
            <option>-</option>
            {
              crs.map(opt=><option key={opt.id}>{opt.name}</option>)
            }
          </select>
          {objStudent.id == 0 ? <button onClick={register}>Register</button> : null}
          {objStudent.id != 0 ? <button onClick={update}>Update</button> : null}
          {objStudent.id != 0 ? <button onClick={resetForm}>Cancel</button> : null}
        </div>
      </div>
      <div className='list'>
        <h1>List of students</h1>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Classroom</th>
                <th>Select</th>
                <th>Delete</th>
              </tr>
            </tbody>
        {
          students.map((obj, index) => (
            <tbody key={index}>
              <tr>
                <td>{index+1}</td>
                <td>{obj.name}</td>
                <td>{obj.classroom != null ? obj.classroom.name : null}</td>
                <td><button onClick={() => {selectStudent(index)}}>Select</button></td>
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

export default Students