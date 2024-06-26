import MainNavigation from './MainNavigation';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RootLayout() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        stacked={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnFocus={false}
        draggable
        pauseOnHover
        theme="light"
        transition: Bounce
      />
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
