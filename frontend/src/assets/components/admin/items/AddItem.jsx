import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { addOneItemAsync } from "../../../../redux/itemSlice";

export default function AddItem({ setShowAddItem }) {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const dispatch = useDispatch();

    function handleAddProduct(data) {
        const formData = new FormData();
        formData.append('item_image', data.item_image[0]);
        formData.append('item_name', data.item_name);
        formData.append('item_description', data.item_description);
        formData.append('item_price', data.item_price);
        formData.append('seller_name', data.seller_name);
        dispatch(addOneItemAsync(formData)) && setShowAddItem((prev) => !prev);
    }

  return (
    <>
    <div className=" absolute bg-white left-[31%] my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-6 sm:py-2 md:mx-auto add-item">
        <div className="flex flex-col border-b py-3 sm:flex-row sm:items-start">
            <div className="shrink-0 mr-auto sm:py-1">
            <p className="font-medium">Add New Product</p>
            <p className="text-sm text-gray-600">Add product details</p>
            </div>
            <button onClick={() => setShowAddItem((prevItem) => !prevItem)} className="hidden mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
            
        </div>
        <form onSubmit={handleSubmit(handleAddProduct)} action="/admin/products" method="post" encType="multipart/form-data" className="form-responsive">

            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="item_name" className="shrink-0 w-32 font-medium">Product Name</label>
                <input 
                    placeholder="Enter Product Name" 
                    className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mb-0 focus:ring-1" 
                    {...register("item_name")}                
                />
            </div>
            {/* <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="email" className="shrink-0 w-32 font-medium">Email</label>
                <input placeholder="your.email@domain.com" className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
            </div> */}
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="item_description" className="shrink-0 w-32 font-medium">Product Description</label>
                <input placeholder="Describe your Product"
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                    {...register("item_description", { required: { value: true, message: "Name cannot be empty" } })}
                />
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="item_price" className="shrink-0 w-32 font-medium">Product Price</label>
                <input 
                    placeholder="Enter Price in INR" 
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                    {...register("item_price")}
                />
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <label htmlFor="seller_name" className="shrink-0 w-32 font-medium">Seller Name</label>
                <input 
                    placeholder="Seller Name" 
                    className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                    {...register("seller_name")}
                />
            </div>
            <div className="flex flex-col gap-4 py-4  lg:flex-row">
                <div className="shrink-0 w-32  sm:py-4">
                    <label htmlFor="item_image" className="mb-auto font-medium">Product Image</label>
                    <p className="text-xs text-gray-600">Upload product image</p>
                </div>
                <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 px-3 py-2 text-center">
                    <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=150&q=60" className="h-16 w-16 rounded-full" />
                    <p className="text-sm text-gray-600">Drop your desired image file in (JPG)</p>
                    <input type="file" 
                        name="item_image"
                        className="max-w-full rounded-lg px-2 font-medium text-cyan-500 outline-none ring-blue-600 focus:ring-1" 
                        {...register("item_image")}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 border-t pt-2 sm:flex-row">
                <button 
                    type="submit" 
                    className="rounded-lg border-2 border-transparent bg-cyan-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-cyan-700"
                    disabled={isSubmitting}
                >
                    Save
                </button>
                <button onClick={() => setShowAddItem((prevItem) => !prevItem)} className="hidden mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200 responsive-button">Cancel</button>
            </div>
        </form>
    </div>
    </>
  )
}
