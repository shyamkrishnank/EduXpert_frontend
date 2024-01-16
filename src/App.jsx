
import './index.css'
import 'video-react/dist/video-react.css';
import LoginPage from './pages/auth/LoginPage'
import OtpPage from './pages/auth/OtpPage'
import SignupPage from './pages/auth/SignupPage'
import Landingpage from './pages/auth/LandingPage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import InstructorPage from './pages/instructor/home/InstructorPage'
import UserPage from './pages/user/home/UserPage'
import CoursePage from './pages/instructor/course/CoursePage'
import AddTitle from './pages/instructor/course/AddCourse/AddTitle'
import AuthUserRoute from './util/AuthUserRoute'
import AdminLogin from './pages/admin/login/AdminLogin'
import AddChapters from './pages/instructor/course/AddCourse/AddChapters'
import ToastContainer from './components/ToastDiv'
import Profile from './pages/instructor/profile/Profile'
import CourseView from './pages/instructor/course/CourseView';
import CourseChapter from './pages/instructor/course/CourseChapter';
import AdminHome from './pages/admin/home/AdminHome';
import AdminCourse from './pages/admin/course/AdminCourse';
import AdminCourseView from './pages/admin/course/AdminCourseView';
import AdminUsers from './pages/admin/users/AdminUsers';
import AdminUserView from './pages/admin/users/AdminUserView';
import AdminInstructors from './pages/admin/Instructor/AdminInstructor';
import AdminInstructorView from './pages/admin/Instructor/AdminInstructorView';
import UserProfile from './pages/user/profile/UserProfile';
import UserCourseView from './pages/user/course/UserCourseView';
import AuthInstructorRoute from './util/AuthInstructorRoute';
import InitialAuth from './util/InitialAuth';
import AuthAdminAuth from './util/AuthAdminRoute';
import Loading from './components/loading/Loading';
import UserCourseDetail from './pages/user/course/UserCourseDetail';
import OrderPage from './pages/user/course/OrderPage';
import InstructorProfile from './pages/user/instructor/InstructorProfile';
import ChatPage from './pages/user/chat/ChatPage';
import ChatPageIns from './pages/instructor/chat/ChatPageIns';
import Orders from './pages/instructor/orders/Orders';
import OrderDetailPage from './pages/instructor/orders/OrderDetailPage';
import Wallet from './pages/instructor/wallet/Wallet';
import { useSelector } from 'react-redux';


function App() {
  const loading = useSelector(state=>state.loading.loading)
  return (
    <>
   <Router>
    <Routes>
      <Route path='loading' element={<Loading/>} />
        <Route path='/'  element={<InitialAuth />}>
           <Route path='home' element={<Landingpage />} /> 
           <Route path='signup/otp' element={<OtpPage/>} />
           <Route path='login' element={<LoginPage />} />
           <Route path='signup' element={<SignupPage/>} /> 
           <Route path='admin' element={<AdminLogin />} />  
        </Route> 
         <Route path='instructor' element={<AuthInstructorRoute />}  >
          <Route index element={<InstructorPage />} />
          <Route path="course" >
              <Route index  element={<CoursePage />} />
              <Route path = "addtitle" element={<AddTitle />} />
              <Route path='addchapter/:course_id' element={<AddChapters />} />
              <Route path='view/:course_id' element={<CourseView/>} />
              <Route path='chapters/:course_id' element={<CourseChapter />} />
             </Route>
            <Route path='profile' >
              <Route index element={<Profile />} />
            </Route>
            <Route path='chats'>
              <Route index element={<ChatPageIns />} />
            </Route>
            <Route path='orders'>
              <Route index element={<Orders/>} />
              <Route path='order/:order_id' element={<OrderDetailPage />} />
            </Route>
            <Route path='mywallet' element={<Wallet />} />
         </Route>
         <Route path='user' element={<AuthUserRoute />}>
            <Route index element={<UserPage />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='course' >
                <Route path=':category_id' element={<UserCourseView />} />
                <Route path='view/:course_id' element={<UserCourseDetail />} />
            </Route>
            <Route path='mylearning' element={<OrderPage/>} /> 
            <Route path='instructor/:instructor_id' element={<InstructorProfile/>} />
            <Route path='chat/:instructor_id' element={<ChatPage />} />
         </Route>
         <Route path="eduadmin" element={<AuthAdminAuth />}>
             <Route index element={<AdminHome />} />
             <Route path='course' >
                <Route path ="" element={<AdminCourse />} />
                 <Route path='view' element={<AdminCourseView/>} />
             </Route>
             <Route path='users' >
                <Route path="" element={<AdminUsers />} />
                <Route path='view' element={<AdminUserView />} />

             </Route>
             <Route path='instructors'>
              <Route path="" element={<AdminInstructors />} />
              <Route path='view' element={<AdminInstructorView />} />
             </Route>

         </Route>
    </Routes>
   </Router> 
   <ToastContainer />   
   {loading &&   <Loading /> }
 
   </>
  )
}

export default App
