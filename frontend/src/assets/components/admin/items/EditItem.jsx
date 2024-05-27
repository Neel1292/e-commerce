import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedItem, getSelectedItem, updateOneItemAsync } from "../../../../redux/itemSlice";
import { useEffect } from "react";

export default function EditItem({ setShowAddItem, setEditId, id }) {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        dispatch(getSelectedItem(id));
    }, [id])
    
    const item = useSelector((state) => state.items?.editItem);
    
    function handleUpdateProduct(data) {
        const formData = new FormData();
        formData.append('item_image', data.item_image[0]);
        formData.append('item_name', data.item_name);
        formData.append('item_description', data.item_description);
        formData.append('item_price', data.item_price);
        formData.append('seller_name', data.seller_name);

        dispatch(updateOneItemAsync(id, formData));
        setShowAddItem((prev) => !prev);
        setEditId(undefined);
    }

  return (
    <>
        <div className=" absolute bg-white left-[31%] my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-6 sm:py-2 md:mx-auto">
            <div className="flex flex-col border-b py-3 sm:flex-row sm:items-start">
                <div className="shrink-0 mr-auto sm:py-1">
                <p className="font-medium">Product Detail</p>
                <p className="text-sm text-gray-600">Edit product details</p>
                </div>
                <button 
                    onClick={() => {
                        setEditId(undefined);
                        setShowAddItem((prevItem) => !prevItem);
                        dispatch(deleteSelectedItem());
                    }} 
                    className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200"
                >
                    Cancel
                </button>
                
            </div>
            <form 
            onSubmit={handleSubmit(handleUpdateProduct)} 
            action="/admin/products" method="post" encType="multipart/form-data">

                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <label htmlFor="item_name" className="shrink-0 w-32 font-medium">Product Name</label>
                    <input 
                        defaultValue={item.item_name}
                        className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mb-0 focus:ring-1" 
                        placeholder="Enter Product Name" 
                        {...register("item_name", { required: { value: true, message: "Name cannot be empty" } })}                
                    />
                </div>
                {/* <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <label htmlFor="email" className="shrink-0 w-32 font-medium">Email</label>
                    <input placeholder="your.email@domain.com" className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
                </div> */}
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <label htmlFor="item_description" className="shrink-0 w-32 font-medium">Product Description</label>
                    <input 
                        defaultValue={item.item_description}
                        placeholder="Describe your Product"
                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                        {...register("item_description", { required: { value: true, message: "Description cannot be empty" } })}
                    />
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <label htmlFor="item_price" className="shrink-0 w-32 font-medium">Product Price</label>
                    <input
                        defaultValue={item.item_price} 
                        placeholder="Enter Price in INR" 
                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                        {...register("item_price" , { required: { value: true, message: "Price cannot be empty" } })}
                    />
                </div>
                <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
                    <label htmlFor="seller_name" className="shrink-0 w-32 font-medium">Seller Name</label>
                    <input 
                        defaultValue={item.seller_name}
                        placeholder="Seller Name" 
                        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" 
                        {...register("seller_name", { required: { value: true, message: "Please provide seller name" } })}
                    />
                </div>
                <div className="flex flex-col gap-4 py-4  lg:flex-row">
                    <div className="shrink-0 w-32  sm:py-4">
                        <label htmlFor="item_image" className="mb-auto font-medium">Product Image</label>
                        <p className="text-xs text-gray-600">Upload product image</p>
                    </div>
                    <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 px-3 py-2 text-center">
                        <img src={`data:image/jpg;base64,${item.item_image}`} className="h-16 w-16 rounded-full" />
                        <p className="text-sm text-gray-600">Drop your desired image file in (JPG)</p>
                        <input 
                            type="file" 
                            name="item_image"
                            className="max-w-full rounded-lg px-2 font-medium text-cyan-500 outline-none ring-blue-600 focus:ring-1" 
                            {...register("item_image")}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 border-t pt-2 sm:flex-row">
                    <button 
                        type="submit" 
                        className="hidden rounded-lg border-2 border-transparent bg-cyan-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-cyan-700"
                        disabled={isSubmitting}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}
