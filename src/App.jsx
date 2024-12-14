import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home'
import Library from './Components/Library/Library'
import EnviroAnalysis from './Components/EnviroAnalysis/EnviroAnalysis'
import Chatbot from './Components/Chatbot/Chatbot'
import AboutUs from './Components/AboutUs/AboutUs'
import FloaraCheck from './Components/FloraCheck/FloraCheck'
import ContactUs from './Components/ContactUs/ContactUs'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerificationCode from './Components/VerificationCode/VerificationCode'
import NewPassword from './Components/NewPassword/NewPassword'
import PlantDetails from './Components/PlantDetails/PlantDetails'
import EmailConfirmation from './Components/EmailConfirmation/emailConfirmation'


const router = createBrowserRouter([

  {path: '', element: <Layout/> , children:[
    {index:true , element: <Landing/>},
    {path: 'home', element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path: 'library', element: <ProtectedRoute><Library/></ProtectedRoute>},
    {path: 'floraCheck', element: <ProtectedRoute><FloaraCheck/></ProtectedRoute>},
    {path: 'eviroAnalysis', element: <ProtectedRoute><EnviroAnalysis/></ProtectedRoute>},
    {path: 'chatbot', element: <ProtectedRoute><Chatbot/></ProtectedRoute>},
    {path: 'aboutUs', element: <ProtectedRoute><AboutUs/></ProtectedRoute>},
    {path: 'contactUs', element: <ProtectedRoute><ContactUs/></ProtectedRoute>},
    {path: 'plantDetails/:id', element: <ProtectedRoute><PlantDetails/></ProtectedRoute>},

    {path: 'forgetPassword', element: <ForgetPassword/>},
    {path: 'verificationCode', element: <VerificationCode/>},
    {path: 'NewPassword', element: <NewPassword/>},
    {path: 'register', element:  <Register/>},
    {path: 'login', element: <Login/>},
    {path: 'emailConfirmation', element: <EmailConfirmation/>},
    {path: '*', element: <NotFound/>},  
]},  
]);



export default function App() {

  return <>
      
      <UserContextProvider>
      <RouterProvider router={router} />
      </UserContextProvider>
  </>
}
