import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './routes/Home'
import Classrooms from './routes/Classrooms'
import Classroom from './routes/Classroom'
import Students from './routes/Students'
import Teachers from './routes/Teachers'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <Router>
        <div className='wrapper'>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/classrooms" element={<Classrooms/>}/>
            <Route path="/classrooms/:id" element={<Classroom/>}/>
            <Route path="/students" element={<Students/>}/>
            <Route path="/teachers" element={<Teachers/>}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
