
import './index.css'
import 'video-react/dist/video-react.css';

import LoginPage from './pages/auth/LoginPage'
import OtpPage from './pages/auth/OtpPage'
import SignupPage from './pages/auth/SignupPage'
import Landingpage from './pages/auth/LandingPage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import PrivateRoute from './util/PrivateRoute'
import InstructorPage from './pages/instructor/home/InstructorPage'
import UserPage from './pages/user/UserPage'
import CoursePage from './pages/instructor/course/CoursePage'
import AddTitle from './pages/instructor/course/AddCourse/AddTitle'
import AuthRoute from './util/AuthRoute'
import AdminLogin from './pages/admin/AdminLogin'
import AddChapters from './pages/instructor/course/AddCourse/AddChapters'
import ToastContainer from './components/ToastDiv'
import Profile from './pages/instructor/profile/Profile'
import CourseView from './pages/instructor/course/CourseView';


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
                <Route path='addchapter' element={<AddChapters />} />
                <Route path='view' element={<CourseView/>} />
            </Route>
            <Route path='profile' >
              <Route path='' element={<Profile />} />

            </Route>
         </Route>
         <Route path='user' element={<AuthRoute />}>
            <Route path="" element={<UserPage />} />
         </Route>
         <Route path="eduadmin">
             <Route path='' element={<AdminLogin />} />
             
         </Route>
    </Routes>
   </Router> 
   <ToastContainer /> 
    </>
  )
}

export default App
