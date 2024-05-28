import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemCart } from "../../redux/cartSlice";
import getUser from "../../utils/getUser";

export default function Products({ items }) {

    const dispatch = useDispatch()
    let user = getUser();

    function handelAdd(id, item) {
        dispatch(addItemCart({id, item}))
    }

    return (
        <>
            {items.map(item =>(

                <div key={item.id} className="group my-2 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
                    <NavLink className="relative flex h-60 overflow-hidden" to={`/product/${item.id}`}>
                        <img
                        className="absolute top-0 right-0 h-full w-full object-contain"
                        src={`data:image/jpg;base64,${item.item_image}`} alt={`${item.item_name}`} 
                        />
                    </NavLink>
                    <div className="mt-4 px-5 pb-5">

                        <NavLink to={`/product/${item.id}`}>
                            <h5 className="text-xl tracking-tight text-slate-900">{item.item_name}</h5>
                        </NavLink>

                        <div className={`mt-2 ${user.role ==='user' ? 'mb-5' : 'mb-2'} flex items-center justify-between`}>
                            <p className="mr-3 text-sm font-semibold">
                                <span className="text-xs mr-1 font-normal text-gray-400">INR</span>
                                {item.item_price}.00
                                
                            </p>
                        </div>
                        {user.role === 'user' && 
                            <button  onClick={() => handelAdd(item.id, item)} className="flex items-center justify-center bg-cyan-500 px-2 py-2 font-medium text-sm text-white transition hover:bg-cyan-700 rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                                Add to cart
                            </button>
                        }
                    </div>
                </div>
          ))}   
        </>
    );
}