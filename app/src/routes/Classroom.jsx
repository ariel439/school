import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Classroom = () => {

    //id
    const params = useParams();
    const id = params.id;

    //useState
    const [classroom, setClassroom] = useState({});
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);

    //useEffect
    useEffect(() => {
        fetch("http://localhost:8080/classroom/list/"+id)
        .then(response => response.json())
        .then(converted_response => setClassroom(converted_response));
        fetch("http://localhost:8080/student/list")
        .then(response => response.json())
        .then(converted_response => setStudents(converted_response));
        fetch("http://localhost:8080/teacher/list")
        .then(response => response.json())
        .then(converted_response => setTeachers(converted_response));
    }, []);

    const update = () => {
            fetch("http://localhost:8080/classroom/update", {
                method: 'put',
                body: JSON.stringify(classroom),
                headers:{
                    'Content-type':'application/json',
                    'Accept':'application/json'
                }
                })
                .then(response => response.json())
                .then(converted_response => { alert("Teacher updated")})
    }

    const updateTeacher = (teacherName) => {
        teachers.map((obj) => {
            if(obj.name == teacherName) {
                setClassroom(classroom => ({...classroom, teacher:obj}));
            }
        })
    }


    return (
        <div className='cr'>
            <h1 className='cr-title'>Classroom {classroom.name}</h1>
            <div className='cr-teacher'>
                <h2>Teacher: </h2>
                {classroom.teacher != undefined ? <h2>{classroom.teacher.name}</h2> : null}
            </div>
            <div className='cr-change-teacher'>
                <label>Change Teacher:</label>
                <select id="teacher" name="teacher" onChange={e=>{updateTeacher(e.target.value)}}>
                    <option>-</option>
                    {
                        teachers.map(opt=><option key={opt.id}>{opt.name}</option>)
                    }
                </select>
                <button onClick={update}>Confirm</button>
            </div>
            <h2>Student List</h2>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Remove</th>
                    </tr>
                </tbody>
                {
                    students.map((obj,index) => (
                        obj.classroom != null && obj.classroom.id == id ?
                        <tbody key={index}>
                            <tr>
                                <td>{index+1}</td>
                                <td>{obj.name}</td>
                                <td><button>Remove</button></td>
                            </tr>
                      </tbody>
                      : null
                    ))
                }
            </table>
        </div>
    )
}

export default Classroom