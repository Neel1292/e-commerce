import { useForm } from 'react-hook-form';
import '../styles/Signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAsync } from '../../redux/userSlice';
import Loader from '../../utils/Loader';

export default function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let signupStatus = useSelector((state) => state.users?.status) || 'idle';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(data){
    dispatch(createUserAsync(data))
    console.log(signupStatus);
    if(signupStatus === 'succeeded') {
      navigate('/');
    }
  }

  return (
    <>
    {isSubmitting && <Loader />}
    <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to E-Commerce</h1>
      <form action="#" onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <div className="flex items-start flex-col justify-start">
          <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
          <input type="text" {...register("name", { required: { value: true, message: "Name cannot be empty" } })} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter Fullname'/>
        </div>
        {errors.name && <span className='text-red-600 text-sm'>{errors.name.message}</span>}

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Contact Number:</label>
          <input type="number" {...register("phone", { required: { value: true, message: "Contact Number is Required"}, maxLength: { value: 10, message: "Contact Number is should be of length 10" } })} className="appearance-none w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter Contact Number'/>
        </div>
        {errors.phone && <span className='text-red-600 text-sm'>{errors.phone.message}</span>}

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="address" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Address:</label>
          <input type="text" {...register("address", { required: { value: true, message: "Address is Required" }, maxLength: { value: 245, message: "Address should be of length 245" }})} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter Address'/>
        </div>
        {errors.address && <span className='text-red-600 text-sm'>{errors.address.message}</span>}

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="role" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Select Role:</label>
          <select {...register("role", { required: true })} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" >
              <option className='options' value="user" defaultChecked>User</option>
              <option className='options' value="admin">Admin</option>
          </select>
        </div>
        {errors.role && <span className='text-red-600 text-sm'>{errors.role.message}</span>}

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
          <input type="email" {...register("email", { required: { value: true, message: "Email is Required" } })} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter Email'/>
        </div>
        {errors.email && <span className='text-red-600 text-sm'>{errors.email.message}</span>}

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
          <input type="password" {...register("password", { required: { value: true, message: "Password cannot be empty" }, minLength: { value: 6, message: "Password contain at least 6 character"}, maxLength: { value: 16, message: "Password cannot be greater then 16" } })} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter Password'/>
        </div>
        {errors.password && <span className='text-red-600 text-sm'>{errors.password.message}</span>}

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
          <input type="password" {...register("confirmPassword", { required: { value: true, message: "Confirm Password is Required" } })} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter Confirm Password'/>
        </div>
        {errors.confirmPassword && <span className='text-red-600 text-sm'>{errors.confirmPassword.message}</span>}

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm" disabled={isSubmitting}>Register</button>
      </form>

      <div className  ="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
        <NavLink to="/" className="text-blue-500 hover:text-blue-600">Login</NavLink>
      </div>
    </div>
  </>
  )
}
