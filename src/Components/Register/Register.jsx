
import React, { useContext } from 'react'
import { useState } from 'react' 
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import registerPicture2 from '../../assets/gradMaterial/rafiki2.png'; 


export default function Register() {
  

  let navigate = useNavigate();
  // let {setUserLogin} = useContext(UserContext)

  const [apiError , setapiError] = useState('');
  const [isLoading , setisLoading] = useState(false);

  let validationSchema = Yup.object().shape({

    name: Yup.string()
    .max(100, 'Name must be at most 100 characters long.')
    .required('Name is required'),

      Email:Yup.string().email('Invalid email!').required('email required'),
      Phone:Yup.string().matches(/^01[0125]\d{8}$/, 'invalid phone number..').required(' phone required'),
      Password:Yup.string().matches(/^[A-Za-z\d@$!%*?&]{8,100}$/, 'Password must be characters include letters, numbers, and special symbols, without spaces...').required('password required'),

      ConfirmPassword:Yup.string().required('repassword required').oneOf([Yup.ref('Password')], 'Passwords must match'),

  })

//   async function handleRegister(vals){

//       setisLoading(true);

//       await axios.post(`/api/User/register`, vals)
      
//       .then( (apiResponse) => {

//         if(apiResponse?.data?.message === 'Registration successful'){
//           localStorage.setItem('userToken' , apiResponse.data?.token )
//           setUserLogin(apiResponse.data?.token)
//           navigate('/login');
//           setisLoading(false);
//           console.log(vals)
//         }
        
//       })

//       .catch((apiResponse) =>{
//         setisLoading(false);
//         setapiError(apiResponse?.response?.data?.message)
//       })
      
// }

async function handleRegister(vals) {
  setisLoading(true);

  await axios.post("/api/User/register", vals)
    .then((apiResponse) => {
      if (apiResponse?.data === 'Registration successful') {
        navigate('/login');
      }
      setisLoading(false);
    })
    .catch((apiResponse) => {
      setisLoading(false);
      setapiError(apiResponse?.response?.data?.message || 'An error occurred');
    });
}


    let formik = useFormik({
      initialValues:{
        name:'',
        Email:'',
        Password:'',
        ConfirmPassword:'',
        Phone:''
      },
      validationSchema,
      onSubmit:handleRegister
    })






return <>
    <div className="regiserBack p-5 ">
      <div className="container px-4 mx-auto mt-20 pb-12 ">
        {apiError ? (<div className="mt-5 p-4 m-4 text-sm text-red-800 rounded-lg bg-red-200" role="alert">{apiError}
          </div>
        ) : null}

        <div className="flex flex-col lg:flex-row items-center justify-between shadow-2xl rounded-lg w-full max-w-5xl mx-auto pb-12 p-8">

          <div className="flex-shrink-0 border-r border-gray-400 ">
            <img className="mx-auto md:w-[500px] w-full pt-4 pb-4" src={registerPicture2} alt="Login Illustration"/>
          </div>

          <form onSubmit={formik.handleSubmit} className="w-full max-w-md mx-auto p-6 text-start">

           <div className="relative z-0 w-full ms-5 mb-6 group">
               <input  id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name"  className="block text-gray-900 py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
               <label htmlFor="name" className="flex items-center peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-user p-1"></i>Enter your name</label>
               {formik.errors.name && formik.touched.name ?<div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
               {formik.errors.name}
               </div> : null}
           </div>

          
           <div className="relative z-0 w-full ms-5 mb-6 group">
               <input  id="Email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Email} type="Email" name="Email"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=''/>
               <label htmlFor="Email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-envelope p-1" style={{ color: '1E1E1E' }}></i>Enter your Email</label>
               {formik.errors.Email && formik.touched.Email ?<div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
               {formik.errors.Email}
             </div> : null}
           </div>


           <div className="relative z-0 w-full ms-5 mb-6 group">
               <input  id="Password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Password} type="Password" name="Password"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=''/>
               <label htmlFor="Password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-lock p-1"></i>Enter your Password</label>
               {formik.errors.Password && formik.touched.Password ?<div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
               {formik.errors.Password}
             </div> : null}
           </div>


           <div className="relative z-0 w-full ms-5 mb-6 group">
               <input  id="ConfirmPassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.ConfirmPassword} type="password" name="ConfirmPassword"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"placeholder='' />
               <label htmlFor="ConfirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-lock p-1"></i>Confirm your Password</label>
                 {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword ?<div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
               {formik.errors.ConfirmPassword}
             </div> : null}
           </div>

           <div className="relative z-0 w-full ms-5 mb-6 group">
               <input  id="Phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Phone} type="tel" name="Phone"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=''/>
               <label htmlFor="Phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"><i className="fa-solid fa-phone p-1"></i>Enter your Phone</label>
                 {formik.errors.Phone && formik.touched.Phone ?<div className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
               {formik.errors.Phone}
             </div> : null}
           </div>
          
        
           <button type="submit" className="bttn w-full ms-5 text-center text-white p-3 rounded-md hover:bg-green-700 transition">
             {isLoading?<i className='fas fa-spinner fa-spin' ></i> : "Sign Up"}
           </button>

           <div className=''>
           <p className=" mt-6 text-center text-gray-700">Already have an account?<Link to={'/login'}> <span className='text-main'>Login</span></Link> </p>

           </div>
         </form>

        </div>
      </div>
        
    </div>
  </>
}


