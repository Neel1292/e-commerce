import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { deleteOneUserAsync, getUsersAsync } from '../../redux/userSlice';
import AdminUserTable from '../components/admin/users/AdminUserTable';
import EditUser from '../components/admin/users/EditUser';
import AddUser from '../components/admin/users/AddUser';
import Loader from '../../utils/Loader';

export default function AdminUsers() {

  let users = useSelector((state) => state.users?.allusers)
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerpage = 5;
  const lastIndex = currentPage * recordsPerpage;
  const firstIndex = lastIndex - recordsPerpage;
  const records = users?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(users?.length / recordsPerpage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isDelete, setIsDelete] = useState(false)

  useEffect(() => {
    dispatch(getUsersAsync());
    if(isDelete) {
      dispatch(deleteOneUserAsync(editId));
      setEditId(undefined);

    }
  }, [isDelete, editId]);

  return (
    <>
      {(users.length === 0 || !users) ? <Loader /> :
      <div className="relative w-screen">

        {showAddUser && (
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-xl z-20">
              {typeof editId !== 'undefined' ? (
                <EditUser id={editId} setShowAddUser={setShowAddUser} setEditId={setEditId} setIsDelete={setIsDelete}  />
              ) : (
                <AddUser setShowAddUser={setShowAddUser} />
              )}
            </div>
          </div>
        )}

        <div className='hidden text-red-500 text-center text-md screen-text'>Please switch to desktop for better view.</div>

        <div className={`relative mx-auto mt-8 max-w-screen-lg px-2 ${showAddUser ? 'pointer-events-none' : ''}  md:px-6`}>
          <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
            <p className="flex-1 text-base font-bold text-gray-900">All Users </p>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center justify-start sm:justify-end">
                
                <button 
                  onClick={() => { setEditId(undefined)
                    setShowAddUser((prevItem) => !prevItem)}} 
                  type="button" 
                  className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                >
                  <FontAwesomeIcon icon={faUserPlus} className='mr-1'/>
                  Add User
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border shadow">
            <div className="table-responsive">
              <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2 sm:table-auto">
                <thead className="hidden border-b lg:table-header-group">
                  <tr>
                    <td width="10%" className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">User Name</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Email</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Phone</td>
                    <td width="50%" className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Address</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Role</td>
                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Actions</td>
                  </tr>
                </thead>
                <tbody className="lg:border-gray-300">
                  {records.map((user, {status ="Complete", statusClass="bg-blue-600 text-white" }) => (         
                    <AdminUserTable key={user.id} id={user.id} user_name={user.name} email={user.email}
                      phone={user.phone} address={user.address} role={user.role} status={status} statusClass={statusClass} setShowAddUser={setShowAddUser} setIsDelete={setIsDelete} setEditId={setEditId}/>       
                  ))}
                </tbody>
              </table>
            </div>
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