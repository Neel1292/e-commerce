import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getItemsAsync } from "../../redux/itemSlice";
import Products from "../components/Products";
import Corusal from "../components/Corusal";


export default function Home() {
    
    let items = useSelector((state) => state.items?.item)
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getItemsAsync());
    }, []);

  return (
    <>
      <Corusal/>

      <div className="mt-10 pl-10 grid grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-2 lg:mt-5">
        {items.length > 0 && <Products items={items}/> }
      </div>
    </>
  )
}
