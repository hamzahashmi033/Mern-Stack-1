import React, { useEffect  } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from './components/About/About';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import AdminUsers from './components/Admin/AdminUsers/AdminUsers';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ForgetPassword from './components/Auth/ForgetPassword';
import Login from './components/Auth/Login';
import ResetPassword from './components/Auth/ResetPassword';
import Signup from './components/Auth/Signup';
import Contact from './components/Contact/Contact';
import Courses from './components/Courses/Courses';
import Home from "./components/Home/Home"
import Header from './components/Layout/Header/Header';
import Notfound from './components/Layout/NotFound/Notfound';
import PaymentFail from './components/Payments/PaymentFail';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import Subscribe from './components/Payments/Subscribe';
import ChangePassword from './components/Profile/ChangePassword';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import Request from './components/Request/Request';
import toast, { Toaster } from "react-hot-toast"
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
import { ProtectedRoute } from 'protected-route-react'
import Loader from './components/Layout/Loader/Loader';
import Payment from './components/Payments/Payment';
import { loadStripe } from "@stripe/stripe-js";
import CoursePage from './components/CoursePage/CoursePage';

import { Elements } from "@stripe/react-stripe-js";


function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });
  const dispatch = useDispatch()
  const { isAuthenticated, error, user, message, loading } = useSelector(state => state.user)
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({
        type: "clearError"
      })
    }
    if (message) {
      toast.success(message)
      dispatch({
        type: "clearMessage"
      })
    }
    // stripeApikeyFunc()
  }, [dispatch, error, message])
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        {
          loading ? (<Loader />) : (
            <>
              <Header isAuthenticated={isAuthenticated} user={user} />
              <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/course/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CoursePage user={user}/>
                </ProtectedRoute>} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/request' element={<Request />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                  <Login />
                </ProtectedRoute>} />
                <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} >
                  <Profile user={user} />
                </ProtectedRoute>} /> 
                <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated} > <ChangePassword /></ProtectedRoute>} />
                <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><UpdateProfile user={user} /></ProtectedRoute>} />
                <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/">
                  <Signup />
                </ProtectedRoute>} />
                <Route path='/subscribe' element={<ProtectedRoute isAuthenticated={isAuthenticated} ><Subscribe /></ProtectedRoute>} />
                <Route path='/payment' element={<ProtectedRoute isAuthenticated={isAuthenticated} >

                  <Elements stripe={loadStripe("pk_test_51LyEYJGTxrUiQJcebcnVJNavRdzhYgU0OqE2iUFHwy2zA7bx14MXGlKGzli3yBO12A3LcfJdAwuYB3ZMDtPQE7sN00mveNv1ZE")}>
                    <Payment />
                  </Elements>

                </ProtectedRoute>} />
                <Route path='/paymentsuccess' element={<PaymentSuccess />} />
                <Route path='/paymentfail' element={<PaymentFail />} />
                <Route path='*' element={<Notfound />} />
                <Route path='/forget-password' element={<ProtectedRoute isAuthenticated={!isAuthenticated} >
                  <ForgetPassword />
                </ProtectedRoute>} />
                <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} >
                  <ResetPassword />
                </ProtectedRoute>} />

                {/* Admin Routes */}
                <Route path='/admin/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><Dashboard /></ProtectedRoute>} />
                <Route path='/admin/createcourse' element={<CreateCourse />} />
                <Route path='/admin/courses' element={<AdminCourses />} />
                <Route path='/admin/users' element={<AdminUsers />} />


              </Routes>
              <Toaster />
            </>
          )
        }
      </BrowserRouter>
    </>
  );
}

export default App;
