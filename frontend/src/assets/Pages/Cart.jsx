import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import PaymentDetails from '../components/PaymentDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


    export default function Cart() {
    const cart =  useSelector((state) => state.carts?.cartItems) || [];
    const total = useSelector((state) => {
        const itemTotal = state.carts.total;
        return itemTotal !== 0 ? itemTotal : 0
    })

    return (
    <>
        <section className="min-h-[660px] bg-gray-100 py-10 sm:py-16 lg:py-2">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center border-b">
                    <h1 className="text-2xl mt-1 py-2 font-semibold text-gray-900">Shopping Cart</h1>
                </div>

                <div className="mx-auto mt-6 max-w-2xl md:mt-10">
                    <div className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                <ul className="-my-8">
                                    {cart?.length == 0 && 
                                        <span className='flex items-center text-lg gap-[10px] text-red-500 mt-4'>
                                            <FontAwesomeIcon icon={faCartShopping} style={{color: "#ef0606"}} />
                                            No items available
                                        </span>
                                    }
                                    {cart.map(item => (
                                        <CartItem key={item.id} id={item.id} quantity={item.quantity} imgSrc={item.image} name={item.name} price={item.price} />
                                    ))}
                                </ul>
                            </div>

                        <PaymentDetails total={total} shipping={49} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
    