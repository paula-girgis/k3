

import React, { useContext } from 'react'
import { useState } from 'react' 
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import {  Link, useNavigate } from 'react-router-dom';
import LoginPicture3 from '../../assets/gradMaterial/Login11.png'; 
import { UserContext } from '../../Context/UserContext';


export default function Login() {

  let navigate = useNavigate();

  const [apiError , setapiError] = useState('');
  const [isLoading , setisLoading] = useState(false);
  
  let {setUserLogin} = useContext(UserContext)

    let validationSchema = Yup.object().shape({

      email:Yup.string().email('Invalid email!').required(' email required'),
      password:Yup.string().matches(/^[A-Za-z\d@$!%*?&]{8,100}$/, 'invalid password..').required('password required'),

})



  async function handleLogin(vals) {
    setisLoading(true);
    try {
      const response = await axios.post('/api/User/login', vals);
      
      if (response?.data?.message === 'Login Successful') {
        localStorage.setItem('userToken', response?.data?.token);
        setUserLogin(response.data.token);
        navigate('/home');

      } else {
        setapiError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle the error gracefully
      setapiError(error?.response?.data?.message || 'An error occurred during login');
    } finally {
      setisLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  
  return <>
    
    <div className="regiserBack shadow-2xl w-full py-14 ">

      {apiError ?<div className="mx-auto p-4 mt-20 text-sm text-red-900 rounded-lg bg-red-200 max-w-5xl" role="alert">
      {apiError}</div> : null}
      <div className="mx-auto mt-8 shadow-2xl rounded-lg w-full max-w-5xl pb-3">
        <div className="flex flex-col md:flex-row  gap-6  p-12 items-center">

          {/* Image */}
          <div className="flex-shrink-0 border-r border-gray-400 md:pr-8">
            <img className="mx-auto md:w-[400px] w-full pt-4 pb-4" src={LoginPicture3} alt="Login Illustration"/>
          </div>

          {/* Form  */}
          <form onSubmit={formik.handleSubmit} className="w-full max-w-md mx-auto text-start">
                
         <div className="relative z-0 w-full ms-5 mb-6 group ">
            <input  id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email"  className="block py-3 pe-48 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"><i className="fa-solid fa-lock p-1 "></i>Enter your Email</label>

                {formik.errors.email && formik.touched.email ?<div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.email}
              </div> : null}
         </div>


         <div className="relative z-0 w-full ms-5 mb-6  group">
             <input  id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password"  className="block py-3 pe-48 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" />
             <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"><i className="fa-solid fa-lock p-1 "></i>Enter your password</label>
             {formik.errors.password && formik.touched.password ?<div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
             {formik.errors.password}
           </div> : null}

         </div>


         <button type="submit" className="bttn w-full ms-5 C1 text-center text-white p-3 rounded-md hover:bg-green-700 transition">
           {isLoading?<i className='fas fa-spinner fa-spin' ></i> : "Sign in"}

         </button>

          <div className='text-center mt-5'>
            <Link className='text-main' to="/forgetpassword"> Forget Password... ?</Link>
          </div>

          </form>

        </div >
        
      </div>
    </div>
    </>;
}

