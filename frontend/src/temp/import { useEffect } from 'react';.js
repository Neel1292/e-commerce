import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "../styles/Cart.css"
export default function Cart() {

    const cart =  useSelector((state) => {
        const oneitem = state.carts.cartItems;
        return oneitem.length !== 0 ? oneitem : []
    })

    // useEffect(() => {

    // }, [cart])

  return (
    <div className="flex flex-col items-center mt-2">
        {cart.map(item => (        
            <NavLink to={`${item.id}`} className="flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mt-2 mb-2">
                <div className="cart-product-img-container w-[300px] h-[200px] object-cover  relative">
                    <img className=" cart-product-img rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={`${item.image}`} alt="" />
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                </div>
            </NavLink>
        ))}
    </div>
  )
}
