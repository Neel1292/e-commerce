import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AdminProductItem({ id, prod_name, date, price , setShowAddItem, setIsDelete, setEditId }) {
  return (
    <tr key={id}>
        <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6 sm:pr-0 ">
            {prod_name}
        </td>
        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{date.slice(0,10).split('-').reverse().join('-')}</td>
        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
            <h3 className='font-medium'><span className="text-xs font-normal text-gray-400">INR </span>{price}</h3>
        </td>
        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
            {/* <div className={`inline-flex items-center rounded-full ${statusClass} py-2 px-3 text-xs`}> */}
          <div className={`flex items-center gap-4 rounded-full py-2 px-3 text-xs`}>
              <span>
                <FontAwesomeIcon icon={faPen} style={{color: "#06B6D4"}} 
                  onClick={() => {
                    setEditId(id);
                    setShowAddItem((prev) => !prev);
                  }} 
                />
              </span> 
              <span>
                <FontAwesomeIcon icon={faTrashAlt} style={{color: "#06b6d4"}}
                    onClick={() => {
                      setEditId(id);
                      setIsDelete((prev) => !prev);
                    }}
                />
              </span> 
          </div>
        </td>
    </tr>
  )
}
