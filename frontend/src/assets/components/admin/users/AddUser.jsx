import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import Loader from "../../../../utils/Loader";
import { createOneUserAsync } from "../../../../redux/userSlice";

export default function AddUser({ setShowAddUser }) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const dispatch = useDispatch();

    function handleAddUser(data) {
        dispatch(createOneUserAsync(data)) 
        && setTimeout(() => setShowAddUser((prev) => !prev), 1000); 
    }

  return (
    <>
    {isSubmitting && <Loader/>}
    <div className=" absolute w-full bg-white left-[25%] my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-10 sm:py-2 md:mx-auto add-user">
        <div className="flex flex-col border-b py-3 sm:flex-row sm:items-start">
            <div className="shrink-0 mr-auto sm:py-1">
            <p className="font-medium">New User</p>
            <p className="text-sm text-gray-600">Add user details</p>
            </div>
            <button onClick={() => setShowAddUser((prevItem) => !prevItem)} className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
            
        </div>
        <form onSubmit={handleSubmit(handleAddUser)} action="/admin/users"  className="user-form-responsive">

            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="item_name" className="shrink-0 w-32 font-medium">User Name</label>
                <input 
                    placeholder="Enter User's Full Name" 
                    className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mb-0 focus:ring-1" 
                    {...register("name", { required: { value: true, message: "Name cannot be empty" } })}               
                />
            </div>
            {errors.name && <span className='text-red-600 text-sm'>{errors.name.message}</span>}

            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="phone" className="shrink-0 w-32 font-medium">Contact Number</label>
                <input
                    type="number"
                    placeholder="Enter Contact Number" className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                    {...register("phone", { required: { value: true, message: "Contact Number is Required"}, maxLength: { value: 10, message: "Contact Number is should be of length 10" } })} />
            </div>
            {errors.phone && <span className='text-red-600 text-sm'>{errors.phone.message}</span>}

            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="address" className="shrink-0 w-32 font-medium">Address</label>
                <input 
                    type="text"
                    placeholder="Describe your Product"
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                    {...register("address", { required: { value: true, message: "Address is Required" }, maxLength: { value: 245, message: "Address should be of length 245" }})}
                />
            </div>
            {errors.address && <span className='text-red-600 text-sm'>{errors.address.message}</span>}

            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="role" className="shrink-0 w-32 font-medium">Select Role</label>
                <select 
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                    {...register("role", { required: true })}
                >
                    <option className='options' value="user" defaultChecked>User</option>
                    <option className='options' value="admin">Admin</option> 
                </select>
            </div>

            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="email" className="shrink-0 w-32 font-medium">Email</label>
                <input
                    type="email"
                    placeholder="your.email@domain.com" className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                    {...register("email", { required: { value: true, message: "Email is Required" } })} 
                />
            </div>
            {errors.email && <span className='text-red-600 text-sm'>{errors.email.message}</span>}

            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="password" className="shrink-0 w-32 font-medium">Password</label>
                <input 
                    placeholder='Enter Password'
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                    type="password" {...register("password", { required: { value: true, message: "Password cannot be empty" }, minLength: { value: 6, message: "Password contain at least 6 character"}, maxLength: { value: 16, message: "Password cannot be greater then 16" } })}
                />
            </div>
            {errors.password && <span className='text-red-600 text-sm'>{errors.password.message}</span>}

            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="confirmPassword" className="shrink-0 w-32 font-medium">Confirm Password</label>
                <input 
                    placeholder='Enter Confirm Password'
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                    {...register("confirmPassword", { required: { value: true, message: "Confirm Password is Required" } })} 
                />
            </div>
            {errors.confirmPassword && <span className='text-red-600 text-sm'>{errors.confirmPassword.message}</span>}

            <div className="flex flex-col gap-4 border-t pt-2 sm:flex-row">
                <button 
                    type="submit" 
                    className="hidden rounded-lg border-2 border-transparent bg-cyan-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-cyan-700 user-submit"
                    disabled={isSubmitting}
                >
                    Submit
                </button>
                <button onClick={() => setShowAddUser((prevItem) => !prevItem)} className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200 responsive-button-user">Cancel</button>
            </div>
        </form>
    </div>
    </>
  )
}
