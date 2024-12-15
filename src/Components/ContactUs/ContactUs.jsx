
import React from 'react'
import { motion } from 'framer-motion';
import Footer from '../Footer/Footer'

export default function ContactUs() {
  
    return <>

        <div className= "regiserBack pb-14 pt-28 px-4 justify-center items-center">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}    
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font font-bold Color text-center"
              >
                We’re here to <br /> help you solve your problem
              </motion.h1>
          
        
           {/* Cards  */}
          <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Media & Press */}
          <div className="bg-gray-100 shadow-lg text-center rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#335c3a] mb-4">Media & Press</h2>
            <p className="text-gray-600 text-md mb-6">
            Your Voice Matters
            We love hearing from our community! Whether it’s a suggestion, a compliment, or something we can improve, your feedback helps us grow.
            Use our Feedback Form to share your thoughts.
             <br /><span className='text-[#335c3a] p-3 font-bold'>Email: plantcare.hti@gmail.com</span> <br />
            Together, we can make your experience even better!
            </p>
        
          </div>

      {/* Help & Support */}
      <div className="bg-gray-100 shadow-lg  rounded-xl p-6">
        <h2 className="text-xl font-bold text-center text-[#335c3a] mb-4">
          Help & Support
        </h2>
        <p className="text-gray-600 text-start text-sm mb-4">
          We are available 24/7, 7 days a week.
        </p>
       
        <p className="text-gray-600 text-start text-sm mb-2">
        Need Help? We’re Here for You!
Our support team is ready to assist with any questions, troubleshooting, or general inquiries. Whether it’s about our services, products, or anything else, reach out to us directly:
<br /><span className='text-[#335c3a] p-3 font-bold'>Email: plantcare.hti@gmail.com</span> <br />
We strive to make your experience seamless!s.
        </p>
      </div>

      {/* Sales */}
      <div className="bg-gray-100 shadow-lg text-center rounded-xl p-6">
        <h2 className="text-xl font-bold text-[#335c3a] mb-4">Collaborate with Us</h2>
        <p className="text-gray-600 text-md leading-relaxed mb-6">
        Let’s Build Something Amazing Together
Are you interested in partnering with us or discussing a business opportunity? We’re always open to collaboration and innovative ideas. Drop us a message, and let’s explore how we can work together:
<br /><span className='text-[#335c3a] p-3 font-bold'>Email: plantcare.hti@gmail.com</span> <br />
Great things happen when we connect!
        </p>
    
      </div>
          </div>

     
    </div>

      <Footer/>
</>
}
