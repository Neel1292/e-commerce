import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../../redux/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../utils/Loader';
import { useEffect, useState } from 'react';
import getLoginStatus from '../../utils/getLoginStatus';

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  let loginStatus = useSelector((state) => state.users)
  const [status, setStatus] = useState('idel');


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    setStatus(loginStatus.status)
  }, [loginStatus])

  async function onSubmit(data) {
      await dispatch(loginUserAsync(data));
      console.log(status);
      if (status == 'success') {
        navigate('/');
      } else {
        navigate('/login');
      }
  }

  return (
    <>
    {(isSubmitting || status === 'loading') ? <Loader /> :
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex items-start flex-col justify-start mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Role:</label>
            <select {...register("role", { required: true })} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" >
                <option className='options' value="user" defaultChecked>User</option>
                <option className='options' value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input type="email" {...register("email", { required: { value: true, message: "Email cannot be empty" }})} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
          </div>
          {errors.email && <span className='text-red-600 text-sm'>{errors.email.message}</span>}

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input type="password" {...register("password", { required: { value: true, message: "Name cannot be empty" } })} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
            <a href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot Password?</a>
          </div>
          {errors.password && <span className='text-red-600 text-sm'>{errors.password.message}</span>}

          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}>
             {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <div className="flex items-center justify-between mb-4">
            <span>Create a Account ? 
            <NavLink to="/signup"
              className="text-s text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Click Here</NavLink>
            </span>
          </div>
        </form>
        {/* {loginStatus === 'failed' && <div className="text-red-500 text-center mt-4">{loginError}</div>} */}
      </div>
      </div>
    }
    </>
  )
}
