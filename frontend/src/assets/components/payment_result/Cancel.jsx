import { NavLink } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="bg-gray-100 max-h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg  viewBox="0 0 48 48" className=" w-24 h-16 mx-auto my-6" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
          <path fill="#D50000" d="M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18s18-8.1,18-18S33.9,6,24,6z M24,10c3.1,0,6,1.1,8.4,2.8L12.8,32.4 C11.1,30,10,27.1,10,24C10,16.3,16.3,10,24,10z M24,38c-3.1,0-6-1.1-8.4-2.8l19.6-19.6C36.9,18,38,20.9,38,24C38,31.7,31.7,38,24,38 z"/>
        </svg>
        <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p> Have a great day!  </p>
            <div className="py-10 text-center">
                <NavLink to="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                  GO BACK 
              </NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}
