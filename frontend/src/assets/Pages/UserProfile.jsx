import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import getUser from '../../utils/getUser'
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Loader from '../../utils/Loader';
import { updateUserAsync } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import getToken from '../../utils/getToken';
import { NavLink } from 'react-router-dom';

export default function UserProfile() {
    const navigate = useNavigate();
    const user = getUser(),
    token = getToken();
    const dispatch = useDispatch();

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  function onUpdate(data) {
    try {
      let result = dispatch(updateUserAsync(user.id, data, token));
        if(result) {
            alert('User data updated successfully...')
            navigate('/profile');
        }
    } catch (error) {
        alert('Error ! Please try again..')
        navigate('/profile');
    }
  }

  return (
    <>
        {isSubmitting ? <Loader /> : user ?
            
            <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto max-[767px]:max-w-[100px] user-profile">
                <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
                    <div className="shrink-0 mr-auto sm:py-3">
                        <p className="font-medium">Account Details</p>
                        <p className="text-sm text-gray-600">Edit your account details</p>
                    </div> 
                </div>
                <form action="/profile" onSubmit={handleSubmit(onUpdate)}>
                    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                        <label htmlFor="name" className="shrink-0 w-32 font-medium">Name</label>
                        <input
                            defaultValue={user ? user.name : ""} 
                            {...register("name")} 
                            placeholder="Full Name" 
                            className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600  focus:ring-1" 
                        />
                    </div>
                    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                        <label htmlFor='email' className="shrink-0 w-32 font-medium">Email</label>
                        <input 
                            defaultValue={user ? user.email : ""}
                            {...register("email")} 
                            placeholder="your.email@domain.com" 
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                        />
                    </div>
                    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                        <label htmlFor='address' className="shrink-0 w-32 font-medium">Address</label>
                        <input 
                            defaultValue={user ? user.address : ""}
                            {...register("address")} 
                            placeholder="your.email@domain.com" 
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                        />
                    </div>
                    <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                        <label htmlFor="phone" className="shrink-0 w-32 font-medium">Phone</label>
                        <input 
                            defaultValue={user ? user.phone : ""}
                            {...register("phone")} 
                            placeholder="9876XXXXX0" 
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                        />
                    </div>
                    <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start button-max-767">
                        <button onClick={()=> navigate('/')} className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200 hover:text-cyan-500">Cancel</button>
                        <button type='submit' className=" rounded-lg border-2 border-transparent bg-cyan-500 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-cyan-700" disabled={isSubmitting}>
                            {isSubmitting ? 'Submit...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div> 
            : <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto flex items-center justify-center min-h-[620px] ">
            <NavLink to='/login' className='text-xl text-red-500 mt-4'>
            <FontAwesomeIcon icon={faUser}/> <span>Please Login to view details</span></NavLink></div>
        }   
    </>
  )
}
