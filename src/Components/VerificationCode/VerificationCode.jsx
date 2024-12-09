


import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';

export default function verificationcode() {

    const navigate = useNavigate();
    let [msg, setMsg] = useState('')
    const [isLoading , setisLoading] = useState(false);

    const [error, setError] = useState(null);


  async function handleResetPassword(values) {

    
            try {
              setisLoading(true)
                let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
               console.log(data);

               //Backend
               if(data.status === "Success")
               {
                setisLoading(false);
                setMsg('');
                navigate('/NewPassword')
               }
            } 
            catch (err) {
              setisLoading(false)
                setMsg(err?.response?.data?.message)
    
            }
        }
       
  
        let formik = useFormik({
            initialValues: {
                resetCode: '',
            },
            
            onSubmit: handleResetPassword
        })
  
     
        return <>
  

        <div className='regiserBack flex justify-center items-center'>
        <div className="py-10 mx-auto shadow-2xl bg-transparent w-full max-w-5xl">

        {msg ? <div className=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                 <span className="font-medium">{msg}</span>
        </div> : ''}

            {error ? (<div className="alert alert-danger mb-3 p-2 text-center">{error}</div>) : null}
            <h2 className="p-6 Color text-lg font-bold mb-6 shadow-sm text-center">You should have recieved a reset Link, Check Your mail </h2>
            
            <form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>

                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">reset code</label>
                    </div>


                
                 <button type="submit" className="btn bg-main mt-4 d-block mx-auto bttn w-full text-center text-white hover:bg-green-800 transition">
              {isLoading?<i className='fas fa-spinner fa-spin' ></i> : "Reset Code"}
              </button>

              
             </form>
        </div>
        </div>
    
    </>
    
}

