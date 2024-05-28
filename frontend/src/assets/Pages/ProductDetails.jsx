import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOneItemAsync } from "../../redux/itemSlice";
import { addItemCart } from "../../redux/cartSlice";
import getUser from "../../utils/getUser";

export default function ProductDetails() {
    const { id } = useParams();
    let user = getUser();

    const dispatch = useDispatch();
    const item = useSelector((state) => {
        const oneitem = state.items.oneItem
        return oneitem.length !== 0 ? oneitem[0] : []
    })

    function handelAdd(id) {
        dispatch(addItemCart({id, item}))
    }

    useEffect(() => {
        console.log("Getting data...", id);
        dispatch(getOneItemAsync(id))
    }, [id])  

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8 min-h-[660px]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-fill" src={`data:image/jpg;base64,${item.item_image}`} alt={`${item.item_name}`} />
                        </div>

                        {user.role === 'user' && 

                            <div className="flex -mx-2 mb-4">
                                <div onClick={() => handelAdd(item.id)} className="w-full px-2">
                                    <button className="w-full bg-cyan-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-cyan-700 dark:hover:bg-gray-700">Add to Cart</button>
                                </div>
                            </div>
                        }

                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{item.item_name}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {item.item_description}.
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                <span className="text-gray-600 dark:text-gray-700"><span className="text-xs font-normal text-gray-500">INR </span>{item.item_price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                                <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

            {/* <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                <div className="flex items-center mt-2">
                    <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div>
            </div> 
            
            <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                <div className="flex items-center mt-2">
                    <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                    <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                    <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                    <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                    <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                </div>
            </div>
            <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {item.item_description}.
                </p>
            </div>
        */}
