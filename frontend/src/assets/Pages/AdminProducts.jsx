import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AdminProductItem from '../components/admin/items/AdminProductItem';
import AddItem from '../components/admin/items/AddItem';
import EditItem from '../components/admin/items/EditItem';
import { deleteOneItemAsync, getItemsAsync } from '../../redux/itemSlice';
import Loader from '../../utils/Loader';
import { toast } from 'react-toastify';

export default function AdminProducts() {

  let items = useSelector((state) => state.items?.item)
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerpage = 5;
  const lastIndex = currentPage * recordsPerpage;
  const firstIndex = lastIndex - recordsPerpage;
  const records = items?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(items?.length / recordsPerpage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  const [showAddItem, setShowAddItem] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isDelete, setIsDelete] = useState(false)

  useEffect(() => {
    dispatch(getItemsAsync());
    if(isDelete) {
      dispatch(deleteOneItemAsync(editId))
      setEditId(undefined)
      toast.success('Item deleted successfully');
    }
  }, [isDelete]);

  return (
    <>
      {(items.length === 0 || !items) ? <Loader /> : 

        <div className="relative w-screen">

          {showAddItem && (
            <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
              <div className="relative bg-white rounded-lg shadow-xl z-20">
                {typeof editId !== 'undefined' ? (
                  <EditItem setShowAddItem={setShowAddItem} setEditId={setEditId} id={editId} />
                ) : (
                  <AddItem setShowAddItem={setShowAddItem} />
                )}
              </div>
            </div>
          )}

          <div className={`relative mx-auto mt-8 max-w-screen-lg px-2 ${showAddItem ? 'pointer-events-none' : ''}`}>
            <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
              <p className="flex-1 text-base font-bold text-gray-900">Latest Orders </p>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center justify-start sm:justify-end">
                  
                  <button 
                    onClick={() => { setEditId(undefined)
                      setShowAddItem((prevItem) => !prevItem)}} 
                    type="button" 
                    className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                  >
                    <FontAwesomeIcon icon={faCartShopping} className='mr-1' />
                    Add Item
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border shadow">
              <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                <thead className="hidden border-b lg:table-header-group">
                  <tr>
                    <td width="50%" className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Product Name</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Date</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Amount</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Actions</td>
                  </tr>
                </thead>
                <tbody className="lg:border-gray-300">
                  {records.map((item, {status ="Complete", statusClass="bg-blue-600 text-white" }) => (         
                    <AdminProductItem key={item.id} id={item.id} prod_name={item.item_name} date={item.created_at} price={item.item_price} status={status}statusClass={statusClass} setShowAddItem={setShowAddItem} setIsDelete={setIsDelete} setEditId={setEditId}/>       
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center my-2 py-2">
                <ul className="inline-flex items-center space-x-1">
                  <li className='page-item'>
                    <a 
                      href="#" 
                      className="px-3 py-2 text-sm font-medium text-cyan-500 bg-white border border-gray-300 rounded hover:bg-gray-100"
                      onClick={prevPage}
                    >
                      PREV
                    </a>
                  </li>
                  {
                    numbers.map((num, i) => (
                      <li className={`page-item ${currentPage === num ? 'active' : ''}`} key={i}>
                          <a 
                            href="#" 
                            className={`px-3 py-2 text-sm font-medium ${currentPage === num ? 'text-white bg-cyan-500 border-blue-500 hover:bg-cyan-700 hover:text-white' : 'text-cyan-500 bg-white border border-gray-300 hover:bg-gray-100'} rounded`}
                            onClick={() => changeCurrentPage(num)}
                          >
                            {num}
                          </a>
                      </li>
                    ))
                  }
                  <li className='page-item'>
                    <a 
                      href="#" 
                      className="px-3 py-2 text-sm font-medium text-cyan-500 bg-white border border-gray-300 rounded hover:bg-gray-100"
                      onClick={nextPage}
                    >
                      NEXT
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  
  function changeCurrentPage(id) {
    setCurrentPage(id);
  }
  
  function nextPage() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }


}