import { faUserPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AdminUserTable({ id, user_name, email, phone, address, role, setShowAddUser, setIsDelete, setEditId }) {

  function handleDelete() {
    if(confirm("Are you Sure you want to delete this user?")) {
      setEditId(id);
      setIsDelete((prev) => !prev)
    } 
  }
  
  return (
    <tr key={id}>
        <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
            {user_name}
        </td>
        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{email}</td>
        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
            <h3 className='font-medium'>{phone}</h3>
        </td>
        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
            <h3 className='font-medium'>{address}</h3>
        </td>
        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
            <h3 className='font-medium'>{role}</h3>
        </td>
        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
            {/* <div className={`inline-flex items-center rounded-full ${statusClass} py-2 px-3 text-xs`}> */}
          <div className={`flex items-center gap-4 rounded-full py-2 px-3 text-xs`}>
              <span>
                <FontAwesomeIcon icon={faUserPen} style={{color: "#06B6D4"}} 
                  onClick={() => {
                    setEditId(id);
                    setShowAddUser((prev) => !prev);
                  }} 
                />
              </span> 
              <span>
                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#06b6d4"}}
                  onClick={handleDelete}
                />
              </span> 
          </div>
        </td>
    </tr>
  )
}
