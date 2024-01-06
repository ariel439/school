import React from 'react'
import classroom from '../assets/classroom.jpg'
import students from '../assets/students.png'
import teacher from '../assets/teacher.jpg'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  function goToClassroom(){
    navigate('/classrooms')
  }

  function goToStudents() {
    navigate('/students')
  }

  function goToTeachers() {
    navigate('/teachers')
  }

  return (
    <div className='home'>
      <h1>Home</h1>
      <div className='home-opts'>
        <div className='home-opt'>
          <img src={classroom} onClick={goToClassroom}></img>
          <h1>Classrooms</h1>
        </div>
        <div className='home-opt'>
          <img src={students} onClick={goToStudents}></img>
          <h1>Students</h1>
        </div>
        <div className='home-opt'>
          <img src={teacher} onClick={goToTeachers}></img>
          <h1>Teachers</h1>
        </div>
      </div>
    </div>
  )
}

export default Home