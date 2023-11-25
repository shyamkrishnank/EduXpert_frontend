
import './index.css'
import LoginPage from './pages/auth/LoginPage'
import OtpPage from './pages/auth/OtpPage'
import SignupPage from './pages/auth/SignupPage'
import Landingpage from './pages/auth/LandingPage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import PrivateRoute from './util/PrivateRoute'
import InstructorPage from './pages/instructor/InstructorPage'
import UserPage from './pages/user/UserPage'
import CoursePage from './pages/instructor/course/CoursePage'
import AddTitle from './pages/instructor/course/AddCourse/AddTitle'
import AuthRoute from './util/AuthRoute'

function App() {

  return (
    <>
   <Router>
    <Routes>
      <Route path='' element={<PrivateRoute/>}>
          <Route path='' element={<Landingpage />} /> 
          <Route path='signup/otp' element={<OtpPage/>} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage/>} />
      </Route> 
         <Route path='instructor' element={<AuthRoute />}>
            <Route path = "" element={<InstructorPage />} />
            <Route path="course" >
              <Route path =  ""  element={<CoursePage />} />
              <Route path = "addtitle" element={<AddTitle />} />
            </Route>
         </Route>
         <Route path='user' element={<AuthRoute />}>
            <Route path="" element={<UserPage />} />
         </Route>
    </Routes>
   </Router>  
    </>
  )
}

export default App
