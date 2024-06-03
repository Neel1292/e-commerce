import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getItemsAsync } from "../../redux/itemSlice";
import Products from "../components/Products";
import Corusal from "../components/Corusal";
import Loader from "../../utils/Loader";

export default function Home() {

  let items = useSelector((state) => state.items?.item);
  let images = useSelector((state) => state.banners?.bannerImg);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsAsync());
  }, []);

  return (
    <>
      <Corusal imgSrc={images}/>

      {(items.length === 0 || !items) && <Loader />}
      <div className="responsive-product">
        {items.length > 0 && <Products items={items}/> }
      </div>
    </>
  )
}
