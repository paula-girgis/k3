
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false); 

  async function handleSubmit(values) {
    setisLoading(true);

    const { data } = await axios
      .post("/api/User/forget-password", values)
      .catch((err) => {
        setError(err.response.data.message);
        setisLoading(false);
      });

    if (data?.message === "you will receive reset instructions,check your email.") {
      console.log(data.message);
      setIsLinkSent(true);
      setisLoading(false);
    }
  }
  const validationSchema = Yup.object({Email: Yup.string().required("Email is required").email("Enter a valid email"),});

  const formik = useFormik({
    initialValues: {
      Email: "",},
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="regiserBack flex justify-center items-center">
        <div className="py-10 px-6 mx-auto shadow-2xl bg-transparent rounded-xl w-full max-w-5xl">
          {error ? (
            <div
              className="mx-auto p-4 mt-6 text-sm text-red-900 rounded-lg bg-red-200 max-w-5xl"
              role="alert">
              {error}
            </div>
          ) : null}

          <h2 className="p-6 Color font-bold text-lg">Forget Password</h2>
          {isLinkSent ? (
            <h2 className="p-6 Color text-lg font-bold mb-6 shadow-sm text-center">
              You should have received a reset link. Check your mail.
            </h2>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="relative z-0 w-full ms-5 mb-6 group ">
                <input
                  id="Email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Email}
                  type="email"
                  name="Email"
                  className="block py-3 pe-48 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                />
                <label
                  htmlFor="Email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
                >
                  <i className="fa-solid fa-lock p-1 "></i>Enter your Email
                </label>

                {formik.errors.Email && formik.touched.Email ? (
                  <div
                    className="p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.Email}
                  </div>
                ) : null}
              </div>

              <button type="submit" className="btn bg-main w-25 mt-4 d-block mx-auto bttn w-full text-center text-white hover:bg-green-700 transition">
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>) : ("Send me a reset link")}
              </button>
            </form>
          )}
        </div>
      </div>
</>
);
}